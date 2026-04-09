"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/whatsapp-cta";

export default function MetaGeneratorPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generated, setGenerated] = useState<{ titles: string[]; descriptions: string[] } | null>(null);

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    const kw = keywords.split(",").map((k) => k.trim()).filter(Boolean);
    const kwStr = kw.length > 0 ? kw.slice(0, 2).join(" & ") : businessType;

    const titles = [
      `${businessName} | ${businessType} in ${location}`,
      `${businessName} — ${location}'s Trusted ${businessType}`,
      `${kwStr} | ${businessName}, ${location}`,
      `${businessName}: Professional ${businessType} in ${location}`,
    ].filter((t) => t.length <= 70);

    if (titles.length === 0) {
      titles.push(`${businessName} | ${businessType}`);
    }

    const descriptions = [
      `${businessName} provides professional ${businessType.toLowerCase()} services in ${location}. ${kw[0] ? `Specialising in ${kw.slice(0, 3).join(", ")}. ` : ""}Get in touch for a free quote today.`,
      `Looking for a reliable ${businessType.toLowerCase()} in ${location}? ${businessName} delivers quality results at fair prices. ${kw[0] ? `${kw[0]}, ${kw[1] || businessType.toLowerCase()} and more.` : "Contact us today."}`,
      `${businessName} helps ${location} businesses with ${kwStr.toLowerCase()}. Honest work, fair prices, real results. Get your free quote now.`,
    ];

    setGenerated({ titles, descriptions });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/tools" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← Back to tools
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">Meta Tag Generator</h1>
        <p className="mt-3 text-[var(--muted)]">
          Tell me about your business. I&apos;ll write the text that shows up when people Google you.
        </p>

        <form onSubmit={generate} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Business name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Smith's Plumbing"
              required
              className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Business type</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="e.g. Plumber, Cafe, Surf Shop"
              required
              className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Raglan, Hamilton, Auckland"
              required
              className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Keywords <span className="text-[var(--muted)] font-normal">(comma separated)</span></label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. emergency plumber, hot water, drain cleaning"
              className="w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-6 rounded-xl bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
          >
            Generate meta tags
          </button>
        </form>

        {generated && (
          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-lg font-bold mb-4">Title tags</h2>
              <div className="space-y-3">
                {generated.titles.map((title, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-sm text-blue-600 dark:text-blue-400">{title}</p>
                        <p className="text-xs text-[var(--muted)] mt-1">{title.length}/60 characters {title.length > 60 ? "— too long, may get cut off" : "— good length"}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="text-xs px-2 py-1 rounded bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Meta descriptions</h2>
              <div className="space-y-3">
                {generated.descriptions.map((desc, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm">{desc}</p>
                        <p className="text-xs text-[var(--muted)] mt-1">{desc.length}/160 characters {desc.length > 160 ? "— consider shortening" : "— good length"}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(desc)}
                        className="text-xs px-2 py-1 rounded bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
                      >
                        Copy
                      </button>
                    </div>
                    {/* Google preview */}
                    <div className="mt-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <p className="text-xs text-[var(--muted)] mb-1">Google preview:</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate">{generated.titles[0]}</p>
                      <p className="text-xs text-success-600 dark:text-success-400">yourwebsite.co.nz</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <WhatsAppCTA
              result="Meta Generator tool and got some tag suggestions"
              nextTool={{ title: "Digital Checklist", href: "/tools/digital-checklist" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
