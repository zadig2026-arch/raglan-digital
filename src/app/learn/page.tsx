import Link from "next/link";
import { getBibleArticles, getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn",
  description: "Guides, tips, and tools to help you understand and improve your online presence. Written by Zag for NZ small businesses.",
  alternates: { canonical: "https://raglandigital.com/learn" },
};

const categoryColors: Record<string, string> = {
  "Getting Started": "bg-accent-500/10 text-accent-500",
  "Website": "bg-success-500/10 text-success-500",
  "Social Media": "bg-accent-400/10 text-accent-400",
  "SEO": "bg-accent-300/10 text-accent-600",
};

export default function LearnPage() {
  const guides = getBibleArticles();
  const posts = getBlogPosts();

  return (
    <>
      {/* Header */}
      <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">Learn</p>
            <h1 className="text-display-lg">
              I want you to understand your business online.
            </h1>
            <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
              Guides to build your knowledge. Tips you can use this week.
              Everything I know, written down so you can do it yourself — or know exactly what to ask me for.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ GUIDES (Bible) ═══ */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-500/10 text-accent-500 flex items-center justify-center text-sm font-bold">G</div>
            <div>
              <h2 className="text-xl font-bold">The Digital Bible</h2>
              <p className="text-sm text-[var(--muted)]">Step-by-step guides. Start here if you&apos;re new.</p>
            </div>
          </div>

          <div className="grid gap-3">
            {guides.map((article, i) => (
              <Link
                key={article.slug}
                href={`/bible/${article.slug}`}
                className="group flex items-start gap-5 p-5 md:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/30 hover:shadow-md transition-all"
              >
                <div className="hidden sm:flex w-10 h-10 rounded-lg bg-accent-500/10 text-accent-500 items-center justify-center text-sm font-bold shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[article.category] || "bg-accent-500/10 text-accent-500"}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{article.readingTime}</span>
                  </div>
                  <h3 className="font-semibold group-hover:text-accent-500 transition-colors">{article.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)] line-clamp-1">{article.description}</p>
                </div>
                <svg className="w-5 h-5 text-[var(--muted)] group-hover:text-accent-500 group-hover:translate-x-1 transition-all shrink-0 mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[var(--border)]" />
      </div>

      {/* ═══ BLOG (Tips) ═══ */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent-500/10 text-accent-500 flex items-center justify-center text-sm font-bold">T</div>
            <div>
              <h2 className="text-xl font-bold">Tips & Articles</h2>
              <p className="text-sm text-[var(--muted)]">Quick reads. Things you can action today.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-500">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
                </div>
                <h3 className="font-semibold group-hover:text-accent-500 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-3 text-sm font-medium text-accent-500 group-hover:translate-x-1 transition-transform inline-flex">
                  Read →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl bg-brand-900 dark:bg-brand-950 text-white text-center">
            <h2 className="text-2xl font-bold">Rather I just handle it?</h2>
            <p className="mt-3 text-brand-400 max-w-lg mx-auto">
              Run the tools, send me your results. I&apos;ll tell you what I&apos;d fix and quote you a fair price.
            </p>
            <a
              href="https://wa.me/33752032213?text=Hey%20Zadig%2C%20I%20read%20your%20guides%20and%20I%20need%20help."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-medium mt-6 hover:bg-accent-600 transition-colors gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
