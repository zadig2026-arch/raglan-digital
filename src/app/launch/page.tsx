import type { Metadata } from "next";
import Link from "next/link";
import { FreeWebsiteForm } from "@/components/free-website-form";

export const metadata: Metadata = {
  title: "Launch pricing — $399 NZD websites for NZ small businesses",
  description:
    "Launch pricing: $399 NZD for a custom 1-3 page website. First 5 paying clients in New Zealand only. No fake discount, no catch.",
};

const SPOTS_LEFT = 5;

export default function LaunchPage() {
  return (
    <div className="px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex justify-center">
          <Link
            href="/start?service=help"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
          >
            Not sure if this is for you? Take the 2-min quiz →
          </Link>
        </div>
        {/* Hero */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Launch pricing
          </p>
          <h1 className="text-display-lg">
            5 websites. $399 NZD. No catch.
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            I&apos;m new to New Zealand and building a paying client book.
            Launch pricing for my first 5 paying clients: $399 NZD for a
            complete website. After those 5 are signed, the price goes up.
            That&apos;s the deal — honest, no fake discount.
          </p>
          <p className="mt-3 text-sm text-accent-500 font-medium">
            {SPOTS_LEFT} spot{SPOTS_LEFT > 1 ? "s" : ""} left at this price
          </p>
        </div>

        {/* The exchange */}
        <div className="mt-20 grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-500 font-medium mb-1">You get</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Check />A custom 1-3 page website, designed around your brand
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Mobile-first, fast, modern — no template feel
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
                <Check />Delivered in 10 days from your assets
              </li>
              <li className="flex items-start gap-2.5">
                <Check />One round of revisions included
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-500 font-medium mb-1">I get</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Check />Your $399 NZD — paid at delivery, not upfront
              </li>
              <li className="flex items-start gap-2.5">
                <Check />Permission to feature your site as an example on my
                portfolio
              </li>
              <li className="flex items-start gap-2.5">
                <Check />A short testimonial (written or 1-min video, your
                choice) once you&apos;re happy with the site
              </li>
            </ul>
            <p className="mt-5 text-xs text-[var(--muted)]">
              No deposit, no upfront commitment. You only pay if the final site
              is a yes from you.
            </p>
          </div>
        </div>

        {/* Why */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight">
            Why this price, and why 5 spots.
          </h2>
          <div className="mt-5 space-y-4 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              I studied audiovisual production in France, then worked at a
              digital agency for years before moving to NZ. I know how to
              deliver. What I don&apos;t have yet are NZ case studies and a
              sustainable client book here.
            </p>
            <p>
              So I&apos;m opening 5 launch-priced spots at $399 NZD. No fake
              &quot;normally $1,500&quot; nonsense crossed out. It&apos;s
              simply my intro price to get real NZ work on my portfolio. Once
              the 5 spots are gone, the price goes up — that&apos;s the only
              reason you&apos;d get it at $399.
            </p>
            <p>
              If that sounds fair, apply below. If you&apos;d rather wait and
              see more work first, I get it — no hard feelings.
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
              clearly broken or outdated
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
          <p className="mt-6 text-xs text-[var(--muted)]">
            If your current site already works well, this offer isn&apos;t for
            you — I only take on no-site or broken-site projects at this price.
          </p>
        </div>

        {/* Form */}
        <div className="mt-20" id="apply">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
            Apply for a $399 launch spot
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] text-center max-w-lg mx-auto">
            Tell me about your business. I usually reply within 24h. If you
            qualify, I&apos;ll send you a mockup of your future site within a
            few days — still no payment at that point.
          </p>
          <div className="mt-10">
            <FreeWebsiteForm
              serviceTag="launch-offer-399"
              buttonLabel="Apply for a $399 spot"
              successTitle="Application received!"
              successBody="I'll review your business and get back to you within 24h. If you qualify, I'll send you a free mockup of your future site within a few days — no payment until delivery."
              testimonialCopy="If you're happy with the final site, I'm welcome to a short testimonial and to feature it as a portfolio example."
            />
          </div>
        </div>

        {/* Fallback */}
        <div className="mt-16 text-center text-sm text-[var(--muted)]">
          <p>
            Prefer to chat first? Message me on{" "}
            <a
              href="https://wa.me/33752032213?text=Hey%20Zadig%2C%20I%27m%20interested%20in%20the%20%24399%20launch%20offer."
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
