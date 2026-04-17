"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { IntroAnimation } from "@/components/intro-animation";
import { AuroraBackground } from "@/components/aurora-bg";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      <IntroAnimation />

      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax aurora */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
          <AuroraBackground className="h-full">
            <div />
          </AuroraBackground>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 px-6 pt-24 pb-16 md:pt-32 md:pb-20 w-full"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/free-website"
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-xs font-medium text-accent-600 hover:bg-accent-500/15 transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                </span>
                5 free websites for local NZ businesses
                <span aria-hidden="true">→</span>
              </Link>
              <p className="font-hand text-xl text-accent-500 mb-3">Hey, I&apos;m Zadig</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Your business deserves
                <br />
                to be <span className="text-accent-500">found.</span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 max-w-lg text-lg md:text-xl text-[var(--muted)] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              I build websites that bring customers through your door.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16 flex flex-col items-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <span className="text-xs text-[var(--muted)] tracking-widest uppercase">See how</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg className="w-5 h-5 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
