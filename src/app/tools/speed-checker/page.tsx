"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingBack } from "@/components/floating-back";
import { EmailGate } from "@/components/email-gate";
import { runSpeedCheck, type SpeedResult } from "@/app/actions/speed-check";

const statusDot = { good: "bg-success-500", ok: "bg-accent-500", poor: "bg-red-500" };

export default function SpeedCheckerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);
    setUnlocked(false);

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

  const previewMetrics = result?.metrics.slice(0, 2) ?? [];
  const gatedMetrics = result?.metrics.slice(2) ?? [];

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

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-semibold mb-3">
                Top-line — first 2 metrics
              </p>
              <div className="space-y-3">
                {previewMetrics.map((m) => (
                  <MetricRow key={m.label} metric={m} />
                ))}
              </div>
            </div>

            {!unlocked ? (
              <EmailGate
                source="tool-speed-checker"
                sourceDetail={{
                  tool_score: result.score,
                  audit_url: result.url,
                  metrics_total: result.metrics.length,
                }}
                reportPayload={{
                  kind: "speed-checker",
                  score: result.score,
                  url: result.url,
                  metrics: result.metrics,
                }}
                onCaptured={() => setUnlocked(true)}
                heading={`See the remaining ${gatedMetrics.length} metrics + my fix tips.`}
                body="Full Core Web Vitals breakdown and prioritized recommendations, sent to your inbox."
                cta="Email me the speed report"
              />
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-success-500/10 border border-success-500/30 flex items-start gap-3">
                  <span className="text-success-600 dark:text-success-400 text-lg leading-none mt-0.5">✓</span>
                  <div className="text-sm">
                    <p className="font-semibold text-success-700 dark:text-success-300">
                      Report sent.
                    </p>
                    <p className="text-[var(--muted)] mt-1">
                      Check your inbox. Below is the full breakdown too.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-semibold mb-3">
                    Full metrics · {result.metrics.length} signals
                  </p>
                  <div className="space-y-3">
                    {gatedMetrics.map((m) => (
                      <MetricRow key={m.label} metric={m} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-7 rounded-3xl bg-[var(--foreground)] text-[var(--background)] text-center">
                  <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-semibold mb-3">
                    A faster site = more customers
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    $399 launch site, optimized for speed.
                  </h3>
                  <p className="mt-3 text-sm opacity-80 max-w-md mx-auto">
                    Live in 5–10 days. Mobile-first. Built for Core Web Vitals.
                  </p>
                  <Link
                    href="/launch"
                    className="mt-6 inline-flex h-11 px-6 items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
                  >
                    See the launch offer →
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricRow({
  metric,
}: {
  metric: { label: string; value: string; status: "good" | "ok" | "poor"; tip: string };
}) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${statusDot[metric.status]}`} />
          <span className="font-medium text-sm">{metric.label}</span>
        </div>
        <span className="font-mono text-sm font-medium">{metric.value}</span>
      </div>
      <p className="mt-2 ml-5 text-sm text-[var(--muted)]">{metric.tip}</p>
    </div>
  );
}
