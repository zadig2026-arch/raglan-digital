"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export function Marquee({ items, speed = 25, className, separator = " — " }: MarqueeProps) {
  const text = items.join(separator) + separator;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="text-sm font-medium text-[var(--muted)] tracking-wide px-1">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
