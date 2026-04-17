"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BookOpen, Zap } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { ZagExpression } from "@/components/zag-expression";
import { Magnetic } from "@/components/magnetic";
import { ChapterIndicator, type Chapter } from "@/components/chapter-indicator";
import { PullQuote } from "@/components/pull-quote";
import { MarginNote } from "@/components/margin-note";
import { cn } from "@/lib/utils";

type Mode = "long" | "short";

const chapters: Chapter[] = [
  { id: "ch-1", roman: "I.", title: "Before the AI" },
  { id: "ch-2", roman: "II.", title: "The agency" },
  { id: "ch-3", roman: "III.", title: "The conversation" },
  { id: "ch-4", roman: "IV.", title: "How I work" },
  { id: "ch-5", roman: "V.", title: "What I'm not" },
];

function ModeToggle({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex items-center gap-2 p-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => onModeChange("long")}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
          mode === "long"
            ? "bg-accent-500 text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        )}
        aria-pressed={mode === "long"}
      >
        <BookOpen className="w-4 h-4" />
        <span>The long story</span>
        <span className={cn("text-xs", mode === "long" ? "text-white/70" : "text-[var(--muted)]")}>
          2 min
        </span>
      </button>
      <button
        type="button"
        onClick={() => onModeChange("short")}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
          mode === "short"
            ? "bg-accent-500 text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        )}
        aria-pressed={mode === "short"}
      >
        <Zap className="w-4 h-4" />
        <span>Short version</span>
        <span className={cn("text-xs", mode === "short" ? "text-white/70" : "text-[var(--muted)]")}>
          20s
        </span>
      </button>
    </div>
  );
}

function Prologue({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ySub = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center px-6 overflow-hidden"
    >
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-[380px] h-[380px] rounded-full bg-accent-300/20 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-5xl mx-auto w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-hand text-2xl md:text-3xl text-accent-500 mb-5"
        >
          A story in five chapters.
        </motion.p>

        <motion.h1
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.02]"
        >
          A Frenchman walks<br />
          into a New Zealand<br />
          <span className="text-accent-500">surf town.</span>
        </motion.h1>

        <motion.div
          style={{ y: ySub }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center gap-5"
        >
          <ZagExpression
            defaultExpression="smile"
            hoverExpression="happy"
            size={72}
            className="rounded-2xl"
          />
          <p className="font-hand text-2xl md:text-3xl text-[var(--muted)]">
            This is what happens next.
            <br />
            <span className="text-[var(--foreground)]">— Zadig</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <p className="font-hand text-lg text-[var(--muted)]">
            Got a minute? Got twenty seconds?
          </p>
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </motion.div>

      </motion.div>
    </section>
  );
}

