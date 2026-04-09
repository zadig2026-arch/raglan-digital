"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { IconSearch, IconPencil, IconBolt, IconClipboardCheck, IconBook, IconFileText, IconHand } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { AnimatedCounter } from "@/components/animated-counter";
import { TextReveal } from "@/components/text-reveal";
import { AuroraBackground } from "@/components/aurora-bg";
import { Magnetic } from "@/components/magnetic";

const tools = [
  {
    title: "SEO Audit",
    desc: "I'll scan your website and show you exactly what Google sees — and what it doesn't.",
    href: "/tools/seo-audit",
    icon: <IconSearch className="w-7 h-7" />,
    step: "1",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    glow: "group-hover:shadow-orange-500/20",
  },
  {
    title: "Speed Test",
    desc: "You'll see how fast your site loads for your customers, and what's slowing it down.",
    href: "/tools/speed-checker",
    icon: <IconBolt className="w-7 h-7" />,
    step: "2",
    gradient: "from-yellow-500/20 via-amber-400/10 to-transparent",
    glow: "group-hover:shadow-yellow-500/20",
  },
  {
    title: "Meta Generator",
    desc: "I'll help you write the text that shows up when people Google your business.",
    href: "/tools/meta-generator",
    icon: <IconPencil className="w-7 h-7" />,
    step: "3",
    gradient: "from-rose-500/20 via-orange-400/10 to-transparent",
    glow: "group-hover:shadow-rose-500/20",
  },
  {
    title: "Digital Checklist",
    desc: "You'll go through every part of your online presence and see what's missing.",
    href: "/tools/digital-checklist",
    icon: <IconClipboardCheck className="w-7 h-7" />,
    step: "4",
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    glow: "group-hover:shadow-emerald-500/20",
  },
];

const services = [
  { title: "Starter Site", price: "$599", desc: "I build you a one-page site. Mobile-ready. Clean design." },
  { title: "Business Site", price: "$1,299", desc: "I design up to 5 pages, tailored to your brand. SEO included.", popular: true },
  { title: "Growth Site", price: "$2,499", desc: "I build your full online presence. Blog, e-commerce, the lot." },
  { title: "SEO Monthly", price: "$199/mo", desc: "I manage your Google ranking and keep your business visible." },
  { title: "Social Media", price: "$349/mo", desc: "I create and post your content. You focus on your business." },
  { title: "Copywriting", price: "$149/page", desc: "I write the words that make people pick up the phone." },
];

