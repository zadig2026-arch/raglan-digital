import Link from "next/link";
import type { Project } from "@/lib/content";
import { RegionTag, StatusTag } from "./region-tag";

const sectorGradient: Record<string, string> = {
  "Arts collective": "from-amber-100 via-rose-100 to-stone-200 dark:from-amber-900/30 dark:via-rose-900/30 dark:to-stone-900",
  "Wellness": "from-emerald-100 via-teal-100 to-stone-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-stone-900",
  "Photography club": "from-stone-200 via-slate-100 to-zinc-200 dark:from-stone-900/40 dark:via-slate-900/30 dark:to-zinc-900",
  "Tailoring & alterations": "from-rose-100 via-amber-100 to-emerald-100 dark:from-rose-900/30 dark:via-amber-900/30 dark:to-emerald-900/30",
};

const defaultGradient = "from-stone-100 via-amber-50 to-stone-200 dark:from-stone-900 dark:via-amber-950/30 dark:to-stone-900";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const gradient = sectorGradient[project.sector] ?? defaultGradient;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/40 transition-colors overflow-hidden"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} flex items-end p-6`}>
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="absolute top-6 right-6 text-4xl md:text-5xl font-serif text-[var(--foreground)]/15 select-none">
            {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
          </span>
        )}
      </div>

      <div className={compact ? "p-5" : "p-6 md:p-7"}>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <StatusTag status={project.status} />
          <RegionTag region={project.region} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-[var(--muted)]">
          {project.sector} · {project.year}
        </p>
        {!compact && (
          <p className="mt-4 text-[15px] text-[var(--muted)] leading-relaxed line-clamp-3">
            {project.brief}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all">
          See the work <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
