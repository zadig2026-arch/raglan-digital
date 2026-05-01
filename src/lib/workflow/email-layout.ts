export interface EmailLayoutArgs {
  preheader?: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  ctaHref?: string;
  ctaLabel?: string;
  signoff?: string;
}

export function emailLayout({
  preheader,
  eyebrow,
  title,
  bodyHtml,
  ctaHref,
  ctaLabel,
  signoff = "— Zadig",
}: EmailLayoutArgs): string {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escape(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f0e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a18;">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;color:transparent;">${escape(preheader)}</div>` : ""}
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#3b82f6;font-weight:600;">${escape(eyebrow)}</div>
      <h1 style="font-size:26px;font-weight:700;letter-spacing:-0.02em;margin:8px 0 0;line-height:1.25;">${escape(title)}</h1>
      <div style="font-size:15px;color:#1a1a18;line-height:1.65;margin:24px 0 0;">${bodyHtml}</div>
      ${
        ctaHref && ctaLabel
          ? `<div style="margin-top:28px;"><a href="${ctaHref}" style="display:inline-block;height:42px;padding:0 22px;line-height:42px;background:#3b82f6;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;">${escape(ctaLabel)}</a></div>`
          : ""
      }
      <p style="font-size:15px;color:#1a1a18;margin:32px 0 0;line-height:1.6;">${escape(signoff)}</p>
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #ddd8cc;font-size:12px;color:#6b7280;line-height:1.6;">
        <p style="margin:0;">Zadig · Raglan Digital · Raglan, New Zealand</p>
        <p style="margin:8px 0 0;">Reply directly: <a href="mailto:zadig@raglandigital.com" style="color:#3b82f6;">zadig@raglandigital.com</a></p>
        <p style="margin:8px 0 0;">Reply &ldquo;unsubscribe&rdquo; if you don&rsquo;t want any more emails.</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

export function escape(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function utm(path: string, sequence: string, step: string): string {
  return `https://raglandigital.com${path}?utm_source=email&utm_medium=nurture&utm_campaign=${sequence}&utm_content=${step}`;
}
