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
      body: "Skip the wait. Apply for a $399 launch site and we'll start this week.",
      href: "/launch",
      cta: "See the $399 launch offer",
    },
  },
  "launch-399": {
    eyebrow: "Launch site — confirmed",
    headline: "You're in. Let's build.",
    body: "Deposit received. The clock starts when you send your assets — logo, photos, and a few lines about your business. Most sites go live in 5 to 10 days from there.",
    nextSteps: [
      "Reply to the confirmation email with logo + 5–10 photos + 3–4 lines about your business",
      "I'll send a clickable mockup of the home page within 48h",
      "We refine, I build, you review checkpoints, we launch",
    ],
    upsell: {
      title: "Add the Care Plan?",
      body: "Hosting, edits, backups, uptime — handled for $129/mo. Cancel anytime. Most launch clients add it.",
      href: "/contact?service=care-plan",
      cta: "Tell me about Care Plan",
    },
  },
  "launch-applied": {
    eyebrow: "Application received",
    headline: "Got it. Reviewing now.",
    body: "I read every application personally. Within 24h on weekdays, you'll get an honest reply — yes, no, or 'let's chat first'.",
    nextSteps: [
      "Watch your inbox over the next 24h",
      "If qualified, I'll send a free mockup of your future site within a few days",
      "No payment until delivery, no upfront commitment",
    ],
  },
  "growth-1490": {
    eyebrow: "Growth site — confirmed",
    headline: "Welcome aboard.",
    body: "Deposit received. Next step is a 30-min discovery call to nail down scope, copy direction, and timeline. I'll send a Cal.com link within the hour.",
    nextSteps: [
      "Pick a 30-min slot on the link in your inbox",
      "Bring 3 sites you like (and 1 you don't) so we can calibrate",
      "First mockup within 5 days of the call",
    ],
    upsell: {
      title: "Care Plan is included for the first 30 days.",
      body: "After that, $129/mo if you want me to keep handling hosting, edits, backups. No commitment.",
      href: "/contact?service=care-plan",
      cta: "Read about Care Plan",
    },
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