function ChapterHeading({ roman, title }: { roman: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="font-hand text-3xl text-accent-500 mb-2">{roman}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function ChapterOne() {
  return (
    <section
      id="ch-1"
      className="relative py-28 md:py-40 px-6 bg-[var(--background)]"
    >
      <div className="max-w-3xl mx-auto relative">
        <ChapterHeading roman="I." title="The camera before the AI." />

        <TextReveal
          text="France, 2022. Audiovisual school. I was editing a documentary no one would watch, while the people around me were writing prompts and building things I didn't know could be built yet."
          className="text-2xl md:text-3xl font-medium leading-snug"
        />

        <div className="mt-10 space-y-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed relative">
          <p className="text-[var(--foreground)] font-medium">
            That was the moment I stopped trusting the camera.
          </p>

          <div className="relative">
            <p>
              I was supposed to be learning editing, post-production, lighting
              — the whole craft of making things look good on screen. But my
              classmates were in tech. AI. Game dev. Web. They were building
              with tools that felt a little like cheating, and I spent more and
              more time looking at their screens instead of mine.
            </p>
            <MarginNote>(film school was, uh, a choice.)</MarginNote>
          </div>

          <p>
            Eventually I admitted the obvious: the internet was the more
            interesting camera.
          </p>

          <p>
            So I taught myself. Mostly on trains.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChapterTwo() {
  return (
    <section
      id="ch-2"
      className="relative py-28 md:py-40 px-6 bg-[var(--surface)]"
    >
      <div className="max-w-3xl mx-auto relative">
        <ChapterHeading roman="II." title="The agency years." />

        <TextReveal
          text="Three years at a digital agency. I built sites for a notary, a pet store, and a bakery that made bread so dense you could stop a burglar with it."
          className="text-2xl md:text-3xl font-medium leading-snug"
        />

        <div className="mt-10 space-y-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed relative">
          <div className="relative">
            <p>
              SEO for dentists. Ad campaigns for tradies. A Facebook page for
              a man who sold garden sheds and had strong opinions about it.
            </p>
            <MarginNote>*probably an exaggeration.<br />Slightly.</MarginNote>
          </div>

          <p className="text-[var(--foreground)]">
            What I learned in three years of this:
          </p>

          <p>
            Most of what gets sold as <em>digital marketing</em> is noise.
            The stuff that actually moves the needle is almost always boring.
            Speed. Structure. Trust. Fundamentals. A page that loads in one
            second instead of five. A title tag that matches how people
            actually search. A photo that isn&apos;t a stock photo.
          </p>

          <p>
            Nobody wants to sell you boring. Boring doesn&apos;t have a markup.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChapterThree() {
  return (
    <section
      id="ch-3"
      className="relative py-28 md:py-40 px-6 bg-[var(--background)]"
    >
      <div className="max-w-3xl mx-auto relative">
        <ChapterHeading roman="III." title="The conversation." />

        <TextReveal
          text="I came to Raglan with a backpack and a surfboard I couldn't ride yet. I wasn't planning to start anything."
          className="text-2xl md:text-3xl font-medium leading-snug"
        />

        <div className="mt-10 space-y-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed">
          <p>
            The plan was: learn to surf badly, drink flat whites, go home.
          </p>

          <p>
            But every single time I told a local what I did back in France,
            they said, almost word for word, the same sentence.
          </p>

          <p className="text-[var(--foreground)] italic">
            After the fifth time, I started listening.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChapterFour() {
  const principles = [
    {
      headline: "You own everything.",
      body: "The domain, the code, the content. No lock-in. No surprise invoices. If you ever want to walk away, you walk away with the keys.",
    },
    {
      headline: "Fair prices. Honest ones.",
      body: "$250 NZD a month if you want me to run your SEO. Free if you're one of my first five local clients — I need the case studies, you need the website, we help each other out.",
    },
    {
      headline: "Free tools first.",
      body: "If a free tool solves your problem, I'll show you how to use it and walk away. I'd rather earn your trust than your retainer.",
    },
    {
      headline: "I'm new here. That's the offer.",
      body: "I have maybe three clients. You won't be one of forty. You'll get the attention a big agency can't give you — because I don't have the luxury of losing you.",
    },
  ];

  return (
    <section
      id="ch-4"
      className="relative py-28 md:py-40 px-6 bg-[var(--surface)]"
    >
      <div className="max-w-3xl mx-auto">
        <ChapterHeading roman="IV." title="How I work." />

        <div className="space-y-12 md:space-y-16">
          {principles.map((p, i) => (
            <motion.div
              key={p.headline}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline border-t border-[var(--border)] pt-10"
            >
              <span className="font-hand text-3xl md:text-4xl text-accent-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {p.headline}
                </h3>
                <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterFive() {
  const disclaimers = [
    "— No, I don't have 15 years of experience. I have the right ones.",
    "— No, I don't have 200 Kiwi clients. I have zero. That's exactly what I'm fixing — starting with five freebies.",
    "— No, I don't do contracts that trap you. I do work that makes you want to stay.",
    "— No, I don't surf well yet. Working on it.",
  ];

  return (
    <section
      id="ch-5"
      className="relative py-28 md:py-40 px-6 bg-[var(--background)]"
    >
      <div className="max-w-3xl mx-auto relative">
        <ChapterHeading roman="V." title="What I'm not." />

        <p className="text-xl md:text-2xl font-medium text-[var(--foreground)] mb-10">
          Let me save you a sales call.
        </p>

        <ul className="space-y-6">
          {disclaimers.map((d, i) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl leading-relaxed text-[var(--muted)] pl-5 border-l-2 border-accent-500/30 hover:border-accent-500 transition-colors"
            >
              {d}
            </motion.li>
          ))}
        </ul>

        <div className="mt-16 flex items-start gap-6">
          <ZagExpression
            defaultExpression="neutral"
            hoverExpression="smile"
            size={96}
            className="rounded-2xl"
          />
          <p className="font-hand text-2xl md:text-3xl text-[var(--foreground)] leading-snug pt-2">
            Still reading?
            <br />
            <span className="text-accent-500">Good sign.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ShortBio() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[var(--surface)]">
      <div className="max-w-3xl mx-auto">
        <p className="font-hand text-2xl text-accent-500 mb-4">The short version.</p>

        <div className="space-y-6 text-xl md:text-2xl leading-relaxed">
          <p>
            French. Audiovisual school, then three years at a digital agency building
            websites and running SEO for small businesses.
          </p>
          <p>
            Moved to Raglan with a surfboard I couldn&apos;t ride yet. The plan was
            flat whites and waves.
          </p>
          <p className="font-medium">
            Then locals kept telling me they needed a website. After the fifth time, I listened.
          </p>
          <p className="text-[var(--muted)]">
            Now I build websites for NZ small businesses. Honestly. At fair prices.
            Here&apos;s how.
          </p>
        </div>
      </div>
    </section>
  );
}

function Epilogue() {
  return (
    <section className="relative py-28 md:py-40 px-6 bg-accent-500 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px, 80px 80px",
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <p className="font-hand text-2xl md:text-3xl text-white/80 mb-5">
          The pitch.
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
          If your website isn&apos;t doing anything for you,
          <br />
          <span className="text-white/70">that&apos;s not your fault.</span>
          <br />
          It&apos;s mine, now.
        </h2>

        <p className="mt-10 font-hand text-3xl text-white">— Zadig</p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/contact"
              className="h-12 px-8 inline-flex items-center rounded-xl bg-white text-accent-600 text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Send a message
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 inline-flex items-center gap-2 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.331 0-4.512-.637-6.39-1.747l-.446-.269-3.152 1.057 1.057-3.152-.269-.446A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp me
            </a>
          </Magnetic>
        </div>

        <p className="mt-10 text-sm text-white/60 font-hand text-lg">
          (I reply faster than my old agency did. Much faster.)
        </p>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [mode, setMode] = useState<Mode>("long");

  return (
    <>
      <ScrollProgress />
      {mode === "long" && <ChapterIndicator chapters={chapters} />}
      <Prologue mode={mode} onModeChange={setMode} />

      <AnimatePresence mode="wait">
        {mode === "long" ? (
          <motion.div
            key="long"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ChapterOne />
            <ChapterTwo />
            <PullQuote>
              Most agencies sell you the Ferrari.
              <br />
              What you actually need is a good bicycle.
            </PullQuote>
            <ChapterThree />
            <PullQuote attribution="Every local, more or less">
              Mate, there&apos;s so much work for you here.
            </PullQuote>
            <ChapterFour />
            <ChapterFive />
          </motion.div>
        ) : (
          <motion.div
            key="short"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ShortBio />
            <ChapterFour />
          </motion.div>
        )}
      </AnimatePresence>

      <Epilogue />
    </>
  );
}
