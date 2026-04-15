"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ZagExpression } from "@/components/zag-expression";

export default function AboutPage() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-hand text-2xl text-accent-500 mb-2">About</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            I&apos;m Zadig.
          </h1>

          <div className="mt-10 flex justify-center">
            <ZagExpression
              defaultExpression="illustration"
              hoverExpression="smile"
              size={160}
              className="rounded-2xl"
            />
          </div>

          <div className="mt-10 space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              I studied audiovisual production in France — editing, post-production, that world.
              But the people around me were into tech, AI, game dev, web development. I learned
              from them, then kept going on my own.
            </p>
            <p>
              After school I worked at a digital agency. Built websites, handled SEO, managed
              social media for all kinds of businesses. That&apos;s where I learned what
              actually works and what&apos;s just noise.
            </p>
            <p>
              Then I moved to Raglan. I wasn&apos;t planning to do this here, but when
              I told people what I did back in France, they kept saying the same thing:
              &ldquo;there&apos;s so much work for you here.&rdquo; They motivated me to start.
            </p>
            <p className="text-[var(--foreground)] font-medium">
              So here I am. I&apos;m just getting started — no big portfolio yet. But I built
              a set of free tools you can try right now, and I&apos;m ready to help if you
              need a website or want to improve your online presence.
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--muted)]">
              Want to chat? No pressure.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-medium mt-4 hover:bg-accent-600 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
