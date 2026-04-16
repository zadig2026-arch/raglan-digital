"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Monitor, Search, Share2 } from "lucide-react";
import { BrowserMockup } from "./browser-mockup";

const services = [
  {
    id: "web-design",
    name: "Web Design",
    icon: Monitor,
    description: "Custom, mobile-first websites that convert visitors into customers.",
  },
  {
    id: "seo",
    name: "SEO & Google Business",
    icon: Search,
    description: "Get found first when people search for what you do.",
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Share2,
    description: "Quality content on Facebook & Instagram, 3x/week.",
  },
];

/* ═══ Demos ═══ */

function WebDesignDemo() {
  return (
    <div className="relative h-full flex items-end justify-center pb-6">
      {/* Laptop */}
      <div className="relative w-[78%] z-10">
        <div className="rounded-t-xl border border-warm-300 dark:border-warm-600 bg-white dark:bg-warm-900 shadow-2xl overflow-hidden">
          <div className="aspect-[16/10] bg-gradient-to-br from-accent-50 via-white to-accent-50/50 dark:from-accent-950/40 dark:via-warm-900 dark:to-accent-950/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-accent-500" />
                <span className="text-[8px] font-bold">yourbusiness</span>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-1.5 rounded-full bg-warm-200 dark:bg-warm-700" />
                <div className="w-8 h-1.5 rounded-full bg-warm-200 dark:bg-warm-700" />
                <div className="w-8 h-1.5 rounded-full bg-warm-200 dark:bg-warm-700" />
              </div>
            </div>
            <div className="rounded-lg bg-accent-500/8 dark:bg-accent-500/15 p-4 mb-3">
              <p className="text-[10px] font-bold leading-tight">Your business, online.</p>
              <p className="text-[7px] text-[var(--muted)] mt-1">Raglan, New Zealand</p>
              <div className="mt-2 h-4 w-14 rounded-md bg-accent-500 flex items-center justify-center">
                <span className="text-[6px] text-white font-semibold">Get a quote</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Services", "About", "Contact"].map((l) => (
                <div key={l} className="rounded-md bg-white dark:bg-warm-800 p-2 border border-warm-100 dark:border-warm-700 shadow-sm">
                  <div className="h-8 rounded bg-accent-50 dark:bg-accent-950/50 mb-1.5" />
                  <div className="h-1 w-10 rounded-full bg-warm-200 dark:bg-warm-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-3 bg-warm-200 dark:bg-warm-600 rounded-b-xl shadow-lg" style={{ width: "108%", marginLeft: "-4%" }}>
          <div className="h-1 w-20 bg-warm-300 dark:bg-warm-500 rounded-full mx-auto mt-0.5" />
        </div>
      </div>
      {/* Tablet */}
      <div className="absolute right-0 bottom-6 w-[26%] z-20">
        <div className="rounded-lg border border-warm-300 dark:border-warm-600 bg-white dark:bg-warm-900 shadow-xl overflow-hidden">
          <div className="aspect-[3/4] bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/40 dark:to-warm-900 p-2.5">
            <div className="rounded bg-accent-500/8 dark:bg-accent-500/15 p-2 mb-2">
              <p className="text-[6px] font-bold">Your business, online.</p>
              <div className="mt-1 h-2.5 w-9 rounded bg-accent-500" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 rounded bg-white dark:bg-warm-800 border border-warm-100 dark:border-warm-700 shadow-sm" />
              <div className="h-6 rounded bg-white dark:bg-warm-800 border border-warm-100 dark:border-warm-700 shadow-sm" />
            </div>
          </div>
        </div>
      </div>
      {/* Phone */}
      <div className="absolute left-0 bottom-6 w-[15%] z-20">
        <div className="rounded-2xl border border-warm-300 dark:border-warm-600 bg-white dark:bg-warm-900 shadow-xl overflow-hidden">
          <div className="aspect-[9/16] bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/40 dark:to-warm-900 p-1.5">
            <div className="h-1 w-5 bg-warm-300 dark:bg-warm-600 rounded-full mx-auto mb-1.5" />
            <div className="rounded bg-accent-500/8 dark:bg-accent-500/15 p-1.5 mb-1">
              <p className="text-[4px] font-bold">Your plumber.</p>
              <div className="mt-0.5 h-1.5 w-5 rounded bg-accent-500" />
            </div>
            <div className="space-y-0.5">
              <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-100 dark:border-warm-700" />
              <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-100 dark:border-warm-700" />
              <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-100 dark:border-warm-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SEODemo() {
  return (
    <div className="h-full flex items-center">
      <BrowserMockup url="analytics.google.com">
        <div className="p-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Monthly visitors</p>
              <p className="text-3xl font-bold text-accent-500 mt-1">340</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium text-success-500 bg-success-500/10 px-2 py-0.5 rounded-full">+2,733%</span>
            </div>
          </div>

          {/* Curve chart */}
          <div className="relative h-36 mt-2">
            <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 30, 60, 90].map((y) => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
              ))}
              {/* Gradient fill under curve */}
              <defs>
                <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,115 C20,112 40,108 60,105 C80,102 100,98 120,88 C140,78 160,65 180,48 C200,31 220,18 240,10 C260,5 280,2 300,0"
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,115 C20,112 40,108 60,105 C80,102 100,98 120,88 C140,78 160,65 180,48 C200,31 220,18 240,10 C260,5 280,2 300,0 L300,120 L0,120 Z"
                fill="url(#curveGrad)"
              />
              {/* Data points */}
              {[
                { x: 0, y: 115 }, { x: 60, y: 105 }, { x: 120, y: 88 },
                { x: 180, y: 48 }, { x: 240, y: 10 }, { x: 300, y: 0 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="rgb(59 130 246)" stroke="white" strokeWidth="1.5" />
              ))}
            </svg>
            {/* X axis labels */}
            <div className="flex justify-between mt-1.5 px-0.5">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m} className="text-[9px] text-[var(--muted)]">{m}</span>
              ))}
            </div>
          </div>

          {/* Mini stats row */}
          <div className="flex gap-4 mt-4 pt-3 border-t border-[var(--border)]">
            <div>
              <p className="text-[9px] text-[var(--muted)] uppercase">Ranking</p>
              <p className="text-sm font-bold text-accent-500">#1</p>
            </div>
            <div>
              <p className="text-[9px] text-[var(--muted)] uppercase">Clicks</p>
              <p className="text-sm font-bold text-accent-500">1.2k</p>
            </div>
            <div>
              <p className="text-[9px] text-[var(--muted)] uppercase">Reviews</p>
              <p className="text-sm font-bold text-accent-500">4.8 ★</p>
            </div>
          </div>
        </div>
      </BrowserMockup>
    </div>
  );
}

