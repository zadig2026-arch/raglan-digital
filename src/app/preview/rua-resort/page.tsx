import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import { PreviewBanner } from "@/components/preview-banner";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Rua Resort — preview",
  description:
    "A preview of what a Rua Resort website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://static.wixstatic.com/media/412420_4ff16c3bd5fa449f8ec6f1fa6f4c1b69~mv2.jpg/v1/fill/w_2400,h_1400,al_c,q_90,enc_avif,quality_auto/412420_4ff16c3bd5fa449f8ec6f1fa6f4c1b69~mv2.jpg";

const ROOMS = [
  {
    name: "The Garden Suite",
    rate: "from $185 / night",
    image:
      "https://static.wixstatic.com/media/412420_230f26adb8a046f49ec79ae726806d1c~mv2.jpg/v1/fill/w_1600,h_1000,al_c,q_90,enc_avif,quality_auto/412420_230f26adb8a046f49ec79ae726806d1c~mv2.jpg",
    body: "Queen bed, ensuite bath, glass doors that open onto the herb garden and chicken run. Slow mornings, quiet nights.",
    sleeps: "2 guests",
    bed: "Queen",
  },
  {
    name: "The Pirongia Room",
    rate: "from $245 / night",
    image:
      "https://static.wixstatic.com/media/412420_b1016f1dd9d6418481a31398d36ba05b~mv2.jpg/v1/fill/w_1600,h_1000,al_c,q_90,enc_avif,quality_auto/412420_b1016f1dd9d6418481a31398d36ba05b~mv2.jpg",
    body: "King bed, full bath, floor-to-ceiling windows looking straight at Mount Pirongia. Sunrise hits the bed at 6am — set your alarm.",
    sleeps: "2 guests",
    bed: "King",
  },
  {
    name: "The Cottage",
    rate: "from $295 / night",
    image:
      "https://static.wixstatic.com/media/412420_550830a5d92141679e7cbdb8564dfe8b~mv2.jpg/v1/fill/w_1600,h_1000,al_c,q_90,enc_avif,quality_auto/412420_550830a5d92141679e7cbdb8564dfe8b~mv2.jpg",
    body: "Self-contained two-bedroom cottage with kitchen, lounge and a deck for two. Stay a week, feel like a year.",
    sleeps: "Up to 4",
    bed: "King + queen",
  },
];

