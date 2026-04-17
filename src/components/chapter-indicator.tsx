"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Chapter {
  id: string;
  roman: string;
  title: string;
}

interface ChapterIndicatorProps {
  chapters: Chapter[];
}

export function ChapterIndicator({ chapters }: ChapterIndicatorProps) {
  const [activeId, setActiveId] = useState<string>(chapters[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.set(c.id, entry.intersectionRatio);
            } else {
              visible.delete(c.id);
            }
          }
          if (visible.size > 0) {
            const best = [...visible.entries()].sort((a, b) => {
              const ai = chapters.findIndex((ch) => ch.id === a[0]);
              const bi = chapters.findIndex((ch) => ch.id === b[0]);
              return ai - bi;
            })[0];
            if (best) setActiveId(best[0]);
          }
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [chapters]);

  return (
    <nav
      aria-label="Chapters"
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <ol className="space-y-4">
        {chapters.map((c) => {
          const active = c.id === activeId;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="group flex items-center gap-3 outline-none"
              >
                <span
                  className={cn(
                    "font-hand text-lg transition-colors w-8 text-right tabular-nums",
                    active
                      ? "text-accent-500"
                      : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                  )}
                >
                  {c.roman}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    width: active ? 28 : 10,
                    opacity: active ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className={cn(
                    "h-[2px] rounded-full",
                    active ? "bg-accent-500" : "bg-[var(--border)]"
                  )}
                />
                <span
                  className={cn(
                    "text-xs uppercase tracking-widest transition-opacity max-w-[140px] truncate",
                    "opacity-0 group-hover:opacity-60",
                    active && "text-[var(--foreground)]"
                  )}
                >
                  {c.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
