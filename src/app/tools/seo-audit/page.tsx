"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingBack } from "@/components/floating-back";
import { EmailGate } from "@/components/email-gate";
import { runSeoAudit, type AuditResult } from "@/app/actions/seo-audit";

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
      const data = await runSeoAudit(url);
      setResult(data);
    } catch {
      setError("Something went wrong. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const previewChecks = result?.checks.slice(0, 3) ?? [];
  const gatedChecks = result?.checks.slice(3) ?? [];

  return (
    <div className="px-6 py-20">
      <FloatingBack href="/tools" label="Back to tools" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">SEO Audit</h1>
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
                {result.score >= 70
                  ? "Looking good! A few tweaks will make it even better."
                  : result.score >= 40
                  ? "Decent foundation. There's room for improvement."
                  : "Needs work. Let's fix the basics first."}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-semibold mb-3">
                Top-line — first 3 checks
              </p>
              <div className="space-y-3">
                {previewChecks.map((check) => (
                  <CheckRow key={check.label} check={check} />
                ))}
              </div>
            </div>

            {!unlocked ? (
              <EmailGate
                source="tool-seo-audit"
                sourceDetail={{
                  tool_score: result.score,
                  audit_url: result.url,
                  checks_total: result.checks.length,
                  fails: result.checks.filter((c) => c.status === "fail").length,
                }}
                reportPayload={{
                  kind: "seo-audit",
                  score: result.score,
                  url: result.url,
                  checks: result.checks,
                }}
                onCaptured={() => setUnlocked(true)}
                heading={`See the remaining ${gatedChecks.length} checks + my top 3 fixes.`}
                body="The full audit and a ranked fix list, sent to your inbox. No spam — reply 'unsubscribe' anytime."
                cta={`Email me the full SEO report`}
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
                      Check your inbox in a minute. Below is the full audit too — keep it open.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-semibold mb-3">
                    Full audit · {result.checks.length} checks
                  </p>
                  <div className="space-y-3">
                    {gatedChecks.map((check) => (
                      <CheckRow key={check.label} check={check} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-7 rounded-3xl bg-[var(--foreground)] text-[var(--background)] text-center">
                  <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-semibold mb-3">
                    Want me to fix this?
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    $399 launch site, live in 5–10 days.
                  </h3>
                  <p className="mt-3 text-sm opacity-80 max-w-md mx-auto">
                    Fixed price, no retainer, you own everything.
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

function CheckRow({
  check,
}: {
  check: { label: string; status: "pass" | "warn" | "fail"; detail: string };
}) {
  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-3">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${statusColor[check.status]}`}
        >
          {statusIcon[check.status]}
        </span>
        <span className="font-medium text-sm">{check.label}</span>
      </div>
      <p className="mt-2 ml-10 text-sm text-[var(--muted)]">{check.detail}</p>
    </div>
  );
}
