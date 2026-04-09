import { getBlogPosts, getArticleBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getArticleBySlug("blog", slug);
  if (!post) notFound();

  return (
    <article className="px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
          <Link href="/blog" className="hover:text-[var(--foreground)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[var(--foreground)] truncate">{post.title}</span>
        </nav>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-ocean-500/10 text-ocean-600 dark:text-ocean-300">
            {post.category}
          </span>
          <span className="text-xs text-[var(--muted)]">{post.readingTime}</span>
          <span className="text-xs text-[var(--muted)]">{new Date(post.date).toLocaleDateString("en-NZ", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-ocean-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--foreground)]">
          <MDXContent content={post.content} />
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)] text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-ocean-500 hover:text-ocean-600 transition-colors"
          >
            ← Back to Blog
          </Link>
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
