"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarginNoteProps {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function MarginNote({ children, side = "right", className }: MarginNoteProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, x: side === "right" ? -6 : 6 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "font-hand text-lg text-accent-500/80 italic",
        // Mobile: flow inline as aside on its own line.
        "block mt-3",
        // Desktop: absolute in the adjacent margin.
        "xl:block xl:absolute xl:top-0 xl:mt-0 xl:w-[180px] xl:leading-snug",
        side === "right"
          ? "xl:-right-[210px] xl:text-left"
          : "xl:-left-[210px] xl:text-right",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
