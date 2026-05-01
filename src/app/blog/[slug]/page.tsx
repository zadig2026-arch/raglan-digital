import { getBlogPosts, getArticleBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { FloatingBack } from "@/components/floating-back";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticleBySlug("blog", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://raglandigital.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Zadig"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getArticleBySlug("blog", slug);
  if (!post) notFound();

  return (
    <article className="px-6 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Person", name: "Zadig" },
            publisher: {
              "@type": "Organization",
              name: "Raglan Digital",
              url: "https://raglandigital.com",
            },
            mainEntityOfPage: `https://raglandigital.com/blog/${slug}`,
          }),
        }}
      />
      <FloatingBack href="/learn" label="Back to Learn" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-300">
            {post.category}
          </span>
          <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
          <span className="text-xs text-[var(--muted)]">{new Date(post.date).toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--foreground)]">
          <MDXContent content={post.content} />
        </div>

      </div>
    </article>
  );
}

function MDXContent({ content }: { content: string }) {
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
