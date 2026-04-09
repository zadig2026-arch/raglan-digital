import Link from "next/link";
import { getBibleArticles } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Digital Bible",
  description: "A free step-by-step guide to improving your online presence. Practical advice for Raglan businesses who want to take control of their digital future.",
};

const categoryColors: Record<string, string> = {
  "Getting Started": "bg-ocean-500/10 text-ocean-600 dark:text-ocean-300",
  "Website": "bg-bush-500/10 text-bush-600 dark:text-bush-300",
  "Social Media": "bg-sand-600/10 text-sand-700 dark:text-sand-300",
  "SEO": "bg-surf-500/10 text-surf-500",
};

export default function BiblePage() {
  const articles = getBibleArticles();

  return (
    <>
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Free Resource</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              The Digital Bible
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              A step-by-step guide to building your online presence. Written specifically
              for Raglan&apos;s local businesses — no jargon, no upsells, just practical advice
              you can action today.
            </p>
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/bible/${article.slug}`}
                className="group flex items-start gap-6 p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 transition-all"
              >
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-ocean-500/10 text-ocean-500 items-center justify-center text-lg font-bold shrink-0 group-hover:bg-ocean-500 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[article.category] || "bg-ocean-500/10 text-ocean-500"}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{article.readingTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold group-hover:text-ocean-500 transition-colors">{article.title}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{article.description}</p>
                </div>
                <svg className="w-5 h-5 text-[var(--muted)] group-hover:text-ocean-500 transition-colors shrink-0 mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-ocean-950 to-ocean-800 text-white text-center">
            <h2 className="text-2xl font-bold">Want personalised guidance?</h2>
            <p className="mt-3 text-ocean-200 max-w-lg mx-auto">
              The Bible gives you the knowledge. We can help you apply it.
              Book a free audit and get a tailored action plan for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-white text-ocean-900 font-medium mt-6 hover:bg-ocean-50 transition-colors"
            >
              Get your free audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
