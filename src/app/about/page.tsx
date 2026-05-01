"use client";

import Link from "next/link";
import { TextReveal } from "@/components/text-reveal";
import { ZagExpression } from "@/components/zag-expression";
import { Magnetic } from "@/components/magnetic";

export default function AboutPage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="px-6 pt-28 md:pt-40 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block relative group cursor-default mb-10">
            <ZagExpression
              defaultExpression="smile"
              hoverExpression="happy"
              size={140}
              className="shadow-xl"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-accent-500 text-white text-xs font-medium whitespace-nowrap shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available · Raglan, NZ
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Founder · Raglan Digital
          </p>
          <h1 className="text-display-xl">
            Hi, I&apos;m <span className="text-accent-500">Zadig.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            I build websites for NZ small businesses. Honest prices, no retainers, no lock-in.
          </p>
        </div>
      </section>

      {/* ═══ Story ═══ */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <TextReveal
            text="Studied audiovisual in France. Worked at a digital agency. Moved to Raglan. Started Raglan Digital."
            className="text-xl md:text-2xl font-medium leading-relaxed"
          />

          <div className="mt-10 space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              I noticed a pattern: NZ small businesses have great products but invisible websites — slow, dated, or stuck on Facebook only. Big agencies quote $5k+ and lock you into retainers. DIY tools leave you with a generic template.
            </p>
            <p>
              So I built a third option. Fixed-price launch sites at <strong className="text-[var(--foreground)]">$399</strong>, live between 5 and 10 days. Optional monthly Care or SEO Plans if you want me to keep the engine running. No retainer required, no contract, cancel anytime.
            </p>
            <p>
              You own everything: the site, the domain, the code. Always.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Principles ═══ */}
      <section className="px-6 py-20 bg-[var(--surface)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
              How I work
            </p>
            <h2 className="text-display-md">Four rules I won&apos;t break.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-7 rounded-3xl bg-[var(--background)] border border-[var(--border)]"
              >
                <p className="text-xs uppercase tracking-wider text-accent-500 font-semibold">
                  {p.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Do / Don't ═══ */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-4">
              What I do
            </p>
            <ul className="space-y-3 text-[15px]">
              {dos.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="text-accent-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] font-semibold mb-4">
              What I don&apos;t do
            </p>
            <ul className="space-y-3 text-[15px] text-[var(--muted)]">
              {donts.map((item) => (
                <li key={item} className="flex gap-3">
                  <Cross className="shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="px-6 py-28 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg">Ready when you are.</h2>
          <p className="mt-5 text-[var(--muted)] max-w-lg mx-auto">
            Pick the way that suits you — self-serve, conversation, or quick chat.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/launch"
                className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
              >
                Start my $399 launch site →
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="h-12 px-7 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Send a message
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://wa.me/33752032213"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] hover:border-[var(--foreground)]/30 transition-colors"
              >
                WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

const principles: Array<{ eyebrow: string; title: string; body: string }> = [
  {
    eyebrow: "Pricing",
    title: "Fixed prices, no surprises.",
    body: "You see the number before you commit. No hourly billing, no scope-creep invoices, no retainers required. The price you see is the price you pay.",
  },
  {
    eyebrow: "Ownership",
    title: "You own it all.",
    body: "The domain, the hosting, the code, the content. If you ever want to leave, you take everything with you. There&rsquo;s nothing to extract — it&rsquo;s already yours.",
  },
  {
    eyebrow: "Communication",
    title: "Real human, not a ticket queue.",
    body: "You email me, I reply. Within 24h on weekdays, often faster. No support portal, no dashboard, no ‘your request has been logged’.",
  },
  {
    eyebrow: "Focus",
    title: "Built for NZ small business.",
    body: "Not for unicorns, not for global e-commerce, not for SaaS startups. Local florists, tradies, cafes, therapists, B&Bs — the people who actually need a site that brings in calls.",
  },
];

const dos: string[] = [
  "Custom 1–7 page websites",
  "Mobile-first, fast on Google",
  "Local SEO + Google Business Profile",
  "Monthly care, edits, hosting",
  "Honest advice — even if it&rsquo;s not me you need",
];

const donts: string[] = [
  "$10k+ enterprise rebuilds",
  "Multi-month strategy decks",
  "Lock-in retainers or contracts",
  "Crypto / NFT / gambling sites",
  "Promises I can&rsquo;t keep",
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
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

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
