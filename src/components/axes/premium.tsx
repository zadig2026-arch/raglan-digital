"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Search, FileText, Gauge, ClipboardCheck, Smartphone } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { AuroraBackground } from "@/components/aurora-bg";
import { Marquee } from "@/components/marquee";
import { ZagExpression } from "@/components/zag-expression";
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

/* ═══ Diagnostic ═══ */
const diagnosticsPremium = [
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

function DiagnosticPremium() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-hand text-xl text-accent-500 mb-3">Free diagnosis</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Is your website working?
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-md mx-auto">
            Most small business sites have these problems. Test yours in 30 seconds.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {diagnosticsPremium.map((d) => {
            const Icon = d.icon;
            return (
              <Card3D key={d.href}>
                <Link
                  href={d.href}
                  className="group block p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-xl transition-all h-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 group-hover:bg-accent-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <p className="text-4xl font-bold text-accent-500">{d.stat}</p>
                  <p className="text-sm mt-2 leading-relaxed">{d.caption}</p>
                  <p className="text-xs text-[var(--muted)] mt-2">{d.problem}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-accent-500 group-hover:gap-2 transition-all">
                    {d.cta} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </Card3D>
            );
          })}
        </div>

        {/* All free tools */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "SEO Audit", icon: Search, href: "/tools/seo-audit" },
            { title: "Speed Test", icon: Gauge, href: "/tools/speed-checker" },
            { title: "Meta Generator", icon: FileText, href: "/tools/meta-generator" },
            { title: "Digital Checklist", icon: ClipboardCheck, href: "/tools/digital-checklist" },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <Card3D key={tool.title}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-accent-500" />
                  </div>
                  <span className="text-sm font-medium">{tool.title}</span>
                </Link>
              </Card3D>
            );
          })}
        </div>
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
          </div>
        </div>
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
      <WhoPremium />
      <StickyServiceShowcase />
      <DiagnosticPremium />
      <StatsPremium />
      <ToolsPremium />
      <CTAPremium />
    </>
  );
}
