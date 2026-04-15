"use client";

import Link from "next/link";
import { ZagExpression } from "@/components/zag-expression";

/**
 * VERSION B — "The Confident Pro"
 *
 * Split hero with illustration on left. Clean horizontal rhythm.
 * Professional but warm. The illustration grounds the brand visually.
 * Slightly more structured than A, but still minimal.
 */

export default function VersionB() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <span className="font-bold text-lg">Raglan <span className="font-hand text-accent-500">Digital</span></span>
        <div className="flex items-center gap-6">
          <Link href="/tools" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Tools</Link>
          <Link href="/services" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Services</Link>
          <Link href="/learn" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Learn</Link>
          <a
            href="https://wa.me/33752032213?text=Hey%20Zag"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 flex items-center rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6">
        {/* Hero — split layout */}
        <div className="pt-20 pb-24 flex items-center gap-16">
          <div className="shrink-0 hidden md:block">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-accent-100/50" />
              <ZagExpression
                defaultExpression="smile"
                hoverExpression="laugh"
                size={220}
                className="relative"
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-hand text-xl text-accent-500 mb-3">Hey, I&apos;m Zag</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              I build websites
              <br />
              that <span className="text-accent-500">actually work</span>
              <br />
              for your business.
            </h1>
            <p className="mt-6 text-[var(--muted)] max-w-md leading-relaxed">
              Web design, SEO and digital growth for small businesses in New Zealand. One person. No fluff. Real results.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://wa.me/33752032213?text=Hey%20Zag%2C%20I%27d%20like%20to%20chat%20about%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-6 flex items-center rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors text-sm"
              >
                Get in touch
              </a>
              <Link href="/tools" className="text-sm font-medium text-[var(--muted)] hover:text-accent-500 transition-colors">
                or try my free tools →
              </Link>
            </div>
          </div>
        </div>

        {/* What I do — horizontal cards */}
        <div className="py-16 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">What I do</h2>
            <Link href="/services" className="text-xs text-accent-500 font-medium hover:text-accent-600 transition-colors">See pricing →</Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Web Design", desc: "Fast, clean websites built to convert visitors into customers.", price: "From $599" },
              { title: "SEO & Google", desc: "Get found when people search for what you do.", price: "From $299/mo" },
              { title: "Content & Social", desc: "Words and posts that sound like you, not a robot.", price: "From $199/mo" },
            ].map((s) => (
              <div key={s.title} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <h3 className="font-bold text-sm">{s.title}</h3>
                <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>
                <p className="mt-3 text-xs font-semibold text-accent-500">{s.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Free tools — strip */}
        <div className="py-12 border-t border-[var(--border)]">
          <p className="font-hand text-lg text-accent-500 mb-1">Try before you talk</p>
          <p className="text-sm text-[var(--muted)] mb-6">Free tools to check where your business stands online.</p>

          <div className="flex flex-wrap gap-2">
            {[
              { title: "SEO Audit", href: "/tools/seo-audit" },
              { title: "Speed Test", href: "/tools/speed-checker" },
              { title: "Meta Generator", href: "/tools/meta-generator" },
              { title: "Digital Checklist", href: "/tools/digital-checklist" },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="h-9 px-4 flex items-center rounded-lg border border-[var(--border)] text-sm font-medium hover:border-accent-500/40 hover:text-accent-500 transition-all"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Testimonials — inline with Zag reactions */}
        <div className="py-16 border-t border-[var(--border)]">
          <h2 className="text-xl font-bold mb-8">What people say</h2>

          <div className="space-y-6">
            {[
              { quote: "I ran Zag's tools on my website and instantly saw what was holding me back. No one had ever shown me that before. Brilliant stuff.", name: "Richard", role: "Osteopath, Hamilton", expr: { d: "smile" as const, h: "happy" as const } },
              { quote: "Zag built our website in a week. Clean, fast, and exactly what we needed. No back and forth, no nonsense. Just done.", name: "Sarah", role: "Cafe owner, Raglan", expr: { d: "happy" as const, h: "laugh" as const } },
              { quote: "We were paying $300/month for SEO and getting nothing. Zag showed us what was actually wrong in 5 minutes. Game changer.", name: "Tom", role: "Plumber, Tauranga", expr: { d: "neutral" as const, h: "smile" as const } },
            ].map((t) => (
              <div key={t.name} className="group flex items-start gap-4 p-5 rounded-2xl hover:bg-[var(--surface)] transition-colors">
                <ZagExpression
                  defaultExpression={t.expr.d}
                  hoverExpression={t.expr.h}
                  size={40}
                  className="shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div>
                  <p className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-[var(--muted)] mt-2 font-medium">{t.name} — {t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 border-t border-[var(--border)]">
          <div className="flex items-center gap-10">
            <div className="flex-1">
              <p className="font-hand text-xl text-accent-500 mb-2">Ready?</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Let&apos;s build something that works for you.
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)] max-w-md">
                Send me a message about your business. No commitment. I&apos;ll reply within 24 hours with honest advice.
              </p>
              <a
                href="https://wa.me/33752032213?text=Hey%20Zag%2C%20I%27d%20like%20to%20chat%20about%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent-500 text-white font-semibold mt-6 hover:bg-accent-600 transition-colors gap-2 text-sm"
              >
                Message me on WhatsApp
              </a>
            </div>
            <div className="hidden md:block shrink-0">
              <ZagExpression
                defaultExpression="happy"
                hoverExpression="laugh"
                size={140}
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-[var(--muted)] border-t border-[var(--border)]">
        Raglan Digital — Built with care in New Zealand
      </footer>
    </div>
  );
}
