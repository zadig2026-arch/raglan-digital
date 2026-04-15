import { getBibleArticles, getArticleBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getBibleArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug("bible", slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: ["Zadig"],
    },
  };
}

export default async function BibleArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug("bible", slug);
  if (!article) notFound();

  const allArticles = getBibleArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <article className="px-6 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            author: { "@type": "Person", name: "Zadig" },
            publisher: {
              "@type": "Organization",
              name: "Raglan Digital",
              url: "https://raglandigital.com",
            },
            mainEntityOfPage: `https://raglandigital.com/bible/${slug}`,
          }),
        }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
          <Link href="/bible" className="hover:text-[var(--foreground)] transition-colors">The Digital Bible</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{article.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-ocean-500/10 text-ocean-600 dark:text-ocean-300">
            {article.category}
          </span>
          <span className="text-xs text-[var(--muted)]">{article.readingTime}</span>
          <span className="text-xs text-[var(--muted)]">Chapter {currentIndex + 1}</span>
        </div>

        {/* Content rendered as simple HTML from MDX content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-ocean-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-[var(--foreground)]">
          <MDXContent content={article.content} />
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/bible/${prev.slug}`}
              className="group p-4 rounded-xl border border-[var(--border)] hover:border-ocean-500/30 transition-colors"
            >
              <div className="text-xs text-[var(--muted)] mb-1">← Previous</div>
              <div className="text-sm font-medium group-hover:text-ocean-500 transition-colors">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/bible/${next.slug}`}
              className="group p-4 rounded-xl border border-[var(--border)] hover:border-ocean-500/30 transition-colors text-right"
            >
              <div className="text-xs text-[var(--muted)] mb-1">Next →</div>
              <div className="text-sm font-medium group-hover:text-ocean-500 transition-colors">{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </article>
  );
}

function MDXContent({ content }: { content: string }) {
  // Simple markdown to HTML conversion for server-side rendering
  const lines = content.split("\n");
  const html = lines
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${processInline(line.slice(2))}</h1>`;
      if (line.startsWith("## ")) return `<h2>${processInline(line.slice(3))}</h2>`;
      if (line.startsWith("### ")) return `<h3>${processInline(line.slice(4))}</h3>`;
      if (line.startsWith("- **")) return `<li>${processInline(line.slice(2))}</li>`;
      if (line.startsWith("- ")) return `<li>${processInline(line.slice(2))}</li>`;
      if (line.match(/^\d+\.\s/)) return `<li>${processInline(line.replace(/^\d+\.\s/, ""))}</li>`;
      if (line.startsWith("---")) return "<hr />";
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) return `<p><em>${processInline(line.slice(1, -1))}</em></p>`;
      if (line.trim() === "") return "";
      return `<p>${processInline(line)}</p>`;
    })
    .join("\n");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
