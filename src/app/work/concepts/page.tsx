import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Concept work — sector demos",
  description:
    "Mockups built to show small businesses what their site could look like. Concept demonstrations by sector — not commissioned client projects.",
  alternates: { canonical: "https://raglandigital.com/work/concepts" },
};

interface Concept {
  slug: string;
  title: string;
  sector: string;
  city?: string;
  href: string;
  description: string;
}

const concepts: Concept[] = [
  {
    slug: "ms-sewing-station",
    title: "MS Sewing Station",
    sector: "Tailoring & alterations",
    city: "Auckland",
    href: "/preview/ms-sewing-station",
    description: "Bespoke alterations service — forest green & blush identity, four-service focus.",
  },
  {
    slug: "park-house",
    title: "Park House",
    sector: "Boutique B&B",
    city: "Cambridge",
    href: "/preview/park-house",
    description: "A 1928 character home opposite Victoria Park — three rooms, slow mornings.",
  },
  {
    slug: "rua-resort",
    title: "Rua Resort",
    sector: "Boutique B&B",
    city: "Hamilton outskirts",
    href: "/preview/rua-resort",
    description: "Country views and free-range breakfasts on a quiet hill near Mt Pirongia.",
  },
  {
    slug: "adaia-flora",
    title: "Adaia Flora",
    sector: "Florist",
    city: "Hamilton",
    href: "/preview/adaia-flora",
    description: "Studio florist working with seasonal blooms — weddings, weekly, one-offs.",
  },
  {
    slug: "pied-potter",
    title: "The Pied Potter",
    sector: "Ceramics studio",
    city: "Cambridge",
    href: "/preview/pied-potter",
    description: "Handbuilt ceramics and pottery parties — get your hands in the clay.",
  },
  {
    slug: "gails-floral",
    title: "Gail's Floral Studio",
    sector: "Florist",
    city: "Hamilton",
    href: "/preview/gails-floral",
    description: "Hamilton's florist since 1965 — three generations, weddings, sympathy.",
  },
  {
    slug: "balance-me",
    title: "Balance Me",
    sector: "Wellness studio",
    href: "/preview/balance-me",
    description: "Mindfulness and massage bookings — service cards, testimonials.",
  },
  {
    slug: "lifted-pilates",
    title: "Lifted Pilates",
    sector: "Pilates studio",
    href: "/preview/lifted-pilates",
    description: "Class scheduling, instructor bios, transformation stories.",
  },
  {
    slug: "motionplus-osteo",
    title: "MotionPlus Osteo",
    sector: "Osteopathy clinic",
    href: "/preview/motionplus-osteo",
    description: "Treatment explanations and booking for an osteopathy practice.",
  },
  {
    slug: "harper-inc",
    title: "Harper Inc",
    sector: "Fashion retail",
    href: "/preview/harper-inc",
    description: "Minimalist clothing brand portfolio with shop integration.",
  },
  {
    slug: "wild-river",
    title: "Wild River and Co",
    sector: "Lifestyle brand",
    href: "/preview/wild-river",
    description: "Outdoor-leaning lifestyle brand — earthy palette, slow scroll.",
  },
];

export default function ConceptsPage() {
  return (
    <>
      <section className="px-6 pt-28 md:pt-40 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.25em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6"
          >
            <span aria-hidden="true">←</span> Selected work
          </Link>
          <h1 className="text-display-xl">Concept work.</h1>
          <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
            These are mockups built to show small businesses what their site could look like.
            <strong className="text-[var(--foreground)] font-medium"> Not commissioned client projects — concept demonstrations by sector.</strong>
            {" "}Useful if you&apos;re in a similar trade and want to picture the result.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="group p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/40 transition-colors flex flex-col"
            >
              <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">
                {c.sector}{c.city ? ` · ${c.city}` : ""}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{c.title}</h2>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed flex-1">
                {c.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all">
                See the preview <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
