"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import Lenis from "lenis";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lykke-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-lykke-body",
});

const script = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-lykke-script",
});

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_SLOW = [0.32, 0.72, 0, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Grain overlay — fixed, pointer-events none, subtle film feel
// ─────────────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.11 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.9 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        backgroundSize: "200px 200px",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom cursor — small dot + expanding ring on interactive hover
// ─────────────────────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState<"default" | "link">("default");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only enable on devices with fine pointer (skip touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    let rafId = 0;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const enter = () => setHovering("link");
    const leave = () => setHovering("default");

    const attach = () => {
      document.querySelectorAll<HTMLElement>("[data-cursor='link']").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    const detach = () => {
      document.querySelectorAll<HTMLElement>("[data-cursor='link']").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(tick);
    // Delay attach so the DOM has rendered interactive elements
    const attachId = window.setTimeout(attach, 300);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
      window.clearTimeout(attachId);
      detach();
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[6px] w-[6px] rounded-full bg-[#1C1714] md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ring}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border transition-[transform,border,opacity] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] md:block ${
          hovering === "link"
            ? "scale-150 border-[#C27154]/60 opacity-100"
            : "scale-100 border-[#1C1714]/20 opacity-80"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Smooth scroll — Lenis lifecycle tied to this route only
// ─────────────────────────────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Intro curtain — draws "Lykke" then lifts
// ─────────────────────────────────────────────────────────────────────────────
function Intro({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#FAF5EE]"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.1, ease: EASE_SLOW, delay: 0.2 }}
      onAnimationComplete={(def) => {
        if (def && typeof def === "object" && "y" in def && def.y === "-100%") {
          onDone();
        }
      }}
    >
      <motion.span
        className="text-[#1C1714]"
        style={{
          fontFamily: "var(--font-lykke-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(96px, 18vw, 240px)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
      >
        Lykke
      </motion.span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared fade-up for sections entering viewport
// ─────────────────────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The main experience
// ─────────────────────────────────────────────────────────────────────────────
export function LykkeExperience() {
  const [introDone, setIntroDone] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useLenis();

  // Hero parallax — photo drifts, text rises slightly
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.08]);
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);
  const heroOverlayOpacity = useTransform(heroScroll, [0, 1], [0.4, 0.75]);

  // Hide scroll during intro to prevent pre-reveal
  useEffect(() => {
    if (introDone) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => {
      document.body.style.overflow = "";
    }, 50);
    return () => clearTimeout(t);
  }, [introDone]);

  return (
    <div
      className={`${display.variable} ${body.variable} ${script.variable} relative min-h-[100dvh] overflow-x-clip bg-[#FAF5EE] text-[#1C1714] antialiased`}
      style={{ fontFamily: "var(--font-lykke-body), system-ui, sans-serif" }}
    >
      <Grain />
      <CustomCursor />

      <AnimatePresence>
        {!introDone && (
          <Intro
            key="intro"
            onDone={() => setIntroDone(true)}
          />
        )}
      </AnimatePresence>

      {/* Trigger the intro exit after 1.6s */}
      <IntroTimer onDone={() => setIntroDone(true)} />

      {/* ─── Floating nav ─── */}
      <FloatingNav />

      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] min-h-[680px] w-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale, y: heroImageY }}
        >
          <Image
            src="/prospects/lykke/01.jpg"
            alt="Table spread at Lykke — lattes, bowls, and pastries"
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#1C1714]/20 via-transparent to-[#1C1714]/40"
          style={{ opacity: heroOverlayOpacity }}
        />

        <motion.div
          className="relative flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ y: heroTextY }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-[0.5em] text-white/80"
            style={{ fontWeight: 500 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.9, ease: EASE_OUT }}
          >
            Cafe · Catering · Homeware · Happiness
          </motion.span>

          <motion.h1
            className="mt-6 text-white"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(84px, 22vw, 320px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
            }}
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.9, duration: 1.3, ease: EASE_OUT }}
          >
            Lykke
          </motion.h1>

          <motion.p
            className="mt-8 max-w-md text-[15px] leading-relaxed text-white/90"
            style={{ fontWeight: 300 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.9, ease: EASE_OUT }}
          >
            A Kiwi-Danish cafe and homewares shop in Frankton, Hamilton.
            <br />
            Run by Malcolm and Juliet, since 2020.
          </motion.p>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ fontWeight: 500 }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─── Dictionary moment ─── */}
      <DictionarySection />

      {/* ─── Story — Malcolm & Juliet ─── */}
      <StorySection />

      {/* ─── Menu ─── */}
      <MenuSection />

      {/* ─── Little — the shop next door ─── */}
      <LittleSection />

      {/* ─── Community quote ─── */}
      <CommunitySection />

      {/* ─── Visit ─── */}
      <VisitSection />

      {/* ─── Footer ─── */}
      <footer className="px-6 pb-10 pt-16 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#1C1714]/10 pt-8 text-[11px] uppercase tracking-[0.3em] md:flex-row">
          <span className="opacity-50" style={{ fontWeight: 500 }}>
            © {new Date().getFullYear()} Lykke · 1 Greenwood St, Frankton
          </span>
          <a
            href="https://raglandigital.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="opacity-50 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-100"
            style={{ fontWeight: 500 }}
          >
            Designed by Raglan Digital · raglandigital.com
          </a>
        </div>
      </footer>
    </div>
  );
}

