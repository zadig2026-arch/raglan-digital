"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOGO_FADE_DURATION = 0.6;
const LOGO_FADE_DELAY = 0.2;

interface IntroAnimationProps {
  onComplete?: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (!show || dimension.width === 0) return;

    // Total timeline: logo fade (0.6s) + pen reveal (0.8s) + pause (0.5s)
    const penStart = LOGO_FADE_DELAY + LOGO_FADE_DURATION * 0.5; // pen starts mid-fade
    const exitDelay = (penStart + 0.8 + 0.5) * 1000;
    const t = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        sessionStorage.setItem("intro-seen", "1");
        setShow(false);
        onComplete?.();
      }, 1000);
    }, exitDelay);
    return () => clearTimeout(t);
  }, [show, dimension.width, onComplete]);

  if (!show) return null;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 },
    },
  };

  const penDelay = LOGO_FADE_DELAY + LOGO_FADE_DURATION * 0.5;

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? "exit" : "initial"}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[100]"
      style={{ backgroundColor: "var(--foreground)" }}
    >
      {dimension.width > 0 && (
        <>
          <div className="absolute z-10 flex flex-col items-center gap-3">
            {/* Logo: simple fade-in */}
            <motion.p
              className="text-4xl md:text-5xl lg:text-6xl font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: LOGO_FADE_DURATION, delay: LOGO_FADE_DELAY, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ color: "var(--background)" }}>raglan </span>
              <span className="text-accent-500">digital</span>
            </motion.p>

            {/* "by Zadig" — pen/handwriting reveal */}
            <motion.p
              className="font-hand text-lg md:text-xl lg:text-2xl"
              style={{ color: "var(--background)" }}
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{
                clipPath: {
                  duration: 0.8,
                  delay: penDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                },
                opacity: {
                  duration: 0.01,
                  delay: penDelay,
                },
              }}
            >
              by Zadig
            </motion.p>
          </div>

          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
              fill="var(--foreground)"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
