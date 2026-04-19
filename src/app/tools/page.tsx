"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconSearch, IconPencil, IconBolt, IconClipboardCheck } from "@/components/icons";

const tools = [
  {
    title: "SEO Audit",
    description: "Enter your website URL and get an instant SEO health score with actionable recommendations. Checks meta tags, headings, images, links, and more.",
    href: "/tools/seo-audit",
    icon: <IconSearch className="w-6 h-6" />,
  },
  {
    title: "Meta Tag Generator",
    description: "Generate optimized title tags and meta descriptions for any page. Get character counts, previews, and SEO-friendly suggestions.",
    href: "/tools/meta-generator",
    icon: <IconPencil className="w-6 h-6" />,
  },
  {
    title: "Speed Checker",
    description: "Test how fast your website loads. Get performance scores and specific recommendations to make your site faster.",
    href: "/tools/speed-checker",
    icon: <IconBolt className="w-6 h-6" />,
  },
  {
    title: "Digital Presence Checklist",
    description: "An interactive checklist to audit your entire online presence. Google Business, social media, website, reviews — everything in one place.",
    href: "/tools/digital-checklist",
    icon: <IconClipboardCheck className="w-6 h-6" />,
  },
];

export default function ToolsPage() {
  return (
    <div className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">Tools</p>
          <h1 className="text-display-lg">
            See where your business stands online.
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            I built these to help you figure out what&apos;s working and what&apos;s not.
            Run them, then send me your results if you want my take.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={tool.href}
                className="group block p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/30 hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center mb-4">{tool.icon}</div>
                <h2 className="text-xl font-bold">{tool.title}</h2>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{tool.description}</p>
                <span className="inline-flex items-center mt-6 text-sm font-medium text-accent-600 dark:text-accent-500 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  Use this tool →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-brand-900 dark:bg-brand-950 text-white text-center">
          <h3 className="text-lg font-bold">Done with the tools?</h3>
          <p className="mt-2 text-sm text-brand-400">
            Send me your results on WhatsApp. I&apos;ll tell you what I&apos;d fix first — and if you want, I&apos;ll do the work.
          </p>
          <a
            href="https://wa.me/33752032213?text=Hey%20Zadig%2C%20I%20just%20ran%20your%20tools.%20Here%20are%20my%20results%3A%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 px-5 items-center justify-center rounded-lg bg-accent-500 text-white text-sm font-medium mt-4 hover:bg-accent-600 transition-colors gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Send me your results
          </a>
        </div>
      </div>
    </div>
  );
}
