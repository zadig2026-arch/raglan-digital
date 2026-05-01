export type LeadSource =
  | 'tool-seo-audit'
  | 'tool-speed-checker'
  | 'tool-digital-checklist'
  | 'tool-meta-generator'
  | 'quiz-website'
  | 'quiz-seo'
  | 'quiz-ads'
  | 'quiz-help'
  | 'cold-outreach'
  | 'organic'
  | 'meta-ad'
  | 'google-ad'
  | 'launch-page'
  | 'contact-form'
  | 'free-website-form'
  | 'newsletter'
  | 'exit-intent'
  | 'unknown';

export type LeadStatus =
  | 'new'
  | 'nurturing'
  | 'qualified'
  | 'hot'
  | 'booked'
  | 'won'
  | 'lost'
  | 'unsubscribed';

export interface ScoreInput {
  email?: string | null;
  business?: string | null;
  city?: string | null;
  phone?: string | null;
  source?: LeadSource;
  sourceDetail?: {
    quiz_urgency?: string;
    tool_score?: number;
    [k: string]: unknown;
  };
  events?: ReadonlyArray<{ event: string; payload?: Record<string, unknown> }>;
}

const FREEMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.co.nz',
  'outlook.com',
  'live.com',
  'yahoo.com',
  'yahoo.co.nz',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'pm.me',
  'aol.com',
  'xtra.co.nz',
]);

const NZ_CITIES = new Set([
  'auckland',
  'wellington',
  'christchurch',
  'hamilton',
  'tauranga',
  'napier',
  'hastings',
  'dunedin',
  'palmerston north',
  'nelson',
  'rotorua',
  'whangarei',
  'invercargill',
  'whanganui',
  'gisborne',
  'queenstown',
  'taupo',
  'cambridge',
  'raglan',
  'whakatane',
  'masterton',
  'levin',
  'oamaru',
  'pukekohe',
  'timaru',
  'blenheim',
  'ashburton',
  'tokoroa',
  'feilding',
  'havelock north',
  'paraparaumu',
  'porirua',
  'lower hutt',
  'upper hutt',
  'new plymouth',
]);

function emailIsBusiness(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase();
  return !FREEMAIL_DOMAINS.has(domain);
}

function cityIsNZ(city: string): boolean {
  const c = city.trim().toLowerCase();
  if (!c) return false;
  if (NZ_CITIES.has(c)) return true;
  return /\b(nz|new zealand|aotearoa)\b/i.test(city);
}

export function computeLeadScore(input: ScoreInput): number {
  let score = 0;

  if (input.email && emailIsBusiness(input.email)) score += 10;
  if (input.business && input.business.trim().length > 1) score += 5;
  if (input.city && cityIsNZ(input.city)) score += 10;
  if (input.phone && input.phone.replace(/\D/g, '').length >= 8) score += 20;

  const urgency = input.sourceDetail?.quiz_urgency;
  if (urgency === 'asap' || urgency === 'month') score += 20;

  const toolScore = input.sourceDetail?.tool_score;
  if (typeof toolScore === 'number' && toolScore < 50) score += 15;

  if (input.source === 'cold-outreach') score += 10;

  const events = input.events ?? [];
  const eventNames = events.map((e) => e.event);

  if (eventNames.includes('launch_apply_started') || eventNames.includes('launch_apply_submitted')) {
    score += 15;
  }

  const servicesViews = eventNames.filter((e) => e === 'services_viewed').length;
  if (servicesViews >= 2) score += 10;

  if (eventNames.includes('discovery_call_booked')) score += 30;
  if (eventNames.includes('email_clicked')) score += 15;

  return Math.max(0, Math.min(100, score));
}

export function statusFromScore(score: number, currentStatus: LeadStatus): LeadStatus {
  if (currentStatus === 'won' || currentStatus === 'lost' || currentStatus === 'unsubscribed') {
    return currentStatus;
  }
  if (currentStatus === 'booked') return currentStatus;
  if (score >= 80) return 'hot';
  if (score >= 50) return 'qualified';
  if (currentStatus === 'new' && score > 0) return 'nurturing';
  return currentStatus;
}
