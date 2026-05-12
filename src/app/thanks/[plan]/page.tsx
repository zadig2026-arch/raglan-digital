import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

interface ThanksContent {
  eyebrow: string;
  headline: string;
  body: string;
  nextSteps: string[];
  upsell?: {
    title: string;
    body: string;
    href: string;
    cta: string;
  };
}

const content: Record<string, ThanksContent> = {
  "roast-49": {
    eyebrow: "Site Roast — confirmed",
    headline: "Your roast is on its way.",
    body: "Within 48 hours you'll get a 15-min Loom video tearing through your site, plus a one-page action plan PDF. Reply to that email if you want to talk through any of it.",
    nextSteps: [
      "Watch for an email from zadig@raglandigital.com",
      "If it doesn't land in 48h, check spam — or message me directly",
      "100% money-back if it doesn't help",
    ],
    upsell: {
      title: "Already know you want a full rebuild?",
      body: "Skip the wait — tell me about your project and I'll come back with a scope and a price.",
      href: "/studio",
      cta: "Start a Studio project",
    },
  },
  "studio-brief": {
    eyebrow: "Brief received",
    headline: "Got it. Reading carefully.",
    body: "I read every brief personally. Within 48h on weekdays, you'll get an honest reply — yes, no, or a couple of questions to scope properly.",
    nextSteps: [
      "Watch your inbox for an email from zadig@raglandigital.com",
      "If your project is a fit, I'll send back a scope outline and a quote",
      "If it isn't, I'll point you to someone better suited",
    ],
  },
  "launch-applied": {
    eyebrow: "Application received",
    headline: "Got it. Reading now.",
    body: "I read every application personally. Within 24h on weekdays, you'll get an honest reply — yes, no, or 'let's chat first'.",
    nextSteps: [
      "Watch your inbox over the next 24h",
      "If qualified, I'll send a free mockup of your future site within a few days",
      "No payment until delivery, no upfront commitment",
    ],
  },
  "care-129": {
    eyebrow: "Care Plan — active",
    headline: "We&apos;ve got you.",
    body: "Hosting, SSL, backups, edits, and uptime monitoring are all live. Reply to any of my emails to request changes — I aim for 24h turnaround on weekdays.",
    nextSteps: [
      "Send your first edit request whenever you're ready",
      "Check your monthly summary email on the 1st",
      "Cancel anytime — no contract, no penalty",
    ],
  },
  "seo-349": {
    eyebrow: "SEO Plan — active",
    headline: "Search engine, meet your business.",
    body: "I'll start with a baseline audit and Google Business Profile cleanup. Your first monthly report lands in 7 days.",
    nextSteps: [
      "Expect an email asking for Google Business Profile access",
      "First on-page fixes pushed within 48h",
      "Monthly report on what changed and what's next",
    ],
  },
  "social-590": {
    eyebrow: "Social Plan — active",
    headline: "Calendar incoming.",
    body: "I'll draft a 4-week content calendar based on your business and send it within 5 days. You approve, I publish.",
    nextSteps: [
      "Reply with 10–20 photos / clips of your work and team",
      "First 4-week calendar draft within 5 days",
      "Posts go live once you approve the calendar",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(content).map((plan) => ({ plan }));
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;
  const data = content[plan];
  if (!data) notFound();

  return (
    <div className="px-6 py-28 md:py-40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="inline-flex w-14 h-14 rounded-full bg-accent-500/10 items-center justify-center mb-6">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-500"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-medium mb-4">
            {data.eyebrow}
          </p>
          <h1 className="text-display-lg">{data.headline}</h1>
          <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
            {data.body}
          </p>
        </div>

        <div className="mt-14 p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-semibold mb-4">
            What happens next
          </p>
          <ol className="space-y-3">
            {data.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-[15px] leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {data.upsell && (
          <div className="mt-8 p-7 rounded-3xl bg-[var(--foreground)] text-[var(--background)]">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-semibold mb-3">
              Bonus
            </p>
            <h2 className="text-xl font-bold tracking-tight">
              {data.upsell.title}
            </h2>
            <p className="mt-2 text-sm opacity-80 leading-relaxed">
              {data.upsell.body}
            </p>
            <Link
              href={data.upsell.href}
              className="mt-5 h-11 px-5 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
            >
              {data.upsell.cta}
            </Link>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-[var(--muted)]">
          <p>
            Question?{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
            >
              Send me a message
            </Link>
            {" "}or{" "}
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
            >
              WhatsApp me
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
