import type { Metadata } from "next";
import Image from "next/image";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Park House — preview",
  description:
    "A preview of what a Park House website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

const HERO = "/prospects/park-house/01.jpeg";

const ROOMS = [
  {
    name: "The Victoria",
    body: "Our largest room, looking onto Victoria Park. Queen bed, sitting area, heritage windows with afternoon light.",
    rate: "From $245",
    image: "/prospects/park-house/06.jpeg",
  },
  {
    name: "The Garden",
    body: "Quieter side of the house, leadlight windows onto the garden. Queen bed, wicker reading corner, morning light.",
    rate: "From $195",
    image: "/prospects/park-house/04.jpeg",
  },
  {
    name: "The Loft",
    body: "Upstairs at the back, quiet and soft. Queen bed, period wallpaper, the most private of the three.",
    rate: "From $215",
    image: "/prospects/park-house/03.jpeg",
  },
];

const NEARBY = [
  { name: "Victoria Park", distance: "Across the road" },
  { name: "Cambridge village", distance: "3-minute walk" },
  { name: "The Rose Garden", distance: "5-minute walk" },
  { name: "Lake Te Koo Utu", distance: "8-minute walk" },
  { name: "The stables", distance: "12-minute walk" },
  { name: "Hamilton CBD", distance: "25-minute drive" },
];

