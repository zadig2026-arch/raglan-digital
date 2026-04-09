"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const packages = [
  {
    id: "starter",
    name: "Starter Site",
    price: "$599",
    period: "one-off",
    description: "Perfect for new businesses that need to get online fast.",
    features: [
      "One-page responsive website",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "Google Analytics installed",
      "1 round of revisions",
      "Fast turnaround",
    ],
    popular: false,
  },
  {
    id: "business",
    name: "Business Site",
    price: "$1,299",
    period: "one-off",
    description: "For established businesses that need a proper online presence.",
    features: [
      "Up to 5 pages",
      "Custom design tailored to your brand",
      "Mobile responsive",
      "SEO optimized (meta tags, headings, images)",
      "Contact form + Google Maps",
      "Google Business Profile setup",
      "Speed optimized",
      "2 rounds of revisions",
      "Fast turnaround",
    ],
    popular: true,
  },
  {
    id: "growth",
    name: "Growth Site",
    price: "$2,499",
    period: "one-off",
    description: "Full digital setup for businesses ready to grow seriously.",
    features: [
      "Up to 10 pages",
      "Premium custom design",
      "Blog / news section",
      "E-commerce ready (up to 20 products)",
      "Full SEO setup + sitemap",
      "Google Business Profile optimization",
      "Social media integration",
      "Speed + performance optimization",
      "3 rounds of revisions",
      "Fast turnaround",
    ],
    popular: false,
  },
];

const ongoingServices = [
  {
    id: "seo",
    name: "SEO & Google Business",
    price: "$199",
    period: "/month",
    features: [
      "Monthly SEO audit & fixes",
      "Google Business Profile management",
      "Local keyword optimization",
      "Monthly performance report",
      "Competitor monitoring",
    ],
  },
  {
    id: "social-media",
    name: "Social Media Management",
    price: "$349",
    period: "/month",
    features: [
      "12 posts per month (3/week)",
      "Content creation (graphics + copy)",
      "Community management",
      "Monthly analytics report",
      "Platform: Facebook + Instagram",
    ],
  },
  {
    id: "content",
    name: "Content & Copywriting",
    price: "$149",
    period: "/page",
    features: [
      "SEO-optimized page copy",
      "Blog posts ($99 per post)",
      "Email campaigns ($79 per email)",
      "Social media captions package ($199/mo)",
      "Brand voice guide included",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-hand text-2xl text-accent-500 mb-2">Services & pricing</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Clear pricing. No surprises.
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Pick a package or mix and match. Everything is customizable.
            Not sure what you need? Get in touch and I&apos;ll recommend the right option.
          </p>
        </div>

        {/* Website packages */}
        <div id="web-design">
          <h2 className="text-2xl font-bold mb-8">Website Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  pkg.popular
                    ? "border-accent-500 bg-[var(--surface)] shadow-lg shadow-accent-500/10"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-accent-500 text-white text-xs font-medium">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-sm text-[var(--muted)]">{pkg.period}</span>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">{pkg.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-4 h-4 text-success-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 block text-center py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pkg.popular
                      ? "bg-brand-900 dark:bg-white text-white dark:text-brand-900 hover:bg-brand-800 dark:hover:bg-brand-100"
                      : "border border-[var(--border)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  Get started →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ongoing services */}
        <div className="mt-24" id="seo">
          <h2 className="text-2xl font-bold mb-8">Ongoing Services</h2>
          <div className="grid md:grid-cols-3 gap-6" id="social-media">
            {ongoingServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                id={service.id === "content" ? "content" : undefined}
              >
                <h3 className="text-lg font-bold">{service.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{service.price}</span>
                  <span className="text-sm text-[var(--muted)]">{service.period}</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-4 h-4 text-success-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 block text-center py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
                >
                  Get started →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Common questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do I own my website?", a: "Yes, 100%. You own everything — the code, the design, the content. No lock-in." },
              { q: "What about hosting?", a: "I can recommend affordable hosting ($5-15/month) or set it up on your existing host. Hosting cost is separate from the build price." },
              { q: "Can I update the site myself?", a: "Absolutely. I build with easy-to-manage platforms or provide a simple CMS. I'll show you how to make changes." },
              { q: "What if I need changes after delivery?", a: "Small tweaks within 30 days are free. After that, changes are $49/hour — always quoted upfront." },
              { q: "Do you work with businesses outside NZ?", a: "My pricing and approach is optimized for NZ small businesses, but I'm happy to chat if you're elsewhere." },
            ].map((faq) => (
              <div key={faq.q} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <h3 className="font-semibold text-sm">{faq.q}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold">Not sure what you need?</h2>
          <p className="mt-3 text-[var(--muted)]">
            Tell me about your business and I&apos;ll recommend the right package. No pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium mt-6 hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
          >
            Get a free quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
