import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces, Inter } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Lifted Pilates — preview",
  description:
    "A preview of what a Lifted Pilates website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://lifted.co.nz/wp-content/uploads/2025/04/C0434T01.jpg";
const STUDIO_RAGLAN =
  "https://lifted.co.nz/wp-content/uploads/2025/10/pilates-raglan.webp";
const STUDIO_HAM =
  "https://lifted.co.nz/wp-content/uploads/2025/04/C0541T01.jpg";
const STUDIO_TA =
  "https://lifted.co.nz/wp-content/uploads/2025/06/Jesse-TA-Studio-2048x1152.jpg";

const LOCATIONS = [
  {
    name: "Raglan",
    image: STUDIO_RAGLAN,
    address: "[Street address to confirm]",
    note: "[Opening hours to confirm]",
  },
  {
    name: "Hamilton",
    image: STUDIO_HAM,
    address: "[North + East studios — addresses to confirm]",
    note: "[Opening hours to confirm]",
  },
  {
    name: "Te Awamutu",
    image: STUDIO_TA,
    address: "[Street address to confirm]",
    note: "[Opening hours to confirm]",
  },
];

const CLASSES = [
  {
    name: "Reformer",
    image: "https://lifted.co.nz/wp-content/uploads/2025/04/C0166T01.jpg",
    body: "[Short description of what a Reformer class looks like at Lifted — to write with Eden.]",
  },
  {
    name: "Mat",
    image: "https://lifted.co.nz/wp-content/uploads/2025/04/C0650T01.jpg",
    body: "[Short description of the Mat class — to write with Eden.]",
  },
  {
    name: "Barre",
    image: "https://lifted.co.nz/wp-content/uploads/2025/11/barre.webp",
    body: "[Short description of Barre — to write with Eden.]",
  },
];

const TEAM = [
  {
    name: "Eden",
    role: "Founder",
    image: "https://lifted.co.nz/wp-content/uploads/2025/10/EDEN.webp",
    bio: "[A few words about Eden — what brought her to Pilates, her training, the studios' philosophy.]",
  },
  {
    name: "Jesse",
    role: "Studio Manager",
    image: "https://lifted.co.nz/wp-content/uploads/2025/10/JESSE.webp",
    bio: "[A few words about Jesse — background, teaching style.]",
  },
  {
    name: "Ashleigh",
    role: "Instructor",
    image: "https://lifted.co.nz/wp-content/uploads/2025/10/ASHLEIGH.webp",
    bio: "[A few words about Ashleigh — background, teaching style.]",
  },
  {
    name: "Malin",
    role: "Instructor",
    image: "https://lifted.co.nz/wp-content/uploads/2025/10/MALIN.webp",
    bio: "[A few words about Malin — background, teaching style.]",
  },
];

