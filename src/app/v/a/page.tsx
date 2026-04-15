"use client";

import Link from "next/link";
import { ZagExpression } from "@/components/zag-expression";

/**
 * VERSION A — "The Personal Touch"
 *
 * Ultra-minimal. Feels like a personal page, not a business site.
 * Big illustration, conversational copy, lots of breathing room.
 * Everything fits on ~2 screens. No sections, just a flow.
 */

export default function VersionA() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
        <span className="font-bold text-lg">Raglan <span className="font-hand text-accent-500">Digital</span></span>
        <a
          href="https://wa.me/33752032213?text=Hey%20Zag"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
        >
          Say hi →
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-6">
        {/* Hero — centered, personal */}
        <div className="pt-16 pb-20 text-center">
          <div className="inline-block mb-8">
            <ZagExpression
              defaultExpression="smile"
              hoverExpression="laugh"
              size={120}
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl mx-auto">
            I help small businesses
            <br />
            <span className="text-accent-500">get found online</span>
          </h1>

          <p className="mt-6 text-lg text-[var(--muted)] max-w-md mx-auto leading-relaxed">
            Web design, SEO, content — done right, done simply, done by one person who actually cares.
          </p>
        </div>

        {/* Tools — simple list */}
        <div className="py-12 border-t border-[var(--border)]">
          <p className="font-hand text-xl text-accent-500 mb-6">Free tools — try them now</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "SEO Audit", desc: "See what Google sees", href: "/tools/seo-audit" },
              { title: "Speed Test", desc: "How fast is your site?", href: "/tools/speed-checker" },
              { title: "Meta Generator", desc: "Write your Google listing", href: "/tools/meta-generator" },
              { title: "Digital Checklist", desc: "Check everything at once", href: "/tools/digital-checklist" },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-accent-500/[0.04] transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm">{tool.title}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">{tool.desc}</div>
                </div>
                <span className="text-accent-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* About — one sentence */}
        <div className="py-16 border-t border-[var(--border)]">
          <div className="flex items-start gap-8">
            <ZagExpression
              defaultExpression="neutral"
              hoverExpression="happy"
              size={72}
              className="shrink-0 hidden sm:block"
            />
            <div>
              <p className="text-xl md:text-2xl font-bold leading-relaxed tracking-tight">
                No big agency fluff. Just me — building websites, managing SEO, and creating content for businesses all over New Zealand.
              </p>
              <Link href="/about" className="mt-4 inline-block text-sm text-accent-500 hover:text-accent-600 transition-colors font-medium">
                More about me →
              </Link>
            </div>
          </div>
        </div>

        {/* Social proof — minimal */}
        <div className="py-12 border-t border-[var(--border)]">
          <div className="space-y-6">
            {[
              { quote: "Zag showed us what was actually wrong in 5 minutes.", name: "Tom", role: "Plumber, Tauranga" },
              { quote: "Clean, fast, and exactly what we needed. Just done.", name: "Sarah", role: "Cafe owner, Raglan" },
              { quote: "No one had ever shown me that before. Brilliant stuff.", name: "Richard", role: "Osteopath, Hamilton" },
            ].map((t) => (
              <div key={t.name} className="flex items-start gap-4">
                <span className="font-hand text-2xl text-accent-500/40 leading-none mt-1">&ldquo;</span>
                <div>
                  <p className="text-sm leading-relaxed">{t.quote}</p>
                  <p className="text-xs text-[var(--muted)] mt-1">{t.name} — {t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 text-center border-t border-[var(--border)]">
          <ZagExpression
            defaultExpression="happy"
            hoverExpression="laugh"
            size={64}
            className="inline-block mb-4 hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Want to chat?</h2>
          <p className="mt-3 text-[var(--muted)] text-sm max-w-sm mx-auto">
            Tell me about your business. I&apos;ll get back to you within 24 hours.
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
      </main>

      <footer className="text-center py-8 text-xs text-[var(--muted)] border-t border-[var(--border)]">
        Raglan Digital — Built with care in New Zealand
      </footer>
    </div>
  );
}
