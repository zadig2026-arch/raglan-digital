"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Search, Share2, FileText, Gauge, ClipboardCheck } from "lucide-react";
import { BrowserMockup } from "@/components/browser-mockup";
import { Magnetic } from "@/components/magnetic";
import { ZagExpression } from "@/components/zag-expression";

type Persona = null | "no-site" | "bad-site";

const personas = {
  "no-site": {
    headline: "Let's build your online presence from scratch.",
    subtitle: "You'll have a website, Google listing, and social media — all working together.",
    services: [
      { name: "Web Design", icon: Monitor, desc: "A clean, fast website designed around your brand. Mobile-first, SEO-ready, built to convert." },
      { name: "Google Business", icon: Search, desc: "Get listed on Google Maps and search. Your customers will find you when they search locally." },
      { name: "Social Media", icon: Share2, desc: "Consistent content on Facebook and Instagram. I handle the posting so you focus on your business." },
      { name: "Copywriting", icon: FileText, desc: "Website copy, social captions, and a brand voice guide. Words that sound like you, not a robot." },
    ],
    tools: [
      { label: "Digital Checklist", desc: "See what you're missing", href: "/tools/digital-checklist" },
      { label: "Meta Generator", desc: "Preview your Google listing", href: "/tools/meta-generator" },
    ],
    cta: "Let's build it together",
  },
  "bad-site": {
    headline: "Let's fix what's not working.",
    subtitle: "We'll find the problems, fix them, and get you ranking where you should be.",
    services: [
      { name: "SEO & Google", icon: Search, desc: "Full SEO audit, keyword optimization, and Google Business Profile management. Get found first." },
      { name: "Speed & Performance", icon: Gauge, desc: "A slow site costs you customers. I'll optimize load times and Core Web Vitals." },
      { name: "Redesign", icon: Monitor, desc: "If the site looks outdated, we rebuild it. Modern, mobile-first, and conversion-optimized." },
      { name: "Content Strategy", icon: FileText, desc: "Blog posts, landing pages, and copy that ranks. SEO-friendly content that drives traffic." },
    ],
    tools: [
      { label: "SEO Audit", desc: "See what Google sees", href: "/tools/seo-audit" },
      { label: "Speed Test", desc: "How fast you load", href: "/tools/speed-checker" },
    ],
    cta: "Let's fix it together",
  },
};

function PersonaChoice({ onChoose }: { onChoose: (p: Persona) => void }) {
  return (
    <section className="min-h-[80vh] flex items-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-hand text-xl text-accent-500 mb-3">Hey, I&apos;m Zadig</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
          Tell me about your situation.
        </h1>
        <p className="text-lg text-[var(--muted)] mb-12">
          I&apos;ll show you exactly how I can help.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => onChoose("no-site")}
            className="group p-8 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] hover:border-accent-500 hover:shadow-xl hover:shadow-accent-500/5 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-warm-200 dark:bg-warm-700 flex items-center justify-center mb-4 group-hover:bg-accent-500/10 transition-colors">
              <Monitor className="w-6 h-6 text-warm-500 group-hover:text-accent-500 transition-colors" />
            </div>
            <h3 className="text-lg font-bold mb-2">I don&apos;t have a website</h3>
            <p className="text-sm text-[var(--muted)]">
              I need to get my business online for the first time.
            </p>
          </button>

          <button
            onClick={() => onChoose("bad-site")}
            className="group p-8 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] hover:border-accent-500 hover:shadow-xl hover:shadow-accent-500/5 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-warm-200 dark:bg-warm-700 flex items-center justify-center mb-4 group-hover:bg-accent-500/10 transition-colors">
              <Search className="w-6 h-6 text-warm-500 group-hover:text-accent-500 transition-colors" />
            </div>
            <h3 className="text-lg font-bold mb-2">My site isn&apos;t working</h3>
            <p className="text-sm text-[var(--muted)]">
              I have a website but nobody finds it or it looks outdated.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}

function PersonaContent({ persona }: { persona: "no-site" | "bad-site" }) {
  const data = personas[persona];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tailored hero */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{data.headline}</h2>
          <p className="mt-4 text-lg text-[var(--muted)]">{data.subtitle}</p>
        </div>
      </section>

      {/* Services tailored to persona */}
      <section className="py-16 md:py-24 px-6 bg-[var(--surface)]">
        <div className="max-w-4xl mx-auto">
          <p className="font-hand text-xl text-accent-500 mb-3">Here&apos;s how I help</p>
          <div className="mt-6 space-y-4">
            {data.services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-[var(--muted)] mt-1">{service.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended tools */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-hand text-xl text-accent-500 mb-3">Start here</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            Try these tools — free, no sign-up.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.tools.map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/30 hover:shadow-lg transition-all text-left max-w-[200px]"
              >
                <h3 className="font-semibold text-sm">{tool.label}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="py-16 md:py-24 px-6 bg-[var(--surface)]">
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
              Moved to Raglan from France. Worked at a digital agency. Locals told me there was
              work here, so I started. Fair prices. You own everything. No lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-accent-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {data.cta}
          </h2>
          <p className="mt-4 text-lg text-white/80">No pressure. Just a conversation.</p>
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
    </motion.div>
  );
}

export function PersonaAxe() {
  const [persona, setPersona] = useState<Persona>(null);

  return (
    <>
      <AnimatePresence mode="wait">
        {!persona ? (
          <motion.div key="choice" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <PersonaChoice onChoose={setPersona} />
          </motion.div>
        ) : (
          <motion.div key={persona}>
            <div className="px-6 py-4">
              <button
                onClick={() => setPersona(null)}
                className="text-xs text-[var(--muted)] hover:text-accent-500 transition-colors"
              >
                &larr; Choose again
              </button>
            </div>
            <PersonaContent persona={persona} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
