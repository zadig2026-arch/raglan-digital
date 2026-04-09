"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/section";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    ),
    title: "Web Design & Development",
    description: "Beautiful, fast websites that turn visitors into customers. Mobile-first, built for performance.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    ),
    title: "SEO & Google Business",
    description: "Get found when locals search for your services. Google Business setup, local SEO, and ranking strategy.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
    ),
    title: "Social Media",
    description: "Content strategy, posting schedules, and community management that actually builds your brand.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    title: "Branding & Identity",
    description: "Logo, colours, typography, and brand guidelines that make your business look as good as it is.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    ),
    title: "Paid Advertising",
    description: "Google Ads and Meta campaigns that bring the right customers to your door, with clear ROI tracking.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    title: "Content & Copywriting",
    description: "Words that connect with your audience. Website copy, blog posts, and email campaigns.",
  },
];

const testimonials = [
  {
    quote: "Raglan Digital transformed our online presence. We went from invisible to the top of Google searches in our area.",
    name: "Sarah M.",
    role: "Cafe Owner, Raglan",
  },
  {
    quote: "They actually speak our language. No tech jargon, just real results. Our bookings have doubled since working with them.",
    name: "James T.",
    role: "Surf School Instructor",
  },
  {
    quote: "The Digital Bible alone helped me fix so many things I was doing wrong. The fact it's free shows how much they care.",
    name: "Aroha K.",
    role: "Local Artist & Maker",
  },
];

const stats = [
  { value: "200%", label: "Average traffic increase" },
  { value: "50+", label: "Local businesses helped" },
  { value: "#1", label: "Digital agency in Raglan" },
  { value: "5★", label: "Client satisfaction" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-32 md:pb-40">
        {/* Background wave decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-ocean-500/5 dark:bg-ocean-400/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-bush-500/5 dark:bg-bush-400/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-500/10 text-ocean-600 dark:text-ocean-300 text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 animate-pulse" />
                Raglan&apos;s Digital Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Your business deserves
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-500 to-bush-500">
                to be found online
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-xl leading-relaxed"
            >
              We help Raglan&apos;s local businesses build a powerful online presence.
              From websites to social media, we handle the digital so you can focus on what you do best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all hover:shadow-lg hover:shadow-ocean-500/20 hover:-translate-y-0.5"
              >
                Get your free audit →
              </Link>
              <Link
                href="/visibility-score"
                className="inline-flex h-12 px-7 items-center justify-center rounded-xl border border-[var(--border)] font-medium hover:bg-[var(--surface-hover)] transition-all hover:-translate-y-0.5"
              >
                Check your visibility score
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="py-16 border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-ocean-500">{stat.value}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="py-24" id="services">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">What we do</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Everything your business needs online
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
            From your first website to a full digital strategy, we&apos;ve got you covered.
            No lock-in contracts, just honest work that delivers results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-ocean-500/10 text-ocean-500 flex items-center justify-center group-hover:bg-ocean-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-ocean-500 hover:text-ocean-600 transition-colors"
          >
            View all services →
          </Link>
        </div>
      </Section>

      {/* Bible / Free Resources CTA */}
      <Section className="py-24 bg-gradient-to-br from-ocean-950 to-ocean-800 dark:from-ocean-950 dark:to-ocean-900 text-white rounded-none">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-medium text-ocean-300 uppercase tracking-wider">Free Resource</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              The Digital Bible
            </h2>
            <p className="mt-4 text-ocean-200 leading-relaxed">
              A step-by-step guide to improving your online presence. No fluff, no upsells —
              just practical advice for Raglan businesses who want to take control of their digital future.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Set up & optimise Google Business Profile",
                "Social media strategy for local businesses",
                "Website essentials that actually matter",
                "Getting found: SEO basics explained simply",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ocean-100">
                  <svg className="w-5 h-5 text-bush-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/bible"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-white text-ocean-900 font-medium mt-8 hover:bg-ocean-50 transition-colors"
            >
              Start learning for free →
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/raglan-sunset.jpg"
                alt="Raglan sunset"
                width={600}
                height={600}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ocean-950/80 to-transparent">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📖</div>
                  <div className="text-xl font-semibold text-white">The Digital Bible</div>
                  <div className="text-sm text-ocean-300 mt-2">Your free roadmap to online success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Raglan businesses
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex gap-1 text-ocean-500 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--muted)]">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-[var(--muted)]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Weekly digital tips for Raglan businesses
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Quick, practical tips delivered every Thursday. No spam, unsubscribe anytime.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-ocean-500/40 focus:border-ocean-500 transition-colors"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to grow your business online?
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Let&apos;s have a chat about where you are now and where you want to be.
            No pressure, no jargon — just a friendly conversation about your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-ocean-600 text-white font-medium hover:bg-ocean-700 transition-all hover:shadow-lg hover:shadow-ocean-500/20"
            >
              Get your free audit →
            </Link>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl border border-bush-500/30 text-bush-600 dark:text-bush-400 font-medium hover:bg-bush-500/10 transition-colors gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
