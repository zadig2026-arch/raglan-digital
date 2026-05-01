import type { Metadata } from "next";
import Image from "next/image";
import { Instrument_Serif, Inter } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "MotionPlus Osteo — preview",
  description:
    "A preview of what a MotionPlus Osteo website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const CRAIG =
  "https://images.squarespace-cdn.com/content/v1/593908ba197aea05cfdfa87f/9b2dd610-b0eb-4dfb-9df3-21fa96ef8b51/Craig+O%E2%80%99Connor%2C+Hamilton+Osteopath+at+MotionPlus+Clinic.jpeg";
const CRAIG_ALT =
  "https://images.squarespace-cdn.com/content/v1/593908ba197aea05cfdfa87f/8cc74324-1952-4ff5-b37f-3bd62cff410d/craig-oconnor-hamilton-osteopath-motionplus-osteo.jpg";
const MAP =
  "https://images.squarespace-cdn.com/content/v1/593908ba197aea05cfdfa87f/880bbbff-5123-4210-85a9-31bcfccdebc0/motionplus-osteo-hamilton-te-rapa-map.webp";

const SERVICES = [
  {
    name: "Osteopathy",
    body: "[One paragraph on Craig's osteopathy practice — approach, conditions treated, typical session. To write with Craig.]",
  },
  {
    name: "Sports injury",
    body: "[One paragraph on sports-injury work — rehab approach, which athletes you see. To write with Craig.]",
  },
  {
    name: "Ongoing care",
    body: "[One paragraph on maintenance appointments — frequency, what it looks like. To write with Craig.]",
  },
];

export default function MotionPlusOsteoPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#FAFAF7] text-[#14181A] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-[#14181A]">
        <span
          className="text-[17px] tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
          }}
        >
          MotionPlus Osteo
        </span>
        <nav className="hidden md:flex gap-8 text-[12px] tracking-[0.15em] uppercase">
          <a href="#services" className="hover:opacity-70 transition-opacity">
            Services
          </a>
          <a href="#craig" className="hover:opacity-70 transition-opacity">
            About Craig
          </a>
          <a href="#visit" className="hover:opacity-70 transition-opacity">
            Visit
          </a>
          <a
            href="#book"
            className="hover:opacity-70 transition-opacity"
            style={{ fontWeight: 500 }}
          >
            Book →
          </a>
        </nav>
      </header>

      {/* ─── Hero — clinic clarity ─── */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-8"
              style={{ color: "#6B7A5A", fontWeight: 500 }}
            >
              Osteopathy · Te Rapa, Hamilton
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-[96px] leading-[0.98] tracking-tight mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Pain that
              <br />
              <span style={{ fontStyle: "italic" }}>keeps coming back.</span>
              <br />
              Let&apos;s fix it.
            </h1>
            <p
              className="text-[16px] md:text-[17px] opacity-80 leading-[1.75] max-w-lg mb-10"
              style={{ fontWeight: 300 }}
            >
              Osteopathic assessment and hands-on treatment with Craig
              O&apos;Connor. Back, neck, shoulders, sport injuries, recovery —
              most patients book in within 48 hours.
            </p>

            {/* Big contact block — the fix for the missing phone/email */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
              <a
                href="#book"
                className="block p-5 rounded-2xl bg-[#14181A] text-[#FAFAF7]"
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Call
                </p>
                <p
                  className="text-[20px] md:text-[22px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                  }}
                >
                  [Phone to confirm]
                </p>
              </a>
              <a
                href="#book"
                className="block p-5 rounded-2xl border border-[#14181A]/15"
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Email
                </p>
                <p
                  className="text-[16px] md:text-[17px] break-all"
                  style={{ fontWeight: 500 }}
                >
                  [Email to confirm]
                </p>
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#E8E4D8]">
            <Image
              src={CRAIG}
              alt="Craig O'Connor, Hamilton Osteopath"
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section
        id="services"
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: "#14181A", color: "#FAFAF7" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5 opacity-60"
              style={{ fontWeight: 500 }}
            >
              What we treat
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Hands-on care,
              <br />
              <span style={{ fontStyle: "italic" }}>measurable progress.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {SERVICES.map((s, i) => (
              <article
                key={s.name}
                className="border-t border-[#FAFAF7]/20 pt-8"
              >
                <span
                  className="text-[11px] tracking-[0.3em] uppercase opacity-50 mb-5 block"
                  style={{ fontWeight: 500 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-2xl md:text-3xl mb-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[14px] leading-[1.85] opacity-75"
                  style={{ fontWeight: 300 }}
                >
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Craig ─── */}
      <section id="craig" className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#E8E4D8] md:order-1 order-2">
            <Image
              src={CRAIG_ALT}
              alt="Craig O'Connor"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="md:order-2 order-1">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#6B7A5A", fontWeight: 500 }}
            >
              About Craig
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.05] mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              A practice built on
              <br />
              <span style={{ fontStyle: "italic" }}>
                listening first.
              </span>
            </h2>
            <div
              className="space-y-5 text-[15px] leading-[1.85] opacity-80"
              style={{ fontWeight: 300 }}
            >
              <p>
                [Craig, a few paragraphs about your training, where you
                studied, what drew you to osteopathy, and the patients you
                most enjoy helping — we&apos;ll write this with you.]
              </p>
              <p>
                [Details on registration (NZ Osteopathic Council), insurance,
                ACC-registered, any specialist interests — to confirm.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Visit ─── */}
      <section
        id="visit"
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: "#E8E4D8" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#6B7A5A", fontWeight: 500 }}
            >
              Find us
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              795 Te Rapa Road,
              <br />
              <span style={{ fontStyle: "italic" }}>Te Rapa, Hamilton.</span>
            </h2>
            <div
              className="space-y-6 text-[15px] leading-[1.85]"
              style={{ fontWeight: 400 }}
            >
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1"
                  style={{ fontWeight: 500 }}
                >
                  Hours
                </p>
                <p>[Opening hours to confirm with Craig]</p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1"
                  style={{ fontWeight: 500 }}
                >
                  Parking
                </p>
                <p>[Parking details to confirm]</p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1"
                  style={{ fontWeight: 500 }}
                >
                  ACC
                </p>
                <p>[ACC-registered status to confirm]</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-3xl bg-[#FAFAF7]">
            <Image
              src={MAP}
              alt="Map of MotionPlus Osteo location"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Book ─── */}
      <section id="book" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: "#6B7A5A", fontWeight: 500 }}
          >
            Book an appointment
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            Two ways to get
            <br />
            <span style={{ fontStyle: "italic" }}>in touch.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <a
              href="#"
              className="block p-6 rounded-2xl bg-[#14181A] text-[#FAFAF7]"
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
                style={{ fontWeight: 500 }}
              >
                Call us
              </p>
              <p
                className="text-[24px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                }}
              >
                [Phone to confirm]
              </p>
            </a>
            <a
              href="#"
              className="block p-6 rounded-2xl border border-[#14181A]/15"
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
                style={{ fontWeight: 500 }}
              >
                Book online
              </p>
              <p
                className="text-[18px] break-all"
                style={{ fontWeight: 500 }}
              >
                [Booking URL to confirm]
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#14181A]/10"
        style={{ background: "#14181A", color: "rgba(250,250,247,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} MotionPlus Osteo · Te Rapa, Hamilton
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
          Concept preview — contact info and service descriptions to be
          confirmed with Craig
        </p>
      </footer>
    </div>
  );
}
