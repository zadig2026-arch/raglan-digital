/**
 * Raglan Digital — Cold Outreach
 * Code.gs — orchestration (sendBatch, sendFollowUps, detectReplies)
 *
 * Designed to run inside Apps Script bound to the "Raglan Digital — Cold Outreach"
 * Google Sheet. Companion file: Templates.gs (email copy).
 */

// ===== Config =====
var SHEET_PROSPECTS = 'prospects';
var SHEET_LOG = 'log';
var BATCH_SIZE = 20;
var SEND_DELAY_MS = 30000; // 30s between sends — anti-spam throttle
var FOLLOWUP_1_DAYS = 4;
var FOLLOWUP_2_DAYS = 7;  // days after followup1
var DROP_DAYS_AFTER_F2 = 3; // drop 3 days after followup2 = ~14 days total
var UNSUB_PATTERNS = [
  /\bstop\b/i,
  /\bunsubscribe\b/i,
  /\bremove me\b/i,
  /\bopt[-\s]?out\b/i,
  /\btake me off\b/i,
  /\bno thanks\b/i,
  /\bnot interested\b/i
];
var VALID_SITE_STATUSES = ['none', 'broken', 'outdated'];
var FOLLOWUP_ELIGIBLE_STATUSES = ['sent', 'followup1', 'followup2'];

// ===== Menu =====
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Cold Outreach')
    .addItem('▶ Send batch (20 max)', 'menuSendBatch')
    .addItem('🔎 Check for replies', 'menuDetectReplies')
    .addItem('📅 Run follow-ups now', 'menuRunFollowUps')
    .addSeparator()
    .addItem('📊 Show stats', 'menuShowStats')
    .addToUi();
}

