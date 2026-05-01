'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ToolReportPayload =
  | {
      kind: 'seo-audit';
      score: number;
      url: string;
      checks: Array<{
        label: string;
        status: 'pass' | 'warn' | 'fail';
        detail: string;
      }>;
    }
  | {
      kind: 'speed-checker';
      score: number;
      url: string;
      metrics: Array<{
        label: string;
        value: string;
        status: 'good' | 'ok' | 'poor';
        tip: string;
      }>;
    }
  | {
      kind: 'digital-checklist';
      percentage: number;
      total: number;
      completed: number;
      missing: Array<{ category: string; label: string }>;
    };

export async function sendToolReportEmail({
  email,
  name,
  payload,
}: {
  email: string;
  name?: string;
  payload: ToolReportPayload;
}): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('sendToolReportEmail: RESEND_API_KEY missing, skipping');
    return { ok: false, error: 'Email service not configured' };
  }

  const greeting = name ? `Hey ${escape(name)},` : 'Hey there,';
  const { subject, html } = renderReport(payload, greeting);

  try {
    await resend.emails.send({
      from: 'Zadig at Raglan Digital <noreply@raglandigital.com>',
      to: [email],
      replyTo: 'zadig@raglandigital.com',
      subject,
      html,
    });
    return { ok: true };
  } catch (err) {
    console.error('sendToolReportEmail failed:', err);
    return { ok: false, error: 'Could not send the email. Try again?' };
  }
}

function renderReport(
  payload: ToolReportPayload,
  greeting: string,
): { subject: string; html: string } {
  if (payload.kind === 'seo-audit') {
    const passes = payload.checks.filter((c) => c.status === 'pass').length;
    const fails = payload.checks.filter((c) => c.status === 'fail').length;
    return {
      subject: `Your SEO audit — ${payload.score}/100 (${payload.url})`,
      html: layout({
        title: `SEO audit · ${payload.score}/100`,
        greeting,
        intro: `Here's your full SEO audit for <strong>${escape(payload.url)}</strong>. You scored <strong>${payload.score}/100</strong> — ${passes} passed, ${fails} failed, ${payload.checks.length - passes - fails} need attention.`,
        sections: [
          {
            heading: 'Top 3 fixes I&rsquo;d tackle first',
            html: rankedFixesHtml(payload.checks.filter((c) => c.status !== 'pass').slice(0, 3)),
          },
          {
            heading: 'Full audit',
            html: payload.checks
              .map(
                (c) =>
                  `<tr>
                    <td style="padding:10px 12px;vertical-align:top;width:32px;">${statusEmoji(c.status)}</td>
                    <td style="padding:10px 12px;vertical-align:top;">
                      <div style="font-weight:600;font-size:14px;color:#1a1a18;">${escape(c.label)}</div>
                      <div style="font-size:13px;color:#55554f;margin-top:4px;line-height:1.5;">${escape(c.detail)}</div>
                    </td>
                  </tr>`,
              )
              .join(''),
            wrap: 'table',
          },
        ],
      }),
    };
  }

  if (payload.kind === 'speed-checker') {
    return {
      subject: `Your speed test — ${payload.score}/100 (${payload.url})`,
      html: layout({
        title: `Speed test · ${payload.score}/100`,
        greeting,
        intro: `Google PageSpeed scored <strong>${escape(payload.url)}</strong> at <strong>${payload.score}/100</strong> on mobile. Here&rsquo;s the breakdown.`,
        sections: [
          {
            heading: 'Core metrics',
            html: payload.metrics
              .map(
                (m) =>
                  `<tr>
                    <td style="padding:10px 12px;vertical-align:top;width:120px;">
                      <div style="font-weight:600;font-size:14px;color:#1a1a18;">${escape(m.label)}</div>
                      <div style="font-family:monospace;font-size:13px;color:${statusColor(m.status)};margin-top:2px;">${escape(m.value)}</div>
                    </td>
                    <td style="padding:10px 12px;vertical-align:top;font-size:13px;color:#55554f;line-height:1.5;">${escape(m.tip)}</td>
                  </tr>`,
              )
              .join(''),
            wrap: 'table',
          },
        ],
      }),
    };
  }

  // digital-checklist
  return {
    subject: `Your digital presence — ${payload.percentage}% complete`,
    html: layout({
      title: `Digital presence · ${payload.percentage}% complete`,
      greeting,
      intro: `You&rsquo;ve checked off <strong>${payload.completed} of ${payload.total}</strong> items in the digital presence checklist. Here&rsquo;s what&rsquo;s still missing — ranked.`,
      sections: [
        {
          heading: `${payload.missing.length} items still to tackle`,
          html: payload.missing.length
            ? payload.missing
                .map(
                  (m) =>
                    `<tr>
                      <td style="padding:10px 12px;vertical-align:top;">
                        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#3b82f6;font-weight:600;">${escape(m.category)}</div>
                        <div style="font-size:14px;color:#1a1a18;margin-top:4px;">${escape(m.label)}</div>
                      </td>
                    </tr>`,
                )
                .join('')
            : `<tr><td style="padding:14px;color:#55554f;font-size:14px;">Nothing missing — your digital presence is solid. 🎉</td></tr>`,
          wrap: 'table',
        },
      ],
    }),
  };
}

