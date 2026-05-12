"use client";

import { useState, useMemo } from "react";
import type { Project, ProjectRegion } from "@/lib/content";
import { ProjectCard } from "./project-card";

type Filter = "all" | ProjectRegion;

const filterLabel: Record<Filter, string> = {
  all: "All",
  FR: "France",
  NZ: "Aotearoa NZ",
  INTL: "International",
};

export function WorkList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const availableFilters = useMemo<Filter[]>(() => {
    const regions = new Set<ProjectRegion>(projects.map((p) => p.region));
    const all: Filter[] = ["all"];
    if (regions.has("FR")) all.push("FR");
    if (regions.has("NZ")) all.push("NZ");
    if (regions.has("INTL")) all.push("INTL");
    return all;
  }, [projects]);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.region === filter)),
    [projects, filter],
  );

  return (
    <>
      {availableFilters.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {availableFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`h-9 px-4 rounded-full text-xs font-medium tracking-wide uppercase transition-colors ${
                filter === f
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30"
              }`}
            >
              {filterLabel[f]}
              {f !== "all" && (
                <span className="ml-1.5 opacity-60">
                  {projects.filter((p) => p.region === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] py-12">
          No projects in this region yet.
        </p>
      )}
    </>
  );
}