function SocialDemo() {
  const posts = [
    { day: "Mon", platform: "IG", status: "published", label: "Summer menu launch" },
    { day: "Wed", platform: "FB", status: "published", label: "Customer spotlight" },
    { day: "Fri", platform: "IG", status: "scheduled", label: "Behind the scenes" },
  ];

  return (
    <div className="h-full flex items-center">
      <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden">
        {/* Dashboard header */}
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-500 flex items-center justify-center">
              <Share2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold">Content Calendar</span>
          </div>
          <span className="text-[9px] text-[var(--muted)]">This week</span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-px bg-[var(--border)]">
          {[
            { label: "Reach", value: "12.4k", change: "+18%" },
            { label: "Engagement", value: "4.2%", change: "+0.8%" },
            { label: "Followers", value: "10.2k", change: "+312" },
          ].map((m) => (
            <div key={m.label} className="bg-[var(--surface)] p-3 text-center">
              <p className="text-[9px] text-[var(--muted)] uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-bold mt-0.5">{m.value}</p>
              <p className="text-[9px] text-success-500 mt-0.5">{m.change}</p>
            </div>
          ))}
        </div>

        {/* Post queue */}
        <div className="p-3 space-y-2">
          <p className="text-[9px] text-[var(--muted)] uppercase tracking-wider mb-1">Scheduled posts</p>
          {posts.map((post, i) => (
            <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <div className="w-8 h-8 rounded-md bg-accent-500/10 flex items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-accent-500">{post.platform}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium truncate">{post.label}</p>
                <p className="text-[8px] text-[var(--muted)]">{post.day} · 10:00 AM</p>
              </div>
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${
                post.status === "published"
                  ? "bg-success-500/10 text-success-500"
                  : "bg-accent-500/10 text-accent-500"
              }`}>
                {post.status === "published" ? "Live" : "Scheduled"}
              </span>
            </div>
          ))}
        </div>

        {/* Platforms footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] text-[var(--muted)]">Platforms:</span>
            <div className="flex gap-1">
              {["IG", "FB"].map((p) => (
                <span key={p} className="text-[7px] font-bold bg-accent-500/10 text-accent-500 px-1.5 py-0.5 rounded">{p}</span>
              ))}
            </div>
          </div>
          <span className="text-[8px] text-accent-500 font-medium">3x / week</span>
        </div>
      </div>
    </div>
  );
}

const demoComponents = [WebDesignDemo, SEODemo, SocialDemo];

/* ═══ Main ═══ */

export function StickyServiceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Progress bar that fills as you scroll through the section
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left — service labels with progress line */}
          <div>
            <p className="font-hand text-xl text-accent-500 mb-3">How I help</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Everything your business needs online.
            </h2>

            <div className="relative">
              {/* Vertical progress track */}
              <div className="absolute left-[18px] top-3 bottom-3 w-[2px] bg-[var(--border)] rounded-full">
                <motion.div
                  className="w-full bg-accent-500 rounded-full origin-top"
                  style={{ height: progressHeight }}
                />
              </div>

              <div className="space-y-1 relative">
                {services.map((service, i) => (
                  <ServiceLabel
                    key={service.id}
                    service={service}
                    index={i}
                    progress={smoothProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — demo area (perspective for 3D wheel effect) */}
          <div className="hidden md:block h-[400px] relative overflow-hidden" style={{ perspective: 1200 }}>
            {demoComponents.map((Demo, i) => (
              <DemoPanel key={i} index={i} progress={smoothProgress}>
                <Demo />
              </DemoPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Service label ═══ */

function ServiceLabel({
  service,
  index,
  progress,
}: {
  service: (typeof services)[0];
  index: number;
  progress: any;
}) {
  const Icon = service.icon;
  const total = services.length;
  const segStart = index / total;
  const segEnd = (index + 1) / total;

  const isActive = useTransform(progress, (v: number) => {
    if (index === 0 && v <= segStart) return true;
    if (index === total - 1 && v >= segEnd) return true;
    return v >= segStart && v < segEnd;
  });

  const opacity = useTransform(isActive, (active: boolean) => active ? 1 : 0.4);
  const bgOpacity = useTransform(isActive, (active: boolean) => active ? 1 : 0);

  return (
    <motion.div
      style={{ opacity }}
      className="flex items-start gap-4 p-3 rounded-xl relative"
    >
      {/* Active background */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-accent-500/5 dark:bg-accent-500/10"
        style={{ opacity: bgOpacity }}
      />

      {/* Icon dot */}
      <motion.div
        className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{
          backgroundColor: useTransform(isActive, (a: boolean) =>
            a ? "rgb(59 130 246 / 0.15)" : "rgb(59 130 246 / 0.05)"
          ),
        }}
      >
        <Icon className="w-4 h-4 text-accent-500" />
      </motion.div>

      <div className="relative z-10">
        <p className="font-semibold text-sm">{service.name}</p>
        <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

/* ═══ Demo panel ═══ */

function DemoPanel({
  children,
  index,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  progress: any;
}) {
  const total = demoComponents.length;
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const mid = (segStart + segEnd) / 2;

  // Continuous motion: 50 → 0 → -50 across the segment (no plateau)
  const y = useTransform(progress, (v: number) => {
    if (index === 0 && v <= segStart) return 0;
    if (index === total - 1 && v >= segEnd) return 0;
    if (v < segStart) return 50;
    if (v >= segEnd) return -50;
    const t = (v - segStart) / (segEnd - segStart);
    return (0.5 - t) * 100;
  });

  // Gentle 3D rotation: -12 → 0 → 12
  const rotateX = useTransform(progress, (v: number) => {
    if (index === 0 && v <= segStart) return 0;
    if (index === total - 1 && v >= segEnd) return 0;
    if (v < segStart) return -12;
    if (v >= segEnd) return 12;
    const t = (v - segStart) / (segEnd - segStart);
    return (t - 0.5) * 24;
  });

  // Opacity: bell curve peaking at segment midpoint
  const opacity = useTransform(progress, (v: number) => {
    if (index === 0 && v <= segStart) return 1;
    if (index === total - 1 && v >= segEnd) return 1;
    if (v < segStart - 0.02 || v > segEnd + 0.02) return 0;
    // Distance from midpoint, normalized 0→1
    const d = Math.abs(v - mid) / (segEnd - segStart) * 2;
    // Smooth bell: 1 at center, 0 at edges
    return Math.max(0, 1 - d * d);
  });

  return (
    <motion.div
      style={{
        y: useTransform(y, (v) => `${v}%`),
        rotateX,
        opacity,
        transformOrigin: "center center",
      }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}