// Force the intro to resolve after animation (extra safety)
function IntroTimer({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating glass nav (section 5.A — Fluid Island)
// ─────────────────────────────────────────────────────────────────────────────
function FloatingNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Story", href: "#story" },
    { label: "Menu", href: "#menu" },
    { label: "Little", href: "#little" },
    { label: "Visit", href: "#visit" },
  ];

  return (
    <>
      <motion.nav
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.9, ease: EASE_OUT }}
      >
        <div
          className="flex items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-2xl"
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.35), 0 10px 30px -10px rgba(28,23,20,0.2)",
          }}
        >
          <span
            className="hidden px-4 text-[13px] text-[#1C1714]/80 sm:block"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Lykke
          </span>
          <div className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="link"
                className="rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#1C1714]/80 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#1C1714]/5 hover:text-[#1C1714]"
                style={{ fontWeight: 500 }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#1C1714] text-white sm:hidden"
          >
            <motion.span
              className="absolute block h-[1.5px] w-4 bg-white"
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 0 : -4,
              }}
              transition={{ duration: 0.5, ease: EASE_SLOW }}
            />
            <motion.span
              className="absolute block h-[1.5px] w-4 bg-white"
              animate={{
                rotate: open ? -45 : 0,
                y: open ? 0 : 4,
              }}
              transition={{ duration: 0.5, ease: EASE_SLOW }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile expanded overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#FAF5EE]/95 backdrop-blur-3xl sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SLOW }}
          >
            <ul className="flex flex-col items-center gap-10">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.7,
                    ease: EASE_OUT,
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-4xl text-[#1C1714]"
                    style={{
                      fontFamily: "var(--font-lykke-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dictionary section — signature typographic moment
// ─────────────────────────────────────────────────────────────────────────────
function DictionarySection() {
  return (
    <section className="relative px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p
            className="mb-10 text-[11px] uppercase tracking-[0.45em] text-[#1C1714]/50"
            style={{ fontWeight: 500 }}
          >
            The name
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="text-[#1C1714]"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(96px, 20vw, 280px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.88,
            }}
          >
            Lykke.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12">
          <FadeUp delay={0.2} className="md:col-span-4">
            <div
              className="text-[18px] text-[#1C1714]/80"
              style={{
                fontFamily: "var(--font-lykke-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              /leur·kah/
            </div>
            <div
              className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#1C1714]/50"
              style={{ fontWeight: 500 }}
            >
              noun · Danish
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="md:col-span-8">
            <ol className="space-y-8 border-l border-[#1C1714]/15 pl-8">
              <li>
                <span
                  className="mr-4 text-[11px] uppercase tracking-[0.3em] text-[#C27154]"
                  style={{ fontWeight: 500 }}
                >
                  01
                </span>
                <span
                  className="text-[22px] leading-[1.5] text-[#1C1714] md:text-[26px]"
                  style={{ fontWeight: 300 }}
                >
                  An absolute state of happiness.
                </span>
              </li>
              <li>
                <span
                  className="mr-4 text-[11px] uppercase tracking-[0.3em] text-[#C27154]"
                  style={{ fontWeight: 500 }}
                >
                  02
                </span>
                <span
                  className="text-[22px] leading-[1.5] text-[#1C1714] md:text-[26px]"
                  style={{ fontWeight: 300 }}
                >
                  A cafe at 1 Greenwood Street, Frankton &mdash; run by Malcolm
                  and Juliet with their daughters Eloise and Addison.
                </span>
              </li>
            </ol>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Story — Malcolm & Juliet origin
// ─────────────────────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section
      id="story"
      className="relative px-6 py-32 md:px-12 md:py-48"
      style={{ background: "#F0E7D7" }}
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-5">
          <FadeUp>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10">
              <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                <Image
                  src="/prospects/lykke/07.jpg"
                  alt="Malcolm and Juliet in the empty space before Lykke opened"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </div>
            <p
              className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#1C1714]/55"
              style={{ fontWeight: 500 }}
            >
              Malcolm & Juliet, before the doors opened.
            </p>
          </FadeUp>
        </div>

        <div className="md:col-span-7">
          <FadeUp delay={0.1}>
            <p
              className="mb-8 text-[11px] uppercase tracking-[0.45em] text-[#C27154]"
              style={{ fontWeight: 500 }}
            >
              The story
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2
              className="mb-10 text-[#1C1714]"
              style={{
                fontFamily: "var(--font-lykke-display)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(42px, 5vw, 68px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
              }}
            >
              A couple with a name they couldn&rsquo;t stop thinking about.
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div
              className="space-y-6 text-[17px] leading-[1.8] text-[#1C1714]/80"
              style={{ fontWeight: 300 }}
            >
              <p>
                <span
                  className="float-left mr-3 text-[72px] leading-[0.85] text-[#C27154]"
                  style={{
                    fontFamily: "var(--font-lykke-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  L
                </span>
                ykke is a Danish word with no clean English translation. It lands
                somewhere between happiness and contentment &mdash; the kind you
                feel when small things line up: good coffee, someone you love
                nearby, a plant on the windowsill getting the afternoon sun.
              </p>

              <p>
                Malcolm and Juliet had spent years in hospitality when they
                started thinking about what a cafe of their own might feel like.
                The word lykke kept coming back. They opened the doors in
                Frankton in 2020, and brought their daughters Eloise and Addison
                into the story from the beginning.
              </p>

              <p>
                Today Lykke is a cafe with Grey Roasting coffee and Kiwi-Danish
                food, a catering kitchen that ships grazing boards across the
                Waikato, and Little &mdash; the shop next door, with the plants
                Juliet grows herself and the homewares they&rsquo;ve both
                collected with care.
              </p>

              <p
                className="pt-4 text-[22px] italic leading-[1.5] text-[#1C1714]"
                style={{
                  fontFamily: "var(--font-lykke-display)",
                  fontWeight: 400,
                }}
              >
                &ldquo;Happiness comes from our community. In the coming together
                of people and moments, enjoying the small pleasures in life.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Menu — editorial price lists with photographic interludes
// ─────────────────────────────────────────────────────────────────────────────
type MenuItem = { name: string; desc: string; price: string };
const menuSections: {
  heading: string;
  eyebrow: string;
  items: MenuItem[];
}[] = [
  {
    eyebrow: "Slow mornings",
    heading: "Breakfast & brunch",
    items: [
      {
        name: "Smørrebrød — smoked salmon",
        desc: "Rye, pickled beetroot, horseradish crème, dill.",
        price: "22",
      },
      {
        name: "The Lykke poke",
        desc: "Salmon, edamame, pickled red cabbage, togarashi, jasmine rice.",
        price: "24",
      },
      {
        name: "Avocado toast",
        desc: "Sourdough, soft herbs, chili crunch, toasted sesame.",
        price: "18",
      },
      {
        name: "Danish pancakes",
        desc: "Stack of three, whipped crème, seasonal compote, maple.",
        price: "19",
      },
    ],
  },
  {
    eyebrow: "Grey Roasting",
    heading: "Coffee & tea",
    items: [
      {
        name: "Espresso",
        desc: "House blend, single or double.",
        price: "4.5",
      },
      {
        name: "Flat white",
        desc: "The Kiwi standard, made properly.",
        price: "5.5",
      },
      {
        name: "Batch brew",
        desc: "Rotating single origin, v60 or filter.",
        price: "6",
      },
      {
        name: "Hot chocolate",
        desc: "Dark, house-spiced, with steamed oat milk.",
        price: "6.5",
      },
    ],
  },
  {
    eyebrow: "Sweet small things",
    heading: "Pastries",
    items: [
      {
        name: "Beetroot brownie",
        desc: "House-made, cocoa-dense, whipped crème fraîche.",
        price: "8",
      },
      {
        name: "Kardemommeboller",
        desc: "Cardamom bun, glazed. Baked fresh daily.",
        price: "7",
      },
      {
        name: "Almond croissant",
        desc: "Twice-baked, frangipane, icing sugar.",
        price: "7.5",
      },
    ],
  },
];

function MenuSection() {
  return (
    <section
      id="menu"
      className="relative px-6 py-32 md:px-12 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#C27154]"
            style={{ fontWeight: 500 }}
          >
            Kitchen
          </p>
          <h2
            className="max-w-3xl text-[#1C1714]"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(52px, 7vw, 112px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
            }}
          >
            Food that tastes like it was made for someone.
          </h2>
        </FadeUp>

        {/* Asymmetric grid: big photo sticky on left, menu lists on right */}
        <div className="mt-24 grid gap-16 md:grid-cols-12 md:gap-20">
          {/* Sticky photo column */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <FadeUp>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10">
                  <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                    <Image
                      src="/prospects/lykke/04.jpg"
                      alt="Open sandwich being plated at Lykke"
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                  </div>
                </div>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#1C1714]/55"
                  style={{ fontWeight: 500 }}
                >
                  Smørrebrød — the Danish open sandwich.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Menu lists */}
          <div className="md:col-span-7">
            <div className="space-y-20">
              {menuSections.map((sec) => (
                <MenuSectionBlock key={sec.heading} {...sec} />
              ))}
            </div>
          </div>
        </div>

        {/* Catering teaser — full width photo + CTA */}
        <div className="mt-32">
          <FadeUp>
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-7">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10">
                  <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                    <Image
                      src="/prospects/lykke/02.jpg"
                      alt="Danish graze gourmet catering board"
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 58vw"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center md:col-span-5">
                <p
                  className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#C27154]"
                  style={{ fontWeight: 500 }}
                >
                  For your gathering
                </p>
                <h3
                  className="mb-5 text-[#1C1714]"
                  style={{
                    fontFamily: "var(--font-lykke-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  Catering & grazing boards.
                </h3>
                <p
                  className="mb-8 text-[16px] leading-[1.75] text-[#1C1714]/75"
                  style={{ fontWeight: 300 }}
                >
                  Grazing platters, canapés, bruschetta boards and hot trays
                  &mdash; delivered across the Waikato for weddings, birthdays,
                  offices, and every kind of gathering worth feeding well.
                </p>
                <a
                  href="#visit"
                  data-cursor="link"
                  className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#1C1714] py-3 pl-6 pr-2 text-[12px] uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                  style={{ fontWeight: 500 }}
                >
                  Enquire about catering
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-white"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function MenuSectionBlock({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: MenuItem[];
}) {
  return (
    <FadeUp>
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <div>
          <p
            className="mb-2 text-[11px] uppercase tracking-[0.4em] text-[#1C1714]/50"
            style={{ fontWeight: 500 }}
          >
            {eyebrow}
          </p>
          <h3
            className="text-[#1C1714]"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 3.4vw, 52px)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            {heading}
          </h3>
        </div>
      </div>
      <ul className="divide-y divide-[#1C1714]/10">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-start justify-between gap-6 py-5"
          >
            <div className="flex-1">
              <div
                className="text-[17px] text-[#1C1714]"
                style={{ fontWeight: 500 }}
              >
                {item.name}
              </div>
              <div
                className="mt-1 text-[14px] leading-[1.55] text-[#1C1714]/60"
                style={{ fontWeight: 300 }}
              >
                {item.desc}
              </div>
            </div>
            <div
              className="shrink-0 text-[18px] text-[#1C1714]/70 tabular-nums"
              style={{
                fontFamily: "var(--font-lykke-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {item.price}
            </div>
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Little — the shop next door (editorial reverse split)
// ─────────────────────────────────────────────────────────────────────────────
function LittleSection() {
  return (
    <section
      id="little"
      className="relative px-6 py-32 md:px-12 md:py-48"
      style={{ background: "#F0E7D7" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-6">
            <FadeUp>
              <p
                className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#7A8E72]"
                style={{ fontWeight: 500 }}
              >
                The shop next door
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="mb-2 text-[#1C1714]"
                style={{
                  fontFamily: "var(--font-lykke-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(64px, 10vw, 160px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                }}
              >
                Little.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                className="mt-8 max-w-md text-[17px] leading-[1.8] text-[#1C1714]/80"
                style={{ fontWeight: 300 }}
              >
                A quiet corner of the cafe where Juliet&rsquo;s hand-grown indoor
                plants live alongside ceramics, candles, and small, lovingly
                chosen things for your home. Everything you see is from a local
                or small maker we&rsquo;ve met in person.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="mt-12 space-y-4 text-[14px] uppercase tracking-[0.2em] text-[#1C1714]/60">
                {[
                  "Indoor plants",
                  "Ceramics & vessels",
                  "Candles & soap",
                  "Thrifted small finds",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center justify-between border-b border-[#1C1714]/10 pb-4"
                    style={{ fontWeight: 500 }}
                  >
                    <span>{t}</span>
                    <span className="text-[#7A8E72]">·</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="md:col-span-6">
            <FadeUp className="md:mt-16">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                  <Image
                    src="/prospects/lykke/12.jpg"
                    alt="Inside Little — the homewares shop at Lykke"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48vw"
                  />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10 md:-ml-16">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                  <Image
                    src="/prospects/lykke/03.jpg"
                    alt="Shelves of curated homewares and plants"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48vw"
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Community section — full-bleed photo with pull quote parallax
// ─────────────────────────────────────────────────────────────────────────────
function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: photoY, scale: 1.12 }}
      >
        <Image
          src="/prospects/lykke/06.jpg"
          alt="A family sharing a meal at Lykke"
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1714]/40 via-[#1C1714]/30 to-[#1C1714]/60" />

      <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-32 md:px-12">
        <FadeUp>
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="mb-8 text-[11px] uppercase tracking-[0.5em] text-white/70"
              style={{ fontWeight: 500 }}
            >
              Community
            </p>
            <p
              className="text-white"
              style={{
                fontFamily: "var(--font-lykke-display)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(32px, 4.5vw, 64px)",
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
              }}
            >
              &ldquo;Happiness comes from the coming together of people and
              moments &mdash; the small pleasures of a life lived well.&rdquo;
            </p>
            <p
              className="mt-10 text-[11px] uppercase tracking-[0.3em] text-white/60"
              style={{ fontWeight: 500 }}
            >
              Malcolm & Juliet
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Visit section — address, hours, phone in editorial three-column
// ─────────────────────────────────────────────────────────────────────────────
function VisitSection() {
  return (
    <section
      id="visit"
      className="relative px-6 py-32 md:px-12 md:py-48"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#C27154]"
            style={{ fontWeight: 500 }}
          >
            Come by
          </p>
          <h2
            className="max-w-4xl text-[#1C1714]"
            style={{
              fontFamily: "var(--font-lykke-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(48px, 6.5vw, 96px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            A seat is waiting in Frankton.
          </h2>
        </FadeUp>

        <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-16">
          <FadeUp className="md:col-span-7" delay={0.1}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-[#1C1714]/5 p-1.5 ring-1 ring-[#1C1714]/10">
              <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-0.375rem)]">
                <Image
                  src="/prospects/lykke/09.jpg"
                  alt="The Lykke dining room"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
            </div>
          </FadeUp>

          <FadeUp className="md:col-span-5" delay={0.2}>
            <div className="grid grid-cols-1 gap-10">
              <InfoBlock
                label="Where"
                primary="1 Greenwood Street"
                secondary="Frankton, Hamilton 3204"
              />
              <InfoBlock
                label="Hours"
                primary="Mon – Fri · 7am – 3pm"
                secondary={
                  <>
                    Saturday · 8am – 3pm
                    <br />
                    Sunday · closed
                  </>
                }
              />
              <InfoBlock
                label="Reservations & catering"
                primary="027 404 9447"
                secondary="Or knock on the door."
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}) {
  return (
    <div className="border-t border-[#1C1714]/15 pt-6">
      <p
        className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[#1C1714]/50"
        style={{ fontWeight: 500 }}
      >
        {label}
      </p>
      <div
        className="text-[22px] text-[#1C1714]"
        style={{
          fontFamily: "var(--font-lykke-display)",
          fontStyle: "italic",
          fontWeight: 400,
          letterSpacing: "-0.015em",
        }}
      >
        {primary}
      </div>
      <div
        className="mt-2 text-[15px] text-[#1C1714]/65"
        style={{ fontWeight: 300 }}
      >
        {secondary}
      </div>
    </div>
  );
}
