"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function WorkHero() {
  return (
    <section className="relative px-6 pt-28 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
            Raglan Digital · by Zadig
          </p>

          <h1 className="text-display-xl md:text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-tight">
            Sites that ship,
            <br />
            <span className="text-accent-500">in France and Aotearoa.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
            Independent web work for small businesses, artists and practitioners
            who care how their site looks, reads, and lasts. Selected projects below.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="h-12 px-7 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              See the work <span aria-hidden="true" className="ml-1.5">→</span>
            </Link>
            <Link
              href="/contact"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              Start a conversation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
