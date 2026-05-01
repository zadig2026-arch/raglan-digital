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
  title: "The Pied Potter — preview",
  description:
    "A preview of what The Pied Potter website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO_SHOP =
  "https://static.wixstatic.com/media/1839b5_3ae3ba28d719408dbd5cb065202da495~mv2.jpg/v1/fit/w_1600,h_1200,q_90,enc_avif,quality_auto/1839b5_3ae3ba28d719408dbd5cb065202da495~mv2.jpg";
const HERO_PARTY =
  "https://static.wixstatic.com/media/1839b5_b10a7a9a68f04731a46e60c45f50ae74~mv2.jpg/v1/fit/w_1600,h_1200,q_90,enc_avif,quality_auto/1839b5_b10a7a9a68f04731a46e60c45f50ae74~mv2.jpg";

const PRODUCTS = [
  {
    name: "Speckled Mug",
    price: "$38",
    image:
      "https://static.wixstatic.com/media/1839b5_d1775b7212a94677a2c1ca8ef3a01bc4~mv2.jpg/v1/fit/w_1000,h_1200,q_90,enc_avif,quality_auto/1839b5_d1775b7212a94677a2c1ca8ef3a01bc4~mv2.jpg",
  },
  {
    name: "Footed Bowl",
    price: "$54",
    image:
      "https://static.wixstatic.com/media/1839b5_5cee9d15276d40a988b0fc53f0d75bd1~mv2.jpg/v1/fit/w_1000,h_1200,q_90,enc_avif,quality_auto/1839b5_5cee9d15276d40a988b0fc53f0d75bd1~mv2.jpg",
  },
  {
    name: "Ribbed Vase",
    price: "$72",
    image:
      "https://static.wixstatic.com/media/1839b5_6ac9e5a01a164ed18128e634feb4f1c3~mv2.jpg/v1/fit/w_1000,h_1200,q_90,enc_avif,quality_auto/1839b5_6ac9e5a01a164ed18128e634feb4f1c3~mv2.jpg",
  },
  {
    name: "Garden Planter",
    price: "$65",
    image:
      "https://static.wixstatic.com/media/1839b5_0ae2cfa58d994897af1bce9c60b06c93~mv2.jpg/v1/fit/w_1000,h_1200,q_90,enc_avif,quality_auto/1839b5_0ae2cfa58d994897af1bce9c60b06c93~mv2.jpg",
  },
];

const PARTY_STEPS = [
  {
    n: "1",
    title: "Pick a date.",
    body: "Saturdays, Sundays, or weekday evenings. Two-hour sessions. Up to twelve people.",
  },
  {
    n: "2",
    title: "Pick a project.",
    body: "Mugs, bowls, planters, or wild-card. We bring all the clay, tools, glaze, and aprons.",
  },
  {
    n: "3",
    title: "Make a mess.",
    body: "Two hours, lots of laughter. We fire and glaze your pieces and post them to you in three weeks.",
  },
];