interface LayoutSection {
  heading: string;
  html: string;
  wrap?: 'table' | 'div';
}

function layout({
  title,
  greeting,
  intro,
  sections,
}: {
  title: string;
  greeting: string;
  intro: string;
  sections: LayoutSection[];
}): string {
  const sectionsHtml = sections
    .map((s) => {
      const inner =
        s.wrap === 'table'
          ? `<table style="width:100%;border-collapse:collapse;">${s.html}</table>`
          : s.html;
      return `
        <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.15em;color:#55554f;margin:32px 0 12px;font-weight:600;">${s.heading}</h3>
        <div style="background:#faf8f3;border:1px solid #ddd8cc;border-radius:14px;overflow:hidden;">${inner}</div>
      `;
    })
    .join('');

  return `
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a18;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#3b82f6;font-weight:600;">Raglan Digital</div>
      <h1 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;margin:8px 0 0;line-height:1.2;">${title}</h1>
      <p style="font-size:15px;color:#1a1a18;margin:24px 0 0;line-height:1.6;">${greeting}</p>
      <p style="font-size:15px;color:#55554f;margin:12px 0 0;line-height:1.6;">${intro}</p>

      ${sectionsHtml}

      <div style="margin-top:40px;padding:24px;background:#1a1a18;color:#fff;border-radius:14px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#60a5fa;font-weight:600;">Want me to fix this?</div>
        <h3 style="font-size:18px;font-weight:700;margin:8px 0 0;">Launch site — $399 NZD</h3>
        <p style="font-size:14px;color:#c4bfb4;margin:8px 0 16px;line-height:1.5;">A clean, fast, mobile-first site live in 5 to 10 days. Fixed price. No retainer.</p>
        <a href="https://raglandigital.com/launch?utm_source=tool-report&utm_medium=email" style="display:inline-block;height:42px;padding:0 20px;line-height:42px;background:#3b82f6;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;">See the launch offer →</a>
      </div>

      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #ddd8cc;font-size:12px;color:#6b7280;line-height:1.6;">
        <p style="margin:0;">Sent by Zadig · Raglan Digital · Raglan, New Zealand</p>
        <p style="margin:8px 0 0;">Reply to this email or message me directly: <a href="mailto:zadig@raglandigital.com" style="color:#3b82f6;">zadig@raglandigital.com</a></p>
        <p style="margin:8px 0 0;">You received this because you ran one of the free tools at raglandigital.com. Reply with &ldquo;unsubscribe&rdquo; if you don&rsquo;t want any more emails from me.</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

function rankedFixesHtml(
  fixes: Array<{ label: string; status: 'pass' | 'warn' | 'fail'; detail: string }>,
): string {
  if (!fixes.length) {
    return `<div style="padding:14px;color:#16a34a;font-size:14px;">Nothing to fix — your audit is clean. 🎉</div>`;
  }
  return (
    '<table style="width:100%;border-collapse:collapse;">' +
    fixes
      .map(
        (f, i) =>
          `<tr>
            <td style="padding:10px 12px;vertical-align:top;width:32px;">
              <div style="width:24px;height:24px;border-radius:999px;background:#3b82f6;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${i + 1}</div>
            </td>
            <td style="padding:10px 12px;vertical-align:top;">
              <div style="font-weight:600;font-size:14px;color:#1a1a18;">${escape(f.label)}</div>
              <div style="font-size:13px;color:#55554f;margin-top:4px;line-height:1.5;">${escape(f.detail)}</div>
            </td>
          </tr>`,
      )
      .join('') +
    '</table>'
  );
}

function statusEmoji(status: 'pass' | 'warn' | 'fail'): string {
  if (status === 'pass') return '<span style="color:#16a34a;font-size:18px;">✓</span>';
  if (status === 'warn') return '<span style="color:#3b82f6;font-size:18px;">!</span>';
  return '<span style="color:#dc2626;font-size:18px;">✕</span>';
}

function statusColor(status: 'good' | 'ok' | 'poor'): string {
  if (status === 'good') return '#16a34a';
  if (status === 'ok') return '#3b82f6';
  return '#dc2626';
}

function escape(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
