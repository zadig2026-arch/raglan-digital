"use client";

import Link from "next/link";
import { ZagExpression } from "@/components/zag-expression";

/**
 * VERSION C — "The Warm Workshop"
 *
 * Centered layout, warm tones, playful but grounded.
 * Uses alternating warm/neutral sections for visual rhythm.
 * The illustrations react to content — expressions tell a story.
 * Feels like walking into someone's workshop.
 */

export default function VersionC() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
        <span className="font-bold text-lg">Raglan <span className="font-hand text-accent-500">Digital</span></span>
        <div className="flex items-center gap-5">
          <Link href="/learn" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Learn</Link>
          <Link href="/services" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Pricing</Link>
          <a
            href="https://wa.me/33752032213?text=Hey%20Zag"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 flex items-center rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>

      <main>
        {/* Hero — warm, centered, illustration above text */}
        <div className="pt-12 pb-20 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-8 py-2 px-4 rounded-full bg-accent-100/60">
              <ZagExpression
                defaultExpression="smile"
                hoverExpression="laugh"
                size={44}
              />
              <span className="text-sm font-medium">Hey! I&apos;m Zag, nice to meet you.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Your business deserves
              <br />
              <span className="text-accent-500">a website that works.</span>
            </h1>

            <p className="mt-6 text-lg text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
              I&apos;m a one-person web studio based in New Zealand. I design, build, and grow websites for small businesses who want real results without the agency price tag.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="https://wa.me/33752032213?text=Hey%20Zag%2C%20I%27d%20like%20to%20chat%20about%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-6 flex items-center rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors text-sm gap-2"
              >
                Let&apos;s talk
              </a>
              <Link href="/tools" className="h-11 px-6 flex items-center rounded-xl border border-[var(--border)] font-medium hover:border-accent-500/40 transition-colors text-sm">
                Try free tools
              </Link>
            </div>
          </div>
        </div>

        {/* How it works — warm bg */}
        <div className="bg-accent-50/50 dark:bg-warm-900/30 py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="font-hand text-xl text-accent-500 text-center mb-8">How it works</p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { n: "1", title: "Check your site", desc: "Run my free tools. Takes 5 minutes. You'll see exactly where you stand.", expr: { d: "neutral" as const, h: "skeptical" as const } },
                { n: "2", title: "Send me results", desc: "Hit the WhatsApp button. I see what you see. No forms, no emails.", expr: { d: "smile" as const, h: "surprised" as const } },
                { n: "3", title: "Get a clear plan", desc: "I tell you what I'd fix first. No commitment, no pressure. Just honesty.", expr: { d: "happy" as const, h: "laugh" as const } },
              ].map((step) => (
                <div key={step.n} className="text-center group">
                  <div className="inline-block relative mb-3">
                    <ZagExpression
                      defaultExpression={step.expr.d}
                      hoverExpression={step.expr.h}
                      size={56}
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">{step.n}</span>
                  </div>
                  <h3 className="font-bold text-sm">{step.title}</h3>
                  <p className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services — clean */}
        <div className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight">Simple, honest pricing</h2>
              <p className="text-sm text-[var(--muted)] mt-2">No hidden fees. No lock-in. Just good work.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Website", desc: "Designed, built, and launched. Fast, clean, yours.", price: "From $599", tag: "one-off" },
                { title: "SEO & Google", desc: "Monthly optimization so people find you first.", price: "From $299/mo", tag: "monthly" },
                { title: "Content & Social", desc: "Posts, copy, and updates that sound like you.", price: "From $199/mo", tag: "monthly" },
              ].map((s) => (
                <div key={s.title} className="p-5 rounded-2xl border border-[var(--border)] hover:border-accent-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-sm">{s.title}</h3>
                    <span className="text-[10px] uppercase tracking-wide text-[var(--muted)] bg-[var(--surface)] px-1.5 py-0.5 rounded">{s.tag}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>
                  <p className="mt-3 text-sm font-bold text-accent-500">{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials — warm bg, big quotes */}
        <div className="bg-accent-50/50 dark:bg-warm-900/30 py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="font-hand text-xl text-accent-500 text-center mb-8">People seem to like it</p>

            <div className="space-y-4">
              {[
                { quote: "I ran Zag's tools on my website and instantly saw what was holding me back. No one had ever shown me that before. Brilliant stuff.", name: "Richard", role: "Osteopath, Hamilton" },
                { quote: "Zag built our website in a week. Clean, fast, and exactly what we needed. No back and forth, no nonsense. Just done.", name: "Sarah", role: "Cafe owner, Raglan" },
                { quote: "We were paying $300/month for SEO and getting nothing. Zag showed us what was actually wrong in 5 minutes. Game changer.", name: "Tom", role: "Plumber, Tauranga" },
              ].map((t) => (
                <div key={t.name} className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-[var(--muted)] mt-3 font-medium">{t.name} — {t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA — personal, warm */}
        <div className="py-24 px-6 text-center">
          <div className="max-w-lg mx-auto">
            <ZagExpression
              defaultExpression="smile"
              hoverExpression="happy"
              size={80}
              className="inline-block mb-5 hover:scale-105 transition-transform duration-500"
            />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Let&apos;s make it happen.
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)] max-w-sm mx-auto">
              Send me a WhatsApp. Tell me about your business. I&apos;ll reply within a few hours with real, honest advice.
            </p>
            <a
              href="https://wa.me/33752032213?text=Hey%20Zag%2C%20I%27d%20like%20to%20chat%20about%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-semibold mt-6 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/15 transition-all gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Message me on WhatsApp
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-xs text-[var(--muted)] border-t border-[var(--border)]">
        Raglan Digital — Built with care in New Zealand
      </footer>
    </div>
  );
}
