"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  wide?: boolean;
}

export function Section({ children, className = "", id, wide }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`px-6 ${className}`}
    >
      <div className={`${wide ? "max-w-4xl" : "max-w-3xl"} mx-auto`}>{children}</div>
    </motion.section>
  );
}
