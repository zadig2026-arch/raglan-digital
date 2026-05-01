interface Testimonial {
  quote: string;
  author: string;
  role: string;
  business: string;
  city: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Booked solid the week the site went live. Worth every cent.',
    author: 'Sara',
    role: 'Owner',
    business: 'Flow Wellness',
    city: 'Raglan',
  },
  {
    quote: 'Finally a site that loads on a phone without making me wait. Customers actually stay now.',
    author: 'Mark',
    role: 'Founder',
    business: 'Park House',
    city: 'Raglan',
  },
  {
    quote: 'Zadig listened. Built it in a week. Easy to update myself afterwards.',
    author: 'Rachel',
    role: 'Director',
    business: 'Adaia Flora',
    city: 'Hamilton',
  },
];

export function SocialProof() {
  return (
    <section className="px-6 py-24 md:py-28 bg-[var(--surface)]" aria-labelledby="social-proof-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            From real customers
          </p>
          <h2
            id="social-proof-heading"
            className="text-display-md md:text-display-lg"
          >
            Built for businesses, not for vanity awards.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author + t.business}
              className="p-7 rounded-3xl bg-[var(--background)] border border-[var(--border)] flex flex-col"
            >
              <Quotes className="text-accent-500" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-[var(--border)] text-sm">
                <p className="font-semibold">{t.author}</p>
                <p className="text-[var(--muted)] text-xs mt-0.5">
                  {t.role} · {t.business} · {t.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quotes({ className = '' }: { className?: string }) {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 22V13.2C0 9.06 0.84 5.7 2.52 3.12C4.32 0.42 6.96 -0.6 10.44 0.06L11.4 3.6C7.92 4.5 6.18 6.96 6.18 10.98H10.8V22H0ZM16.2 22V13.2C16.2 9.06 17.04 5.7 18.72 3.12C20.52 0.42 23.16 -0.6 26.64 0.06L27.6 3.6C24.12 4.5 22.38 6.96 22.38 10.98H27V22H16.2Z" />
    </svg>
  );
}
