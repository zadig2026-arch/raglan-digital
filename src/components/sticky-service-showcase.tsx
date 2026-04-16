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
    tagline: "From blank page to beautiful site.",
    description: "A clean, fast website designed around your brand — built to convert visitors into customers.",
  },
  {
    id: "seo",
    name: "SEO & Google Business",
    icon: Search,
    tagline: "Get found when people search.",
    description: "Local SEO, Google Business Profile, keyword optimization — so your customers find you first.",
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Share2,
    tagline: "Content that actually works.",
    description: "Consistent, quality content on Facebook and Instagram — so you can focus on your business.",
  },
  {
    id: "content",
    name: "Content & Copywriting",
    icon: FileText,
    tagline: "Words that sound like you.",
    description: "SEO-friendly copy for your website, blog, emails, and social media — no robot speak.",
  },
];

function WebDesignDemo({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));

  return (
    <BrowserMockup url="yourbusiness.co.nz">
      <div className="p-6 min-h-[280px] relative overflow-hidden">
        {/* Wireframe layer */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-700"
          style={{ opacity: p < 0.5 ? 1 : 0 }}
        >
          <div className="h-8 w-32 rounded bg-warm-200 dark:bg-warm-700 mb-4" />
          <div className="h-4 w-48 rounded bg-warm-200 dark:bg-warm-700 mb-2" />
          <div className="h-4 w-40 rounded bg-warm-200 dark:bg-warm-700 mb-6" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded bg-warm-200 dark:bg-warm-700" />
            <div className="h-24 rounded bg-warm-200 dark:bg-warm-700" />
            <div className="h-24 rounded bg-warm-200 dark:bg-warm-700" />
          </div>
          <div className="h-10 w-28 rounded-lg bg-warm-300 dark:bg-warm-600 mt-6" />
        </div>

        {/* Finished site layer */}
        <div
          className="absolute inset-0 p-6 transition-opacity duration-700"
          style={{ opacity: p >= 0.5 ? 1 : 0 }}
        >
          <div className="h-8 w-32 rounded bg-accent-500 mb-4 flex items-center px-3">
            <span className="text-xs text-white font-bold">Your Brand</span>
          </div>
          <h3 className="text-lg font-bold">Welcome to Your Business</h3>
          <p className="text-sm text-[var(--muted)] mt-1">The best experience in Raglan</p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="h-24 rounded-lg bg-accent-100 dark:bg-accent-950 flex items-center justify-center">
              <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Menu</span>
            </div>
            <div className="h-24 rounded-lg bg-accent-100 dark:bg-accent-950 flex items-center justify-center">
              <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Gallery</span>
            </div>
            <div className="h-24 rounded-lg bg-accent-100 dark:bg-accent-950 flex items-center justify-center">
              <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Reviews</span>
            </div>
          </div>
          <div className="h-10 w-28 rounded-lg bg-accent-500 mt-6 flex items-center justify-center">
            <span className="text-xs text-white font-medium">Book now</span>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SEODemo({ progress }: { progress: number }) {
  const barHeight = Math.min(1, Math.max(0, progress));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [12, 28, 45, 89, 156, 340];

  return (
    <BrowserMockup url="analytics.google.com">
      <div className="p-6 min-h-[280px]">
        <p className="text-xs text-[var(--muted)] mb-1">Monthly visitors</p>
        <p className="text-3xl font-bold text-accent-500">
          {Math.round(values[values.length - 1] * barHeight)}
        </p>
        <div className="flex items-end gap-2 mt-6 h-36">
          {months.map((month, i) => {
            const maxVal = Math.max(...values);
            const h = (values[i] / maxVal) * 100 * barHeight;
            return (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-accent-500/80 transition-all duration-700 ease-out"
                  style={{ height: `${h}%`, minHeight: h > 0 ? 4 : 0 }}
                />
                <span className="text-[10px] text-[var(--muted)]">{month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </BrowserMockup>
  );
}

function SocialDemo({ progress }: { progress: number }) {
  const count = Math.floor(progress * 3);
  const posts = [
    { text: "New summer menu is here!", bg: "bg-accent-100 dark:bg-accent-950" },
    { text: "Thanks for 100 five-star reviews!", bg: "bg-success-400/10" },
    { text: "Live music this Friday 🎶", bg: "bg-warm-100 dark:bg-warm-800" },
  ];

  return (
    <BrowserMockup url="instagram.com/yourbusiness">
      <div className="p-6 min-h-[280px]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">YB</span>
          </div>
          <div>
            <p className="text-sm font-semibold">yourbusiness</p>
            <p className="text-xs text-[var(--muted)]">{Math.round(progress * 847)} followers</p>
          </div>
        </div>
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl ${post.bg} transition-all duration-500`}
              style={{
                opacity: i <= count ? 1 : 0.15,
                transform: i <= count ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <p className="text-sm">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserMockup>
  );
}

function ContentDemo({ progress }: { progress: number }) {
  const showPolished = progress > 0.5;

  return (
    <BrowserMockup url="docs.google.com">
      <div className="p-6 min-h-[280px] font-mono text-sm leading-relaxed">
        <div
          className="transition-all duration-700 space-y-3"
          style={{ opacity: showPolished ? 0 : 1, position: showPolished ? "absolute" : "relative" }}
        >
          <p className="text-[var(--muted)] line-through decoration-red-400/50">
            we have good food and nice place come visit us
          </p>
          <p className="text-[var(--muted)] line-through decoration-red-400/50">
            our cafe is the best in raglan new zealand
          </p>
          <p className="text-[var(--muted)] line-through decoration-red-400/50">
            we do catering and stuff too
          </p>
        </div>
        <div
          className="transition-all duration-700 space-y-3"
          style={{ opacity: showPolished ? 1 : 0 }}
        >
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
      </div>
    </BrowserMockup>
  );
}

const demos = [WebDesignDemo, SEODemo, SocialDemo, ContentDemo];

export function StickyServiceShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${services.length * 60}vh` }}>
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
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3]);
  const x = useTransform(progress, [start, start + 0.05, end - 0.05, end], [-8, 0, 0, -8]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-start gap-3 p-4 rounded-xl transition-colors"
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
          <Demo progress={0.8} />
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
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.05, end - 0.05, end], [40, 0, 0, -40]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}
