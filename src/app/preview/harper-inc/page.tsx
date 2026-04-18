import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "harper inc. — preview",
  description:
    "A preview of what a harper inc. website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const BRANDS = [
  "Alexandra Aus",
  "Aston Studio",
  "Rolla's Jeans",
  "Maku the Label",
  "Negativee Creep",
  "+ more",
];

const SHOP_TILES = [
  {
    image: "/preview/harper-inc/post-8.jpg",
    caption: "Orange County tee · Rolla's jeans",
    note: "from your feed",
  },
  {
    image: "/preview/harper-inc/post-11.jpg",
    caption: "Burgundy button-down",
    note: "from your feed",
  },
  {
    image: "/preview/harper-inc/post-5.jpg",
    caption: "Denim shirt · cream skirt",
    note: "from your feed",
  },
];

export default function HarperIncPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F7EDE6] text-[#2A1518] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-6 flex items-center justify-between text-white drop-shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white">
            <Image
              src="/preview/harper-inc/logo.jpg"
              alt="harper inc. logo"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <span
            className="text-[18px] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            harper inc.
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-[11px] tracking-[0.25em] uppercase">
          <a href="#new" className="hover:opacity-70 transition-opacity">
            New in
          </a>
          <a href="#brands" className="hover:opacity-70 transition-opacity">
            Brands
          </a>
          <a href="#jewelry" className="hover:opacity-70 transition-opacity">
            Courtney&apos;s jewelry
          </a>
          <a href="#visit" className="hover:opacity-70 transition-opacity">
            Visit
          </a>
        </nav>
      </header>

      {/* ─── Hero — real Insta photo ─── */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <Image
          src="/preview/harper-inc/post-6.jpg"
          alt="A harper inc. dress in the lavender"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/70" />
        <div className="relative h-full flex items-end pb-20 md:pb-28 px-6 md:px-12">
          <div className="max-w-4xl text-white">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-8 opacity-95"
              style={{ fontWeight: 500 }}
            >
              A beautiful boutique · Hamilton
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-[104px] leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Gorgeous
              <br />
              <span style={{ fontStyle: "italic" }}>clothing,</span>
              <br />
              quietly curated.
            </h1>
            <p
              className="mt-8 text-[15px] md:text-[17px] max-w-lg opacity-90 leading-[1.75]"
              style={{ fontWeight: 300 }}
            >
              Courtney&apos;s Worley Place boutique, online. Shop the brands
              you love in-store, plus Courtney&apos;s own one-off jewelry line.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 text-[11px] tracking-[0.3em] uppercase">
              <a
                href="#new"
                className="px-7 py-3.5 rounded-full bg-white text-[#2A1518]"
                style={{ fontWeight: 500 }}
              >
                Shop new in
              </a>
              <a
                href="#visit"
                className="px-7 py-3.5 rounded-full border border-white/50"
                style={{ fontWeight: 500 }}
              >
                Visit the shop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Note to Courtney banner ─── */}
      <section
        className="px-6 md:px-12 py-5 text-center"
        style={{ background: "#8B3A4A", color: "#F7EDE6" }}
      >
        <p
          className="text-[12px] md:text-[13px] tracking-[0.05em]"
          style={{ fontWeight: 400 }}
        >
          <span style={{ fontWeight: 600 }}>Note to Courtney</span> · Your
          current Shopify store returns &quot;store unavailable.&quot; This
          preview shows what a working shop could look like.
        </p>
      </section>

      {/* ─── New in — real photos ─── */}
      <section
        id="new"
        className="px-6 md:px-12 py-28 md:py-36"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8B3A4A", fontWeight: 500 }}
            >
              New in
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              The shop,
              <br />
              <span style={{ fontStyle: "italic" }}>
                as it could look.
              </span>
            </h2>
            <p
              className="mt-6 text-[14px] opacity-70 max-w-lg leading-[1.85]"
              style={{ fontWeight: 300 }}
            >
              These tiles would pull directly from your Instagram — any new
              arrival you post becomes a shoppable tile here within minutes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {SHOP_TILES.map((t, i) => (
              <article key={i} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EADCD2] rounded-2xl">
                  <Image
                    src={t.image}
                    alt={t.caption}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 text-[9px] tracking-[0.25em] uppercase bg-white/85 text-[#2A1518] px-2.5 py-1 rounded-full" style={{ fontWeight: 500 }}>
                    {t.note}
                  </div>
                </div>
                <div className="pt-4">
                  <h3
                    className="text-[18px] leading-[1.3]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {t.caption}
                  </h3>
                  <p
                    className="text-[11px] tracking-[0.25em] uppercase mt-3 opacity-60"
                    style={{ fontWeight: 500 }}
                  >
                    [Price · Shop →]
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Brand wall ─── */}
      <section
        id="brands"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#EADCD2" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8B3A4A", fontWeight: 500 }}
            >
              The brands
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              New Zealand names,
              <br />
              <span style={{ fontStyle: "italic" }}>
                carefully chosen.
              </span>
            </h2>
            <p
              className="mt-6 text-[14px] opacity-70 max-w-lg leading-[1.85]"
              style={{ fontWeight: 300 }}
            >
              Brands pulled from your Instagram feed — full list to confirm
              with you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BRANDS.map((b) => (
              <div
                key={b}
                className="bg-[#F7EDE6] rounded-2xl p-8 hover:bg-white transition-colors"
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3"
                  style={{ fontWeight: 500 }}
                >
                  Stocked at harper inc.
                </p>
                <h3
                  className="text-2xl md:text-3xl"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {b}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Courtney's jewelry — real photo ─── */}
      <section id="jewelry" className="px-6 md:px-12 py-28 md:py-36">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-center">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#EADCD2]">
            <Image
              src="/preview/harper-inc/post-7.jpg"
              alt="Courtney's jewelry collection"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5"
              style={{ color: "#8B3A4A", fontWeight: 500 }}
            >
              Courtney&apos;s jewelry
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.05] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              One-off pieces,
              <br />
              <span style={{ fontStyle: "italic" }}>
                made by Courtney.
              </span>
            </h2>
            <div
              className="space-y-5 text-[15px] leading-[1.85] opacity-80 mb-8"
              style={{ fontWeight: 300 }}
            >
              <p>
                Designed to celebrate and embrace neurodiversity, this small
                range of hand-made pieces mixes gold, silver, stainless and
                plated copper — traditionally clashing metals that come
                together beautifully.
              </p>
              <p className="text-[13px] opacity-60 italic">
                (Copy paraphrased from your Instagram caption — happy to
                rewrite in your own words.)
              </p>
            </div>
            <div className="flex gap-8 text-[13px] tracking-[0.2em] uppercase border-t border-[#2A1518]/15 pt-5">
              <div>
                <p className="opacity-55 mb-1" style={{ fontWeight: 500 }}>
                  Silver styles
                </p>
                <p style={{ fontWeight: 500 }}>$89</p>
              </div>
              <div>
                <p className="opacity-55 mb-1" style={{ fontWeight: 500 }}>
                  Gold / mixed
                </p>
                <p style={{ fontWeight: 500 }}>$99</p>
              </div>
              <div>
                <p className="opacity-55 mb-1" style={{ fontWeight: 500 }}>
                  Where
                </p>
                <p style={{ fontWeight: 500 }}>In store · DM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Visit ─── */}
      <section
        id="visit"
        className="px-6 md:px-12 py-28 md:py-36"
        style={{ background: "#2A1518", color: "#F7EDE6" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-5 opacity-70"
              style={{ fontWeight: 500 }}
            >
              Visit us
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Shop 2,
              <br />
              19 Worley Place,
              <br />
              <span style={{ fontStyle: "italic" }}>Hamilton.</span>
            </h2>
            <p
              className="text-[15px] leading-[1.85] opacity-85 max-w-md"
              style={{ fontWeight: 300 }}
            >
              In the heart of Hamilton Central, on the same street as
              Gail&apos;s Floral. The shop is active — it&apos;s only the online
              side that needs a refresh.
            </p>
          </div>
          <div className="space-y-7 text-[15px]">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Open
              </p>
              <p style={{ fontWeight: 400 }}>Mon-Fri 9:30 – 4</p>
              <p
                className="text-[12px] opacity-60 mt-1 italic"
                style={{ fontWeight: 300 }}
              >
                (truncated in your Insta bio — full hours to confirm)
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Instagram
              </p>
              <p style={{ fontWeight: 500 }}>@harperinc · 18K followers</p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Phone
              </p>
              <p style={{ fontWeight: 400 }}>[Phone to confirm]</p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Email
              </p>
              <p style={{ fontWeight: 400 }}>[Email to confirm]</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            Let&apos;s get
            <br />
            <span style={{ fontStyle: "italic" }}>
              the shop back online.
            </span>
          </h2>
          <p
            className="text-[15px] opacity-70 max-w-lg mx-auto leading-[1.85]"
            style={{ fontWeight: 300 }}
          >
            Zadig at Raglan Digital. This preview is free to keep. If you
            like it, the real build is free too — I just ask for a testimonial
            when it goes live.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10"
        style={{ background: "#1A0C0F", color: "rgba(247,237,230,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} harper inc. · Hamilton
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
          Concept preview — all photos sourced from @harperinc Instagram ·
          full brand list and contact details to be confirmed with Courtney
        </p>
      </footer>
    </div>
  );
}
