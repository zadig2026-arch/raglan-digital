"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IntroAnimation } from "@/components/intro-animation";
import { AuroraBackground } from "@/components/aurora-bg";

export function HeroSection() {
  return (
    <>
      <IntroAnimation />

      <AuroraBackground className="min-h-[70vh] flex items-center">
        <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-20 w-full">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-hand text-xl text-accent-500 mb-3">Hey, I&apos;m Zadig</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                I build websites for
                <br />
                local businesses in
                <br />
                <span className="text-accent-500">New Zealand.</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--muted)] max-w-lg leading-relaxed">
                I make websites and free tools for small businesses. Based in Raglan, NZ.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/services"
                  className="h-11 px-6 inline-flex items-center rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
                >
                  What I offer
                </Link>
                <Link
                  href="/contact"
                  className="h-11 px-6 inline-flex items-center rounded-xl border border-[var(--border)] text-sm font-medium hover:border-accent-500/30 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>
    </>
  );
}
