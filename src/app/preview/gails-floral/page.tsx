import type { Metadata } from "next";
import Image from "next/image";
import { Lora, Inter, Caveat } from "next/font/google";

const display = Lora({
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

const script = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Gail's Floral Studio — preview",
  description:
    "A preview of what a Gail's Floral Studio website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO =
  "https://gails.co.nz/cdn/shop/collections/Wedding_Bouquet_with_Kina.JPG?v=1709327427&width=2400";

const TIMELINE = [
  {
    year: "1965",
    title: "Gail opens the shop",
    body: "On Worley Place, with two assistants and a delivery bike.",
  },
  {
    year: "1978",
    title: "First wedding contract",
    body: "Forty-three weddings that year. Same again the next.",
  },
  {
    year: "1996",
    title: "Susan joins her mother",
    body: "Second generation. Same shop, same suppliers, new ideas.",
  },
  {
    year: "2015",
    title: "Fifty years",
    body: "Hamilton's longest-running independent florist.",
  },
  {
    year: "2024",
    title: "Lily takes the bench",
    body: "Third generation. Gail still does the wreaths.",
  },
];

const SERVICES = [
  {
    name: "The Everyday Bouquet",
    body: "Same-day delivery across Hamilton until 2pm. Seasonal stems, hand-tied, wrapped in kraft.",
    price: "From $65",
    image:
      "https://gails.co.nz/cdn/shop/collections/Sunflower_1.png?v=1772404869&width=1500",
  },
  {
    name: "Wedding Florals",
    body: "Bouquets, ceremony pieces, reception arrangements. We meet, plan, and deliver — start to finish.",
    price: "From $850",
    image:
      "https://gails.co.nz/cdn/shop/collections/2014-10-03_11.41.42.jpg?v=1708114150&width=1500",
  },
  {
    name: "Sympathy",
    body: "Discreet, considered arrangements for hard moments. Same-day where we can.",
    price: "From $95",
    image:
      "https://gails.co.nz/cdn/shop/collections/Black_Wrap.JPG?v=1676667680&width=1500",
  },
];

export default function GailsFloralPreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} ${script.variable} bg-[#FBF7F0] text-[#1F0F12] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[18px] drop-shadow"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          Gail&apos;s
        </span>
        <nav className="hidden md:flex gap-10 text-[11px] tracking-[0.3em] uppercase drop-shadow">
          <a href="#shop" className="hover:opacity-70 transition-opacity">
            Shop
          </a>
          <a href="#weddings" className="hover:opacity-70 transition-opacity">
            Weddings
          </a>
          <a href="#story" className="hover:opacity-70 transition-opacity">
            Our story
          </a>
          <a href="#visit" className="hover:opacity-70 transition-opacity">
            Visit
          </a>
        </nav>
      </header>

      {/* ─── Hero — heritage classical ─── */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="A Gail's wedding bouquet"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/55" />
        <div className="relative h-full flex items-center px-6 md:px-12">
          <div className="max-w-3xl text-white">
            <p
              className="text-[18px] mb-6 opacity-95"
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 500,
              }}
            >
              Since 1965
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
              }}
            >
              Sixty years of
              <br />
              flowers in{" "}
              <span style={{ fontStyle: "italic" }}>Hamilton.</span>
            </h1>
            <p
              className="mt-10 text-[16px] md:text-[17px] max-w-md opacity-90 leading-[1.7]"
              style={{ fontWeight: 300 }}
            >
              The same family, the same shop on Worley Place, three
              generations of putting the right flowers in the right hands.
            </p>
            <div className="mt-12 flex flex-wrap gap-5 text-[12px] tracking-[0.3em] uppercase">
              <a
                href="#shop"
                className="px-7 py-3 rounded-full text-[#1F0F12]"
                style={{ background: "#F5E6E0", fontWeight: 500 }}
              >
                Order flowers
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-3 border-b border-white/40 pb-2 hover:border-white transition-colors self-end"
                style={{ fontWeight: 400 }}
              >
                Our story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Same-day delivery banner ─── */}
      <section
        className="px-6 md:px-12 py-8 text-center"
        style={{ background: "#8C3A4D", color: "#FBF7F0" }}
      >
        <p
          className="text-[13px] md:text-[15px]"
          style={{ fontWeight: 400 }}
        >
          Same-day delivery across Hamilton on orders placed before{" "}
          <span style={{ fontWeight: 600 }}>2pm</span>.{" "}
          <a href="#shop" className="underline underline-offset-4 ml-1">
            Order now →
          </a>
        </p>
      </section>

      {/* ─── Story / timeline ─── */}
      <section
        id="story"
        className="px-6 md:px-12 py-32 md:py-44"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p
              className="text-[18px] mb-3"
              style={{
                fontFamily: "var(--font-script)",
                color: "#8C3A4D",
                fontWeight: 500,
              }}
            >
              The story so far
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Three generations on the same bench.
            </h2>
          </div>

          <ol className="relative">
            <span
              className="absolute left-[64px] md:left-[120px] top-3 bottom-3 w-px"
              style={{ background: "rgba(140,58,77,0.25)" }}
              aria-hidden
            />
            {TIMELINE.map((t) => (
              <li
                key={t.year}
                className="relative grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-6 md:gap-12 mb-14 md:mb-16"
              >
                <span
                  className="text-3xl md:text-5xl pt-1 leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    color: "#8C3A4D",
                    fontWeight: 500,
                  }}
                >
                  {t.year}
                </span>
                <span
                  className="absolute left-[64px] md:left-[120px] top-4 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ background: "#8C3A4D" }}
                  aria-hidden
                />
                <div className="md:pl-6">
                  <h3
                    className="text-2xl md:text-3xl mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.85] opacity-75 max-w-xl"
                    style={{ fontWeight: 300 }}
                  >
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section
        id="shop"
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: "#F5E6E0" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p
              className="text-[18px] mb-3"
              style={{
                fontFamily: "var(--font-script)",
                color: "#8C3A4D",
                fontWeight: 500,
              }}
            >
              What we make
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Three things, done well.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {SERVICES.map((s) => (
              <article
                key={s.name}
                className="group bg-[#FBF7F0] overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3
                    className="text-2xl md:text-3xl mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8] opacity-75 mb-6 flex-1"
                    style={{ fontWeight: 300 }}
                  >
                    {s.body}
                  </p>
                  <div className="flex justify-between items-baseline border-t border-[#1F0F12]/10 pt-4">
                    <span
                      className="text-[12px] tracking-[0.2em] uppercase opacity-60"
                      style={{ fontWeight: 500 }}
                    >
                      {s.price}
                    </span>
                    <span
                      className="text-[12px] tracking-[0.2em] uppercase group-hover:gap-3 transition-all inline-flex items-center gap-2"
                      style={{ color: "#8C3A4D", fontWeight: 600 }}
                    >
                      Order →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The family ─── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[18px] mb-3"
            style={{
              fontFamily: "var(--font-script)",
              color: "#8C3A4D",
              fontWeight: 500,
            }}
          >
            The family
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            Gail. Susan. Lily.
          </h2>
          <div
            className="space-y-6 text-[16px] leading-[1.85] opacity-80"
            style={{ fontWeight: 300 }}
          >
            <p>
              Gail opened the shop in 1965, when she was twenty-two. She still
              comes in three days a week, mostly to do the wreaths and to make
              sure things are being done properly.
            </p>
            <p>
              Her daughter Susan joined the bench in 1996 and now runs the
              business. Her granddaughter Lily came in last year, full-time,
              bringing with her a sharp eye for arrangements that look like
              someone our age made them.
            </p>
            <p
              className="text-[20px] mt-10"
              style={{
                fontFamily: "var(--font-script)",
                color: "#8C3A4D",
                fontWeight: 500,
              }}
            >
              We&apos;re still here. Come and see us.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Visit ─── */}
      <section
        id="visit"
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: "#8C3A4D", color: "#FBF7F0" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="text-[18px] mb-3 opacity-90"
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 500,
              }}
            >
              Find us
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] mb-10"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              7 Worley Place, Hamilton.
            </h2>
            <p
              className="text-[15px] leading-[1.85] opacity-85 max-w-md mb-8"
              style={{ fontWeight: 300 }}
            >
              Tucked between Victoria Street and Anglesea Street, two doors
              down from the bookshop. Free parking outside.
            </p>
          </div>
          <div className="space-y-8 text-[15px] leading-[1.85]">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2"
                style={{ fontWeight: 500 }}
              >
                Hours
              </p>
              <p style={{ fontWeight: 400 }}>
                Monday – Friday · 8.30am – 5pm
                <br />
                Saturday · 9am – 1pm
                <br />
                Sunday · closed
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2"
                style={{ fontWeight: 500 }}
              >
                Order
              </p>
              <p style={{ fontWeight: 400 }}>
                Phone · 0800 424 573
                <br />
                hello@gails.co.nz
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2"
                style={{ fontWeight: 500 }}
              >
                Same-day delivery
              </p>
              <p style={{ fontWeight: 400 }}>
                Order before 2pm.
                <br />
                Across Hamilton — flat $15 city-wide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#FBF7F0]/10"
        style={{ background: "#5C2632", color: "rgba(251,247,240,0.5)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Gail&apos;s Floral Studio · Hamilton
            since 1965
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
          Concept preview — details to be confirmed with owner
        </p>
      </footer>
    </div>
  );
}
