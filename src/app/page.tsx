"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Gauge, FileText, ClipboardCheck, BookOpen, Share2 } from "lucide-react";
import { ZagExpression } from "@/components/zag-expression";
import { IntroAnimation } from "@/components/intro-animation";
import { AuroraBackground } from "@/components/aurora-bg";

const iconClass = "w-5 h-5 text-accent-500";

export default function Home() {
  return (
    <>
      <IntroAnimation />

      {/* ═══ HERO ═══ */}
      <AuroraBackground className="min-h-[70vh] flex items-center">
        <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-20 w-full">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <p className="font-hand text-xl text-accent-500 mb-3">Hey, I&apos;m Zadig</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                I build websites for
                <br />
                small businesses in
                <br />
                <span className="text-accent-500">New Zealand.</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--muted)] max-w-lg leading-relaxed">
                I make websites and free tools for small businesses. Based in Raglan, NZ.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/services"
                  className="h-11 px-6 inline-flex items-center rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
                >
                  What I offer
                </Link>
                <Link
                  href="/contact"
                  className="h-11 px-6 inline-flex items-center rounded-xl border border-[var(--border)] text-sm font-medium hover:border-accent-500/30 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block shrink-0 -mr-10 lg:-mr-16"
            >
              <div className="-scale-x-100">
                <ZagExpression
                  defaultExpression="smile"
                  hoverExpression="laugh"
                  size={260}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>

      {/* ═══ TOOLS ═══ */}
      <section className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Check your website.
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Free. No sign-up.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: "SEO Audit", desc: "What Google sees.", href: "/tools/seo-audit", icon: <Search className={iconClass} /> },
              { title: "Speed Test", desc: "How fast it loads.", href: "/tools/speed-checker", icon: <Gauge className={iconClass} /> },
              { title: "Meta Generator", desc: "Your Google listing.", href: "/tools/meta-generator", icon: <FileText className={iconClass} /> },
              { title: "Digital Checklist", desc: "Full presence check.", href: "/tools/digital-checklist", icon: <ClipboardCheck className={iconClass} /> },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5 transition-all duration-300"
              >
                {tool.icon}
                <h3 className="font-semibold text-sm mt-3">{tool.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEARN ═══ */}
      <section className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Learn.</h2>
            <Link href="/learn" className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors">
              See all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "The Digital Bible", desc: "Build your online presence from zero.", href: "/learn", icon: <BookOpen className={iconClass} /> },
              { title: "SEO Basics", desc: "How to show up on Google.", href: "/learn", icon: <Search className={iconClass} /> },
              { title: "Social Media Tips", desc: "Content that actually works.", href: "/learn", icon: <Share2 className={iconClass} /> },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/30 transition-all duration-300"
              >
                {item.icon}
                <h3 className="font-semibold text-sm mt-3">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
