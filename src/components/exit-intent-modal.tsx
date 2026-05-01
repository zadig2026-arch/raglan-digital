"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useExitIntent } from "@/hooks/use-exit-intent";
import { captureLead } from "@/app/actions/leads";

const HIDDEN_PREFIXES = ["/preview", "/mockup", "/thanks", "/discover"];

export function ExitIntentModal() {
  const pathname = usePathname();
  const enabled =
    typeof pathname === "string" &&
    !HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  const { triggered, dismiss } = useExitIntent({ enabled });
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!triggered) return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await captureLead({
        email,
        source: "exit-intent",
        consent_marketing: true,
        source_detail: { lead_magnet: "nz-local-seo-playbook-2026" },
      });

      if (!result.ok) {
        setError(result.error ?? "Something went wrong. Try again?");
        return;
      }

      setDone(true);
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => dismiss()}
      />
      <div className="relative w-full max-w-md bg-[var(--background)] rounded-3xl shadow-2xl border border-[var(--border)] p-8">
        <button
          onClick={() => dismiss({ persist: true })}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-[var(--muted)] hover:bg-[var(--surface-hover)] flex items-center justify-center"
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {done ? (
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-medium mb-3">
              Sent
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Check your inbox.
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
              The NZ Local SEO Playbook is on its way to{" "}
              <strong className="text-[var(--foreground)]">{email}</strong>. If
              it doesn&apos;t land within 5 min, check spam — or just message
              me.
            </p>
            <button
              onClick={() => dismiss({ persist: true })}
              className="mt-6 h-11 px-5 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-medium mb-3">
              Free download
            </p>
            <h2
              id="exit-intent-title"
              className="text-2xl md:text-3xl font-bold tracking-tight"
            >
              The NZ Local SEO Playbook (2026).
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
              The exact 12-step checklist I run on every NZ small-business site.
              Free PDF, no fluff. Drop your email and I&apos;ll send it now.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.co.nz"
                required
                autoComplete="email"
                className="w-full h-12 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors"
              />
              {error && (
                <p className="text-xs text-red-500" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="w-full h-12 px-5 inline-flex items-center justify-center rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50"
              >
                {pending ? "Sending…" : "Email me the playbook"}
              </button>
            </form>

            <button
              onClick={() => dismiss({ persist: true })}
              className="mt-4 w-full text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
