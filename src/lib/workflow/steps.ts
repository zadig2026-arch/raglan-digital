import { Resend } from "resend";
import { FatalError } from "workflow";
import { sql } from "@/lib/db";
import { renderTemplate, type TemplateKey } from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadRow {
  id: string;
  email: string;
  name: string | null;
  business: string | null;
  status: string;
}

export async function sendSequenceEmail(args: {
  leadId: string;
  template: TemplateKey;
  sequence: string;
}): Promise<{ skipped?: true; messageId?: string }> {
  "use step";

  const rows = (await sql`
    SELECT id, email, name, business, status
      FROM leads
     WHERE id = ${args.leadId}
     LIMIT 1
  `) as LeadRow[];
  const lead = rows[0];

  if (!lead) {
    throw new FatalError(`Lead ${args.leadId} not found`);
  }

  if (lead.status === "unsubscribed") {
    await sql`
      INSERT INTO lead_events (lead_id, event, payload)
      VALUES (${lead.id}, ${"sequence_email_skipped"}, ${JSON.stringify({
        template: args.template,
        sequence: args.sequence,
        reason: "unsubscribed",
      })}::jsonb)
    `;
    return { skipped: true };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn(
      `sendSequenceEmail: RESEND_API_KEY missing, skipping ${args.template} for ${lead.email}`,
    );
    return { skipped: true };
  }

  const { subject, html } = renderTemplate(args.template, {
    name: lead.name ?? undefined,
    business: lead.business ?? undefined,
  });

  let messageId: string | undefined;
  try {
    const result = await resend.emails.send({
      from: "Zadig at Raglan Digital <noreply@raglandigital.com>",
      to: [lead.email],
      replyTo: "zadig@raglandigital.com",
      subject,
      html,
    });
    messageId = result.data?.id;
  } catch (err) {
    console.error(`sendSequenceEmail Resend failure for ${args.template}:`, err);
    throw err;
  }

  await sql`
    INSERT INTO lead_events (lead_id, event, payload)
    VALUES (${lead.id}, ${"sequence_email_sent"}, ${JSON.stringify({
      template: args.template,
      sequence: args.sequence,
      message_id: messageId ?? null,
    })}::jsonb)
  `;

  return { messageId };
}