function menuSendBatch() {
  var ui = SpreadsheetApp.getUi();
  var resp = ui.alert(
    'Send cold emails?',
    'Up to ' + BATCH_SIZE + ' eligible prospects will receive the first-touch email.\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;
  var n = sendBatch();
  ui.alert('Done', n + ' email(s) sent.', ui.ButtonSet.OK);
}

function menuDetectReplies() {
  var n = detectReplies();
  SpreadsheetApp.getUi().alert(
    'Reply scan complete',
    n + ' reply/replies matched and updated.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function menuRunFollowUps() {
  var result = sendFollowUps();
  SpreadsheetApp.getUi().alert(
    'Follow-ups complete',
    'Sent: ' + result.sent + '\nDropped: ' + result.dropped,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function menuShowStats() {
  var data = getSheetData();
  var counts = {};
  data.rows.forEach(function (r) {
    var status = r.status || '(empty)';
    counts[status] = (counts[status] || 0) + 1;
  });
  var lines = Object.keys(counts).sort().map(function (k) {
    return k + ': ' + counts[k];
  });
  SpreadsheetApp.getUi().alert(
    'Pipeline status',
    lines.join('\n') + '\n\nTotal: ' + data.rows.length,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ===== Core: cold batch send =====
function sendBatch() {
  var data = getSheetData();
  var sentCount = 0;
  var skippedCount = 0;

  for (var i = 0; i < data.rows.length; i++) {
    if (sentCount >= BATCH_SIZE) break;
    var row = data.rows[i];
    var reason = cannotSendCold(row);
    if (reason) {
      if (row.status === 'pending') {
        // Only log skips on prospects we were supposed to try
        logAction('skip_cold', row.email, row.status, reason);
        skippedCount++;
      }
      continue;
    }

    try {
      var mail = getColdEmail(row.template_variant, row);
      GmailApp.sendEmail(row.email, mail.subject, mail.body, {
        name: 'Zadig · Raglan Digital'
      });
      var now = new Date();
      setCellByHeader(data, i, 'status', 'sent');
      setCellByHeader(data, i, 'contacted_at', now);
      setCellByHeader(data, i, 'last_action_at', now);
      logAction('cold_sent', row.email, 'sent', 'variant=' + row.template_variant);
      sentCount++;
      if (sentCount < BATCH_SIZE) Utilities.sleep(SEND_DELAY_MS);
    } catch (err) {
      logAction('cold_error', row.email, row.status, String(err));
    }
  }
  return sentCount;
}

function cannotSendCold(row) {
  if (!row.email || row.email.indexOf('@') === -1) return 'invalid_email';
  if (row.unsubscribed === true || String(row.unsubscribed).toUpperCase() === 'TRUE') return 'unsubscribed';
  if (row.status !== 'pending') return 'status_not_pending:' + row.status;
  if (VALID_SITE_STATUSES.indexOf(row.site_status) === -1) return 'site_status_not_eligible:' + row.site_status;
  if (!row.specific_hook || String(row.specific_hook).trim() === '') return 'missing_specific_hook';
  if (['A', 'B', 'C'].indexOf(String(row.template_variant || '').toUpperCase()) === -1) return 'invalid_variant:' + row.template_variant;
  return null;
}

// ===== Core: follow-ups =====
function sendFollowUps() {
  var data = getSheetData();
  var sent = 0;
  var dropped = 0;

  for (var i = 0; i < data.rows.length; i++) {
    var row = data.rows[i];
    if (row.unsubscribed === true || String(row.unsubscribed).toUpperCase() === 'TRUE') continue;
    if (FOLLOWUP_ELIGIBLE_STATUSES.indexOf(row.status) === -1) continue;

    var lastActionAt = row.last_action_at instanceof Date ? row.last_action_at : null;
    if (!lastActionAt) continue;
    var days = daysBetween(lastActionAt, new Date());

    try {
      if (row.status === 'sent' && days >= FOLLOWUP_1_DAYS) {
        var f1 = getFollowUp1(row);
        replyInThread(row.email, f1.body);
        var now = new Date();
        setCellByHeader(data, i, 'status', 'followup1');
        setCellByHeader(data, i, 'last_action_at', now);
        logAction('followup1_sent', row.email, 'followup1', 'days=' + days);
        sent++;
      } else if (row.status === 'followup1' && days >= FOLLOWUP_2_DAYS) {
        var f2 = getFollowUp2(row);
        replyInThread(row.email, f2.body);
        var now2 = new Date();
        setCellByHeader(data, i, 'status', 'followup2');
        setCellByHeader(data, i, 'last_action_at', now2);
        logAction('followup2_sent', row.email, 'followup2', 'days=' + days);
        sent++;
      } else if (row.status === 'followup2' && days >= DROP_DAYS_AFTER_F2) {
        setCellByHeader(data, i, 'status', 'dropped');
        logAction('dropped', row.email, 'dropped', 'no_reply_after_f2_days=' + days);
        dropped++;
      }
    } catch (err) {
      logAction('followup_error', row.email, row.status, String(err));
    }
  }
  return { sent: sent, dropped: dropped };
}

/**
 * Reply in the original thread if we can find it, otherwise send fresh.
 * Finds the most recent thread we sent to this address (within 60d).
 */
function replyInThread(toEmail, body) {
  var query = 'in:sent to:' + toEmail + ' newer_than:60d';
  var threads = GmailApp.search(query, 0, 5);
  if (threads.length > 0) {
    threads[0].reply(body);
  } else {
    // Fallback: send as fresh mail with generic follow-up subject
    GmailApp.sendEmail(toEmail, 'Following up', body, {
      name: 'Zadig · Raglan Digital'
    });
  }
}

// ===== Core: reply detection =====
function detectReplies() {
  var data = getSheetData();
  var matched = 0;

  // Collect emails we're waiting on a reply from
  var waiting = data.rows
    .map(function (r, idx) { return { row: r, idx: idx }; })
    .filter(function (x) {
      return ['sent', 'followup1', 'followup2'].indexOf(x.row.status) !== -1
        && x.row.email
        && x.row.email.indexOf('@') !== -1;
    });

  if (waiting.length === 0) return 0;

  // Gmail `from:` supports OR but query length is limited.
  // Chunk by 30 emails per query.
  var chunks = [];
  for (var c = 0; c < waiting.length; c += 30) {
    chunks.push(waiting.slice(c, c + 30));
  }

  chunks.forEach(function (chunk) {
    var emails = chunk.map(function (x) { return x.row.email; });
    var query = 'in:inbox newer_than:60d from:(' + emails.join(' OR ') + ')';
    var threads = GmailApp.search(query, 0, 50);
    threads.forEach(function (thread) {
      var msgs = thread.getMessages();
      var last = msgs[msgs.length - 1];
      var fromField = last.getFrom();
      var senderEmail = extractEmail(fromField);
      if (!senderEmail) return;

      // Find matching row
      var match = waiting.find(function (x) {
        return x.row.email.toLowerCase() === senderEmail.toLowerCase();
      });
      if (!match) return;
      if (match.row.status === 'replied' || match.row.status === 'meeting' || match.row.status === 'signed' || match.row.status === 'dropped') return;

      var fullText = (last.getSubject() || '') + ' ' + (last.getPlainBody() || '');
      var isUnsub = UNSUB_PATTERNS.some(function (re) { return re.test(fullText); });
      var snippet = (last.getPlainBody() || '').replace(/\s+/g, ' ').slice(0, 200);

      var now = new Date();
      if (isUnsub) {
        setCellByHeader(data, match.idx, 'unsubscribed', true);
        setCellByHeader(data, match.idx, 'status', 'dropped');
        setCellByHeader(data, match.idx, 'reply_detected_at', now);
        setCellByHeader(data, match.idx, 'reply_snippet', snippet);
        logAction('unsubscribe_detected', senderEmail, 'dropped', snippet);
      } else {
        setCellByHeader(data, match.idx, 'status', 'replied');
        setCellByHeader(data, match.idx, 'reply_detected_at', now);
        setCellByHeader(data, match.idx, 'reply_snippet', snippet);
        logAction('reply_detected', senderEmail, 'replied', snippet);
      }
      matched++;
    });
  });

  return matched;
}

// ===== Sheet helpers =====

/**
 * Loads the prospects sheet as objects keyed by column name.
 * Returns { sheet, headers, rows, headerIndex }.
 * `rows` objects include all column values + the raw rowNumber (1-indexed, pointing to the actual sheet row).
 */
function getSheetData() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_PROSPECTS);
  if (!sheet) throw new Error('Sheet "' + SHEET_PROSPECTS + '" not found.');
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return { sheet: sheet, headers: values[0] || [], rows: [], headerIndex: {} };

  var headers = values[0].map(function (h) { return String(h).trim(); });
  var headerIndex = {};
  headers.forEach(function (h, i) { headerIndex[h] = i; });

  var rows = [];
  for (var r = 1; r < values.length; r++) {
    var obj = { _rowNumber: r + 1 };
    for (var c = 0; c < headers.length; c++) {
      obj[headers[c]] = values[r][c];
    }
    rows.push(obj);
  }
  return { sheet: sheet, headers: headers, rows: rows, headerIndex: headerIndex };
}

/**
 * Writes a value to the sheet by column name. `dataIndex` is the 0-based index into `data.rows`.
 */
function setCellByHeader(data, dataIndex, header, value) {
  var colIdx = data.headerIndex[header];
  if (colIdx === undefined) throw new Error('Unknown column: ' + header);
  var rowNumber = data.rows[dataIndex]._rowNumber;
  data.sheet.getRange(rowNumber, colIdx + 1).setValue(value);
  // Keep the in-memory copy in sync in case we're mutating during iteration
  data.rows[dataIndex][header] = value;
}

function logAction(action, email, status, notes) {
  try {
    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_LOG);
    if (!sheet) return;
    sheet.appendRow([new Date(), action, email || '', status || '', notes || '']);
  } catch (err) {
    // Log failures should not break the main flow.
  }
}

// ===== Misc helpers =====

function daysBetween(a, b) {
  var ms = b.getTime() - a.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

/**
 * Extracts an email address from a Gmail "Name <email@host>" field.
 */
function extractEmail(fromField) {
  if (!fromField) return null;
  var m = String(fromField).match(/<([^>]+)>/);
  if (m) return m[1].trim();
  var trimmed = String(fromField).trim();
  return trimmed.indexOf('@') !== -1 ? trimmed : null;
}
