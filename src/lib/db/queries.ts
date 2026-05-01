import { sql } from '../db';
import type { LeadSource, LeadStatus } from '../lead-score';

export interface LeadRow {
  id: string;
  email: string;
  name: string | null;
  business: string | null;
  city: string | null;
  current_website: string | null;
  phone: string | null;
  source: LeadSource;
  source_detail: Record<string, unknown>;
  utm: Record<string, string>;
  referrer: string | null;
  first_seen_at: string;
  last_seen_at: string;
  status: LeadStatus;
  score: number;
  consent_marketing: boolean;
  notes: string | null;
}

export interface UpsertLeadInput {
  email: string;
  name?: string | null;
  business?: string | null;
  city?: string | null;
  current_website?: string | null;
  phone?: string | null;
  source: LeadSource;
  source_detail?: Record<string, unknown>;
  utm?: Record<string, string>;
  referrer?: string | null;
  consent_marketing?: boolean;
}

export async function upsertLead(input: UpsertLeadInput): Promise<LeadRow> {
  const rows = (await sql`
    INSERT INTO leads (
      email, name, business, city, current_website, phone,
      source, source_detail, utm, referrer, consent_marketing
    ) VALUES (
      ${input.email},
      ${input.name ?? null},
      ${input.business ?? null},
      ${input.city ?? null},
      ${input.current_website ?? null},
      ${input.phone ?? null},
      ${input.source},
      ${JSON.stringify(input.source_detail ?? {})}::jsonb,
      ${JSON.stringify(input.utm ?? {})}::jsonb,
      ${input.referrer ?? null},
      ${input.consent_marketing ?? false}
    )
    ON CONFLICT (email) DO UPDATE SET
      name             = COALESCE(EXCLUDED.name,             leads.name),
      business         = COALESCE(EXCLUDED.business,         leads.business),
      city             = COALESCE(EXCLUDED.city,             leads.city),
      current_website  = COALESCE(EXCLUDED.current_website,  leads.current_website),
      phone            = COALESCE(EXCLUDED.phone,            leads.phone),
      source_detail    = leads.source_detail || EXCLUDED.source_detail,
      utm              = CASE WHEN leads.utm = '{}'::jsonb THEN EXCLUDED.utm ELSE leads.utm END,
      referrer         = COALESCE(leads.referrer, EXCLUDED.referrer),
      consent_marketing = leads.consent_marketing OR EXCLUDED.consent_marketing,
      last_seen_at     = now()
    RETURNING *
  `) as LeadRow[];
  return rows[0];
}

export async function updateLeadScore(
  leadId: string,
  score: number,
  status: LeadStatus,
): Promise<void> {
  await sql`
    UPDATE leads
       SET score = ${score},
           status = ${status},
           last_seen_at = now()
     WHERE id = ${leadId}
  `;
}

export async function insertLeadEvent(
  leadId: string,
  event: string,
  payload: Record<string, unknown> = {},
): Promise<void> {
  await sql`
    INSERT INTO lead_events (lead_id, event, payload)
    VALUES (${leadId}, ${event}, ${JSON.stringify(payload)}::jsonb)
  `;
}

export async function getRecentLeadEvents(
  leadId: string,
  limit = 50,
): Promise<Array<{ event: string; payload: Record<string, unknown>; created_at: string }>> {
  const rows = (await sql`
    SELECT event, payload, created_at
      FROM lead_events
     WHERE lead_id = ${leadId}
     ORDER BY created_at DESC
     LIMIT ${limit}
  `) as Array<{ event: string; payload: Record<string, unknown>; created_at: string }>;
  return rows;
}

export async function getLaunchSpotsLeft(): Promise<number> {
  const rows = (await sql`
    SELECT (total_spots - spots_taken) AS left
      FROM launch_spots
     WHERE year  = EXTRACT(YEAR  FROM now())::int
       AND month = EXTRACT(MONTH FROM now())::int
  `) as Array<{ left: number }>;
  return rows[0]?.left ?? 0;
}

export async function incrementLaunchSpotsTaken(): Promise<void> {
  await sql`
    UPDATE launch_spots
       SET spots_taken = spots_taken + 1
     WHERE year  = EXTRACT(YEAR  FROM now())::int
       AND month = EXTRACT(MONTH FROM now())::int
       AND spots_taken < total_spots
  `;
}

export async function startOrResumeSequence(
  leadId: string,
  sequence: 'welcome-tools' | 'nurture-quiz' | 'post-discovery' | 'post-launch-care',
): Promise<void> {
  await sql`
    INSERT INTO sequences_state (lead_id, sequence, step, next_send_at)
    VALUES (${leadId}, ${sequence}, 0, now())
    ON CONFLICT (lead_id, sequence) DO UPDATE SET
      paused_at = NULL,
      next_send_at = COALESCE(sequences_state.next_send_at, now())
  `;
}

export async function pauseSequence(
  leadId: string,
  sequence: string,
): Promise<void> {
  await sql`
    UPDATE sequences_state
       SET paused_at = now()
     WHERE lead_id = ${leadId} AND sequence = ${sequence}
  `;
}