export default function ParkHousePreview() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#F8F4ED] text-[#1F2A24] antialiased`}
      style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 py-7 flex items-center justify-between text-white">
        <span
          className="text-[14px] tracking-[0.4em] uppercase drop-shadow"
          style={{ fontWeight: 400 }}
        >
          Park House
        </span>
        <nav className="hidden md:flex gap-10 text-[11px] tracking-[0.3em] uppercase drop-shadow">
          <a href="#story" className="hover:opacity-70 transition-opacity">
            Story
          </a>
          <a href="#rooms" className="hover:opacity-70 transition-opacity">
            Rooms
          </a>
          <a href="#cambridge" className="hover:opacity-70 transition-opacity">
            Cambridge
          </a>
          <a href="#book" className="hover:opacity-70 transition-opacity">
            Book
          </a>
        </nav>
      </header>

      {/* ─── Hero — centered serif ─── */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <Image
          src={HERO}
          alt="Park House, Cambridge"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <p
            className="text-[10px] tracking-[0.5em] uppercase opacity-70 mb-8"
            style={{ fontWeight: 400 }}
          >
            Established 1928
          </p>
          <h1
            className="text-6xl md:text-9xl leading-[0.95] tracking-tight max-w-5xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            Park House.
          </h1>
          <p
            className="mt-10 text-[14px] md:text-[15px] tracking-[0.2em] uppercase max-w-md opacity-90"
            style={{ fontWeight: 400 }}
          >
            Three rooms, one quiet street,
            <br />
            opposite Victoria Park, Cambridge.
          </p>
          <a
            href="#book"
            className="mt-14 inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase border-b border-white/40 pb-2 hover:border-white transition-colors"
            style={{ fontWeight: 400 }}
          >
            Reserve your stay
          </a>
        </div>
      </section>

      {/* ─── Story — long form ─── */}
      <section
        id="story"
        className="px-6 md:px-12 py-32 md:py-44"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p
              className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4"
              style={{ fontWeight: 500 }}
            >
              The story
            </p>
            <h2
              className="text-3xl md:text-5xl leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Built in 1928.
            </h2>
          </div>
          <div className="md:col-span-8 md:border-l md:border-[#1F2A24]/15 md:pl-12">
            <div
              className="space-y-6 text-[16px] leading-[1.85] opacity-80"
              style={{ fontWeight: 300 }}
            >
              <p
                className="text-[18px] leading-[1.75]"
                style={{ fontWeight: 400 }}
              >
                The house was built as the Midlands Private Hotel, a small
                country retreat for travellers passing through the Waikato in
                the years between the wars.
              </p>
              <p>
                It served as a hotel for half a century, then a family home
                for another forty years, before reopening — quietly, carefully
                — as a three-room bed and breakfast in 2018.
              </p>
              <p>
                The roof came off in a fire in 2011. The rebuild was slow and
                exacting, working from the original 1928 plans. The result is
                a house that looks the way it always has, with the plumbing of
                a house that doesn&apos;t.
              </p>
              <p>
                It sits opposite Victoria Park, on a quiet street in central
                Cambridge. You can walk to dinner. You can walk to the rose
                garden. You can sit on the verandah and read a book without
                hearing a car.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Rooms ─── */}
      <section
        id="rooms"
        className="px-6 md:px-12 py-32 md:py-44 border-t border-[#1F2A24]/10"
        style={{ background: "#EFEAE0" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p
              className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4"
              style={{ fontWeight: 500 }}
            >
              Three rooms
            </p>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Each one different. Each one quiet.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {ROOMS.map((r, i) => (
              <article key={r.name} className="group">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <p
                  className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3"
                  style={{ fontWeight: 500 }}
                >
                  Room {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="text-3xl mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {r.name}
                </h3>
                <p
                  className="text-[14px] leading-[1.8] opacity-75 mb-5"
                  style={{ fontWeight: 300 }}
                >
                  {r.body}
                </p>
                <p
                  className="text-[13px] tracking-[0.2em] uppercase"
                  style={{ color: "#5C7A5E", fontWeight: 500 }}
                >
                  {r.rate} / night
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cambridge guide ─── */}
      <section
        id="cambridge"
        className="px-6 md:px-12 py-32 md:py-44"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <p
              className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4"
              style={{ fontWeight: 500 }}
            >
              Walking distance
            </p>
            <h2
              className="text-4xl md:text-5xl leading-[1.05] mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Cambridge starts at the verandah.
            </h2>
            <p
              className="text-[15px] leading-[1.85] opacity-75 max-w-md"
              style={{ fontWeight: 300 }}
            >
              You won&apos;t need the car. The village, the park, the rose
              garden, the lake — all within ten minutes on foot.
            </p>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-[#1F2A24]/15">
              {NEARBY.map((n) => (
                <li
                  key={n.name}
                  className="flex justify-between items-baseline py-5 group"
                >
                  <span
                    className="text-[19px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {n.name}
                  </span>
                  <span
                    className="text-[12px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-90 transition-opacity"
                    style={{ fontWeight: 400 }}
                  >
                    {n.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Book ─── */}
      <section
        id="book"
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: "#2A3B2D", color: "#F8F4ED" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] tracking-[0.5em] uppercase opacity-60 mb-10"
            style={{ fontWeight: 400 }}
          >
            How to reserve
          </p>
          <h2
            className="text-5xl md:text-6xl leading-[1.05] mb-12"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Send a note.
          </h2>
          <p
            className="text-[16px] leading-[1.85] opacity-80 max-w-xl mx-auto mb-12"
            style={{ fontWeight: 300 }}
          >
            We don&apos;t use online booking. Email with your dates and
            we&apos;ll come back personally — usually within the hour during
            the day.
          </p>
          <a
            href="mailto:stay@parkhouse.co.nz"
            className="inline-flex items-center gap-3 text-[14px] tracking-[0.3em] uppercase border-b pb-2 hover:opacity-80 transition-opacity"
            style={{
              fontWeight: 400,
              borderColor: "rgba(248,244,237,0.5)",
              color: "#B68E5C",
            }}
          >
            stay@parkhouse.co.nz
          </a>
          <p
            className="mt-12 text-[12px] tracking-[0.3em] uppercase opacity-50"
            style={{ fontWeight: 400 }}
          >
            Check-in 2pm — 7pm · Check-out by 10am
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 md:px-12 py-10 border-t border-[#F8F4ED]/10"
        style={{ background: "#2A3B2D", color: "rgba(248,244,237,0.4)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.3em] uppercase">
          <span style={{ fontWeight: 400 }}>
            © {new Date().getFullYear()} Park House · Victoria Street, Cambridge
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
