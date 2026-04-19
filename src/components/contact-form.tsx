"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { motion } from "framer-motion";

const initialState: ContactFormState = { success: false };

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">Get in touch</p>
          <h1 className="text-display-lg">
            Let&apos;s talk about your business.
          </h1>
          <p className="mt-6 text-[var(--muted)] max-w-lg">
            Send me a message and I&apos;ll get back to you within 24 hours.
            Or if you prefer, message me directly on WhatsApp.
          </p>
        </motion.div>

        {state.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 p-8 rounded-2xl bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-center"
          >
            <h2 className="text-xl font-bold">Message sent!</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form action={formAction} className="mt-10 space-y-5">
            {state.error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
                {state.error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Name <span className="text-accent-500">*</span>
                </label>
                <input type="text" id="name" name="name" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email <span className="text-accent-500">*</span>
                </label>
                <input type="email" id="email" name="email" required className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="business" className="block text-sm font-medium mb-1.5">
                  Business name
                </label>
                <input type="text" id="business" name="business" className={inputClass} />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-1.5">
                  What do you need?
                </label>
                <select id="service" name="service" className={inputClass}>
                  <option value="">Not sure yet</option>
                  <option value="web-design">Website design</option>
                  <option value="seo">SEO &amp; Google</option>
                  <option value="social-media">Social media</option>
                  <option value="content">Content &amp; copywriting</option>
                  <option value="other">Something else</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message <span className="text-accent-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="h-11 px-6 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Send message"}
            </button>
          </form>
        )}

        <div className="mt-12 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h3 className="font-bold text-sm">Prefer WhatsApp?</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Send me a message directly. I usually reply within a few hours.
          </p>
          <a
            href="https://wa.me/33752032213?text=Hey%20Zadig%2C%20I%20have%20a%20question%20about%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-10 px-5 items-center rounded-xl bg-warm-900 dark:bg-warm-800 text-white text-sm font-medium hover:bg-warm-800 dark:hover:bg-warm-700 transition-colors gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.332 0-4.51-.752-6.276-2.073l-.438-.34-3.2 1.072 1.072-3.2-.34-.438A9.953 9.953 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
