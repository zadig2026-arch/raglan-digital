"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AuroraBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/10 dark:bg-accent-500/15 blur-[100px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-accent-300/8 dark:bg-accent-400/10 blur-[80px]"
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-400/5 dark:bg-brand-500/8 blur-[80px]"
          animate={{
            x: [0, 50, -70, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.85, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
