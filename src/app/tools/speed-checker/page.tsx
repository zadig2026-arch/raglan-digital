"use client";

import { useState } from "react";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { FloatingBack } from "@/components/floating-back";
import { runSpeedCheck, type SpeedResult } from "@/app/actions/speed-check";

const statusDot = { good: "bg-success-500", ok: "bg-accent-500", poor: "bg-red-500" };

export default function SpeedCheckerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await runSpeedCheck(url);
      setResult(data);
    } catch {
      setError(
        "Couldn't run the speed test. Please check the URL is correct and the site is reachable."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-20">
      <FloatingBack href="/tools" label="Back to tools" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Speed Test</h1>
        <p className="mt-3 text-[var(--muted)]">
          Enter your URL. I&apos;ll run a real Google PageSpeed test and show you how fast your site loads on mobile.
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
            {loading ? "Testing..." : "Check speed"}
          </button>
        </form>

        {loading && (
          <div className="mt-10 text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-sm text-[var(--muted)]">Running Google PageSpeed analysis... This can take 15-30 seconds.</p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {result && !loading && (
          <div className="mt-10 space-y-6">
            <div className="text-center p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className={`text-5xl font-bold ${result.score >= 70 ? "text-success-600 dark:text-success-400" : result.score >= 40 ? "text-accent-600 dark:text-accent-400" : "text-red-600 dark:text-red-400"}`}>
                {result.score}
              </div>
              <div className="mt-2 text-sm text-[var(--muted)]">Google PageSpeed performance score (mobile)</div>
              <div className="mt-3 flex items-center justify-center gap-6 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success-500" /> Good</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-500" /> Needs work</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Poor</span>
              </div>
            </div>

            <div className="space-y-3">
              {result.metrics.map((metric) => (
                <div key={metric.label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${statusDot[metric.status]}`} />
                      <span className="font-medium text-sm">{metric.label}</span>
                    </div>
                    <span className="font-mono text-sm font-medium">{metric.value}</span>
                  </div>
                  <p className="mt-2 ml-5.5 text-sm text-[var(--muted)]">{metric.tip}</p>
                </div>
              ))}
            </div>

            <WhatsAppCTA
              result={`Speed Test and scored ${result.score}/100`}
              nextTool={{ title: "Meta Generator", href: "/tools/meta-generator" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
