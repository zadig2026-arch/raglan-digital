/**
 * Raglan Digital — Cold Outreach
 * Templates.gs — email copy (3 cold variants + 2 follow-ups + signature)
 *
 * Source of truth: /scripts/cold-outreach/email-copy.md
 * Keep both files in sync when editing.
 */

var SIGNATURE = [
  '',
  '—',
  'Zadig · Raglan Digital',
  'Home-based in Raglan, New Zealand',
  '📱 020 4010 3409 · WhatsApp +33 7 52 03 22 13',
  '🌐 raglandigital.com/launch',
  '',
  'Don\'t want to hear from me again? Just reply STOP and I\'ll remove you.',
  'This email is a one-time outreach under NZ\'s Unsolicited Electronic Messages Act 2007 — no automated mass-list, no bought data, just me picking businesses one by one.'
].join('\n');

/**
 * Pick cold-email template based on variant column.
 * @param {string} variant 'A' | 'B' | 'C'
 * @param {Object} row — row data keyed by column name
 * @returns {{subject: string, body: string}}
 */
function getColdEmail(variant, row) {
  switch ((variant || '').toUpperCase()) {
    case 'A': return variantA(row);
    case 'B': return variantB(row);
    case 'C': return variantC(row);
    default: throw new Error('Unknown template_variant: ' + variant);
  }
}

function variantA(row) {
  var subjects = [
    'Your ' + row.business + ' website has a problem',
    'Quick fix for ' + row.business
  ];
  var subject = subjects[Math.floor(Math.random() * subjects.length)];
  var preview = row.preview_url || 'https://raglandigital.com/launch';
  var body = [
    'Hi ' + (row.contact_name || 'there') + ',',
    '',
    'Zadig here — I just started Raglan Digital and I\'m building my first NZ client book.',
    '',
    'Noticed something about ' + row.business + ': ' + row.specific_hook + '.',
    '',
    'I put together a free mockup of a fixed version so you can see exactly what I mean:',
    '→ ' + preview,
    '',
    'If you like it, I\'ll build and ship the real thing for $399 NZD — launch pricing for my first 5 paying clients in NZ. No payment until you\'re happy with the final site.',
    '',
    'If not, no pressure. Just reply STOP and I won\'t contact you again.',
    '',
    'Cheers,',
    'Zadig',
    SIGNATURE
  ].join('\n');
  return { subject: subject, body: body };
}

function variantB(row) {
  var subject = 'Quick question about ' + row.business + ' on Google';
  var body = [
    'Hi ' + (row.contact_name || 'there') + ',',
    '',
    'Zadig here, founder of Raglan Digital. New in NZ, building my first paying client book.',
    '',
    'Quick question: when people google "' + row.business + ' ' + (row.city || 'NZ') + '", do they find your menu / prices / photos, or do they end up on Facebook / Instagram / nowhere?',
    '',
    'I ask because I spotted ' + row.specific_hook + '.',
    '',
    'I\'m building 5 launch-priced websites right now at $399 NZD — custom, mobile-first, yours forever. If you\'d like, I can send a free mockup so you can see what yours could look like. No commitment, no payment until delivery.',
    '',
    'Reply "mockup" if curious. Reply STOP to never hear from me again.',
    '',
    'Cheers,',
    'Zadig',
    SIGNATURE
  ].join('\n');
  return { subject: subject, body: body };
}

function variantC(row) {
  var category = row.category || 'small business';
  var subject = 'Loved the ' + category + ' work at ' + row.business;
  var preview = row.preview_url || 'https://raglandigital.com/launch';
  var body = [
    'Hi ' + (row.contact_name || 'there') + ',',
    '',
    'Zadig here — I run Raglan Digital and I\'ve been looking at ' + category + 's around ' + (row.city || 'NZ') + ' for inspiration.',
    '',
    'Your ' + row.business + ' caught my eye. Honestly good ' + category + ' work.',
    '',
    'One thing though — ' + row.specific_hook + '. That\'s hurting you more than you think, because Google and new customers see that before they see the good stuff.',
    '',
    'I\'m opening 5 launch-priced spots at $399 NZD for a custom website. First 5 paying NZ clients only. Here\'s what it could look like for you:',
    '→ ' + preview,
    '',
    'Want to chat? Just reply. Not interested? Reply STOP.',
    '',
    'Cheers,',
    'Zadig',
    SIGNATURE
  ].join('\n');
  return { subject: subject, body: body };
}

/**
 * Follow-up 1 — J+4 after first send.
 * Sent as reply to original thread, so subject is 'Re: ...'.
 */
function getFollowUp1(row) {
  var body = [
    'Hi ' + (row.contact_name || 'there') + ',',
    '',
    'Quick nudge in case the first one got buried.',
    '',
    'Still 5 spots at $399 NZD. Still happy to send (or refine) a mockup for ' + row.business + ' — no payment until you love it.',
    '',
    'If it\'s not a fit, no worries — reply STOP and I\'ll stop.',
    '',
    'Zadig',
    SIGNATURE
  ].join('\n');
  return { body: body };
}

/**
 * Follow-up 2 — J+7 after follow-up 1. Last touch.
 */
function getFollowUp2(row) {
  var body = [
    'Hi ' + (row.contact_name || 'there') + ',',
    '',
    'Last note, promise.',
    '',
    'The $399 spots are filling — if you want one for ' + row.business + ', this is the moment. Otherwise I won\'t chase again.',
    '',
    'Reply "in" or STOP, either works.',
    '',
    'Zadig',
    SIGNATURE
  ].join('\n');
  return { body: body };
}
