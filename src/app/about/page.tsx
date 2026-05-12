"use client";

import Link from "next/link";
import { TextReveal } from "@/components/text-reveal";
import { ZagExpression } from "@/components/zag-expression";
import { Magnetic } from "@/components/magnetic";

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pt-28 md:pt-40 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block relative group cursor-default mb-10">
            <ZagExpression
              defaultExpression="smile"
              hoverExpression="happy"
              size={140}
              className="shadow-xl"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-accent-500 text-white text-xs font-medium whitespace-nowrap shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available · FR &amp; NZ
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            About
          </p>
          <h1 className="text-display-xl">
            Hi, I&apos;m <span className="text-accent-500">Zadig.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Je suis français, j&apos;habite Raglan, je travaille des deux côtés du monde.
          </p>
          <p className="mt-2 text-base text-[var(--muted)]/80 max-w-2xl mx-auto leading-relaxed">
            French in Raglan, working both coasts.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <TextReveal
            text="Named after a Voltaire novella from 1747. My mother is a French teacher — that one&rsquo;s on her."
            className="text-xl md:text-2xl font-medium leading-relaxed"
          />

          <div className="mt-10 space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              I studied audiovisual design in France, worked at a digital agency, then moved to Raglan in Aotearoa New Zealand. Different country, same craft. Today I work for small businesses, artists, and practitioners on both sides of the world — a French painters&rsquo; collective and a Raglan wellness practice in the same week, sometimes.
            </p>
            <p>
              The way I work doesn&rsquo;t change much across cultures. Fair prices written down before the work starts. One person on the project, not a handoff team. A site you can actually edit yourself. Honest reply within 48 hours — yes, no, or here&rsquo;s a better fit for you.
            </p>
            <p>
              <strong className="text-[var(--foreground)]">You own everything: the site, the domain, the code. Always.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
            How I work
          </p>
          <h2 className="text-display-md mb-12">
            From your brief to your launch.
          </h2>

          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="shrink-0 text-accent-500 text-sm font-mono pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 pb-8 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg">Ready when you are.</h2>
          <p className="mt-5 text-[var(--muted)] max-w-lg mx-auto">
            Send me a message, or jump on WhatsApp.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
              >
                Get in touch
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://wa.me/33752032213"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] hover:border-[var(--foreground)]/30 transition-colors"
              >
                WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

const steps: Array<{ title: string; body: string }> = [
  {
    title: "You send a brief",
    body: "A few honest sentences via the contact form, an email, or a WhatsApp. No polished spec needed.",
  },
  {
    title: "I read carefully and reply",
    body: "Within 48h on weekdays. Honest read: project is a fit, isn&rsquo;t a fit, or here are the two or three questions I need answered first.",
  },
  {
    title: "Scope &amp; quote",
    body: "If we&rsquo;re a fit, you get a short scope document and a fixed quote. Not hourly billing. Not call-for-a-quote.",
  },
  {
    title: "Design &amp; build",
    body: "I show you a clickable home in days, not weeks. We iterate honestly until it&rsquo;s right. Then I build it on Next.js, with a CMS so you can edit it.",
  },
  {
    title: "Launch &amp; hand over",
    body: "Zero-downtime launch on your domain. You get a short editor walkthrough. You own everything.",
  },
];