export default function RuaResortPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F5F2EB] text-[#1A1D17] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      <PreviewBanner />
      {/* ─── Top bar ─── */}
      <header className="absolute top-11 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[14px] tracking-[0.35em] uppercase drop-shadow"
          style={{ fontWeight: 400 }}
        >
          Rua Resort
        </span>
        <nav className="hidden md:flex gap-10 text-[11px] tracking-[0.3em] uppercase drop-shadow">
          <a href="#stay" className="hover:opacity-70 transition-opacity">
            Stay
          </a>
          <a href="#land" className="hover:opacity-70 transition-opacity">
            The land
          </a>
          <a href="#find" className="hover:opacity-70 transition-opacity">
            Find us
          </a>
          <a href="#book" className="hover:opacity-70 transition-opacity">
            Book
          </a>
        </nav>
      </header>

      {/* ─── Hero — full-bleed ─── */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="Rua Resort with Mount Pirongia behind"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
        <div className="relative h-full flex items-end pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-3xl text-white">
            <p
              className="text-[11px] tracking-[0.4em] uppercase opacity-80 mb-6"
              style={{ fontWeight: 400 }}
            >
              Boutique B&B · Hamilton's outskirts
            </p>
            <h1
              className="text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Wake up to
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                Mount Pirongia.
              </span>
            </h1>
            <p
              className="mt-8 text-[16px] md:text-[18px] max-w-md opacity-90 leading-[1.7]"
              style={{ fontWeight: 300 }}
            >
              Country views, fresh eggs from the hens you'll meet at
              breakfast, and three rooms made for the kind of rest you
              forgot was possible.
            </p>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </div>
      </section>

      {/* ─── Welcome ─── */}
      <section className="px-6 md:px-12 py-32 md:py-44 max-w-3xl mx-auto text-center">
        <p
          className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-10"
          style={{ fontWeight: 400 }}
        >
          Welcome
        </p>
        <h2
          className="text-4xl md:text-6xl leading-[1.05] mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          A small farmhouse on a hill, twenty&nbsp;minutes from Hamilton.
        </h2>
        <p
          className="text-[17px] leading-[1.85] opacity-75 max-w-2xl mx-auto"
          style={{ fontWeight: 300 }}
        >
          Rua Resort is family-run, off the main road, and just close enough
          to town to be useful when you need it. The view sweeps across pasture
          to the Pirongia ranges. The cooking comes from the garden and the
          hens. The rooms are unfussy, considered, and quiet.
        </p>
      </section>

      {/* ─── Rooms — full-width cards ─── */}
      <section
        id="stay"
        className="border-t border-[#1A1D17]/10 pt-24 md:pt-32"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-6"
            style={{ fontWeight: 400 }}
          >
            Three rooms
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] max-w-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Pick one. Stay as long as you can.
          </h2>
        </div>

        <div className="space-y-32 md:space-y-44">
          {ROOMS.map((r, i) => (
            <article
              key={r.name}
              className="grid md:grid-cols-12 gap-10 md:gap-16 items-center px-6 md:px-12 max-w-7xl mx-auto"
            >
              <div
                className={`relative aspect-[4/3] md:aspect-[3/2] md:col-span-7 ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-5 md:px-4">
                <p
                  className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-4"
                  style={{ fontWeight: 400 }}
                >
                  Room 0{i + 1}
                </p>
                <h3
                  className="text-3xl md:text-5xl leading-[1.05] mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {r.name}
                </h3>
                <p
                  className="text-[15px] leading-[1.85] opacity-75 mb-8"
                  style={{ fontWeight: 300 }}
                >
                  {r.body}
                </p>
                <dl className="grid grid-cols-2 gap-y-3 gap-x-6 text-[13px] mb-10 max-w-sm">
                  <dt
                    className="opacity-50 tracking-[0.2em] uppercase text-[10px]"
                    style={{ fontWeight: 500 }}
                  >
                    Sleeps
                  </dt>
                  <dd style={{ fontWeight: 400 }}>{r.sleeps}</dd>
                  <dt
                    className="opacity-50 tracking-[0.2em] uppercase text-[10px]"
                    style={{ fontWeight: 500 }}
                  >
                    Bed
                  </dt>
                  <dd style={{ fontWeight: 400 }}>{r.bed}</dd>
                  <dt
                    className="opacity-50 tracking-[0.2em] uppercase text-[10px]"
                    style={{ fontWeight: 500 }}
                  >
                    Rate
                  </dt>
                  <dd style={{ fontWeight: 400 }}>{r.rate}</dd>
                </dl>
                <a
                  href="#book"
                  className="inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase hover:gap-5 transition-all"
                  style={{ color: "#5E7651", fontWeight: 500 }}
                >
                  Check availability
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── The land — USP ─── */}
      <section
        id="land"
        className="mt-32 md:mt-44 grid md:grid-cols-2 gap-0 items-stretch"
        style={{ background: "#5E7651", color: "#F5F2EB" }}
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
          <Image
            src="https://static.wixstatic.com/media/412420_b81982bc47974fd58b50ba52fdbbcd7f~mv2.jpg/v1/fill/w_1600,h_1200,al_c,q_90,enc_avif,quality_auto/412420_b81982bc47974fd58b50ba52fdbbcd7f~mv2.jpg"
            alt="Garden and grounds"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="px-8 md:px-16 lg:px-20 py-20 md:py-32 flex flex-col justify-center">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-70 mb-8"
            style={{ fontWeight: 400 }}
          >
            What we keep
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Six hens, a garden, and a view.
          </h2>
          <div
            className="space-y-6 text-[15px] leading-[1.85] opacity-90 max-w-md"
            style={{ fontWeight: 300 }}
          >
            <p>
              Most of breakfast comes from out the back. The eggs are from the
              hens you'll meet on your way past the chicken run. The herbs are
              from the garden. The bread is baked the morning of.
            </p>
            <p>
              We don't make a thing of it. It's just easier — and tastes
              better — than anything we'd buy in.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Find us ─── */}
      <section
        id="find"
        className="px-6 md:px-12 py-32 md:py-44 border-t border-[#1A1D17]/10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p
              className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-6"
              style={{ fontWeight: 400 }}
            >
              Find us
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.05] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              On a hill, north of Hamilton.
            </h2>
          </div>
          <div className="md:col-span-7 md:border-l md:border-[#1A1D17]/15 md:pl-12 space-y-8 text-[15px] leading-[1.85]">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                Address
              </p>
              <p style={{ fontWeight: 400 }}>
                170 Foster Road, RD 10
                <br />
                Hamilton 3290, New Zealand
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                From Hamilton CBD
              </p>
              <p style={{ fontWeight: 300 }}>
                20 minutes north on SH1, then 5 minutes off the main road.
                We&apos;ll send full directions when you book.
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2"
                style={{ fontWeight: 500 }}
              >
                From Auckland
              </p>
              <p style={{ fontWeight: 300 }}>
                90 minutes south. The last hour is open country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Book ─── */}
      <section
        id="book"
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: "#1A1D17", color: "#F5F2EB" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-8"
            style={{ fontWeight: 400 }}
          >
            Stay with us
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.05] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Book direct, save 10%.
          </h2>
          <p
            className="text-[16px] leading-[1.85] opacity-75 max-w-xl mx-auto mb-14"
            style={{ fontWeight: 300 }}
          >
            Booking direct means no agency fees, breakfast included, and a
            personal welcome from the family. Email us with your dates and
            we&apos;ll come back within the day.
          </p>
          <a
            href="mailto:stay@ruaresort.co.nz"
            className="inline-flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase border-b border-[#F5F2EB]/40 pb-2 hover:border-[#F5F2EB] transition-colors"
            style={{ fontWeight: 500, color: "#F5F2EB" }}
          >
            stay@ruaresort.co.nz
          </a>
          <p
            className="mt-10 text-[12px] tracking-[0.2em] uppercase opacity-50"
            style={{ fontWeight: 400 }}
          >
            Or call · 07 847 0407
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#F5F2EB]/10"
        style={{ background: "#1A1D17", color: "rgba(245,242,235,0.4)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Rua Resort · 170 Foster Road, Hamilton
          </span>
          <span className="opacity-60" style={{ fontWeight: 400 }}>
            Preview by Raglan Digital
          </span>
        </div>
      </footer>
    </div>
  );
}
