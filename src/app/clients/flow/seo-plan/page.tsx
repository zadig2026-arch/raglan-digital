import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flow — SEO Plan",
  description: "SEO proposal prepared for Ardré / Flow.",
  robots: { index: false, follow: false },
};

const MONTHS = [
  {
    title: "Foundation",
    items: [
      "Migrate new site (flowdome → flowdomenz.com) with 301 redirects",
      "Full Google Business Profile optimisation — photos, services, FAQ, posts",
      "Baseline tracking: GA4, Google Search Console, rank tracking on 8 keywords",
      "Keyword list locked: bodywork Raglan, FLOWpresso Raglan, massage Raglan, cultural bodywork NZ…",
    ],
  },
  {
    title: "Content & Visibility",
    items: [
      "Two local SEO blog posts (e.g. “What is FLOWpresso?”, “Bodywork in Raglan: a local guide”)",
      "Instagram monthly content calendar, building on the April Instagram guide",
      "On-page SEO pass: meta titles, alt text, internal links, LocalBusiness schema",
    ],
  },
  {
    title: "Local Authority",
    items: [
      "Local citations & backlinks: Raglan Chamber of Commerce, wellness directories, TripAdvisor",
      "Gentle post-session Google review strategy",
      "Month 3 report + next-quarter proposal",
    ],
  },
];

const MONTHLY_INCLUSIONS = [
  "Monthly 15-min check-in call",
  "1-page report: rankings, traffic, booking signals",
  "Unlimited small tweaks — content, GBP, photos",
];

export default function FlowSeoPlanPage() {
  return (
    <>
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body { background: #ffffff !important; }
          body * { visibility: hidden !important; }
          .print-root, .print-root * { visibility: visible !important; }
          .print-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            min-height: 297mm !important;
            padding: 18mm !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-warm-200 py-10 px-4 flex justify-center">
        <article
          className="print-root bg-white text-warm-900 font-sans shadow-2xl"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "18mm",
            fontSize: "10.5pt",
            lineHeight: 1.55,
          }}
        >
          <header className="border-b border-warm-200 pb-5 mb-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-warm-500">
              Flow · The Wellness Hub · Raglan
            </div>
            <h1
              className="mt-3 font-semibold tracking-tight text-warm-900"
              style={{ fontSize: "32pt", lineHeight: 1 }}
            >
              SEO Plan — 90 Days
            </h1>
            <p className="mt-3 text-warm-600" style={{ fontSize: "11pt" }}>
              Prepared for Ardré Foote · April 2026
            </p>
          </header>

          <div className="space-y-6">
            {MONTHS.map((m, i) => (
              <section
                key={m.title}
                className="grid gap-6"
                style={{ gridTemplateColumns: "150px 1fr" }}
              >
                <div className="border-l-[3px] border-accent-600 pl-3">
                  <div
                    className="uppercase tracking-[0.22em] text-accent-700 font-medium"
                    style={{ fontSize: "9pt" }}
                  >
                    Month {i + 1}
                  </div>
                  <div
                    className="mt-1 font-semibold text-warm-900 leading-tight"
                    style={{ fontSize: "14pt" }}
                  >
                    {m.title}
                  </div>
                </div>
                <ul className="space-y-1.5" style={{ fontSize: "10.5pt" }}>
                  {m.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent-600 mt-[1px]">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-8 pt-6 border-t border-warm-200">
            <div
              className="uppercase tracking-[0.25em] text-warm-500 mb-3"
              style={{ fontSize: "9pt" }}
            >
              Included every month
            </div>
            <div
              className="grid grid-cols-3 gap-6"
              style={{ fontSize: "10.5pt" }}
            >
              {MONTHLY_INCLUSIONS.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </section>

          <footer className="mt-10 pt-6 border-t border-warm-200 flex justify-between items-end gap-6">
            <div>
              <div
                className="font-semibold text-warm-900 leading-none"
                style={{ fontSize: "24pt" }}
              >
                $349{" "}
                <span className="font-normal text-warm-600" style={{ fontSize: "11pt" }}>
                  NZD / month
                </span>
              </div>
              <div className="mt-2 text-warm-600" style={{ fontSize: "9.5pt" }}>
                No contract · Cancel anytime · Launch pricing
              </div>
            </div>
            <div
              className="text-right leading-relaxed"
              style={{ fontSize: "9.5pt" }}
            >
              <div className="font-semibold text-warm-900">Zadig · Raglan Digital</div>
              <div className="text-warm-600">zadig2026@gmail.com</div>
              <div className="text-warm-600">020 4010 3409</div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
