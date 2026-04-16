"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="w-[3px] h-24 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          className="w-full bg-accent-500 origin-top rounded-full"
          style={{ scaleY, height: "100%" }}
        />
      </div>
    </div>
  );
}
