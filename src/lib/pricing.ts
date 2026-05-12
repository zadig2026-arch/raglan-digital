export type PlanId =
  | 'roast-49'
  | 'studio-from-1250'
  | 'care-129'
  | 'seo-349'
  | 'social-590';

export type PlanInterval = 'one-time' | 'monthly';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  priceNzd: number;
  priceLabel?: string;
  interval: PlanInterval;
  features: string[];
  ctaLabel: string;
  stripeEnvVar: string;
  badge?: string;
  guarantee?: string;
}

export const plans: Record<PlanId, Plan> = {
  'roast-49': {
    id: 'roast-49',
    name: 'Site Roast',
    tagline: '15-min Loom audit + 1-page action plan, delivered in 48h',
    priceNzd: 49,
    interval: 'one-time',
    features: [
      '15-min screen-recorded review of your current site',
      'Top 5 fixes ranked by impact',
      'One-page action plan PDF',
      'Delivered within 48 hours',
    ],
    ctaLabel: 'Get my roast — $49',
    stripeEnvVar: 'STRIPE_LINK_ROAST_49',
    guarantee: '100% money-back if it doesn\'t help.',
  },
  'studio-from-1250': {
    id: 'studio-from-1250',
    name: 'Studio project',
    tagline: 'A bespoke site, scoped around what you need — from one-page essentials to multi-page builds.',
    priceNzd: 1250,
    priceLabel: 'From $1,250',
    interval: 'one-time',
    features: [
      'Custom design — not a template',
      'Built on Next.js, hosted on Vercel',
      'A self-serve CMS so you stay in control',
      'Mobile-first, fast on Google, real SEO foundations',
      '30 days of post-launch support included',
      'No retainer required, no lock-in — you own it all',
    ],
    ctaLabel: 'Tell me about your project',
    stripeEnvVar: 'STRIPE_LINK_STUDIO_FROM_1250',
    badge: 'Bespoke',
  },
  'care-129': {
    id: 'care-129',
    name: 'Care Plan',
    tagline: 'Hosting, edits, backups & uptime — handled',
    priceNzd: 129,
    interval: 'monthly',
    features: [
      'Hosting + SSL on Vercel',
      'Up to 2 hours of edits / month',
      'Daily backups, 30-day retention',
      'Uptime monitoring + first response',
      'Cancel anytime',
    ],
    ctaLabel: 'Add Care Plan',
    stripeEnvVar: 'STRIPE_LINK_CARE_129',
  },
  'seo-349': {
    id: 'seo-349',
    name: 'SEO Plan',
    tagline: 'Audit, Google Business Profile, monthly content & tracking — the real working SEO stack',
    priceNzd: 349,
    interval: 'monthly',
    features: [
      'Initial audit + technical fixes',
      'Google Business Profile management',
      'Local keyword targeting',
      'Monthly content piece targeting search intent',
      'Monthly fix list + report on what changed',
      'Cancel anytime, no contract',
    ],
    ctaLabel: 'Start SEO Plan',
    stripeEnvVar: 'STRIPE_LINK_SEO_349',
  },
  'social-590': {
    id: 'social-590',
    name: 'Social Plan',
    tagline: 'Stay top of mind on Instagram & Facebook',
    priceNzd: 590,
    interval: 'monthly',
    features: [
      '12 feed posts / month',
      '4 reels / month',
      'Google Business posts',
      'Story templates',
      'Monthly performance review',
    ],
    ctaLabel: 'Start Social Plan',
    stripeEnvVar: 'STRIPE_LINK_SOCIAL_590',
  },
};

export const homepagePricingTiers: PlanId[] = ['studio-from-1250', 'seo-349', 'care-129'];
export const fullPricingTiers: PlanId[] = [
  'roast-49',
  'studio-from-1250',
  'care-129',
  'seo-349',
  'social-590',
];

export function getPlan(id: PlanId): Plan {
  return plans[id];
}

export function formatPriceNzd(plan: Plan): string {
  if (plan.priceLabel) return plan.priceLabel;
  const formatted = new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(plan.priceNzd);
  return plan.interval === 'monthly' ? `${formatted}/mo` : formatted;
}

export function getStripeLink(plan: Plan): string | null {
  const url = process.env[plan.stripeEnvVar];
  return url && url.startsWith('https://') ? url : null;
}
