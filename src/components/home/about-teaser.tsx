import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="px-6 py-24 md:py-28 bg-[var(--surface)]" aria-labelledby="about-teaser-heading">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
          Who&apos;s behind this
        </p>
        <h2 id="about-teaser-heading" className="text-display-md md:text-display-lg">
          I&apos;m Zadig.<br />
          French in Raglan, working both coasts.
        </h2>
        <p className="mt-8 text-lg text-[var(--muted)] leading-relaxed">
          One person, a Next.js setup, and the same stubborn idea on every project:
          the people behind the work should keep control of it. Fair prices, no
          retainers, no lock-in.
        </p>
        <Link
          href="/about"
          className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-accent-500 hover:gap-2 transition-all"
        >
          More about how I work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
