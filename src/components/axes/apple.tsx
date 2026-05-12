"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, FileText, Gauge, ClipboardCheck, Smartphone } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { AuroraBackground } from "@/components/aurora-bg";
import { ZagExpression } from "@/components/zag-expression";
import { StickyServiceShowcase } from "@/components/sticky-service-showcase";

/* ═══ Apple-style hover card — subtle lift, no 3D tilt ═══ */
function CardHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ═══ Hero ═══ */
export function AppleHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden">
      <AuroraBackground className="absolute inset-0 opacity-60">
        <div />
      </AuroraBackground>

      <motion.div style={{ scale, opacity }} className="relative z-10 px-6 py-24 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-display-xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Websites that
            <br />
            <span className="text-accent-500">work.</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-lg md:text-xl text-[var(--muted)] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            For NZ small businesses. From $399. Live in 5–10 days.
          </motion.p>
          <motion.div
            className="mt-12 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <Magnetic>
              <Link
                href="/studio"
                className="inline-flex items-center h-12 px-8 rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start a project →
              </Link>
            </Magnetic>
            <Link
              href="/start?service=help"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded"
            >
              Not sure? Take the 2-min quiz →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ Who ═══ */
export function AppleWho() {
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
          </div>

          <div className="flex-1">
            <TextReveal
              text="I'm Zadig. I studied audiovisual in France, worked at a digital agency, then moved to Raglan. Locals told me there was work here. So I started."
              className="text-xl md:text-2xl font-medium leading-relaxed"
            />

            <div className="mt-8 space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                Built for NZ small businesses — fair prices, no retainers,
                no lock-in. Free tools you can try right now, and a real
                pair of eyes when you need one.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                You own everything. The site, the domain, the code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Sticky service showcase passthrough ═══ */
export function AppleStickyShowcase() {
  return <StickyServiceShowcase />;
}

/* ═══ Diagnostic ═══ */
const diagnosticsApple = [
  {
    icon: Search,
    stat: "73%",
    caption: "of local searches lead to a visit within 24 hours.",
    problem: "But only if your business shows up.",
    cta: "Audit your SEO",
    href: "/tools/seo-audit",
  },
  {
    icon: Gauge,
    stat: "53%",
    caption: "of visitors leave if your site takes more than 3 seconds.",
    problem: "Slow sites lose customers before they see your offer.",
    cta: "Test your speed",
    href: "/tools/speed-checker",
  },
  {
    icon: Smartphone,
    stat: "60%",
    caption: "of all searches happen on a phone.",
    problem: "If your site isn't mobile-friendly, you're invisible.",
    cta: "Check your site",
    href: "/tools/digital-checklist",
  },
];

export function AppleDiagnostic() {
  return (
    <section className="py-28 md:py-40 px-6 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">Free diagnosis</p>
          <h2 className="text-display-lg">
            Is your website working?
          </h2>
          <p className="mt-5 text-[var(--muted)] max-w-md mx-auto">
            Most small-business sites have these problems. Test yours in 30 seconds.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {diagnosticsApple.map((d) => {
            const Icon = d.icon;
            return (
              <CardHover key={d.href}>
                <Link
                  href={d.href}
                  className="group block p-7 rounded-3xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-xl transition-all h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-5 group-hover:bg-accent-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <p className="text-5xl font-bold tracking-tighter text-accent-500">{d.stat}</p>
                  <p className="text-sm mt-3 leading-relaxed">{d.caption}</p>
                  <p className="text-xs text-[var(--muted)] mt-2">{d.problem}</p>
                  <span className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all">
                    {d.cta} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </CardHover>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "SEO Audit", icon: Search, href: "/tools/seo-audit" },
            { title: "Speed Test", icon: Gauge, href: "/tools/speed-checker" },
            { title: "Meta Generator", icon: FileText, href: "/tools/meta-generator" },
            { title: "Digital Checklist", icon: ClipboardCheck, href: "/tools/digital-checklist" },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <CardHover key={tool.title}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-2.5 p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-accent-500" />
                  </div>
                  <span className="text-sm font-medium">{tool.title}</span>
                </Link>
              </CardHover>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          These tools give you a quick overview. For a full diagnosis,{' '}
          <Link href="/contact" className="text-accent-500 font-medium hover:underline">
            let me take a look
          </Link>.
        </p>
      </div>
    </section>
  );
}

/* ═══ Stats ═══ */
export function AppleStats() {
  return (
    <section className="py-28 md:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <TextReveal
          text="A good website pays for itself. More visibility. More customers. More growth."
          className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] text-center"
        />
        <div className="mt-20 grid grid-cols-3 gap-4">
          {[
            { value: 1, prefix: "#", label: "Google ranking" },
            { value: 340, suffix: "/mo", label: "Visitors" },
            { value: 4.8, suffix: "★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-7xl font-bold tracking-tighter text-accent-500">
                <AnimatedCounter value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix ?? ""} duration={2.5} />
              </div>
              <p className="text-xs text-[var(--muted)] mt-3 uppercase tracking-[0.25em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
export function AppleCta() {
  return (
    <section className="relative py-36 md:py-56 px-6 bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-display-xl">
          Let&apos;s go.
        </h2>
        <p className="mt-6 text-lg text-[var(--muted)]">No pressure. No lock-in. Just results.</p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/studio" className="h-12 px-8 inline-flex items-center rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors">
              Start a project
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="h-12 px-8 inline-flex items-center rounded-full border border-[var(--border)] font-medium hover:bg-[var(--surface-hover)] hover:border-[var(--foreground)]/30 transition-colors">
              Send a message
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer" className="h-12 px-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] font-medium hover:bg-[var(--surface-hover)] hover:border-[var(--foreground)]/30 transition-colors">
              WhatsApp
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ═══ Composed export — kept for backward compat ═══ */
export function AppleAxe() {
  return (
    <>
      <AppleHero />
      <AppleStickyShowcase />
      <AppleDiagnostic />
      <AppleStats />
      <AppleCta />
    </>
  );
}
