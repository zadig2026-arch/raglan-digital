"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Search, FileText, Gauge, ClipboardCheck } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { AuroraBackground } from "@/components/aurora-bg";
import { Marquee } from "@/components/marquee";
import { ZagExpression } from "@/components/zag-expression";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { StickyServiceShowcase } from "@/components/sticky-service-showcase";

/* ═══ Cursor Follower ═══ */
function CursorFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function onLeave() { setVisible(false); }
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-accent-500/20 border border-accent-500/40 pointer-events-none z-[100] mix-blend-difference hidden lg:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
    />
  );
}

/* ═══ 3D Card ═══ */
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / rect.width) * 12);
    rotateX.set(((cy - e.clientY) / rect.height) * 12);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ═══ Hero ═══ */
function HeroPremium() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <AuroraBackground className="absolute inset-0">
        <div />
      </AuroraBackground>

      <motion.div style={{ scale, opacity }} className="relative z-10 px-6 py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="font-hand text-xl text-accent-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            raglan digital
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Websites that
            <br />
            <span className="text-accent-500">work.</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-lg md:text-xl text-[var(--muted)] max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Beautiful, fast, found on Google.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Magnetic>
              <Link
                href="/contact"
                className="h-14 px-10 inline-flex items-center rounded-2xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors shadow-xl shadow-accent-500/25"
              >
                Start a project
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ Marquee ═══ */
function MarqueeBanner() {
  return (
    <div className="py-6 border-y border-[var(--border)]">
      <Marquee
        items={["Web Design", "SEO", "Google Business", "Social Media", "Copywriting", "Speed Optimization", "Mobile-First", "No Lock-In"]}
        speed={30}
      />
    </div>
  );
}

/* ═══ Before/After ═══ */
function BeforeAfterPremium() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-hand text-xl text-accent-500 mb-3">The shift</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Before. After.
          </h2>
        </div>
        <Card3D>
          <BeforeAfterSlider
            beforeLabel="Without"
            afterLabel="With us"
            beforeContent={
              <div className="p-10 md:p-16 bg-warm-200 dark:bg-warm-800 min-h-[320px] flex flex-col justify-center">
                <div className="space-y-3 opacity-40">
                  <div className="h-10 w-44 rounded-lg bg-warm-400 dark:bg-warm-600" />
                  <div className="h-5 w-72 rounded bg-warm-300 dark:bg-warm-700" />
                  <div className="h-5 w-56 rounded bg-warm-300 dark:bg-warm-700" />
                  <div className="h-12 w-32 rounded-xl bg-warm-400 dark:bg-warm-600 mt-4" />
                </div>
              </div>
            }
            afterContent={
              <div className="p-10 md:p-16 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-950/40 dark:to-accent-950/20 min-h-[320px] flex flex-col justify-center">
                <div className="space-y-3">
                  <div className="h-10 w-44 rounded-lg bg-accent-500 flex items-center px-4">
                    <span className="text-sm text-white font-bold">Your Brand</span>
                  </div>
                  <h3 className="text-xl font-bold">Welcome to Your Business</h3>
                  <p className="text-sm text-[var(--muted)]">The best experience in Raglan, NZ</p>
                  <div className="flex gap-3 mt-2">
                    <div className="h-12 px-6 rounded-xl bg-accent-500 flex items-center">
                      <span className="text-sm text-white font-medium">Book now</span>
                    </div>
                    <div className="h-12 px-6 rounded-xl border border-accent-300 flex items-center">
                      <span className="text-sm text-accent-600 font-medium">Menu</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Card3D>
        <p className="mt-4 text-center text-xs text-[var(--muted)]">Drag to compare</p>
      </div>
    </section>
  );
}

/* ═══ Stats ═══ */
function StatsPremium() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto">
        <TextReveal
          text="A good website pays for itself. More visibility. More customers. More growth."
          className="text-2xl md:text-4xl font-bold tracking-tight leading-snug text-center"
        />
        <div className="mt-16 grid grid-cols-3 gap-4">
          {[
            { value: 1, prefix: "#", label: "Google ranking" },
            { value: 340, suffix: "/mo", label: "Visitors" },
            { value: 4.8, suffix: "★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-accent-500">
                <AnimatedCounter value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix ?? ""} duration={2.5} />
              </div>
              <p className="text-xs text-[var(--muted)] mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ Tools ═══ */
function ToolsPremium() {
  const tools = [
    { title: "SEO Audit", href: "/tools/seo-audit", icon: Search },
    { title: "Speed Test", href: "/tools/speed-checker", icon: Gauge },
    { title: "Meta Generator", href: "/tools/meta-generator", icon: FileText },
    { title: "Checklist", href: "/tools/digital-checklist", icon: ClipboardCheck },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-hand text-xl text-accent-500 mb-3">Free tools</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
          Test. Don&apos;t guess.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card3D key={tool.title}>
                <Link
                  href={tool.href}
                  className="block p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/30 hover:shadow-xl transition-all text-center"
                >
                  <Icon className="w-6 h-6 text-accent-500 mx-auto mb-3" />
                  <p className="text-sm font-medium">{tool.title}</p>
                </Link>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══ Who ═══ */
function WhoPremium() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-2xl mx-auto text-center">
        <ZagExpression defaultExpression="smile" hoverExpression="laugh" size={100} className="rounded-full mx-auto mb-8" />
        <TextReveal
          text="I'm Zadig. Based in Raglan. I build websites for local businesses. Fair prices. You own everything."
          className="text-xl md:text-2xl font-medium leading-relaxed"
        />
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTAPremium() {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-accent-500 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
          Let&apos;s go.
        </h2>
        <p className="mt-6 text-lg text-white/70">No pressure. No lock-in. Just results.</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/contact" className="h-14 px-10 inline-flex items-center rounded-2xl bg-white text-accent-600 font-semibold hover:bg-white/90 transition-colors shadow-xl">
              Send a message
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer" className="h-14 px-10 inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              WhatsApp
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export function PremiumAxe() {
  return (
    <>
      <CursorFollower />
      <HeroPremium />
      <MarqueeBanner />
      <StickyServiceShowcase />
      <BeforeAfterPremium />
      <StatsPremium />
      <ToolsPremium />
      <WhoPremium />
      <CTAPremium />
    </>
  );
}
