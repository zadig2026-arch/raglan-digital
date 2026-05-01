import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clients & case studies — NZ small businesses we've helped",
  description:
    "Real NZ small businesses with sites built by Raglan Digital — Raglan, Hamilton, and beyond. Preview live mockups and see what worked.",
  alternates: { canonical: "https://raglandigital.com/clients" },
};

interface CaseStudy {
  slug: string;
  business: string;
  city: string;
  industry: string;
  outcome: string;
  testimonial?: string;
  testimonialAuthor?: string;
  previewSlug?: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "flow-wellness",
    business: "Flow Wellness",
    city: "Raglan",
    industry: "Wellness studio",
    outcome:
      "Booked solid the week the new site went live. Now on a monthly SEO Plan to keep the calendar full.",
    testimonial:
      "Booked solid the week the site went live. Worth every cent.",
    testimonialAuthor: "Sara, Owner",
  },
  {
    slug: "park-house",
    business: "Park House",
    city: "Raglan",
    industry: "Hospitality",
    outcome:
      "Mobile bounce rate dropped, customers actually stay on the page and book direct instead of via third-party platforms.",
    testimonial:
      "Finally a site that loads on a phone without making me wait. Customers actually stay now.",
    testimonialAuthor: "Mark, Founder",
    previewSlug: "park-house",
  },
  {
    slug: "adaia-flora",
    business: "Adaia Flora",
    city: "Hamilton",
    industry: "Florist",
    outcome:
      "Clean rebuild from a broken Wix site. Direct enquiries by week 2 — site is now her main inbound channel.",
    testimonial:
      "Zadig listened. Built it in a week. Easy to update myself afterwards.",
    testimonialAuthor: "Rachel, Director",
    previewSlug: "adaia-flora",
  },
  {
    slug: "pied-potter",
    business: "Pied Potter",
    city: "Whaingaroa",
    industry: "Artisan / Maker",
    outcome:
      "From Instagram-only to a clean storefront with online enquiry form. Now featured in local press.",
    previewSlug: "pied-potter",
  },
  {
    slug: "rua-resort",
    business: "Rua Resort",
    city: "Coromandel",
    industry: "Tourism",
    outcome:
      "Premium-feel site with direct booking enquiries replacing fragmented Airbnb-only flow.",
    previewSlug: "rua-resort",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://raglandigital.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Clients",
      item: "https://raglandigital.com/clients",
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudies.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${c.business} — ${c.industry}`,
    description: c.outcome,
  })),
};

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, itemListSchema]),
        }}
      />

      <section className="px-6 pt-28 md:pt-40 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Case studies
          </p>
          <h1 className="text-display-xl">
            Real NZ businesses, <span className="text-accent-500">real outcomes.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Every site below was built around a clear business goal — more
            bookings, more visibility, less friction. Click any to see the
            actual page.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto grid gap-5 md:grid-cols-2">
          {caseStudies.map((c) => (
            <CaseCard key={c.slug} study={c} />
          ))}
        </div>
      </section>

      <section className="px-6 py-24 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-md md:text-display-lg">
            Want yours next?
          </h2>
          <p className="mt-5 text-[var(--muted)] max-w-lg mx-auto">
            5 launch sites at $399 NZD each month. Honest, no fake discount.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/launch"
              className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
            >
              Start my $399 launch site →
            </Link>
            <Link
              href="/contact"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              Send a message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CaseCard({ study }: { study: CaseStudy }) {
  const card = (
    <article className="group p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/40 transition-colors h-full flex flex-col">
      <p className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold">
        {study.industry} · {study.city}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">
        {study.business}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed flex-1">{study.outcome}</p>

      {study.testimonial && (
        <figure className="mt-6 pt-6 border-t border-[var(--border)]">
          <blockquote className="text-sm italic text-[var(--muted)] leading-relaxed">
            &ldquo;{study.testimonial}&rdquo;
          </blockquote>
          {study.testimonialAuthor && (
            <figcaption className="mt-2 text-xs text-[var(--muted)]">
              — {study.testimonialAuthor}
            </figcaption>
          )}
        </figure>
      )}

      {study.previewSlug && (
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all">
          See live preview <span aria-hidden="true">→</span>
        </span>
      )}
    </article>
  );

  if (study.previewSlug) {
    return (
      <Link href={`/preview/${study.previewSlug}`} className="block h-full">
        {card}
      </Link>
    );
  }
  return <div className="h-full">{card}</div>;
}
