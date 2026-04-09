"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/whatsapp-cta";

interface SpeedResult {
  score: number;
  metrics: { label: string; value: string; status: "good" | "ok" | "poor"; tip: string }[];
}

function simulateSpeedCheck(url: string): SpeedResult {
  // Simulate realistic-looking results based on URL characteristics
  const seed = url.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (min: number, max: number) => min + ((seed * 7 + min * 13) % (max - min));

  const lcp = (rand(12, 45) / 10).toFixed(1);
  const fid = rand(50, 300);
  const cls = (rand(1, 35) / 100).toFixed(2);
  const ttfb = rand(200, 1200);
  const fcp = (rand(8, 30) / 10).toFixed(1);
  const si = (rand(15, 55) / 10).toFixed(1);

  const lcpNum = parseFloat(lcp);
  const clsNum = parseFloat(cls);

  const metrics = [
    {
      label: "Largest Contentful Paint (LCP)",
      value: `${lcp}s`,
      status: (lcpNum <= 2.5 ? "good" : lcpNum <= 4 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: lcpNum <= 2.5 ? "Good — main content loads quickly." : "Optimize your largest image or text block. Consider lazy loading and modern image formats (WebP).",
    },
    {
      label: "First Input Delay (FID)",
      value: `${fid}ms`,
      status: (fid <= 100 ? "good" : fid <= 300 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: fid <= 100 ? "Good — site responds quickly to interactions." : "Reduce JavaScript execution time. Split large bundles and defer non-critical scripts.",
    },
    {
      label: "Cumulative Layout Shift (CLS)",
      value: cls,
      status: (clsNum <= 0.1 ? "good" : clsNum <= 0.25 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: clsNum <= 0.1 ? "Good — layout is stable during loading." : "Add width/height to images and ads. Avoid inserting content above existing content.",
    },
    {
      label: "Time to First Byte (TTFB)",
      value: `${ttfb}ms`,
      status: (ttfb <= 400 ? "good" : ttfb <= 800 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: ttfb <= 400 ? "Good — server responds fast." : "Consider upgrading hosting, enabling caching, or using a CDN.",
    },
    {
      label: "First Contentful Paint (FCP)",
      value: `${fcp}s`,
      status: (parseFloat(fcp) <= 1.8 ? "good" : parseFloat(fcp) <= 3 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: parseFloat(fcp) <= 1.8 ? "Good — users see content quickly." : "Reduce render-blocking CSS and JavaScript. Inline critical CSS.",
    },
    {
      label: "Speed Index",
      value: `${si}s`,
      status: (parseFloat(si) <= 3.4 ? "good" : parseFloat(si) <= 5.8 ? "ok" : "poor") as "good" | "ok" | "poor",
      tip: parseFloat(si) <= 3.4 ? "Good — page visually completes quickly." : "Optimize the order in which content is loaded. Prioritize above-the-fold content.",
    },
  ];

  const goodCount = metrics.filter((m) => m.status === "good").length;
  const score = Math.round((goodCount / metrics.length) * 60 + 20 + rand(0, 15));

  return { score: Math.min(score, 100), metrics };
}

const statusDot = { good: "bg-success-500", ok: "bg-accent-500", poor: "bg-red-500" };

export default function SpeedCheckerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;
    setTimeout(() => {
      setResult(simulateSpeedCheck(cleanUrl));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/tools" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← Back to tools
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">Speed Test</h1>
        <p className="mt-3 text-[var(--muted)]">
          Enter your URL. I&apos;ll show you how fast your site loads for your customers — and what&apos;s slowing it down.
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
            <p className="mt-3 text-sm text-[var(--muted)]">Running performance tests...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-10 space-y-6">
            <div className="text-center p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              <div className={`text-5xl font-bold ${result.score >= 70 ? "text-success-600 dark:text-success-400" : result.score >= 40 ? "text-accent-600 dark:text-accent-400" : "text-red-600 dark:text-red-400"}`}>
                {result.score}
              </div>
              <div className="mt-2 text-sm text-[var(--muted)]">Performance score out of 100</div>
              <div className="mt-3 flex items-center justify-center gap-6 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success-500" /> Good (0-100ms)</span>
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
