import Link from 'next/link';
import { Suspense } from 'react';
import {
  homepagePricingTiers,
  fullPricingTiers,
  getPlan,
  formatPriceNzd,
  getStripeLink,
  type Plan,
  type PlanId,
} from '@/lib/pricing';
import { SpotsCounter } from './spots-counter';

export interface PricingBlockProps {
  variant?: 'homepage' | 'full';
  heading?: string;
  subheading?: string;
  className?: string;
}

export function PricingBlock({
  variant = 'homepage',
  heading = 'Simple pricing.',
  subheading = 'Fixed prices. No retainers required. Cancel monthly plans anytime.',
  className = '',
}: PricingBlockProps) {
  const tiers = variant === 'homepage' ? homepagePricingTiers : fullPricingTiers;

  return (
    <section className={`px-6 py-24 md:py-32 ${className}`} aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Pricing
          </p>
          <h2 id="pricing-heading" className="text-display-md md:text-display-lg">
            {heading}
          </h2>
          <p className="mt-5 text-[var(--muted)]">{subheading}</p>
        </div>

        <div
          className={`mt-16 grid gap-6 ${
            variant === 'homepage'
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {tiers.map((id) => (
            <PricingCard key={id} planId={id} />
          ))}
        </div>

        {variant === 'homepage' && (
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            Looking for a 60-min site roast at $49, or recurring SEO/social?{' '}
            <Link
              href="/services"
              className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
            >
              See all plans →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

function PricingCard({ planId }: { planId: PlanId }) {
  const plan = getPlan(planId);
  const featured = plan.id === 'launch-399';
  const stripeLink = getStripeLink(plan);
  const href = stripeLink ?? fallbackHref(plan);
  const external = Boolean(stripeLink);

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-8 transition-all ${
        featured
          ? 'bg-[var(--foreground)] text-[var(--background)] shadow-2xl scale-[1.02]'
          : 'bg-[var(--surface)] border border-[var(--border)]'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex h-7 px-3 items-center rounded-full bg-accent-500 text-white text-xs font-semibold">
          {plan.badge}
        </span>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
        <p
          className={`mt-2 text-sm ${
            featured ? 'text-[var(--background)]/70' : 'text-[var(--muted)]'
          }`}
        >
          {plan.tagline}
        </p>

        <div className="mt-8 flex items-baseline gap-1">
          <span className="text-5xl font-bold tracking-tight">
            {formatPriceNzd(plan).split('/')[0]}
          </span>
          {plan.interval === 'monthly' && (
            <span
              className={`text-sm ${
                featured ? 'text-[var(--background)]/70' : 'text-[var(--muted)]'
              }`}
            >
              /mo
            </span>
          )}
        </div>
        <p
          className={`mt-1 text-xs ${
            featured ? 'text-[var(--background)]/60' : 'text-[var(--muted)]'
          }`}
        >
          NZD · {plan.interval === 'monthly' ? 'Billed monthly' : 'One-time'}
        </p>

        {plan.id === 'launch-399' && (
          <div className="mt-4">
            <Suspense fallback={null}>
              <SpotsCounter
                variant="sentence"
                className={`text-xs ${
                  featured ? 'text-[var(--background)]/70' : 'text-[var(--muted)]'
                }`}
              />
            </Suspense>
          </div>
        )}

        <ul className="mt-8 space-y-3 text-sm">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <CheckIcon
                className={`shrink-0 mt-0.5 ${
                  featured ? 'text-accent-400' : 'text-accent-500'
                }`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={href}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        className={`mt-8 inline-flex h-12 px-6 items-center justify-center rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${
          featured
            ? 'bg-accent-500 text-white'
            : 'bg-[var(--foreground)] text-[var(--background)]'
        }`}
      >
        {plan.ctaLabel}
      </a>

      {plan.guarantee && (
        <p
          className={`mt-3 text-center text-xs ${
            featured ? 'text-[var(--background)]/60' : 'text-[var(--muted)]'
          }`}
        >
          {plan.guarantee}
        </p>
      )}
    </div>
  );
}

function fallbackHref(plan: Plan): string {
  switch (plan.id) {
    case 'launch-399':
      return '/launch';
    case 'roast-49':
    case 'growth-1490':
    case 'care-129':
    case 'seo-349':
    case 'social-590':
      return '/contact';
  }
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
