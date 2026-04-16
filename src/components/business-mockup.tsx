import Image from "next/image";
import type { MockupData } from "@/lib/mockups";

export function BusinessMockup({ data }: { data: MockupData }) {
  const { business, brand, hero, services, gallery, contact } = data;

  const css = {
    ["--bm-primary" as string]: brand.primary,
    ["--bm-primary-dark" as string]: brand.primaryDark ?? brand.primary,
    ["--bm-bg" as string]: brand.background ?? "#fafaf7",
    ["--bm-text" as string]: brand.text ?? "#1a1a1a",
  } as React.CSSProperties;

  return (
    <div
      style={css}
      className="bg-[var(--bm-bg)] text-[var(--bm-text)] font-sans"
    >
      {/* ─── Top bar ─── */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-5 flex items-center justify-between text-white">
        <span className="text-base md:text-lg font-semibold tracking-tight drop-shadow-md">
          {business.name}
        </span>
        <nav className="hidden md:flex gap-8 text-sm font-medium drop-shadow-md">
          <a href="#about" className="hover:opacity-80 transition-opacity">
            About
          </a>
          <a href="#services" className="hover:opacity-80 transition-opacity">
            What we do
          </a>
          <a href="#gallery" className="hover:opacity-80 transition-opacity">
            Gallery
          </a>
          <a href="#contact" className="hover:opacity-80 transition-opacity">
            Visit
          </a>
        </nav>
        {hero.cta && (
          <a
            href={hero.cta.href}
            className="hidden md:inline-flex h-9 px-5 items-center rounded-full bg-white text-[var(--bm-text)] text-xs font-semibold hover:bg-white/90 transition-colors"
          >
            {hero.cta.label}
          </a>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={hero.image}
          alt={business.name}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="relative h-full flex items-end px-6 md:px-12 pb-20 md:pb-28">
          <div className="max-w-3xl text-white">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] opacity-80 mb-4">
              {business.type}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {hero.headline}
            </h1>
            {hero.subhead && (
              <p className="mt-6 text-lg md:text-xl opacity-90 max-w-xl leading-relaxed">
                {hero.subhead}
              </p>
            )}
            {hero.cta && (
              <a
                href={hero.cta.href}
                className="mt-10 inline-flex h-12 px-7 items-center rounded-full bg-[var(--bm-primary)] text-white text-sm font-semibold hover:bg-[var(--bm-primary-dark)] transition-colors"
              >
                {hero.cta.label} →
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section
        id="about"
        className="px-6 md:px-12 py-24 md:py-32 max-w-4xl mx-auto"
      >
        <p
          className="text-sm uppercase tracking-[0.2em] opacity-60 mb-6"
          style={{ color: "var(--bm-primary)" }}
        >
          About {business.name}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          {business.tagline}
        </h2>
        <p className="mt-8 text-lg md:text-xl leading-relaxed opacity-80 max-w-2xl">
          {business.about}
        </p>
      </section>

      {/* ─── Services ─── */}
      <section
        id="services"
        className="px-6 md:px-12 py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-sm uppercase tracking-[0.2em] opacity-60 mb-6 text-center"
            style={{ color: "var(--bm-primary)" }}
          >
            What we do
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center max-w-2xl mx-auto">
            Made with care, every time.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-[var(--bm-bg)] border border-black/5 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-10 h-1 rounded-full mb-6"
                  style={{ background: "var(--bm-primary)" }}
                />
                <h3 className="text-xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-base opacity-70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery ─── */}
      <section
        id="gallery"
        className="px-6 md:px-12 py-24"
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-sm uppercase tracking-[0.2em] opacity-60 mb-6 text-center"
            style={{ color: "var(--bm-primary)" }}
          >
            Gallery
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">
            See for yourself.
          </h2>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-square rounded-xl overflow-hidden ${
                  i === 0 ? "md:row-span-2 md:aspect-auto" : ""
                }`}
              >
                <Image
                  src={src}
                  alt={`${business.name} gallery ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-24 md:py-32 text-white"
        style={{ background: "var(--bm-primary)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] opacity-70 mb-6">
              Visit us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              We&apos;d love to see you.
            </h2>
            <p className="mt-6 text-lg opacity-85 leading-relaxed">
              {contact.address}
            </p>
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="mt-3 block text-lg opacity-85 hover:opacity-100"
              >
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 block text-lg opacity-85 hover:opacity-100"
              >
                {contact.email}
              </a>
            )}
            {contact.instagram && (
              <p className="mt-3 text-lg opacity-85">{contact.instagram}</p>
            )}
          </div>
          <div>
            {contact.hours && contact.hours.length > 0 && (
              <>
                <p className="text-sm uppercase tracking-[0.2em] opacity-70 mb-6">
                  Hours
                </p>
                <ul className="space-y-3">
                  {contact.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between border-b border-white/20 pb-3 text-base"
                    >
                      <span className="font-medium">{h.day}</span>
                      <span className="opacity-85">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-6 md:px-12 py-10 text-sm bg-black text-white/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span>
            © {new Date().getFullYear()} {business.name}.
            {contact.website && ` ${contact.website}.`}
          </span>
          <span className="opacity-50 text-xs">
            Mockup by Raglan Digital · raglandigital.com
          </span>
        </div>
      </footer>
    </div>
  );
}
