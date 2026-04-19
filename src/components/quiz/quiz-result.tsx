"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import {
  tracks,
  buildAnswerSummary,
  type Service,
} from "@/lib/quiz-config";

const initialState: ContactFormState = { success: false };

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors";

export function QuizResult({
  service,
  answers,
  onRestart,
}: {
  service: Service;
  answers: Record<string, string>;
  onRestart: () => void;
}) {
  const track = tracks[service];
  const reco = track.recommend(answers);
  const defaultMessage = buildAnswerSummary(service, answers);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
        Your result
      </p>
      <h1 className="text-display-lg">{reco.headline}</h1>
      <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
        {reco.body}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={reco.target.href}
          className="h-12 px-7 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {reco.target.label}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="h-12 px-6 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          Restart the quiz
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowAnswers((v) => !v)}
          aria-expanded={showAnswers}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
        >
          {showAnswers ? "Hide your answers" : "See your answers"}
        </button>
        {showAnswers && (
          <div className="mt-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <ul className="space-y-3 text-sm">
              {track.questions.map((q) => {
                const val = answers[q.id];
                const choice = q.choices.find((c) => c.value === val);
                return (
                  <li key={q.id}>
                    <span className="text-[var(--muted)]">{q.prompt}</span>
                    <br />
                    <span className="font-medium">
                      {choice?.label ?? "— skipped"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-16 pt-12 border-t border-[var(--border)]">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Want me to look at this personally?
        </h2>
        <p className="mt-3 text-[var(--muted)] max-w-lg">
          Your answers are already written below. Add your details and I&apos;ll
          reply within 24h.
        </p>

        {state.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-2xl bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20"
          >
            <h3 className="text-lg font-bold">Sent! Talk soon.</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              I&apos;ll reply within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="mt-8 space-y-4 max-w-xl">
            {state.error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
                {state.error}
              </div>
            )}
            <input type="hidden" name="service" value={service} />
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-[var(--muted)]">Name *</span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`mt-1.5 ${inputClass}`}
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-[var(--muted)]">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`mt-1.5 ${inputClass}`}
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Business name</span>
              <input
                name="business"
                type="text"
                autoComplete="organization"
                className={`mt-1.5 ${inputClass}`}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Your message</span>
              <textarea
                required
                name="message"
                rows={8}
                defaultValue={defaultMessage}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm leading-relaxed focus:outline-none focus:border-accent-500 transition-colors resize-y"
              />
            </label>
            <button
              type="submit"
              disabled={isPending}
              className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {isPending ? "Sending…" : "Send to Zadig"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
