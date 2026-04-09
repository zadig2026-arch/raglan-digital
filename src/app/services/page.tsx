"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/section";

const services = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Your website is your digital shopfront. We build beautiful, fast, mobile-first websites that make the right impression and turn visitors into customers.",
    features: [
      "Custom design tailored to your brand",
      "Mobile-responsive — looks great on any device",
      "Fast loading speeds for better Google rankings",
      "Easy-to-use content management",
      "SSL security included",
      "Ongoing support & maintenance available",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    ),
  },
  {
    id: "seo",
    title: "SEO & Google Business",
    description: "When someone in Raglan searches for what you offer, will they find you? We make sure the answer is yes. Local SEO that puts you on the map — literally.",
    features: [
      "Google Business Profile setup & optimisation",
      "Local keyword research & strategy",
      "On-page SEO for your website",
      "Google Maps visibility",
      "Monthly performance reports",
      "Competitor analysis",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    ),
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description: "Social media shouldn't feel like a chore. We create content strategies that build genuine connections with your community and bring people through your door.",
    features: [
      "Content strategy & calendar",
      "Post creation & scheduling",
      "Community management & engagement",
      "Instagram, Facebook & TikTok",
      "Monthly analytics & insights",
      "Photo & video content ideas",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
    ),
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Your brand is more than a logo — it's the feeling people get when they interact with your business. We create cohesive brand identities that stand out.",
    features: [
      "Logo design & variations",
      "Colour palette & typography",
      "Brand guidelines document",
      "Business card & stationery design",
      "Social media templates",
      "Signage & print design",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
  },
  {
    id: "advertising",
    title: "Paid Advertising",
    description: "Reach the right people at the right time. We run targeted ad campaigns on Google and social media that bring real customers to your business.",
    features: [
      "Google Ads management",
      "Facebook & Instagram ads",
      "Target audience research",
      "Ad creative & copywriting",
      "Budget optimisation",
      "ROI tracking & reporting",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    ),
  },
  {
    id: "content",
    title: "Content & Copywriting",
    description: "Words matter. Whether it's your website, emails, or social posts — we write content that sounds like you, connects with your audience, and drives action.",
    features: [
      "Website copywriting",
      "Blog posts & articles",
      "Email marketing campaigns",
      "Product descriptions",
      "Brand voice development",
      "Content strategy planning",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Our Services</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Everything your business needs to thrive online
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              No lock-in contracts. No confusing packages. Just straightforward digital services
              tailored to what your business actually needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid md:grid-cols-2 gap-8 p-8 md:p-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-ocean-500/20 transition-colors"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-ocean-500/10 text-ocean-500 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <p className="mt-3 text-[var(--muted)] leading-relaxed">{service.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex h-10 px-5 items-center justify-center rounded-lg bg-ocean-600 text-white text-sm font-medium mt-6 hover:bg-ocean-700 transition-colors"
                >
                  Get a quote →
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-4">What&apos;s included</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <svg className="w-5 h-5 text-bush-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Section className="py-20 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">Not sure what you need?</h2>
          <p className="mt-3 text-[var(--muted)]">
            No worries — most of our clients start there. Let&apos;s have a free chat and
            figure out what&apos;ll make the biggest difference for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-ocean-600 text-white font-medium mt-8 hover:bg-ocean-700 transition-colors"
          >
            Book a free consultation →
          </Link>
        </div>
      </Section>
    </>
  );
}
