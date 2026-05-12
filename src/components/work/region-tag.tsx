import type { ProjectRegion, ProjectStatus } from "@/lib/content";

const regionLabel: Record<ProjectRegion, string> = {
  FR: "France",
  NZ: "Aotearoa NZ",
  INTL: "International",
};

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  concept: "Concept",
  archived: "Archived",
};

const statusDot: Record<ProjectStatus, string> = {
  live: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  concept: "bg-[var(--muted)]",
  archived: "bg-[var(--muted)]/40",
};

export function RegionTag({ region }: { region: ProjectRegion }) {
  return (
    <span className="inline-flex items-center h-6 px-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[10px] font-medium tracking-wider uppercase text-[var(--muted)]">
      {regionLabel[region]}
    </span>
  );
}

export function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-6 px-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[10px] font-medium tracking-wider uppercase text-[var(--muted)]">
      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status]}`} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}
