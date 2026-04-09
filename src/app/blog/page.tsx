import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, guides, and insights for Raglan businesses looking to grow their online presence.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Blog</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Tips & Insights
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              Practical advice for Raglan businesses. Quick reads, real value.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-ocean-500/30 hover:shadow-lg hover:shadow-ocean-500/5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-ocean-500/10 text-ocean-600 dark:text-ocean-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
                </div>
                <h2 className="text-lg font-semibold group-hover:text-ocean-500 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 text-sm font-medium text-ocean-500">
                  Read more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
