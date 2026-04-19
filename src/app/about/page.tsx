"use client";

import Link from "next/link";
import { TextReveal } from "@/components/text-reveal";
import { ZagExpression } from "@/components/zag-expression";
import { Magnetic } from "@/components/magnetic";

export default function AboutPage() {
  return (
    <section className="py-28 md:py-40 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="shrink-0 relative group cursor-pointer">
            <ZagExpression
              defaultExpression="smile"
              hoverExpression="happy"
              size={120}
              className="rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <span className="font-hand text-lg text-accent-500">I&apos;m here</span>
            </div>
          </div>

          <div className="flex-1">
            <TextReveal
              text="I'm Zadig. I studied audiovisual in France, worked at a digital agency, then moved to Raglan. Locals told me there was work here. So I started."
              className="text-xl md:text-2xl font-medium leading-relaxed"
            />

            <div className="mt-8 space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                No big portfolio yet — I&apos;m just getting started. But I built a set of free tools you can
                try right now, and I&apos;m ready to help if you need a website or want to improve your online presence.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                Fair prices. You own everything. No lock-in.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="h-11 px-6 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get in touch
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://wa.me/33752032213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
                >
                  WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
