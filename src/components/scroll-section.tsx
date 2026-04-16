"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  height?: string;
  offset?: [string, string];
}

export function ScrollSection({
  children,
  className,
  height = "100vh",
  offset = ["start end", "end start"],
}: ScrollSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      style={{ minHeight: height }}
    >
      {children(scrollYProgress)}
    </section>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
