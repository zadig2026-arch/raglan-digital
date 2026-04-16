"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Search, Gauge, FileText, ClipboardCheck, Monitor, Share2 } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { BrowserMockup } from "@/components/browser-mockup";
import { Magnetic } from "@/components/magnetic";
import { ZagExpression } from "@/components/zag-expression";

/* ═══ Before/After Slider ═══ */
function BASlider({
  beforeLabel,
  afterLabel,
  beforeContent,
  afterContent,
}: {
  beforeLabel: string;
  afterLabel: string;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updatePosition(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(x * 100);
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-[var(--border)] overflow-hidden select-none cursor-col-resize"
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onMouseMove={(e) => { if (dragging.current) updatePosition(e.clientX); }}
      onTouchMove={(e) => { updatePosition(e.touches[0].clientX); }}
    >
      {/* After (full width behind) */}
      <div className="w-full">{afterContent}</div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div style={{ width: containerRef.current?.offsetWidth || "100%" }}>
          {beforeContent}
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent-500 z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-warm-800/80 text-white text-xs font-medium backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-accent-500/90 text-white text-xs font-medium backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}

/* ═══ Hero ═══ */
function HeroBA() {
  return (
    <section className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <p className="font-hand text-xl text-accent-500 mb-3">Before & After</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
          See the <span className="text-accent-500">difference</span> a website makes.
        </h1>

        <BASlider
          beforeLabel="Without a website"
          afterLabel="With Raglan Digital"
          beforeContent={
            <div className="p-8 md:p-12 bg-warm-200 dark:bg-warm-800 min-h-[300px] flex flex-col justify-center">
              <div className="max-w-md opacity-50">
                <div className="h-8 w-40 rounded bg-warm-400 dark:bg-warm-600 mb-4" />
                <div className="h-4 w-64 rounded bg-warm-300 dark:bg-warm-700 mb-2" />
                <div className="h-4 w-48 rounded bg-warm-300 dark:bg-warm-700 mb-6" />
                <div className="h-10 w-28 rounded bg-warm-400 dark:bg-warm-600" />
              </div>
              <p className="mt-6 text-warm-600 dark:text-warm-400 text-sm">
                No online presence. Invisible to search.
              </p>
            </div>
          }
          afterContent={
            <div className="p-8 md:p-12 bg-accent-50 dark:bg-accent-950/30 min-h-[300px] flex flex-col justify-center">
              <div className="max-w-md">
                <div className="h-8 w-40 rounded bg-accent-500 mb-4 flex items-center px-3">
                  <span className="text-xs text-white font-bold">Your Brand</span>
                </div>
                <h3 className="text-lg font-bold">Welcome to Your Business</h3>
                <p className="text-sm text-[var(--muted)] mt-1">The best experience in Raglan</p>
                <div className="flex gap-2 mt-4">
                  <div className="h-10 px-4 rounded-lg bg-accent-500 flex items-center">
                    <span className="text-xs text-white font-medium">Book now</span>
                  </div>
                  <div className="h-10 px-4 rounded-lg border border-accent-500/30 flex items-center">
                    <span className="text-xs text-accent-500 font-medium">View menu</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-accent-600 dark:text-accent-400 text-sm font-medium">
                Found on Google. Customers book online.
              </p>
            </div>
          }
        />

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Drag the slider to compare
        </p>
      </div>
    </section>
  );
}

/* ═══ Stats comparison ═══ */
function StatsBA() {
  const stats = [
    { label: "Google visibility", before: 0, after: 1, prefix: "#", suffix: " ranking" },
    { label: "Monthly visitors", before: 12, after: 340, suffix: "/mo" },
    { label: "Online bookings", before: 0, after: 28, suffix: "/mo" },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-hand text-xl text-accent-500 mb-3">The numbers</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Before vs. after — in real numbers.
        </h2>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
              <p className="text-xs text-[var(--muted)] mb-4 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-warm-400 line-through">
                    {stat.prefix}{stat.before}{stat.suffix}
                  </p>
                  <p className="text-[10px] text-[var(--muted)]">Before</p>
                </div>
                <svg className="w-5 h-5 text-accent-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-500">
                    <AnimatedCounter value={stat.after} prefix={stat.prefix ?? ""} suffix={stat.suffix} duration={2} />
                  </div>
                  <p className="text-[10px] text-accent-500">After</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ Services as B/A ═══ */
function ServicesBA() {
  const services = [
    { name: "Web Design", icon: Monitor, before: "No website or outdated DIY page", after: "Custom, mobile-first, SEO-ready site" },
    { name: "SEO & Google", icon: Search, before: "Invisible on search results", after: "#1 for local searches" },
    { name: "Social Media", icon: Share2, before: "Empty or abandoned profiles", after: "3x/week quality content" },
    { name: "Copywriting", icon: FileText, before: "\"We have good food come visit\"", after: "Copy that converts visitors to customers" },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-hand text-xl text-accent-500 mb-3">What I do</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Every service transforms your business.
        </h2>

        <div className="space-y-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.name} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent-500" />
                  </div>
                  <h3 className="font-semibold">{service.name}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-warm-100 dark:bg-warm-800/50">
                    <p className="text-[10px] uppercase tracking-wider text-warm-500 mb-1">Before</p>
                    <p className="text-sm text-warm-600 dark:text-warm-400">{service.before}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-950/30">
                    <p className="text-[10px] uppercase tracking-wider text-accent-500 mb-1">After</p>
                    <p className="text-sm text-[var(--foreground)]">{service.after}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══ Tools ═══ */
function ToolsBA() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-hand text-xl text-accent-500 mb-3">See for yourself</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Test your website. Free.
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-lg mx-auto">
          Run a free audit right now and see where you stand — before and after.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { label: "SEO Audit", href: "/tools/seo-audit" },
            { label: "Speed Test", href: "/tools/speed-checker" },
            { label: "Meta Generator", href: "/tools/meta-generator" },
            { label: "Digital Checklist", href: "/tools/digital-checklist" },
          ].map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className="h-10 px-5 inline-flex items-center rounded-xl border border-[var(--border)] text-sm font-medium hover:border-accent-500/30 hover:bg-accent-500/5 transition-all"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ Who ═══ */
function WhoBA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="shrink-0 relative group cursor-pointer">
          <ZagExpression defaultExpression="smile" hoverExpression="happy" size={120} className="rounded-2xl" />
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <span className="font-hand text-lg text-accent-500">I&apos;m here</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">I&apos;m Zadig.</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            I studied audiovisual in France, worked at a digital agency, then moved to Raglan.
            Locals told me there was work here. So I started. No big portfolio yet — but I built
            free tools you can try right now. Fair prices. You own everything. No lock-in.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTABA() {
  return (
    <section className="py-24 md:py-32 px-6 bg-accent-500">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Which side do you want to be on?
        </h2>
        <p className="mt-4 text-lg text-white/80">Let&apos;s move your business to the &quot;after&quot; column.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/contact" className="h-12 px-8 inline-flex items-center rounded-xl bg-white text-accent-600 text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg">
              Send a message
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="https://wa.me/64221234567" target="_blank" rel="noopener noreferrer" className="h-12 px-8 inline-flex items-center gap-2 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              WhatsApp me
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterAxe() {
  return (
    <>
      <HeroBA />
      <StatsBA />
      <ServicesBA />
      <ToolsBA />
      <WhoBA />
      <CTABA />
    </>
  );
}
