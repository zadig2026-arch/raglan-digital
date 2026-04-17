import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Adaia Flora — preview",
  description:
    "A preview of what an Adaia Flora website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO_IMAGE =
  "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/80071524-548a-46f2-a322-bdf1efe296e5/IMG_2292_jpg.JPG?format=2500w";

const GALLERY = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/9436f950-b411-4de9-9e28-f0a311fde7e5/IMG_4295.PNG?format=1500w",
    span: "tall",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/919c9c6d-c959-43d0-80dd-df85e8a90d04/IMG_4287.PNG?format=1500w",
    span: "regular",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/a0be86ef-4f00-4352-b22d-1b62e4ee8f5f/IMG_2863.JPG?format=1500w",
    span: "wide",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/8c55494b-0362-4f54-a73a-f52ce993ea37/IMG_4285.PNG?format=1500w",
    span: "regular",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/335fc04f-5725-4a9e-8aa3-4e092dca3eb9/IMG_4289.PNG?format=1500w",
    span: "tall",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/662396e8f231221c1d593177/d50482cd-11e5-416b-8242-2db0be3bd474/3468969.jpg?format=1500w",
    span: "regular",
  },
] as const;

const SERVICES = [
  {
    n: "01",
    title: "Weddings",
    body: "From bouquet to ceremony to reception. We work with you over months — not weeks — to make florals that feel inevitable rather than planned.",
  },
  {
    n: "02",
    title: "Weekly Bloom",
    body: "A fresh arrangement on your bench every week. Seasonal, locally-sourced, never the same twice. Skip a week any time.",
  },
  {
    n: "03",
    title: "One-Offs",
    body: "Birthdays, anniversaries, just-because. Tell me about the person and I'll make something for them — not a category.",
  },
];

const PROCESS = [
  {
    step: "First",
    title: "We talk.",
    body: "Email, phone, or a coffee in Hamilton. I want to know who the flowers are for, what they mean, and what's been said before.",
  },
  {
    step: "Then",
    title: "I sketch.",
    body: "A mood board comes back to you within a week. Colour palette, blooms, vessel — the texture of the thing.",
  },
  {
    step: "Finally",
    title: "We deliver.",
    body: "I make the arrangement the morning of, and deliver it Hamilton-wide myself. Photos to follow if you'd like.",
  },
];

