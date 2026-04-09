"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { IconSearch, IconBolt, IconPencil, IconClipboardCheck, IconHand } from "@/components/icons";
import { AnimatedCounter } from "@/components/animated-counter";
import { TextReveal } from "@/components/text-reveal";

const tools = [
  { title: "SEO Audit", desc: "I'll show you what Google sees when it looks at your website.", href: "/tools/seo-audit", icon: <IconSearch className="w-6 h-6" />, step: "1" },
  { title: "Speed Test", desc: "You'll see how fast your site loads — and what's slowing it down.", href: "/tools/speed-checker", icon: <IconBolt className="w-6 h-6" />, step: "2" },
  { title: "Meta Generator", desc: "I'll write the text that shows up when people Google you.", href: "/tools/meta-generator", icon: <IconPencil className="w-6 h-6" />, step: "3" },
  { title: "Digital Checklist", desc: "You'll check every part of your online presence in one go.", href: "/tools/digital-checklist", icon: <IconClipboardCheck className="w-6 h-6" />, step: "4" },
];

const services = [
  { title: "Starter Site", price: "$599", desc: "I build you a one-page site. Mobile-ready. Clean design." },
  { title: "Business Site", price: "$1,299", desc: "I design up to 5 pages, tailored to your brand. SEO included.", popular: true },
  { title: "Growth Site", price: "$2,499", desc: "I build your full online presence. Blog, e-commerce, the lot." },
  { title: "SEO Monthly", price: "$199/mo", desc: "I manage your Google ranking and keep your business visible." },
  { title: "Social Media", price: "$349/mo", desc: "I create and post your content. You focus on your business." },
  { title: "Copywriting", price: "$149/page", desc: "I write the words that make people pick up the phone." },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function ZagFace({ expression, size = 64 }: { expression: string; size?: number }) {
  return (
    <div className="rounded-full overflow-hidden border-2 border-accent-500/20 shrink-0" style={{ width: size, height: size }}>
      <Image
        src={`/images/expressions/zag-${expression}.png`}
        alt=""
        width={400}
        height={400}
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative px-6 pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Background illustration - smile */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 md:translate-x-0 md:right-[5%] w-[400px] h-[500px] md:w-[500px] md:h-[620px] opacity-[0.06] dark:opacity-[0.04] pointer-events-none select-none">
          <Image src="/images/expressions/zag-smile.png" alt="" width={500} height={620} className="w-full h-full object-contain" aria-hidden="true" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent-500 font-hand text-2xl mb-4">
              <span className="inline-flex items-center gap-2">Before we start <IconHand className="w-5 h-5" /></span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]"
            >
              How visible is
              <br />
              <span className="text-accent-500">your business online?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-6 text-lg text-[var(--muted)] max-w-lg leading-relaxed"
            >
              I built these tools to help you find out. Run them on your website,
              see where you stand, and if you want — I&apos;ll tell you what I&apos;d fix first.
            </motion.p>
          </div>

          {/* Tools */}
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {tools.map((tool) => (
              <motion.div key={tool.title} variants={fade}>
                <Link
                  href={tool.href}
                  className="group relative block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/40 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-warm-200 dark:bg-warm-800 text-[10px] font-bold text-[var(--muted)] flex items-center justify-center">
                    {tool.step}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-colors duration-200">
                    {tool.icon}
                  </div>
                  <h3 className="mt-3 font-bold text-sm">{tool.title}</h3>
                  <p className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed">{tool.desc}</p>
                  <span className="inline-block mt-3 text-xs font-medium text-accent-500">Run it →</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section className="py-16 border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-hand text-2xl text-accent-500 mb-2">How it works</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">You test. I fix. You grow.</h2>

          <div className="mt-10 grid md:grid-cols-3 gap-10">
            {[
              { step: "1", title: "You run the tools", desc: "Check your SEO, speed, and online presence. Takes 5 minutes.", face: "skeptical" },
              { step: "2", title: "You send me your results", desc: "Hit the WhatsApp button. I see exactly where you stand.", face: "neutral" },
              { step: "3", title: "I tell you what I'd fix", desc: "You get a clear plan. If you want, I do the work.", face: "laugh" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex justify-center">
                  <ZagFace expression={s.face} size={64} />
                </div>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ ABOUT ═══ */}
      <Section className="py-20">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <p className="font-hand text-2xl text-accent-500 mb-3">Why me?</p>
            <TextReveal
              text="I'm not a big agency. I'm one person who does this really well. You get agency-quality work, from someone who answers your messages directly."
              className="text-2xl md:text-3xl font-bold tracking-tight leading-snug"
            />
            <p className="mt-6 text-[var(--muted)] leading-relaxed">
              I spent years at a digital agency in France. I moved to New Zealand and saw
              small businesses paying $5,000+ for basic sites. I thought: I can do better, for less.
            </p>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ZagFace expression="smile" size={192} />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══ SERVICES ═══ */}
      <Section className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="text-center mb-10">
          <p className="font-hand text-2xl text-accent-500 mb-2">What I can do for you</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">You pick. I build.</h2>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fade}
              className={`p-5 rounded-xl border ${s.popular ? "border-accent-500 bg-accent-500/5" : "border-[var(--border)]"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">{s.title}</h3>
                <span className="text-sm font-bold text-accent-500">{s.price}</span>
              </div>
              <p className="mt-1.5 text-xs text-[var(--muted)]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 text-center">
          <Link href="/services" className="text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors">See full details →</Link>
        </div>
      </Section>

      {/* ═══ STATS ═══ */}
      <Section className="py-14">
        <div className="grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-black text-accent-500"><AnimatedCounter value={599} prefix="$" /></div>
            <div className="mt-1 text-xs text-[var(--muted)]">Websites from</div>
          </div>
          <div>
            <div className="text-3xl font-black text-accent-500"><AnimatedCounter value={50} suffix="+" /></div>
            <div className="mt-1 text-xs text-[var(--muted)]">Businesses helped</div>
          </div>
          <div>
            <div className="text-3xl font-black text-accent-500"><AnimatedCounter value={100} suffix="%" /></div>
            <div className="mt-1 text-xs text-[var(--muted)]">You own everything</div>
          </div>
        </div>
      </Section>

      {/* ═══ TESTIMONIAL ═══ */}
      <Section className="py-16 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <ZagFace expression="laugh" size={56} />
          </div>
          <div className="flex justify-center gap-1 text-accent-500 mb-4">
            {[...Array(5)].map((_, j) => (
              <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ))}
          </div>
          <blockquote className="text-lg md:text-xl leading-relaxed font-medium">
            &ldquo;I ran Zag&apos;s tools on my website and instantly saw what was holding me back. No one had ever shown me that before. Brilliant stuff.&rdquo;
          </blockquote>
          <div className="mt-5">
            <div className="font-bold">Richard</div>
            <div className="text-sm text-[var(--muted)]">Osteopath, Hamilton</div>
          </div>
        </div>
      </Section>

      {/* ═══ CTA ═══ */}
      <Section className="py-20">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex justify-center mb-4">
            <ZagFace expression="smile" size={64} />
          </div>
          <p className="font-hand text-2xl text-accent-500 mb-3">Let&apos;s talk</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Run the tools. Send me your results.
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            No pressure. If you like what you hear, we work together.
            If not, you walk away knowing exactly what to fix.
          </p>
          <a
            href="https://wa.me/64XXXXXXXXX?text=Hey%20Zag%2C%20I%20just%20ran%20your%20tools.%20Here%20are%20my%20results%3A%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-semibold mt-8 hover:bg-accent-600 transition-colors gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Send me your results on WhatsApp
          </a>
        </div>
      </Section>
    </>
  );
}
