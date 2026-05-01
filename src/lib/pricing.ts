export type PlanId =
  | 'roast-49'
  | 'launch-399'
  | 'growth-1490'
  | 'care-129'
  | 'seo-349'
  | 'social-590';

export type PlanInterval = 'one-time' | 'monthly';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  priceNzd: number;
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
  'launch-399': {
    id: 'launch-399',
    name: 'Launch Site',
    tagline: 'A clean, fast, mobile-first site live in 5–10 days',
    priceNzd: 399,
    interval: 'one-time',
    features: [
      '1–3 page custom website',
      'Mobile-first, fast on Google',
      'On-page SEO basics + sitemap',
      'Live in 5–10 days, fixed price',
      '50% deposit / 50% on launch',
    ],
    ctaLabel: 'Start my launch site',
    stripeEnvVar: 'STRIPE_LINK_LAUNCH_399',
    badge: 'Most popular',
  },
  'growth-1490': {
    id: 'growth-1490',
    name: 'Growth Site',
    tagline: 'For when you need more pages, more polish, more support',
    priceNzd: 1490,
    interval: 'one-time',
    features: [
      '5–7 page custom site',
      'Google Business Profile setup',
      '30 days post-launch support',
      'Copywriting included',
      'Custom illustrations or photo direction',
    ],
    ctaLabel: 'Talk about Growth',
    stripeEnvVar: 'STRIPE_LINK_GROWTH_1490',
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
    tagline: 'Get found on Google — local SEO done monthly',
    priceNzd: 349,
    interval: 'monthly',
    features: [
      'Google Business Profile management',
      'Local keyword targeting',
      'Monthly fix list + report',
      'On-page optimization',
      'Review reply assistance',
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

export const homepagePricingTiers: PlanId[] = ['launch-399', 'growth-1490', 'care-129'];
export const fullPricingTiers: PlanId[] = [
  'roast-49',
  'launch-399',
  'growth-1490',
  'care-129',
  'seo-349',
  'social-590',
];

export function getPlan(id: PlanId): Plan {
  return plans[id];
}

export function formatPriceNzd(plan: Plan): string {
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
