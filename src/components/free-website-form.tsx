"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = { success: false };

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors";

export interface FreeWebsiteFormProps {
  serviceTag?: string;
  buttonLabel?: string;
  successTitle?: string;
  successBody?: string;
  testimonialCopy?: string;
}

export function FreeWebsiteForm({
  serviceTag = "free-website-offer",
  buttonLabel = "Apply for a free website",
  successTitle = "Application received!",
  successBody = "I'll review your business and get back to you within 24h. If you qualify, I'll send you a mockup of your future site within a few days.",
  testimonialCopy = "If you build me a great site, I'm happy to give a short testimonial and let you feature it as an example.",
}: FreeWebsiteFormProps = {}) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-center max-w-xl mx-auto"
      >
        <h2 className="text-xl font-bold">{successTitle}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{successBody}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 max-w-xl mx-auto">
      {state.error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </div>
      )}

      <input type="hidden" name="service" value={serviceTag} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Your name <span className="text-accent-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-accent-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="business"
            className="block text-sm font-medium mb-1.5"
          >
            Business name <span className="text-accent-500">*</span>
          </label>
          <input
            type="text"
            id="business"
            name="business"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium mb-1.5"
          >
            City / region
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Hamilton, Cambridge, Raglan…"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="current_website"
          className="block text-sm font-medium mb-1.5"
        >
          Current website (or Instagram if you have no site)
        </label>
        <input
          type="text"
          id="current_website"
          name="current_website"
          placeholder="example.com or @yourhandle"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1.5"
        >
          Tell me about your business{" "}
          <span className="text-accent-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="What you do, who you serve, anything that makes you different."
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors resize-none"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-[var(--muted)] cursor-pointer">
        <input
          type="checkbox"
          name="testimonial_ok"
          value="yes"
          required
          className="mt-1 w-4 h-4 accent-accent-500"
        />
        <span>
          {testimonialCopy}{" "}
          <span className="text-accent-500">*</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto h-11 px-7 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50"
      >
        {isPending ? "Sending..." : buttonLabel}
      </button>

      <p className="text-xs text-[var(--muted)]">
        I read every application personally. Reply within 24h.
      </p>
    </form>
  );
}