export default function LiftedPilatesPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F4EFE8] text-[#1F2A1F] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[16px] tracking-tight drop-shadow"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Lifted
        </span>
        <nav className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] uppercase drop-shadow">
          <a href="#locations" className="hover:opacity-70 transition-opacity">
            Studios
          </a>
          <a href="#classes" className="hover:opacity-70 transition-opacity">
            Classes
          </a>
          <a href="#team" className="hover:opacity-70 transition-opacity">
            Team
          </a>
          <a href="#book" className="hover:opacity-70 transition-opacity">
            Book
          </a>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="A Reformer class at Lifted Pilates"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />
        <div className="relative h-full flex items-end pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-4xl text-white">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6 opacity-90"
              style={{ fontWeight: 500 }}
            >
              Pilates · Waikato
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-[112px] leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Strong bodies,
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                quieter minds.
              </span>
            </h1>
            <p
              className="mt-8 text-[15px] md:text-[17px] max-w-lg opacity-90 leading-[1.7]"
              style={{ fontWeight: 300 }}
            >
              Three studios across the Waikato. Reformer, Mat, and Barre — small
              classes, real teachers, a body that feels better by Friday.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-[11px] tracking-[0.3em] uppercase">
              <a
                href="#book"
                className="px-7 py-3.5 rounded-full bg-white text-[#1F2A1F]"
                style={{ fontWeight: 500 }}
              >
                Book a class
              </a>
              <a
                href="#locations"
                className="px-7 py-3.5 rounded-full border border-white/50 hover:border-white/90 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Find a studio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section id="locations" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#3D5641", fontWeight: 500 }}
            >
              Three studios
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Raglan, Hamilton,
              <br />
              <span style={{ fontStyle: "italic" }}>Te Awamutu.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {LOCATIONS.map((loc) => (
              <article key={loc.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DFD0]">
                  <Image
                    src={loc.image}
                    alt={`Lifted Pilates ${loc.name} studio`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="pt-6">
                  <h3
                    className="text-3xl md:text-4xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                    }}
                  >
                    {loc.name}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.75] opacity-70 mb-2"
                    style={{ fontWeight: 300 }}
                  >
                    {loc.address}
                  </p>
                  <p
                    className="text-[14px] leading-[1.75] opacity-60"
                    style={{ fontWeight: 300 }}
                  >
                    {loc.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Classes ─── */}
      <section
        id="classes"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#E8DFD0" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#3D5641", fontWeight: 500 }}
            >
              What we teach
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Three ways to
              <br />
              <span style={{ fontStyle: "italic" }}>move.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {CLASSES.map((c) => (
              <article key={c.name} className="bg-[#F4EFE8] overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`${c.name} class at Lifted Pilates`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3
                    className="text-2xl md:text-3xl mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    {c.name}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8] opacity-75"
                    style={{ fontWeight: 300 }}
                  >
                    {c.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section id="team" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#3D5641", fontWeight: 500 }}
            >
              The team
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              The people on
              <br />
              <span style={{ fontStyle: "italic" }}>the mats with you.</span>
            </h2>
            <p
              className="mt-8 text-[14px] leading-[1.85] opacity-70 max-w-xl"
              style={{ fontWeight: 300 }}
            >
              Real bios to replace what&apos;s currently on the live site — a
              sentence or two about each instructor is what turns a visitor
              into a booking.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TEAM.map((t) => (
              <article key={t.name}>
                <div className="relative aspect-square overflow-hidden bg-[#E8DFD0] mb-5">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <h3
                  className="text-xl mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                  }}
                >
                  {t.name}
                </h3>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase opacity-60 mb-4"
                  style={{ fontWeight: 500 }}
                >
                  {t.role}
                </p>
                <p
                  className="text-[13px] leading-[1.75] opacity-70"
                  style={{ fontWeight: 300, fontStyle: "italic" }}
                >
                  {t.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Book ─── */}
      <section
        id="book"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#3D5641", color: "#F4EFE8" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6 opacity-80"
            style={{ fontWeight: 500 }}
          >
            Come try a class
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            First class on us —
            <br />
            <span style={{ fontStyle: "italic" }}>
              see if it&apos;s for you.
            </span>
          </h2>
          <p
            className="text-[15px] leading-[1.85] opacity-85 max-w-xl mx-auto mb-12"
            style={{ fontWeight: 300 }}
          >
            [Booking flow, pricing and intro-class details to be confirmed with
            Eden. The live site currently routes to an external booking system.]
          </p>
          <a
            href="#"
            className="inline-block px-9 py-4 rounded-full text-[11px] tracking-[0.3em] uppercase bg-[#F4EFE8] text-[#1F2A1F]"
            style={{ fontWeight: 500 }}
          >
            Book a class
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#1F2A1F]/10"
        style={{ background: "#1F2A1F", color: "rgba(244,239,232,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Lifted Pilates · Waikato
          </span>
          <a
            href="https://raglandigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity"
            style={{ fontWeight: 400 }}
          >
            Designed by Raglan Digital · raglandigital.com
          </a>
        </div>
        <p
          className="max-w-6xl mx-auto mt-6 text-center text-[10px] tracking-[0.2em] uppercase opacity-50"
          style={{ fontWeight: 400 }}
        >
          Concept preview — real bios and class details to be added with
          Eden&apos;s input
        </p>
      </footer>
    </div>
  );
}
