import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Balance Me — preview",
  description:
    "A preview of what a Balance Me website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://balanceme.co.nz/wp-content/uploads/2018/02/balance_me_pilates.jpg";
const PILATES_IMG =
  "https://balanceme.co.nz/wp-content/uploads/2018/02/Balance-Me_Pilates-Image_Homepage.jpg";
const BOWEN_IMG =
  "https://balanceme.co.nz/wp-content/uploads/2018/02/Balance-Me_Bowen-Therapy_Homepage.jpg";
const ONDEMAND_IMG =
  "https://balanceme.co.nz/wp-content/uploads/2021/10/Balance-Me_Online-Workshops_Homepage.jpg";

const SERVICES = [
  {
    name: "Pilates",
    image: PILATES_IMG,
    body: "Group classes and private sessions.",
    price: "From $26",
  },
  {
    name: "Bowen Therapy",
    image: BOWEN_IMG,
    body: "Gentle, hands-on bodywork for pain and tension.",
    price: "From $110 (adult)",
  },
  {
    name: "On Demand",
    image: ONDEMAND_IMG,
    body: "Online workshops and classes, on your schedule.",
    price: "[Pricing to confirm]",
  },
];

export default function BalanceMePreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F7F2EC] text-[#1C1917] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[20px] drop-shadow"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Balance Me
        </span>
        <nav className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] uppercase drop-shadow">
          <a href="#services" className="hover:opacity-70 transition-opacity">
            Services
          </a>
          <a href="#andria" className="hover:opacity-70 transition-opacity">
            About
          </a>
          <a href="#visit" className="hover:opacity-70 transition-opacity">
            Visit
          </a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">
            Contact
          </a>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative h-screen min-h-[620px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="A Balance Me Pilates session"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/60" />
        <div className="relative h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl text-white">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6 opacity-90"
              style={{ fontWeight: 500 }}
            >
              Pilates · Bowen Therapy · Hamilton
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-[104px] leading-[1.02] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
              }}
            >
              A body that
              <br />
              <span style={{ fontStyle: "italic" }}>feels right again.</span>
            </h1>
            <p
              className="mt-8 text-[16px] md:text-[18px] max-w-xl opacity-90 leading-[1.7]"
              style={{ fontWeight: 300 }}
            >
              Small-group Pilates and Bowen Therapy with Andria. Work through
              pain, build strength, come back to yourself.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-[11px] tracking-[0.3em] uppercase">
              <a
                href="#services"
                className="px-7 py-3.5 rounded-full bg-white text-[#1C1917]"
                style={{ fontWeight: 500 }}
              >
                See services
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full border border-white/50"
                style={{ fontWeight: 500 }}
              >
                Book a session
              </a>
            </div>

            {/* Visible address placeholder — fixes the missing address defect */}
            <p
              className="mt-12 text-[12px] tracking-[0.2em] uppercase opacity-80 border-t border-white/20 pt-6 max-w-md"
              style={{ fontWeight: 400 }}
            >
              Visit us · [Studio address to confirm]
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8C6A4E", fontWeight: 500 }}
            >
              What we offer
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Three ways
              <br />
              <span style={{ fontStyle: "italic" }}>to work together.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((s) => (
              <article key={s.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DFD2]">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="pt-6">
                  <h3
                    className="text-2xl md:text-3xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.75] opacity-70 mb-4"
                    style={{ fontWeight: 300 }}
                  >
                    {s.body}
                  </p>
                  <div
                    className="flex justify-between items-baseline border-t border-[#1C1917]/10 pt-4"
                  >
                    <span
                      className="text-[11px] tracking-[0.25em] uppercase opacity-60"
                      style={{ fontWeight: 500 }}
                    >
                      {s.price}
                    </span>
                    <span
                      className="text-[11px] tracking-[0.3em] uppercase"
                      style={{ color: "#8C6A4E", fontWeight: 600 }}
                    >
                      Book →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p
            className="mt-10 text-[12px] opacity-55 max-w-xl"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Pricing for group Pilates (from $26) and Bowen adult sessions
            ($110) taken from the live site. Bundle packages and full schedule
            to be confirmed with Andria.
          </p>
        </div>
      </section>

      {/* ─── About Andria ─── */}
      <section
        id="andria"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#E8DFD2" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{ color: "#8C6A4E", fontWeight: 500 }}
          >
            About Andria
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            The person
            <br />
            <span style={{ fontStyle: "italic" }}>on the mat with you.</span>
          </h2>
          <div
            className="space-y-6 text-[16px] leading-[1.85] opacity-80 max-w-2xl"
            style={{ fontWeight: 300 }}
          >
            <p>
              [A paragraph or two about Andria — her training, how she came to
              Bowen Therapy, what the body-mind connection means in her
              practice. To write together.]
            </p>
            <p>
              [Anything about the studio space, the why, the clients who keep
              coming back — to confirm with Andria.]
            </p>
          </div>
        </div>
      </section>

      {/* ─── Visit ─── */}
      <section
        id="visit"
        className="px-6 md:px-12 py-28 md:py-36"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8C6A4E", fontWeight: 500 }}
            >
              Find the studio
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Hamilton,
              <br />
              <span style={{ fontStyle: "italic" }}>[address to confirm].</span>
            </h2>
            <p
              className="text-[15px] leading-[1.85] opacity-75 max-w-md mb-8"
              style={{ fontWeight: 300 }}
            >
              The live site doesn&apos;t list a street address — adding one is
              the single biggest thing that would help local search and
              first-time bookings.
            </p>
          </div>
          <div
            className="space-y-7 text-[15px] leading-[1.85] p-8 rounded-3xl"
            style={{ background: "#E8DFD2" }}
          >
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-55 mb-2"
                style={{ fontWeight: 500 }}
              >
                Phone
              </p>
              <p
                className="text-[22px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                }}
              >
                027 346 2167
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-55 mb-2"
                style={{ fontWeight: 500 }}
              >
                Email
              </p>
              <p style={{ fontWeight: 500 }}>info@balanceme.co.nz</p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-55 mb-2"
                style={{ fontWeight: 500 }}
              >
                Address
              </p>
              <p style={{ fontWeight: 400 }}>[Studio address to confirm]</p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-55 mb-2"
                style={{ fontWeight: 500 }}
              >
                Hours
              </p>
              <p style={{ fontWeight: 400 }}>[Opening hours to confirm]</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: "#1C1917", color: "#F7F2EC" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            Book your
            <br />
            <span style={{ fontStyle: "italic" }}>first session.</span>
          </h2>
          <p
            className="text-[15px] opacity-80 max-w-lg mx-auto mb-10 leading-[1.85]"
            style={{ fontWeight: 300 }}
          >
            Give Andria a call on 027 346 2167, or email
            info@balanceme.co.nz and she&apos;ll get back to you within a day.
          </p>
          <a
            href="tel:+64273462167"
            className="inline-block px-9 py-4 rounded-full text-[11px] tracking-[0.3em] uppercase bg-[#F7F2EC] text-[#1C1917]"
            style={{ fontWeight: 500 }}
          >
            Call 027 346 2167
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10"
        style={{ background: "#0F0D0B", color: "rgba(247,242,236,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Balance Me · Hamilton
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
          Concept preview — address, bio, and full pricing to be confirmed
          with Andria
        </p>
      </footer>
    </div>
  );
}
