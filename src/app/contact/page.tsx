"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { success: false };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <>
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Contact</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Let&apos;s have a chat
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              No pressure, no jargon. Just a friendly conversation about your business
              and how we can help. First consultation is always free.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

                {state.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-bush-500/10 text-bush-500 flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 className="text-xl font-semibold">Message sent!</h3>
                    <p className="mt-2 text-[var(--muted)]">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form action={formAction} className="space-y-5">
                    {state.error && (
                      <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
                        {state.error}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full h-11 px-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors text-sm"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full h-11 px-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="business" className="block text-sm font-medium mb-1.5">Business name</label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        className="w-full h-11 px-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors text-sm"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-1.5">What are you interested in?</label>
                      <select
                        id="service"
                        name="service"
                        className="w-full h-11 px-4 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors text-sm"
                      >
                        <option value="">Select a service</option>
                        <option value="free-audit">Free Website Audit (Launch Offer)</option>
                        <option value="web-design">Web Design & Development</option>
                        <option value="seo">SEO & Google Business</option>
                        <option value="social-media">Social Media Management</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="advertising">Paid Advertising</option>
                        <option value="content">Content & Copywriting</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors text-sm resize-none"
                        placeholder="Tell us about your business and what you're looking for..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full h-12 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Sending...
                        </>
                      ) : (
                        "Send message →"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Launch offer */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-ocean-950 to-ocean-800 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-surf-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-surf-300">Launch Offer</span>
                </div>
                <h3 className="text-lg font-semibold">Free Website Audit</h3>
                <p className="mt-2 text-sm text-ocean-200 leading-relaxed">
                  We&apos;re auditing the first 5 businesses for free. Full review of your
                  website, Google presence, and social media with an actionable report.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-ocean-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Limited spots remaining
                </div>
              </div>

              {/* Quick contact */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-semibold mb-4">Prefer a quick chat?</h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/33752032213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:border-bush-500/30 hover:bg-bush-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-bush-500/10 text-bush-500 flex items-center justify-center group-hover:bg-bush-500 group-hover:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs text-[var(--muted)]">Quick reply, usually within an hour</div>
                    </div>
                  </a>
                  <a
                    href="mailto:hello@raglandigital.com"
                    className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:border-ocean-500/30 hover:bg-ocean-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-ocean-500/10 text-ocean-500 flex items-center justify-center group-hover:bg-ocean-500 group-hover:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-[var(--muted)]">hello@raglandigital.com</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-semibold mb-2">Based in Raglan</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  We&apos;re based right here in Raglan. Happy to meet for a coffee and a chat
                  at any of the local cafes. Serving businesses across the Waikato region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
