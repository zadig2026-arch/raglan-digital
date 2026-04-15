"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { runSeoAudit, type AuditResult } from "@/app/actions/seo-audit";

const statusIcon = { pass: "\u2713", warn: "!", fail: "\u2715" };
const statusColor = {
  pass: "text-success-600 dark:text-success-400 bg-success-500/10",
  warn: "text-accent-600 dark:text-accent-400 bg-accent-500/10",
  fail: "text-red-600 dark:text-red-400 bg-red-500/10",
};

export default function SeoAuditPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await runSeoAudit(url);
      setResult(data);
    } catch {
      setError("Something went wrong. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/tools" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          &larr; Back to tools
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">SEO Audit</h1>
        <p className="mt-3 text-[var(--muted)]">
          Enter your website URL. I&apos;ll fetch your page and check what Google sees &mdash; title, description, headings, images, and more.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.co.nz"
            className="flex-1 h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-12 px-6 rounded-xl bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Audit"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-6">
            <div className="text-center p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="text-5xl font-bold text-accent-600 dark:text-accent-500">{result.score}/100</div>
              <div className="mt-2 text-sm text-[var(--muted)]">
                {result.score >= 70 ? "Looking good! A few tweaks will make it even better." : result.score >= 40 ? "Decent foundation. There's room for improvement." : "Needs work. Let's fix the basics first."}
              </div>
            </div>

            <div className="space-y-3">
              {result.checks.map((check) => (
                <div key={check.label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${statusColor[check.status]}`}>
                      {statusIcon[check.status]}
                    </span>
                    <span className="font-medium text-sm">{check.label}</span>
                  </div>
                  <p className="mt-2 ml-10 text-sm text-[var(--muted)]">{check.detail}</p>
                </div>
              ))}
            </div>

            <WhatsAppCTA
              result={`SEO Audit tool and scored ${result.score}/100`}
              nextTool={{ title: "Speed Test", href: "/tools/speed-checker" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
