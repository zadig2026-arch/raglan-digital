"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["Kia Ora", "I", "AM", "Zadig", "Welcome", "raglandigital"];

const opacity = {
  initial: { opacity: 0 },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
  },
};

interface IntroAnimationProps {
  onComplete?: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [index, setIndex] = useState(0);
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

    if (index === words.length - 1) {
      const t = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          sessionStorage.setItem("intro-seen", "1");
          setShow(false);
          onComplete?.();
        }, 1000);
      }, 1000);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setIndex(index + 1),
      index === 0 ? 1000 : 150,
    );
    return () => clearTimeout(t);
  }, [index, show, dimension.width, onComplete]);

  if (!show) return null;

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

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
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
            style={{ color: "var(--background)" }}
          >
            {index === words.length - 1 ? (
              <>
                <span>raglan</span>
                <span className="text-accent-500">digital</span>
              </>
            ) : (
              <>
                <span
                  className="block w-2.5 h-2.5 rounded-full mr-2.5"
                  style={{ backgroundColor: "var(--background)" }}
                />
                {words[index]}
              </>
            )}
          </motion.p>
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