export default function PiedPotterPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F9F4EE] text-[#1C1814] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[15px] tracking-tight drop-shadow"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontStyle: "italic",
          }}
        >
          The Pied Potter
        </span>
        <nav className="hidden md:flex gap-8 text-[12px] tracking-wide drop-shadow">
          <a href="#shop" className="hover:opacity-70 transition-opacity">
            Shop
          </a>
          <a href="#parties" className="hover:opacity-70 transition-opacity">
            Parties
          </a>
          <a href="#samara" className="hover:opacity-70 transition-opacity">
            Samara
          </a>
          <a href="#contact" className="hover:opacity-70 transition-opacity">
            Visit
          </a>
        </nav>
      </header>

      {/* ─── Hero — dual mode split ─── */}
      <section className="grid md:grid-cols-2 min-h-screen">
        {/* SHOP side */}
        <a
          href="#shop"
          className="group relative h-[60vh] md:h-screen overflow-hidden text-white"
        >
          <Image
            src={HERO_SHOP}
            alt="Handbuilt ceramics"
            fill
            priority
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <p
              className="text-[11px] tracking-[0.4em] uppercase opacity-80 mb-4"
              style={{ fontWeight: 500 }}
            >
              For your shelf
            </p>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Shop the
              <br />
              ceramics.
            </h2>
            <p
              className="text-[14px] opacity-85 max-w-xs mb-8"
              style={{ fontWeight: 300 }}
            >
              Handbuilt in Cambridge. Oven-safe, dishwasher-safe, made for
              every day.
            </p>
            <span
              className="inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase group-hover:gap-5 transition-all"
              style={{ fontWeight: 500 }}
            >
              Browse
              <span aria-hidden>→</span>
            </span>
          </div>
        </a>

        {/* PARTY side */}
        <a
          href="#parties"
          className="group relative h-[60vh] md:h-screen overflow-hidden"
          style={{ background: "#A86B4B", color: "#F9F4EE" }}
        >
          <Image
            src={HERO_PARTY}
            alt="Pottery party"
            fill
            unoptimized
            className="object-cover opacity-30 transition-all duration-700 group-hover:opacity-45 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,107,75,0.7) 0%, rgba(122,77,52,0.85) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <p
              className="text-[11px] tracking-[0.4em] uppercase opacity-80 mb-4"
              style={{ fontWeight: 500 }}
            >
              For your people
            </p>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Throw a
              <br />
              pottery party.
            </h2>
            <p
              className="text-[14px] opacity-85 max-w-xs mb-8"
              style={{ fontWeight: 300 }}
            >
              Birthdays, hen-dos, team afternoons. We bring the clay. You
              bring the noise.
            </p>
            <span
              className="inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase group-hover:gap-5 transition-all"
              style={{ fontWeight: 500 }}
            >
              Book a date
              <span aria-hidden>→</span>
            </span>
          </div>
        </a>
      </section>

      {/* ─── Manifesto ─── */}
      <section className="px-6 md:px-12 py-24 md:py-36 max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-5xl leading-[1.15]"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          A small Cambridge studio
          <br />
          where things get{" "}
          <span style={{ color: "#A86B4B" }}>handmade</span>.
        </h2>
        <p
          className="mt-10 text-[16px] leading-[1.85] opacity-75 max-w-xl mx-auto"
          style={{ fontWeight: 300 }}
        >
          The Pied Potter is one set of hands (Samara&apos;s), a kiln, and
          enough clay to keep the kitchens of the Waikato in mugs that
          don&apos;t look like everyone else&apos;s.
        </p>
      </section>

      {/* ─── Shop grid ─── */}
      <section
        id="shop"
        className="px-6 md:px-12 py-24 md:py-32 border-t border-[#1C1814]/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p
                className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-4"
                style={{ fontWeight: 500 }}
              >
                Shop the studio
              </p>
              <h2
                className="text-4xl md:text-5xl leading-[1.05]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                For everyday use.
              </h2>
            </div>
            <a
              href="#"
              className="text-[12px] tracking-[0.3em] uppercase hover:opacity-60 transition-opacity"
              style={{ color: "#A86B4B", fontWeight: 600 }}
            >
              See everything →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.map((p) => (
              <a key={p.name} href="#" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1C1814]/5 mb-4">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <span
                    className="text-[14px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="text-[13px] opacity-60"
                    style={{ fontWeight: 400 }}
                  >
                    {p.price}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pottery parties ─── */}
      <section
        id="parties"
        className="px-6 md:px-12 py-24 md:py-36"
        style={{ background: "#A86B4B", color: "#F9F4EE" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-20">
            <div className="md:col-span-5">
              <p
                className="text-[11px] tracking-[0.4em] uppercase opacity-70 mb-4"
                style={{ fontWeight: 500 }}
              >
                Parties
              </p>
              <h2
                className="text-4xl md:text-6xl leading-[1.05]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Get your hands in the clay.
              </h2>
            </div>
            <p
              className="md:col-span-6 md:col-start-7 text-[16px] leading-[1.85] opacity-90 self-end"
              style={{ fontWeight: 300 }}
            >
              We host parties at the studio in Cambridge or come to you
              anywhere in the Waikato. Two hours, all materials, no skill
              required, lots of laughing.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-8 md:gap-10">
            {PARTY_STEPS.map((s) => (
              <li
                key={s.n}
                className="border-t border-[#F9F4EE]/30 pt-8 pr-4"
              >
                <span
                  className="block text-[14px] tracking-[0.3em] uppercase opacity-70 mb-8"
                  style={{ fontWeight: 600 }}
                >
                  Step {s.n}
                </span>
                <h3
                  className="text-3xl md:text-4xl leading-[1.1] mb-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.8] opacity-85"
                  style={{ fontWeight: 300 }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="text-[14px] opacity-85" style={{ fontWeight: 300 }}>
              <p>$65 per person · minimum 6 · maximum 12.</p>
              <p className="mt-1 opacity-70">
                Includes clay, tools, glaze, firing, and shipping.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase border-b pb-2 hover:gap-5 transition-all w-fit"
              style={{
                fontWeight: 600,
                borderColor: "rgba(249,244,238,0.5)",
              }}
            >
              Book your date
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── About Samara ─── */}
      <section
        id="samara"
        className="px-6 md:px-12 py-24 md:py-36 grid md:grid-cols-12 gap-10 max-w-6xl mx-auto"
      >
        <div className="md:col-span-5 relative aspect-[4/5]">
          <Image
            src="https://static.wixstatic.com/media/1839b5_a2399ac349cc4d8e9062ecba5351159b~mv2.jpg/v1/fit/w_1000,h_1300,q_90,enc_avif,quality_auto/1839b5_a2399ac349cc4d8e9062ecba5351159b~mv2.jpg"
            alt="Samara at work"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="md:col-span-7 md:pl-8 lg:pl-16 self-center">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-4"
            style={{ fontWeight: 500 }}
          >
            Behind the kiln
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.1] mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Hi, I&apos;m Samara.
          </h2>
          <div
            className="space-y-5 text-[16px] leading-[1.85] opacity-80"
            style={{ fontWeight: 300 }}
          >
            <p>
              I started The Pied Potter because I wanted to put one
              honestly-handmade thing on every dinner table in the Waikato.
              Bowls that sit a little wonky. Mugs that fit your hand. Vases
              that look like someone made them.
            </p>
            <p>
              The party side started as a side hustle — I&apos;d throw birthday
              workshops for friends. It turns out everyone wants to play
              with clay. So now I do that too.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-24 md:py-36"
        style={{ background: "#1C1814", color: "#F9F4EE" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-8"
            style={{ fontWeight: 500 }}
          >
            Visit, book, or send a note
          </p>
          <h2
            className="text-5xl md:text-6xl leading-[1.05] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Come to the studio.
          </h2>
          <p
            className="text-[16px] leading-[1.85] opacity-75 max-w-xl mx-auto mb-12"
            style={{ fontWeight: 300 }}
          >
            The studio sits in central Cambridge. Drop in by appointment, or
            send a note and we&apos;ll come back the same day.
          </p>
          <a
            href="mailto:hello@thepiedpotter.co.nz"
            className="inline-flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase border-b pb-2 hover:opacity-80 transition-opacity"
            style={{
              fontWeight: 500,
              borderColor: "rgba(249,244,238,0.4)",
            }}
          >
            hello@thepiedpotter.co.nz
          </a>
          <p
            className="mt-10 text-[12px] tracking-[0.2em] uppercase opacity-50"
            style={{ fontWeight: 500 }}
          >
            @thepiedpotter
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#F9F4EE]/10"
        style={{ background: "#1C1814", color: "rgba(249,244,238,0.4)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 500 }}>
            © {new Date().getFullYear()} The Pied Potter · Cambridge NZ
          </span>
          <a
            href="https://raglandigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
            style={{ fontWeight: 500 }}
          >
            Designed by Raglan Digital · raglandigital.com
          </a>
        </div>
        <p
          className="max-w-6xl mx-auto mt-6 text-center text-[10px] tracking-[0.2em] uppercase opacity-40"
          style={{ fontWeight: 500 }}
        >
          Concept preview — details to be confirmed with owner
        </p>
      </footer>
    </div>
  );
}
