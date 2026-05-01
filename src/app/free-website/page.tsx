import type { Metadata } from "next";
import Link from "next/link";
import { FreeWebsiteForm } from "@/components/free-website-form";

export const metadata: Metadata = {
  title: "Free website for NZ small businesses",
  description:
    "I'm building 5 free websites for NZ small businesses to start my portfolio in New Zealand. No catch — see if you qualify.",
};

const SPOTS_LEFT = 5;

export default function FreeWebsitePage() {
  return (
    <div className="px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            The honest pitch
          </p>
          <h1 className="text-display-lg">
            5 free websites. No catch.
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            To grow Raglan Digital&apos;s case-study library, 5 NZ small
            businesses each month get a complete website — entirely free,
            in exchange for a short public testimonial. You keep the site,
            the domain, the code. No lock-in, no hidden fees.
          </p>
          <p className="mt-3 text-sm text-accent-500 font-medium">
            {SPOTS_LEFT} spot{SPOTS_LEFT > 1 ? "s" : ""} left
          </p>
        </div>

        {/* The honest exchange */}
        <div className="mt-20 grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-500 font-medium mb-1">You get</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Check />A custom 1-3 page website (worth ~$1,500 NZD)
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Mobile-first, fast, modern design
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Hosting + SSL forever, on me (via Cloudflare Pages)
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Domain at cost (~$25 NZD/year if you don&apos;t have one)
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Contact form, Google Maps, opening hours
              </li>
              <li className="flex items-start gap-2.5">
                <Check />You own everything — code, design, content
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Delivered in 5–10 days from your assets
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-500 font-medium mb-1">I get</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Check />
                Permission to feature your site as an example on my portfolio
              </li>
              <li className="flex items-start gap-2.5">
                <Check />A short testimonial (written or 1-min video, your
                choice)
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Maybe — if it makes sense — a chat about ongoing SEO
                later
              </li>
            </ul>
            <p className="mt-5 text-xs text-[var(--muted)]">
              That&apos;s it. No obligation to buy anything. If you&apos;re happy
              with the site and walk away, that&apos;s fine.
            </p>
          </div>
        </div>

        {/* Why */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight">
            Why I&apos;m doing this.
          </h2>
          <div className="mt-5 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              I studied audiovisual production in France, then worked at a
              digital agency for years before moving to NZ. I know how to
              deliver. What I don&apos;t have yet are NZ examples to show.
            </p>
            <p>
              Buying logos and fake testimonials is easy. But I want my first
              clients here to be real, and the work to speak for itself. So
              instead of pretending I&apos;ve worked with everyone, I&apos;m
              giving 5 sites away to make it real.
            </p>
            <p>
              That&apos;s the deal. Honest, no tricks. If you&apos;re a small
              business owner who&apos;d benefit, apply below.
            </p>
          </div>
        </div>

        {/* Eligibility */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight">Who qualifies.</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Check />A small local business in New Zealand (cafe, boutique,
              studio, artisan, therapist, B&amp;B, service pro…)
            </li>
            <li className="flex items-start gap-2.5">
              <Check />You currently have no website, or one that&apos;s
              clearly outdated
            </li>
            <li className="flex items-start gap-2.5">
              <Check />You can provide your logo + 5-10 photos + a few lines
              about your business within 48h
            </li>
            <li className="flex items-start gap-2.5">
              <Check />You&apos;re happy to give a short testimonial when the
              site goes live
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="mt-20" id="apply">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
            Apply for a free website
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] text-center max-w-lg mx-auto">
            Tell me about your business. I usually reply within 24h. If you
            qualify, I&apos;ll send you a mockup of your future site within a
            few days.
          </p>
          <div className="mt-10">
            <FreeWebsiteForm />
          </div>
        </div>

        {/* Fallback */}
        <div className="mt-16 text-center text-sm text-[var(--muted)]">
          <p>
            Prefer to chat first? Message me on{" "}
            <a
              href="https://wa.me/33752032213?text=Hey%20Zadig%2C%20I%27m%20interested%20in%20the%20free%20website%20offer."
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent-500 transition-colors"
            >
              WhatsApp
            </a>{" "}
            or see what else I offer on the{" "}
            <Link
              href="/services"
              className="underline underline-offset-2 hover:text-accent-500 transition-colors"
            >
              Services page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg
      className="w-4 h-4 text-success-500 shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
