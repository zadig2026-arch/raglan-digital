"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Search, Share2, FileText } from "lucide-react";

const services = [
  {
    id: "web-design",
    name: "Web Design",
    icon: Monitor,
    description:
      "A clean, fast website that works on every device — designed around your brand, built to convert visitors into customers.",
    features: [
      "Custom design tailored to your brand",
      "Mobile-first and responsive",
      "SEO optimized from day one",
      "Contact forms and Google Maps",
      "Speed optimized",
      "You own everything — no lock-in",
    ],
  },
  {
    id: "seo",
    name: "SEO & Google Business",
    icon: Search,
    description:
      "Get found when people search for what you do. I'll set up and manage your Google Business Profile and optimize your site for local search.",
    features: [
      "Google Business Profile setup & management",
      "Local keyword optimization",
      "Monthly SEO audit & fixes",
      "Competitor monitoring",
      "Monthly performance report",
    ],
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Share2,
    description:
      "Consistent, quality content on Facebook and Instagram — so you can focus on running your business.",
    features: [
      "Content creation (graphics + copy)",
      "Posting schedule (3x/week)",
      "Community management",
      "Monthly analytics report",
      "Platform: Facebook + Instagram",
    ],
  },
  {
    id: "content",
    name: "Content & Copywriting",
    icon: FileText,
    description:
      "Words that sound like you, not a robot. SEO-friendly copy for your website, blog, emails, and social media.",
    features: [
      "SEO-optimized page copy",
      "Blog posts",
      "Email campaigns",
      "Social media captions",
      "Brand voice guide included",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-hand text-2xl text-accent-500 mb-2">Services</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            What I can help with.
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every business is different. Let&apos;s chat about what you need and
            I&apos;ll put together something that fits.
          </p>
        </div>

        <div className="space-y-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{service.name}</h2>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-success-500 shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex h-10 px-5 items-center rounded-xl bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
                    >
                      Let&apos;s chat &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Common questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Do I own my website?",
                a: "Yes, 100%. You own everything — the code, the design, the content. No lock-in.",
              },
              {
                q: "What about hosting?",
                a: "I can recommend affordable hosting or set it up on your existing host. We'll figure out the best option together.",
              },
              {
                q: "Can I update the site myself?",
                a: "Absolutely. I build with easy-to-manage platforms or provide a simple CMS. I'll show you how to make changes.",
              },
              {
                q: "How much does it cost?",
                a: "It depends on what you need. Get in touch and I'll give you an honest quote — no pressure, no hidden fees.",
              },
              {
                q: "Do you work with businesses outside NZ?",
                a: "My approach is optimized for NZ small businesses, but I'm happy to chat if you're elsewhere.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
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
            Tell me about your business and I&apos;ll recommend the right
            approach. No pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium mt-6 hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
          >
            Get a free quote &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
