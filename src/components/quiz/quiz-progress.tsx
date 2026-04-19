"use client";

import { motion } from "framer-motion";

export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
          Question {current} of {total}
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-[var(--surface)] overflow-hidden">
        <motion.div
          className="h-full bg-accent-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
