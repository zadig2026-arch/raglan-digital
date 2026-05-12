import Link from "next/link";
import { WorkHero } from "@/components/home/work-hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { AboutTeaser } from "@/components/home/about-teaser";

export default function Home() {
  return (
    <>
      <WorkHero />
      <FeaturedProjects />
      <AboutTeaser />

      <section className="px-6 py-24 md:py-32 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-md md:text-display-lg">
            Have a project in mind?
          </h2>
          <p className="mt-5 text-[var(--muted)] max-w-lg mx-auto">
            A few honest sentences are enough. Honest reply within 48h.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href="/work"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
