import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Wild River and Co — preview",
  description:
    "A preview of what a Wild River and Co website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://cdn.shopify.com/s/files/1/0121/6256/4155/files/Screenshot_20221103-131903_Gallery.jpg?v=1667435035";

const CATEGORIES = [
  {
    name: "Fresh Flowers",
    image:
      "https://cdn.shopify.com/s/files/1/0121/6256/4155/files/6A33400B-EEDD-40D2-997C-9416EBD8BE7B.jpg?v=1769194521",
    body: "Hand-tied, in-season, ready same-day.",
  },
  {
    name: "Dried Flowers",
    image:
      "https://cdn.shopify.com/s/files/1/0121/6256/4155/files/AE69B86A-6587-4552-998C-572A84987990.jpg?v=1769194447",
    body: "Long-lasting arrangements that keep their shape for months.",
  },
  {
    name: "Plants",
    image:
      "https://cdn.shopify.com/s/files/1/0121/6256/4155/files/F880A029-8FFB-4997-9E61-DCF9FB7F3C58.jpg?v=1769194447",
    body: "Indoor and outdoor, chosen for Waikato light.",
  },
];

export default function WildRiverPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F6F1EA] text-[#1A1410] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[18px] drop-shadow"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          Wild River &amp; Co
        </span>
        <nav className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] uppercase drop-shadow">
          <a href="#shop" className="hover:opacity-70 transition-opacity">
            Shop
          </a>
          <a href="#delivery" className="hover:opacity-70 transition-opacity">
            Delivery
          </a>
          <a href="#funeral" className="hover:opacity-70 transition-opacity">
            Funeral
          </a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">
            Contact
          </a>
        </nav>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="A Wild River and Co arrangement"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-4xl text-white">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6 opacity-90"
              style={{ fontWeight: 500 }}
            >
              Florist · Hamilton CBD
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-[104px] leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Flowers delivered
              <br />
              <span style={{ fontStyle: "italic" }}>today.</span>
            </h1>
            <p
              className="mt-8 text-[15px] md:text-[17px] max-w-lg opacity-90 leading-[1.7]"
              style={{ fontWeight: 300 }}
            >
              Order before 2:30pm for same-day delivery across Hamilton. Fresh,
              dried, plants — hand-picked, never from a fridge.
            </p>

            {/* Hero CTA row — fixes the missing phone on live site */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3 max-w-xl">
              <a
                href="#shop"
                className="block px-6 py-4 rounded-full bg-white text-[#1A1410] text-center"
              >
                <span
                  className="text-[11px] tracking-[0.3em] uppercase"
                  style={{ fontWeight: 600 }}
                >
                  Order for today · 2:30pm cutoff
                </span>
              </a>
              <a
                href="#contact"
                className="block px-6 py-4 rounded-full border border-white/60 text-center backdrop-blur-sm"
              >
                <span
                  className="text-[11px] tracking-[0.3em] uppercase"
                  style={{ fontWeight: 500 }}
                >
                  Call · [Phone to confirm]
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Same-day strip ─── */}
      <section
        id="delivery"
        className="px-6 md:px-12 py-6"
        style={{ background: "#1A1410", color: "#F6F1EA" }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[12px] tracking-[0.25em] uppercase text-center">
          <span style={{ fontWeight: 500 }}>Order by 2:30pm</span>
          <span className="opacity-40">·</span>
          <span style={{ fontWeight: 500 }}>Hamilton same-day</span>
          <span className="opacity-40">·</span>
          <span style={{ fontWeight: 500 }}>Seasonal stems</span>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section id="shop" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8A4A3B", fontWeight: 500 }}
            >
              What we do
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Three things,
              <br />
              <span style={{ fontStyle: "italic" }}>done properly.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {CATEGORIES.map((c) => (
              <article key={c.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DDCD]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
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
                    {c.name}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.75] opacity-70 mb-4"
                    style={{ fontWeight: 300 }}
                  >
                    {c.body}
                  </p>
                  <span
                    className="text-[11px] tracking-[0.3em] uppercase inline-flex items-center gap-2"
                    style={{ color: "#8A4A3B", fontWeight: 600 }}
                  >
                    Shop {c.name.toLowerCase()} →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Funeral ─── */}
      <section
        id="funeral"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#E8DDCD" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{ color: "#8A4A3B", fontWeight: 500 }}
          >
            Funeral arrangements
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            For the harder
            <br />
            <span style={{ fontStyle: "italic" }}>moments.</span>
          </h2>
          <p
            className="text-[16px] leading-[1.85] opacity-80 max-w-2xl mx-auto mb-10"
            style={{ fontWeight: 300 }}
          >
            Casket sprays, wreaths, and personalised arrangements. We work
            with your funeral director directly, and we can have pieces ready
            same-day when you need it fast.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 rounded-full border border-[#1A1410]/30 text-[11px] tracking-[0.3em] uppercase hover:bg-[#1A1410] hover:text-[#F6F1EA] transition-colors"
            style={{ fontWeight: 500 }}
          >
            Talk to us
          </a>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#1A1410", color: "#F6F1EA" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5 opacity-70"
              style={{ fontWeight: 500 }}
            >
              Get in touch
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Visit the
              <br />
              <span style={{ fontStyle: "italic" }}>shop.</span>
            </h2>
            <p
              className="text-[15px] leading-[1.85] opacity-80 max-w-md"
              style={{ fontWeight: 300 }}
            >
              We&apos;re in Hamilton CBD — [street address to confirm]. Walk-ins
              welcome for pick-ups and conversations.
            </p>
          </div>
          <div className="space-y-7 text-[15px]">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
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
                [Phone to confirm]
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Email
              </p>
              <p style={{ fontWeight: 500 }}>hello@wildriver.co.nz</p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Shop address
              </p>
              <p style={{ fontWeight: 400 }}>
                [Street address to confirm — currently missing on the live
                site]
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Same-day cut-off
              </p>
              <p style={{ fontWeight: 400 }}>2:30pm, Hamilton deliveries</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10"
        style={{ background: "#0E0A08", color: "rgba(246,241,234,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Wild River and Co · Hamilton
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
          Concept preview — phone, street address, and bios to be confirmed
        </p>
      </footer>
    </div>
  );
}