const testimonial = {
  quote: "I had no idea my website was that slow and invisible on Google. Zag built tools that show you everything in seconds — your SEO score, your speed, what's missing. I finally understood what was wrong.",
  name: "Richard",
  role: "Osteopath, Hamilton",
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <AuroraBackground className="px-6 pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-accent-500 font-hand text-2xl mb-4">
              <span className="inline-flex items-center gap-2">Before we start <IconHand className="w-5 h-5" /></span>
            </motion.p>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
              How visible is
              <br />
              <span className="text-accent-500">your business online?</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg text-[var(--muted)] max-w-lg leading-relaxed">
              I built these tools to help you find out. Run them on your website,
              see where you stand, and if you want — I&apos;ll tell you exactly what I&apos;d fix first.
            </motion.p>
          </motion.div>

          {/* ═══ TOOLS GRID — staggered ═══ */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {tools.map((tool) => (
              <motion.div key={tool.title} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className={`group relative block rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tool.glow}`}
                >
                  {/* Gradient glow top */}
                  <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${tool.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--border)] text-[10px] font-bold text-[var(--muted)] flex items-center justify-center z-10">
                    {tool.step}
                  </div>

                  <div className="relative p-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className="w-14 h-14 rounded-xl bg-[var(--background)] border border-[var(--border)] text-accent-500 flex items-center justify-center shadow-sm group-hover:border-accent-500/30 group-hover:shadow-md group-hover:shadow-accent-500/10 transition-all duration-300"
                    >
                      {tool.icon}
                    </motion.div>

                    {/* Text */}
                    <h3 className="mt-4 font-bold">{tool.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{tool.desc}</p>

                    {/* CTA */}
                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-accent-500">
                      <span>Run it</span>
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Bottom border accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AuroraBackground>

      {/* ═══ MARQUEE ═══ */}
      <Marquee
        items={["Web Design", "SEO", "Google Business", "Social Media", "Copywriting", "Speed Optimization", "Branding", "Content Strategy"]}
        speed={30}
        className="py-4 border-y border-[var(--border)] bg-[var(--surface)]"
      />

      {/* ═══ HOW IT WORKS ═══ */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <p className="font-hand text-2xl text-accent-500 mb-2 text-center">How it works</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">
            You test. I fix. You grow.
          </h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            className="mt-10 grid md:grid-cols-3 gap-8 relative [&>*:not(:last-child)]:after:hidden [&>*:not(:last-child)]:md:after:block [&>*:not(:last-child)]:after:absolute [&>*:not(:last-child)]:after:top-6 [&>*:not(:last-child)]:after:left-[calc(50%+2rem)] [&>*:not(:last-child)]:after:w-[calc(100%-4rem)] [&>*:not(:last-child)]:after:h-px [&>*:not(:last-child)]:after:bg-[var(--border)] [&>*]:relative"
          >
            {[
              { step: "1", title: "You run the tools", desc: "Check your SEO, speed, meta tags, and online presence. Takes 5 minutes." },
              { step: "2", title: "You send me your results", desc: "Hit the WhatsApp button. I see exactly where your business stands." },
              { step: "3", title: "I tell you what I'd fix", desc: "You get a clear action plan. If you want me to do the work, I'll quote you a fair price." },
            ].map((s) => (
              <motion.div key={s.step} variants={fadeUp} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-12 h-12 rounded-full bg-accent-500 text-white text-sm font-bold flex items-center justify-center mx-auto"
                >
                  {s.step}
                </motion.div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══ ABOUT — text reveal ═══ */}
      <Section className="py-20 bg-brand-900 dark:bg-brand-950 text-white rounded-none">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <p className="font-hand text-2xl text-accent-400 mb-3">Why me?</p>

            <TextReveal
              text="I'm not a big agency. I'm one person who does this really well. You get agency-quality work, at a price that makes sense, from someone who answers your messages directly."
              className="text-2xl md:text-3xl font-bold tracking-tight leading-snug text-white"
            />

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {[
                { title: "You talk to me", desc: "No middlemen. You message, I respond." },
                { title: "You own it all", desc: "Code, design, content — it's yours." },
                { title: "I keep it honest", desc: "Fair price, no hidden fees, no lock-in." },
                { title: "I know NZ", desc: "I live here. I understand your customers." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="p-3 rounded-lg bg-brand-800/50 border border-brand-700/50">
                  <div className="font-bold text-xs text-brand-200">{item.title}</div>
                  <div className="text-[11px] text-brand-400 mt-0.5">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-64 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
            >
              <Image
                src="/images/zag.png"
                alt="Zag — Scale with Zag"
                width={256}
                height={320}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══ STATS ═══ */}
      <Section className="py-14 border-b border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 599, prefix: "$", suffix: "", label: "Websites starting from" },
            { value: 50, prefix: "", suffix: "+", label: "Businesses helped" },
            { value: 100, prefix: "", suffix: "%", label: "You own everything" },
            { value: 0, prefix: "", suffix: "", label: "Lock-in contracts", display: "0" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-black text-accent-500">
                {stat.display !== undefined ? stat.display : (
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </div>
              <div className="mt-1 text-xs text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section className="py-20">
        <div className="text-center mb-12">
          <p className="font-hand text-2xl text-accent-500 mb-2">What I can do for you</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            You pick what you need. I do the work.
          </h2>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`p-5 rounded-xl border transition-shadow duration-200 hover:shadow-md ${
                s.popular
                  ? "border-accent-500/50 bg-accent-500/5 dark:bg-accent-500/10"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">{s.title}</h3>
                <span className="text-sm font-bold text-accent-500">{s.price}</span>
              </div>
              <p className="mt-1.5 text-xs text-[var(--muted)]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/services" className="text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors">
            See full details →
          </Link>
        </div>
      </Section>

      {/* ═══ PRICE COMPARISON ═══ */}
      <Section className="py-16 bg-[var(--surface)] border-y border-[var(--border)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4 text-center"
        >
          {[
            { label: "Typical NZ agency", price: "$3k — $10k+", sub: "Slow. Meetings. Project managers.", highlight: false },
            { label: "What I charge you", price: "From $599", sub: "Fast. Direct. Same quality.", highlight: true },
            { label: "DIY builder", price: "$20/mo", sub: "Looks DIY. Poor SEO. No support.", highlight: false },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              whileHover={item.highlight ? { scale: 1.08 } : { scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-5 rounded-xl ${
                item.highlight
                  ? "border-2 border-accent-500 bg-accent-500/5 dark:bg-accent-500/10 scale-105"
                  : "border border-[var(--border)] bg-[var(--background)] opacity-60"
              }`}
            >
              {!item.highlight && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-[110%] h-px bg-[var(--muted)]/50 -rotate-12" />
                </div>
              )}
              <div className={`text-xs font-medium uppercase tracking-wider mb-3 ${item.highlight ? "font-bold text-accent-500" : "text-[var(--muted)]"}`}>
                {item.label}
              </div>
              <div className={`text-2xl font-bold ${!item.highlight ? "text-[var(--muted)]" : ""}`}>{item.price}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ═══ TESTIMONIAL ═══ */}
      <Section className="py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-hand text-2xl text-accent-500 mb-6">What people say</p>

          <div className="flex justify-center gap-1 text-accent-500 mb-6">
            {[...Array(5)].map((_, j) => (
              <svg key={j} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed font-medium"
          >
            &ldquo;{testimonial.quote}&rdquo;
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6"
          >
            <div className="font-bold">{testimonial.name}</div>
            <div className="text-sm text-[var(--muted)]">{testimonial.role}</div>
          </motion.div>
        </div>
      </Section>

      {/* ═══ LEARN ═══ */}
      <Section className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="text-center mb-10">
          <p className="font-hand text-2xl text-accent-500 mb-2">Learn</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            I want you to understand your business online
          </h2>
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-5"
        >
          <motion.div variants={fadeUp}>
            <Link href="/learn" className="group block p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-md transition-all hover:-translate-y-1 duration-200">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300"><IconBook className="w-5 h-5" /></div>
              <h3 className="mt-3 text-lg font-bold">Step-by-step guides</h3>
              <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">SEO, Google Business, social media, website basics — I wrote it all down so you can learn at your own pace.</p>
              <span className="inline-flex items-center mt-3 text-sm font-medium text-accent-500 group-hover:translate-x-1 transition-transform duration-200">Start learning →</span>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href="/learn" className="group block p-6 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-accent-500/30 hover:shadow-md transition-all hover:-translate-y-1 duration-200">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300"><IconFileText className="w-5 h-5" /></div>
              <h3 className="mt-3 text-lg font-bold">Quick tips & articles</h3>
              <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">Short reads you can action this week. Things that actually help your business get more customers.</p>
              <span className="inline-flex items-center mt-3 text-sm font-medium text-accent-500 group-hover:translate-x-1 transition-transform duration-200">Read tips →</span>
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* ═══ FINAL CTA ═══ */}
      <Section className="py-20 bg-brand-900 dark:bg-brand-950 text-white rounded-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="font-hand text-2xl text-accent-400 mb-3">Let&apos;s talk</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Run the tools. Send me your results.
            <br />I&apos;ll tell you what I&apos;d do.
          </h2>
          <p className="mt-4 text-brand-400">
            No pressure. If you like what you hear, we work together.
            If not, you still walk away knowing exactly what to fix.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <Magnetic>
            <a
              href="https://wa.me/64XXXXXXXXX?text=Hey%20Zag%2C%20I%20just%20ran%20your%20tools%20on%20my%20website.%20Here%20are%20my%20results%3A%0A%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-all hover:shadow-lg hover:shadow-accent-500/20 hover:-translate-y-0.5 gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send me your results on WhatsApp
            </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}
