"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterSearchProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  trigger?: boolean;
}

export function TypewriterSearch({
  text,
  delay = 0,
  speed = 80,
  className,
  trigger = true,
}: TypewriterSearchProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDisplayed("");
      setStarted(false);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  const done = displayed.length >= text.length;

  return (
    <div
      className={`relative inline-flex items-center bg-white dark:bg-warm-900 rounded-full border border-[var(--border)] shadow-lg px-5 py-3 ${className ?? ""}`}
    >
      <svg className="w-5 h-5 text-[#4285f4] mr-3 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="text-base md:text-lg text-[var(--foreground)]">
        {displayed}
        {!done && (
          <motion.span
            className="inline-block w-[2px] h-5 bg-[#4285f4] ml-[1px] align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        )}
      </span>
    </div>
  );
}
