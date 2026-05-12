"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { success: false };

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors";
const labelClass = "block text-xs uppercase tracking-wider text-[var(--muted)] font-medium mb-2";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-accent-500 font-medium mb-4">
          Message sent
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">Got it. Thanks.</h2>
        <p className="mt-4 text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          I read every message personally. Honest reply within 48h on weekdays — or sooner if I&apos;m near a keyboard.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Your name
        </label>
        <input id="contact-name" name="name" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input id="contact-email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors resize-y"
          placeholder="Tell me what you&rsquo;re trying to build — a few honest sentences are enough."
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500 dark:text-red-400">{state.error}</p>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="h-12 px-7 inline-flex items-center justify-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending…" : "Send →"}
        </button>
        <p className="text-xs text-[var(--muted)]">Or WhatsApp me directly.</p>
      </div>
    </form>
  );
}
