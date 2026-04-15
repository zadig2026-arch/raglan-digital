"use client";

import { Children, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type AnimationPreset = "fade-up" | "blur-slide" | "scale-up" | "slide-right";

interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  preset?: AnimationPreset;
}

const presets: Record<AnimationPreset, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 14, mass: 0.8 },
    },
  },
  "blur-slide": {
    hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 16, mass: 1 },
    },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12, mass: 0.6 },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  },
};

export function AnimatedGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  preset = "blur-slide",
}: AnimatedGroupProps) {
  const itemVariants = presets[preset];

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