export default function AdaiaFloraPreview() {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} bg-[#FBF6F1] text-[#221816] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-7 flex items-center justify-between">
        <span
          className="text-[15px] tracking-[0.3em] uppercase"
          style={{ fontWeight: 500 }}
        >
          Adaia Flora
        </span>
        <nav className="hidden md:flex gap-10 text-[12px] tracking-[0.2em] uppercase">
          <a href="#about" className="hover:opacity-60 transition-opacity">
            About
          </a>
          <a href="#services" className="hover:opacity-60 transition-opacity">
            Services
          </a>
          <a href="#gallery" className="hover:opacity-60 transition-opacity">
            Gallery
          </a>
          <a href="#order" className="hover:opacity-60 transition-opacity">
            Order
          </a>
        </nav>
      </header>

      {/* ─── Hero — split ─── */}
      <section className="grid md:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] md:h-screen order-1 md:order-1">
          <Image
            src={HERO_IMAGE}
            alt="Adaia Flora bouquet"
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 order-2 md:order-2 bg-[#FBF6F1]">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-8"
            style={{ fontWeight: 400 }}
          >
            Florist · Hamilton · NZ
          </p>
          <h1
            className="font-[var(--font-display)] text-[12vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.92] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Flowers, but
            <br />
            made to be
            <br />
            <span style={{ color: "#B9745F" }}>found.</span>
          </h1>
          <p
            className="mt-10 text-[15px] leading-[1.7] max-w-md opacity-70"
            style={{ fontWeight: 300 }}
          >
            Studio-based florist working with seasonal blooms for weddings,
            weekly subscriptions, and the kind of bouquet you remember
            receiving.
          </p>
          <a
            href="#order"
            className="mt-12 inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase hover:gap-5 transition-all w-fit"
            style={{ color: "#B9745F", fontWeight: 500 }}
          >
            Order a bouquet
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* ─── About — long form with drop cap ─── */}
      <section
        id="about"
        className="px-8 md:px-12 py-32 md:py-44 max-w-3xl mx-auto"
      >
        <p
          className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-10 text-center"
          style={{ fontWeight: 400 }}
        >
          The studio
        </p>
        <h2
          className="text-center text-4xl md:text-6xl leading-[1.1] mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          A small studio in Hamilton, run by Jade.
        </h2>
        <div
          className="text-[17px] leading-[1.85] space-y-7"
          style={{ fontWeight: 300 }}
        >
          <p
            className="text-[19px] leading-[1.75]"
            style={{
              textIndent: 0,
              fontWeight: 300,
            }}
          >
            <span
              className="float-left mr-3 leading-[0.85]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                fontStyle: "italic",
                color: "#B9745F",
                fontWeight: 400,
              }}
            >
              I
            </span>
            started Adaia Flora because the bouquets I was being given on
            birthdays felt like they came from a checkout aisle. The same
            roses, the same gypsophila, the same plastic wrap. Beautiful, in a
            way. But not particularly *for* the person they were going to.
          </p>
          <p>
            So now I make flowers the other way. I work from a small studio in
            Hamilton, by appointment, with seasonal stems from local growers
            wherever I can. Each arrangement is built to feel collected — like
            you'd walked through a garden and picked the best of what was
            blooming that morning.
          </p>
          <p>
            I take a small number of weddings each year so I can give them the
            attention they deserve, and I run a weekly subscription for people
            who just want their kitchen to smell of something alive.
          </p>
        </div>
      </section>

      {/* ─── Services — editorial numbered ─── */}
      <section
        id="services"
        className="px-8 md:px-12 py-32 md:py-44 border-t border-[#221816]/10"
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-6"
            style={{ fontWeight: 400 }}
          >
            What I do
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-20 max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Three ways to work together.
          </h2>
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {SERVICES.map((s) => (
              <article
                key={s.n}
                className="group border-t border-[#221816]/15 pt-8"
              >
                <span
                  className="block text-[14px] tracking-[0.3em] mb-10 transition-colors group-hover:opacity-100"
                  style={{ color: "#B9745F", fontWeight: 500 }}
                >
                  {s.n}
                </span>
                <h3
                  className="text-3xl md:text-4xl leading-[1.1] mb-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[15px] leading-[1.75] opacity-70"
                  style={{ fontWeight: 300 }}
                >
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery — masonry ─── */}
      <section
        id="gallery"
        className="px-8 md:px-12 py-32 md:py-44 bg-[#F2EBE2]"
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-6"
            style={{ fontWeight: 400 }}
          >
            Recent work
          </p>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] mb-20 max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            From this season.
          </h2>
          <div className="columns-2 md:columns-3 gap-4 md:gap-6 [&>*]:mb-4 md:[&>*]:mb-6">
            {GALLERY.map((g, i) => (
              <div
                key={g.src}
                className={`relative w-full overflow-hidden break-inside-avoid ${
                  g.span === "tall"
                    ? "aspect-[3/4]"
                    : g.span === "wide"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                }`}
              >
                <Image
                  src={g.src}
                  alt={`Adaia Flora arrangement ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process — 3 steps ─── */}
      <section className="px-8 md:px-12 py-32 md:py-44">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-6 text-center"
            style={{ fontWeight: 400 }}
          >
            How it works
          </p>
          <h2
            className="text-center text-4xl md:text-6xl leading-[1.05] mb-24"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            From conversation to doorstep.
          </h2>
          <ol className="space-y-20 md:space-y-28">
            {PROCESS.map((p, i) => (
              <li
                key={p.title}
                className="grid md:grid-cols-12 gap-6 md:gap-12 items-start"
              >
                <div className="md:col-span-3">
                  <span
                    className="block text-[12px] tracking-[0.3em] uppercase opacity-50"
                    style={{ fontWeight: 500 }}
                  >
                    {p.step}
                  </span>
                  <span
                    className="block text-2xl mt-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      color: "#B9745F",
                      fontWeight: 400,
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-9 md:border-l md:border-[#221816]/10 md:pl-12">
                  <h3
                    className="text-3xl md:text-5xl leading-[1.1] mb-5"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[16px] leading-[1.8] opacity-75 max-w-xl"
                    style={{ fontWeight: 300 }}
                  >
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Order / Contact ─── */}
      <section
        id="order"
        className="px-8 md:px-12 py-32 md:py-44 bg-[#221816] text-[#FBF6F1]"
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[11px] tracking-[0.4em] uppercase opacity-50 mb-8"
            style={{ fontWeight: 400 }}
          >
            Start a conversation
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[1.05] mb-12 max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Tell me who they&apos;re for.
          </h2>
          <p
            className="text-[16px] leading-[1.85] opacity-80 max-w-xl mb-16"
            style={{ fontWeight: 300 }}
          >
            The fastest way is to send a note with a few words about the
            person and the moment. I reply to every email personally, usually
            within a day.
          </p>
          <form className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            <input
              type="text"
              placeholder="Your name"
              className="bg-transparent border-b border-[#FBF6F1]/30 py-4 px-0 text-[15px] focus:outline-none focus:border-[#B9745F] placeholder:opacity-50 transition-colors"
              style={{ fontWeight: 300 }}
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border-b border-[#FBF6F1]/30 py-4 px-0 text-[15px] focus:outline-none focus:border-[#B9745F] placeholder:opacity-50 transition-colors"
              style={{ fontWeight: 300 }}
            />
            <textarea
              rows={3}
              placeholder="Tell me about the bouquet..."
              className="sm:col-span-2 bg-transparent border-b border-[#FBF6F1]/30 py-4 px-0 text-[15px] focus:outline-none focus:border-[#B9745F] placeholder:opacity-50 transition-colors resize-none"
              style={{ fontWeight: 300 }}
            />
            <button
              type="button"
              className="sm:col-span-2 mt-6 inline-flex items-center gap-3 text-[12px] tracking-[0.3em] uppercase w-fit hover:gap-5 transition-all"
              style={{ color: "#B9745F", fontWeight: 500 }}
            >
              Send the note
              <span aria-hidden>→</span>
            </button>
          </form>

          <div className="mt-24 pt-12 border-t border-[#FBF6F1]/15 grid sm:grid-cols-3 gap-12 text-[14px] opacity-70">
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
                style={{ fontWeight: 500 }}
              >
                Studio
              </p>
              <p style={{ fontWeight: 300 }}>
                Hamilton, by appointment
                <br />
                Tue – Sat
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
                style={{ fontWeight: 500 }}
              >
                Reach me
              </p>
              <p style={{ fontWeight: 300 }}>
                hello@adaiaflora.co.nz
                <br />
                @adaiaflora
              </p>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3"
                style={{ fontWeight: 500 }}
              >
                Delivery
              </p>
              <p style={{ fontWeight: 300 }}>
                Hamilton-wide
                <br />
                Same-day on request
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-8 md:px-12 py-10 bg-[#221816] text-[#FBF6F1]/40 border-t border-[#FBF6F1]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Adaia Flora · Hamilton NZ
          </span>
          <a
            href="https://raglandigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
            style={{ fontWeight: 400 }}
          >
            Designed by Raglan Digital · raglandigital.com
          </a>
        </div>
      </footer>
    </div>
  );
}
