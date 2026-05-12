'use server';

import { cookies } from 'next/headers';
import { Resend } from 'resend';
import { start } from 'workflow/api';
import {
  upsertLead,
  updateLeadScore,
  insertLeadEvent,
  getRecentLeadEvents,
  startOrResumeSequence,
} from '@/lib/db/queries';
import {
  computeLeadScore,
  statusFromScore,
  type LeadSource,
} from '@/lib/lead-score';
import { ATTR_COOKIE, parseAttributionCookie } from '@/lib/attribution';
import { welcomeToolsWorkflow } from '@/lib/workflow/sequences/welcome-tools';
import { nurtureQuizWorkflow } from '@/lib/workflow/sequences/nurture-quiz';
import { studioBriefWorkflow } from '@/lib/workflow/sequences/studio-brief';
import { sql } from '@/lib/db';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCES_THAT_TRIGGER_NURTURE_QUIZ: LeadSource[] = [
  'quiz-website',
  'quiz-seo',
  'quiz-ads',
  'quiz-help',
];
const SOURCES_THAT_TRIGGER_WELCOME_TOOLS: LeadSource[] = [
  'tool-seo-audit',
  'tool-speed-checker',
  'tool-digital-checklist',
];
const SOURCES_THAT_TRIGGER_STUDIO_BRIEF: LeadSource[] = ['project-brief'];

export interface CaptureLeadInput {
  email: string;
  name?: string;
  business?: string;
  city?: string;
  current_website?: string;
  phone?: string;
  message?: string;
  source: LeadSource;
  source_detail?: Record<string, unknown>;
  consent_marketing?: boolean;
}

export interface CaptureLeadResult {
  ok: boolean;
  error?: string;
  redirectTo?: string;
  leadId?: string;
}

export async function captureLead(input: CaptureLeadInput): Promise<CaptureLeadResult> {
  if (!input.email || !EMAIL_RE.test(input.email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const attrCookie = (await cookies()).get(ATTR_COOKIE)?.value;
  const attribution = parseAttributionCookie(attrCookie);

  let lead;
  try {
    lead = await upsertLead({
      email: input.email.trim().toLowerCase(),
      name: input.name?.trim() || null,
      business: input.business?.trim() || null,
      city: input.city?.trim() || null,
      current_website: input.current_website?.trim() || null,
      phone: input.phone?.trim() || null,
      source: input.source,
      source_detail: input.source_detail,
      utm: (attribution?.utm as Record<string, string>) ?? {},
      referrer: attribution?.referrer ?? null,
      consent_marketing: input.consent_marketing ?? false,
    });
  } catch (err) {
    console.error('captureLead upsert failed:', err);
    return {
      ok: false,
      error: 'Something went wrong saving your details. Please try again.',
    };
  }

  await insertLeadEvent(lead.id, 'lead_captured', {
    source: input.source,
    has_message: Boolean(input.message),
    score_before: lead.score,
  });

  const events = await getRecentLeadEvents(lead.id, 100);
  const score = computeLeadScore({
    email: lead.email,
    business: lead.business,
    city: lead.city,
    phone: lead.phone,
    source: lead.source,
    sourceDetail: { ...lead.source_detail, ...(input.source_detail ?? {}) },
    events,
  });
  const status = statusFromScore(score, lead.status);
  await updateLeadScore(lead.id, score, status);

  if (SOURCES_THAT_TRIGGER_WELCOME_TOOLS.includes(input.source)) {
    await triggerSequenceOnce(lead.id, 'welcome-tools', () =>
      start(welcomeToolsWorkflow, [lead.id]),
    );
  } else if (SOURCES_THAT_TRIGGER_NURTURE_QUIZ.includes(input.source)) {
    await triggerSequenceOnce(lead.id, 'nurture-quiz', () =>
      start(nurtureQuizWorkflow, [lead.id]),
    );
  } else if (SOURCES_THAT_TRIGGER_STUDIO_BRIEF.includes(input.source)) {
    await triggerSequenceOnce(lead.id, 'studio-brief', () =>
      start(studioBriefWorkflow, [lead.id]),
    );
  }

  await sendInternalNotification({
    lead,
    score,
    status,
    message: input.message,
  });

  return {
    ok: true,
    leadId: lead.id,
    redirectTo: redirectForLead({ score, status, source: input.source }),
  };
}

function redirectForLead({
  score,
  source,
}: {
  score: number;
  status: string;
  source: LeadSource;
}): string | undefined {
  if (source === 'project-brief') return '/thanks/studio-brief';
  if (score >= 50 && source !== 'cold-outreach') return '/discover';
  if (source === 'launch-page' || source === 'free-website-form') return '/thanks/launch-applied';
  return undefined;
}

async function sendInternalNotification({
  lead,
  score,
  status,
  message,
}: {
  lead: { id: string; email: string; name: string | null; business: string | null; city: string | null; current_website: string | null; source: string };
  score: number;
  status: string;
  message?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const isHot = score >= 80;
  const subject = `${isHot ? '[HOT]' : '[Lead]'} ${lead.name ?? lead.email} — ${lead.business ?? lead.source} (${score})`;

  const html = `
    <h2>${isHot ? '🔥 Hot lead' : 'New lead'}</h2>
    <p><strong>Score:</strong> ${score} / 100 — <strong>Status:</strong> ${status}</p>
    <p><strong>Source:</strong> ${escapeHtml(lead.source)}</p>
    <p><strong>Name:</strong> ${escapeHtml(lead.name ?? '—')}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Business:</strong> ${escapeHtml(lead.business ?? '—')}</p>
    <p><strong>City:</strong> ${escapeHtml(lead.city ?? '—')}</p>
    <p><strong>Current site:</strong> ${escapeHtml(lead.current_website ?? '—')}</p>
    ${message ? `<hr/><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
  `;

  try {
    await resend.emails.send({
      from: 'Raglan Digital <noreply@raglandigital.com>',
      to: ['zadig@raglandigital.com'],
      replyTo: lead.email,
      subject,
      html,
    });
  } catch (err) {
    console.error('Resend internal notification failed:', err);
  }
}

async function triggerSequenceOnce(
  leadId: string,
  sequence: 'welcome-tools' | 'nurture-quiz' | 'studio-brief' | 'post-discovery' | 'post-launch-care',
  startWorkflow: () => Promise<{ runId: string }>,
): Promise<void> {
  const existing = (await sql`
    SELECT lead_id FROM sequences_state
     WHERE lead_id = ${leadId} AND sequence = ${sequence}
     LIMIT 1
  `) as Array<{ lead_id: string }>;
  if (existing.length > 0) return;

  try {
    const run = await startWorkflow();
    await startOrResumeSequence(leadId, sequence);
    await insertLeadEvent(leadId, 'sequence_started', {
      sequence,
      run_id: run.runId,
    });
  } catch (err) {
    console.error(`Failed to start workflow ${sequence} for lead ${leadId}:`, err);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
