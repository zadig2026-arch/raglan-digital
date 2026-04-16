"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Search, Share2, FileText } from "lucide-react";
import { BrowserMockup } from "./browser-mockup";

const services = [
  {
    id: "web-design",
    name: "Web Design",
    icon: Monitor,
    description: "A clean, fast website designed around your brand — built to convert visitors into customers.",
  },
  {
    id: "seo",
    name: "SEO & Google Business",
    icon: Search,
    description: "Local SEO, Google Business Profile, keyword optimization — so your customers find you first.",
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Share2,
    description: "Consistent, quality content on Facebook and Instagram — so you can focus on your business.",
  },
  {
    id: "content",
    name: "Content & Copywriting",
    icon: FileText,
    description: "SEO-friendly copy for your website, blog, emails, and social media — no robot speak.",
  },
];

/* ═══ Demo: Web Design — multi-device mockup ═══ */
function WebDesignDemo() {
  return (
    <div className="relative min-h-[320px] flex items-end justify-center">
      {/* Desktop / Laptop */}
      <div className="relative w-[85%] z-10">
        <div className="rounded-t-lg border-2 border-warm-600 dark:border-warm-500 bg-warm-800 dark:bg-warm-900 overflow-hidden">
          <div className="aspect-[16/10] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/60 dark:to-warm-900 p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-accent-500" />
                  <span className="text-[7px] font-bold text-[var(--foreground)]">Raglan Surf Cafe</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-1.5 rounded-full bg-warm-300 dark:bg-warm-600" />
                  <div className="w-6 h-1.5 rounded-full bg-warm-300 dark:bg-warm-600" />
                  <div className="w-6 h-1.5 rounded-full bg-warm-300 dark:bg-warm-600" />
                </div>
              </div>
              <div className="rounded-lg bg-accent-500/10 dark:bg-accent-500/20 p-3 mb-2">
                <p className="text-[8px] font-bold leading-tight">Best coffee on<br />the coast.</p>
                <div className="mt-1.5 h-3.5 w-12 rounded bg-accent-500 flex items-center justify-center">
                  <span className="text-[5px] text-white font-medium">Book now</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {["Menu", "Gallery", "Reviews"].map((label) => (
                  <div key={label} className="rounded bg-white dark:bg-warm-800 p-1.5 border border-warm-200 dark:border-warm-700">
                    <div className="h-6 rounded bg-accent-100 dark:bg-accent-950 mb-1" />
                    <div className="h-1 w-8 rounded-full bg-warm-300 dark:bg-warm-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-3 bg-warm-600 dark:bg-warm-500 rounded-b-lg mx-auto" style={{ width: "110%", marginLeft: "-5%" }}>
          <div className="h-1 w-16 bg-warm-500 dark:bg-warm-400 rounded-full mx-auto mt-0.5" />
        </div>
      </div>

      {/* Tablet */}
      <div className="absolute right-0 bottom-0 w-[30%] z-20">
        <div className="rounded-lg border-2 border-warm-600 dark:border-warm-500 bg-warm-800 dark:bg-warm-900 overflow-hidden">
          <div className="aspect-[3/4] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/60 dark:to-warm-900 p-2">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2.5 h-2.5 rounded bg-accent-500" />
                <span className="text-[5px] font-bold">Raglan Surf Cafe</span>
              </div>
              <div className="rounded bg-accent-500/10 dark:bg-accent-500/20 p-2 mb-1.5">
                <p className="text-[6px] font-bold leading-tight">Best coffee on<br />the coast.</p>
                <div className="mt-1 h-2.5 w-8 rounded bg-accent-500" />
              </div>
              <div className="space-y-1">
                <div className="h-5 rounded bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700" />
                <div className="h-5 rounded bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute left-0 bottom-0 w-[18%] z-20">
        <div className="rounded-xl border-2 border-warm-600 dark:border-warm-500 bg-warm-800 dark:bg-warm-900 overflow-hidden">
          <div className="aspect-[9/16] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/60 dark:to-warm-900 p-1.5">
              <div className="h-1.5 w-6 bg-warm-700 dark:bg-warm-600 rounded-full mx-auto mb-1.5" />
              <div className="rounded bg-accent-500/10 dark:bg-accent-500/20 p-1.5 mb-1">
                <p className="text-[4px] font-bold leading-tight">Best coffee on the coast.</p>
                <div className="mt-0.5 h-2 w-6 rounded bg-accent-500" />
              </div>
              <div className="space-y-0.5">
                <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700" />
                <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700" />
                <div className="h-4 rounded bg-white dark:bg-warm-800 border border-warm-200 dark:border-warm-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Demo: SEO ═══ */
function SEODemo() {
  return (
    <BrowserMockup url="analytics.google.com">
      <div className="p-6 min-h-[280px]">
        <p className="text-xs text-[var(--muted)] mb-1">Monthly visitors</p>
        <p className="text-3xl font-bold text-accent-500">340</p>
        <div className="flex items-end gap-2 mt-6 h-36">
          {[
            { month: "Jan", h: 3 }, { month: "Feb", h: 8 },
            { month: "Mar", h: 13 }, { month: "Apr", h: 26 },
            { month: "May", h: 46 }, { month: "Jun", h: 100 },
          ].map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md bg-accent-500/80" style={{ height: `${d.h}%`, minHeight: 4 }} />
              <span className="text-[10px] text-[var(--muted)]">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserMockup>
  );
}

/* ═══ Demo: Social Media ═══ */
function SocialDemo() {
  return (
    <BrowserMockup url="instagram.com/yourbusiness">
      <div className="p-6 min-h-[280px]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">YB</span>
          </div>
          <div>
            <p className="text-sm font-semibold">yourbusiness</p>
            <p className="text-xs text-[var(--muted)]">847 followers</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { text: "New summer menu is here!", bg: "bg-accent-100 dark:bg-accent-950" },
            { text: "Thanks for 100 five-star reviews!", bg: "bg-success-400/10" },
            { text: "Live music this Friday", bg: "bg-warm-100 dark:bg-warm-800" },
          ].map((post, i) => (
            <div key={i} className={`p-4 rounded-xl ${post.bg}`}>
              <p className="text-sm">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserMockup>
  );
}

/* ═══ Demo: Content ═══ */
function ContentDemo() {
  return (
    <BrowserMockup url="docs.google.com">
      <div className="p-6 min-h-[280px] font-mono text-sm leading-relaxed space-y-3">
        <p className="text-[var(--foreground)]">
          <span className="text-accent-500">Fresh local ingredients</span> meet ocean views at Raglan&apos;s favourite neighbourhood cafe.
        </p>
        <p className="text-[var(--foreground)]">
          Open 7 days, 7am–3pm. <span className="text-accent-500">Book your table</span> or walk in — we&apos;ll save you a spot by the window.
        </p>
        <p className="text-[var(--foreground)]">
          Catering for events up to 60 guests. <span className="text-accent-500">See our catering menu →</span>
        </p>
      </div>
    </BrowserMockup>
  );
}

const demos = [WebDesignDemo, SEODemo, SocialDemo, ContentDemo];

/* ═══ Main component ═══ */
export function StickyServiceShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${services.length * 70}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: labels */}
          <div>
            <p className="font-hand text-xl text-accent-500 mb-3">How I help</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Everything your business needs online.
            </h2>
            <div className="space-y-2">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ServiceLabel
                    key={service.id}
                    service={service}
                    icon={Icon}
                    index={i}
                    total={services.length}
                    progress={scrollYProgress}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: animated demo */}
          <div className="hidden md:block">
            <ServiceDemoSwitcher progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceLabel({
  service,
  icon: Icon,
  index,
  total,
  progress,
}: {
  service: (typeof services)[0];
  icon: any;
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  // Smooth bell curve: ramp up over 15%, hold, ramp down over 15%
  const opacity = useTransform(
    progress,
    [start, start + 0.08, mid, end - 0.08, end],
    index === 0
      ? [1, 1, 1, 1, 0.4]       // First label starts visible
      : [0.4, 1, 1, 1, 0.4]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="flex items-start gap-3 p-4 rounded-xl"
    >
      <div className="w-9 h-9 rounded-lg bg-accent-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4.5 h-4.5 text-accent-500" />
      </div>
      <div>
        <p className="font-semibold">{service.name}</p>
        <p className="text-sm text-[var(--muted)] mt-0.5">{service.description}</p>
      </div>
    </motion.div>
  );
}

function ServiceDemoSwitcher({ progress }: { progress: any }) {
  return (
    <div className="relative h-[360px]">
      {demos.map((Demo, i) => (
        <DemoSlide key={i} index={i} total={demos.length} progress={progress}>
          <Demo />
        </DemoSlide>
      ))}
    </div>
  );
}

function DemoSlide({
  children,
  index,
  total,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  // Wider transition zones (15% of total scroll instead of 5%)
  const enterEnd = start + 0.1;
  const exitStart = end - 0.1;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, enterEnd, exitStart, end]      // First slide starts visible
      : [start, enterEnd, exitStart, end],
    index === 0
      ? [1, 1, 1, 0]
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    index === 0
      ? [0, enterEnd, exitStart, end]
      : [start, enterEnd, exitStart, end],
    index === 0
      ? [0, 0, 0, -30]
      : [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}
