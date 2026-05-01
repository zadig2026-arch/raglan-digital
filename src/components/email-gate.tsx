"use client";

import { useState, useTransition } from "react";
import { captureLead } from "@/app/actions/leads";
import { sendToolReportEmail, type ToolReportPayload } from "@/app/actions/tool-reports";
import type { LeadSource } from "@/lib/lead-score";

export interface EmailGateProps {
  source: LeadSource;
  sourceDetail?: Record<string, unknown>;
  reportPayload: ToolReportPayload;
  onCaptured: () => void;
  heading?: string;
  body?: string;
  cta?: string;
  className?: string;
}

export function EmailGate({
  source,
  sourceDetail,
  reportPayload,
  onCaptured,
  heading = "Get the full report.",
  body = "Drop your email and I'll send the complete breakdown — plus the top 3 fixes I'd tackle first.",
  cta = "Email me the report",
  className = "",
}: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const lead = await captureLead({
        email,
        name: name || undefined,
        business: business || undefined,
        source,
        source_detail: sourceDetail,
        consent_marketing: true,
      });

      if (!lead.ok) {
        setError(lead.error ?? "Something went wrong. Try again?");
        return;
      }

      await sendToolReportEmail({
        email,
        name: name || undefined,
        payload: reportPayload,
      });

      onCaptured();
    });
  };

  return (
    <div
      className={`p-7 md:p-8 rounded-3xl border border-accent-500/30 bg-accent-500/5 dark:bg-accent-500/10 ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-semibold mb-3">
        Free · No spam
      </p>
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{body}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="h-11 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors"
          />
          <input
            type="text"
            name="business"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Business name (optional)"
            autoComplete="organization"
            className="h-11 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors"
          />
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.co.nz"
          required
          autoComplete="email"
          className="w-full h-11 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors"
        />
        {error && (
          <p className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full h-12 px-6 inline-flex items-center justify-center rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50"
        >
          {pending ? "Sending…" : cta}
        </button>
        <p className="text-[11px] text-[var(--muted)] text-center">
          No spam. Reply &ldquo;unsubscribe&rdquo; anytime.
        </p>
      </form>
    </div>
  );
}
