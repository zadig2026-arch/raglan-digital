"use client";

import Link from "next/link";
import { Search, Gauge, FileText, ClipboardCheck, Smartphone } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { TextReveal } from "@/components/text-reveal";
import { GoogleSearchMockup } from "@/components/google-search-mockup";
import { StickyServiceShowcase } from "@/components/sticky-service-showcase";
import { AnimatedCounter } from "@/components/animated-counter";
import { Magnetic } from "@/components/magnetic";
import { ScrollProgress } from "@/components/scroll-progress";
import { ZagExpression } from "@/components/zag-expression";

function ChapterProblem() {
  const searchResults = [
    {
      title: "Your Competitor — Best Coffee on the Coast",
      url: "yourcompetitor.co.nz",
      description: "Honestly? You should be the one ranked here. Not us.",
      stars: 4.7,
      reviews: 312,
    },
    {
      title: "Not Your Business — Food & Drinks",
      url: "notyourbusiness.nz",
      description: "Your cafe is probably better. Your SEO... isn't.",
      stars: 4.3,
      reviews: 189,
    },
    {
      title: "Still Not Your Business — Brunch & Coffee",
      url: "stillnotyourbusiness.co.nz",
      description: "Single-origin coffee and seasonal brunch. Ranks above you since 2023. Thanks.",
      stars: 4.5,
      reviews: 204,
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <TextReveal
          text="You know your business is great. But when someone searches online — you don't show up. Your competitor does."
          className="text-2xl md:text-4xl font-bold tracking-tight leading-snug"
        />

        <div className="mt-12">
          <GoogleSearchMockup query="cafe in raglan" results={searchResults} />
        </div>

        <p className="mt-8 text-center text-[var(--muted)] text-sm">
          Your customers are searching. Are they finding you?
        </p>
      </div>
    </section>
  );
}

const diagnostics = [
  {
    icon: Search,
    stat: "73%",
    caption: "of local searches lead to a visit within 24 hours.",
    problem: "But only if your business shows up. Most don't.",
    cta: "Audit your SEO",
    href: "/tools/seo-audit",
  },
  {
    icon: Gauge,
    stat: "53%",
    caption: "of visitors leave if your site takes more than 3 seconds.",
    problem: "Slow sites lose customers before they even see your offer.",
    cta: "Test your speed",
    href: "/tools/speed-checker",
  },
  {
    icon: Smartphone,
    stat: "60%",
    caption: "of all searches happen on a phone.",
    problem: "If your site isn't mobile-friendly, you're invisible to most people.",
    cta: "Check your site",
    href: "/tools/digital-checklist",
  },
];

function ChapterDiagnostic() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto">
        <p className="font-hand text-xl text-accent-500 mb-3 text-center">Free diagnosis</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
          Is your website working?
        </h2>
        <p className="text-center text-[var(--muted)] mb-12 max-w-lg mx-auto">
          Most small business sites have these problems. Test yours in 30 seconds.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {diagnostics.map((d) => {
            const Icon = d.icon;
            return (
              <Link
                key={d.href}
                href={d.href}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-lg transition-all"
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
            );
          })}
        </div>

        {/* All free tools */}
        <p className="mt-10 text-center font-hand text-lg text-accent-500 mb-4">Test, don&apos;t guess.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "SEO Audit", icon: Search, href: "/tools/seo-audit" },
            { title: "Speed Test", icon: Gauge, href: "/tools/speed-checker" },
            { title: "Meta Generator", icon: FileText, href: "/tools/meta-generator" },
            { title: "Digital Checklist", icon: ClipboardCheck, href: "/tools/digital-checklist" },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center shrink-0 group-hover:bg-accent-500/20 transition-colors">
                  <Icon className="w-4 h-4 text-accent-500" />
                </div>
                <span className="text-sm font-medium">{tool.title}</span>
              </Link>
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

function ChapterTransformation() {
  const stats = [
    { value: 1, prefix: "#", suffix: " on Google", label: "Search ranking" },
    { value: 340, suffix: "/mo", label: "Website visitors" },
    { value: 4.8, suffix: " ★", label: "Google rating" },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-hand text-xl text-accent-500 mb-3">What changes</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          That&apos;s the difference a good website makes.
        </h2>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-2xl bg-[var(--background)] border border-[var(--border)]"
            >
              <div className="text-4xl md:text-5xl font-bold text-accent-500">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ChapterWho() {
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

function ChapterCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-accent-500">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Ready? Let&apos;s chat.
        </h2>
        <p className="mt-4 text-lg text-white/80">
          No pressure. Just a conversation about what you need.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/contact"
              className="h-12 px-8 inline-flex items-center rounded-xl bg-white text-accent-600 text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Send a message
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 inline-flex items-center gap-2 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.331 0-4.512-.637-6.39-1.747l-.446-.269-3.152 1.057 1.057-3.152-.269-.446A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp me
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export function StorytellingAxe() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <ChapterProblem />
      <ChapterDiagnostic />
      <ChapterTransformation />
      <StickyServiceShowcase />
      <ChapterWho />
      <ChapterCTA />
    </>
  );
}
