import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import { WorkList } from "@/components/work/work-list";

export const metadata: Metadata = {
  title: "Work — selected projects, FR & NZ",
  description:
    "Selected client work by Zadig at Raglan Digital — a French painters' collective, a Raglan wellness practice, a photography club, and more. Live and in-progress projects across France and New Zealand.",
  alternates: { canonical: "https://raglandigital.com/work" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raglandigital.com" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://raglandigital.com/work" },
  ],
};

export default function WorkPage() {
  const projects = getProjects();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} — ${p.sector}`,
      url: `https://raglandigital.com/work/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, itemListSchema]) }}
      />

      <section className="px-6 pt-28 md:pt-40 pb-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Selected work
          </p>
          <h1 className="text-display-xl">
            Sites that ship,<br />
            in France and Aotearoa.
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
            A working portfolio — a few live, a few in flight. Each project is built around one
            stubborn idea: that the people behind the work should keep control of it.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <WorkList projects={projects} />
        </div>
      </section>

      <section className="px-6 py-24 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-lg">Have a project?</h2>
          <p className="mt-5 text-[var(--muted)] max-w-lg mx-auto">
            FR or NZ, small or substantial — tell me about it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="h-12 px-7 inline-flex items-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
            >
              Get in touch
            </Link>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
