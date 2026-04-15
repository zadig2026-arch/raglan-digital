import Link from "next/link";
import { Search, Gauge, FileText, ClipboardCheck, BookOpen, Share2 } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

const iconClass = "w-5 h-5 text-accent-500";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ═══ TOOLS ═══ */}
      <section className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Check your website.
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Free. No sign-up.</p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: "SEO Audit", desc: "What Google sees.", href: "/tools/seo-audit", icon: <Search className={iconClass} /> },
              { title: "Speed Test", desc: "How fast it loads.", href: "/tools/speed-checker", icon: <Gauge className={iconClass} /> },
              { title: "Meta Generator", desc: "Your Google listing.", href: "/tools/meta-generator", icon: <FileText className={iconClass} /> },
              { title: "Digital Checklist", desc: "Full presence check.", href: "/tools/digital-checklist", icon: <ClipboardCheck className={iconClass} /> },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/30 hover:shadow-lg hover:shadow-accent-500/5 transition-all duration-300"
              >
                {tool.icon}
                <h3 className="font-semibold text-sm mt-3">{tool.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEARN ═══ */}
      <section className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Learn.</h2>
            <Link href="/learn" className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors">
              See all &rarr;
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "The Digital Bible", desc: "Build your online presence from zero.", href: "/bible/website-essentials", icon: <BookOpen className={iconClass} /> },
              { title: "SEO Basics", desc: "How to show up on Google.", href: "/bible/seo-basics", icon: <Search className={iconClass} /> },
              { title: "Social Media Tips", desc: "Content that actually works.", href: "/bible/social-media-strategy", icon: <Share2 className={iconClass} /> },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/30 transition-all duration-300"
              >
                {item.icon}
                <h3 className="font-semibold text-sm mt-3">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
