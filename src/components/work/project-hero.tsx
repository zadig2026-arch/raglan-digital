import type { Project } from "@/lib/content";
import { RegionTag, StatusTag } from "./region-tag";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="px-6 pt-28 md:pt-40 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <StatusTag status={project.status} />
          <RegionTag region={project.region} />
          <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
            {project.sector} · {project.year}
          </span>
        </div>

        <h1 className="text-display-xl">{project.title}</h1>

        <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
          {project.brief}
        </p>

        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--border)]">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">Client</dt>
            <dd className="mt-1 text-sm">{project.client}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">Role</dt>
            <dd className="mt-1 text-sm">{project.role}</dd>
          </div>
          {project.stack && project.stack.length > 0 && (
            <div className="col-span-2">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">Stack</dt>
              <dd className="mt-1 text-sm">{project.stack.join(" · ")}</dd>
            </div>
          )}
          {project.links?.live && (
            <div className="col-span-2 md:col-span-4 md:col-start-1">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">Live</dt>
              <dd className="mt-1">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent-500 hover:underline"
                >
                  {project.links.live.replace(/^https?:\/\//, "")} <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          )}
          {!project.links?.live && project.links?.preview && (
            <div className="col-span-2 md:col-span-4 md:col-start-1">
              <dt className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">Preview</dt>
              <dd className="mt-1">
                <a
                  href={project.links.preview}
                  target={project.links.preview.startsWith("http") ? "_blank" : undefined}
                  rel={project.links.preview.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-sm text-accent-500 hover:underline"
                >
                  {project.links.preview.replace(/^https?:\/\//, "")} <span aria-hidden="true">→</span>
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

export function ProjectMetrics({ metrics }: { metrics: NonNullable<Project["metrics"]> }) {
  if (metrics.length === 0) return null;
  return (
    <section className="px-6 py-10 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-2xl md:text-3xl font-semibold tracking-tight">{m.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectDecisions({ decisions }: { decisions: string[] }) {
  if (decisions.length === 0) return null;
  return (
    <section className="px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
          Key decisions
        </p>
        <ul className="space-y-4">
          {decisions.map((d, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-accent-500 text-sm font-mono pt-0.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-relaxed flex-1">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
