import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { ProjectHero, ProjectMetrics, ProjectDecisions } from "@/components/work/project-hero";
import { BilingualQuote } from "@/components/work/bilingual-quote";
import { FloatingBack } from "@/components/floating-back";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.sector}`,
    description: project.brief,
    alternates: { canonical: `https://raglandigital.com/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.brief,
      type: "article",
      publishedTime: project.date,
      authors: ["Zadig"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getProjects();
  const currentIndex = all.findIndex((p) => p.slug === slug);
  const next = all[currentIndex + 1] ?? all[0];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.brief,
            dateCreated: project.date,
            creator: { "@type": "Person", name: "Zadig" },
            publisher: { "@type": "Organization", name: "Raglan Digital", url: "https://raglandigital.com" },
            url: `https://raglandigital.com/work/${slug}`,
            ...(project.links?.live ? { sameAs: [project.links.live] } : {}),
          }),
        }}
      />

      <FloatingBack href="/work" label="Back to work" />

      <ProjectHero project={project} />

      {project.metrics && project.metrics.length > 0 && (
        <ProjectMetrics metrics={project.metrics} />
      )}

      <section className="px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-[var(--foreground)]">
          <MDXContent content={project.content} />
        </div>
      </section>

      {project.testimonial && (
        <section className="px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <BilingualQuote testimonial={project.testimonial} />
          </div>
        </section>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <ProjectDecisions decisions={project.decisions} />
      )}

      <section className="px-6 py-20 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Next
          </p>
          <Link
            href={`/work/${next.slug}`}
            className="text-display-md md:text-display-lg hover:text-accent-500 transition-colors"
          >
            {next.title} <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-3 text-sm text-[var(--muted)]">{next.sector} · {next.region}</p>
        </div>
      </section>
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
      if (line.startsWith("- ")) return `<li>${processInline(line.slice(2))}</li>`;
      if (line.match(/^\d+\.\s/)) return `<li>${processInline(line.replace(/^\d+\.\s/, ""))}</li>`;
      if (line.startsWith("---")) return "<hr />";
      if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
        return `<p><em>${processInline(line.slice(1, -1))}</em></p>`;
      }
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
