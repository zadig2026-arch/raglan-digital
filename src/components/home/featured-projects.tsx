import Link from "next/link";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/work/project-card";

export function FeaturedProjects() {
  const featured = getProjects({ featuredOnly: true });
  if (featured.length === 0) return null;

  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="featured-work-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
              Selected work
            </p>
            <h2 id="featured-work-heading" className="text-display-md md:text-display-lg">
              A handful of projects<br />I&apos;m proud of right now.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-500 hover:gap-2 transition-all whitespace-nowrap"
          >
            See all work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
