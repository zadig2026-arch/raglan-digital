"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
  className?: string;
}

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section
      ref={ref}
      className={cn("py-20 md:py-28 px-6", className)}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-hand text-4xl md:text-6xl leading-[1.15] text-[var(--foreground)] relative inline-block"
        >
          <span className="text-accent-500/40 absolute -top-6 -left-4 text-6xl md:text-8xl select-none pointer-events-none">
            &ldquo;
          </span>
          <span className="relative">{children}</span>
          <svg
            className="absolute left-0 right-0 -bottom-3 md:-bottom-4 w-full h-4 md:h-6"
            viewBox="0 0 400 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M2 12 Q 100 2, 200 10 T 398 8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="text-accent-500"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </motion.blockquote>

        {attribution && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8 text-sm uppercase tracking-widest text-[var(--muted)]"
          >
            — {attribution}
          </motion.p>
        )}
      </div>
    </section>
  );
}
