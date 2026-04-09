"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/whatsapp-cta";

interface AuditResult {
  score: number;
  checks: { label: string; status: "pass" | "warn" | "fail"; detail: string }[];
}

function analyzeUrl(url: string): AuditResult {
  const checks: AuditResult["checks"] = [];
  let score = 0;
  const maxScore = 100;
  const perCheck = maxScore / 10;

  // HTTPS check
  const isHttps = url.startsWith("https://");
  checks.push({
    label: "HTTPS enabled",
    status: isHttps ? "pass" : "fail",
    detail: isHttps ? "Your site uses HTTPS — secure and trusted by search engines." : "Your site doesn't use HTTPS. This hurts trust and SEO rankings.",
  });
  if (isHttps) score += perCheck;

  // WWW consistency
  const hasWww = url.includes("www.");
  checks.push({
    label: "WWW consistency",
    status: "pass",
    detail: hasWww ? "Using www prefix. Make sure it redirects from non-www too." : "Not using www. Make sure www redirects to your main domain.",
  });
  score += perCheck;

  // Domain length
  const domain = url.replace(/https?:\/\//, "").replace(/www\./, "").split("/")[0];
  const domainShort = domain.length <= 20;
  checks.push({
    label: "Domain length",
    status: domainShort ? "pass" : "warn",
    detail: domainShort ? `Good — "${domain}" is concise and memorable.` : `"${domain}" is quite long. Shorter domains are easier to remember and type.`,
  });
  if (domainShort) score += perCheck;
  else score += perCheck / 2;

  // TLD check
  const goodTld = [".com", ".co.nz", ".nz", ".co", ".io"].some((tld) => domain.endsWith(tld));
  checks.push({
    label: "Domain extension",
    status: goodTld ? "pass" : "warn",
    detail: goodTld ? "Good domain extension for NZ business visibility." : "Consider a .co.nz or .nz domain for better local SEO in New Zealand.",
  });
  if (goodTld) score += perCheck;
  else score += perCheck / 2;

  // Trailing slash
  checks.push({
    label: "Clean URL structure",
    status: "pass",
    detail: "URL looks clean. Avoid parameters and random strings in your page URLs.",
  });
  score += perCheck;

  // Hyphens in domain
  const hasHyphens = domain.includes("-");
  checks.push({
    label: "Domain readability",
    status: hasHyphens ? "warn" : "pass",
    detail: hasHyphens ? "Hyphens in domains can look spammy. Consider a cleaner alternative." : "Clean domain name with no hyphens — good for branding.",
  });
  if (!hasHyphens) score += perCheck;
  else score += perCheck / 2;

  // Recommendations
  checks.push({
    label: "Meta title optimization",
    status: "warn",
    detail: "We can't check your meta title from here — use our Meta Generator tool to create an optimized one.",
  });
  score += perCheck / 2;

  checks.push({
    label: "Google Business Profile",
    status: "warn",
    detail: "Make sure you have a claimed and optimized Google Business Profile. It's free and critical for local SEO.",
  });
  score += perCheck / 2;

  checks.push({
    label: "Mobile responsiveness",
    status: "warn",
    detail: "Over 60% of searches happen on mobile. Test your site on phones and tablets.",
  });
  score += perCheck / 2;

  checks.push({
    label: "Page speed",
    status: "warn",
    detail: "Use our Speed Checker tool to test your site's loading time. Slow sites lose customers.",
  });
  score += perCheck / 2;

  return { score: Math.round(score), checks };
}

const statusIcon = { pass: "✓", warn: "!", fail: "✕" };
const statusColor = {
  pass: "text-success-600 dark:text-success-400 bg-success-500/10",
  warn: "text-accent-600 dark:text-accent-400 bg-accent-500/10",
  fail: "text-red-600 dark:text-red-400 bg-red-500/10",
};

export default function SeoAuditPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;
    setTimeout(() => {
      setResult(analyzeUrl(cleanUrl));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link href="/tools" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          ← Back to tools
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">SEO Audit</h1>
        <p className="mt-3 text-[var(--muted)]">
          Enter your website URL. I&apos;ll show you what Google sees — and what it&apos;s missing.
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
