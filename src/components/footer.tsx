import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = {
  Services: [
    { href: "/services", label: "Web Design" },
    { href: "/services#seo", label: "SEO & Google" },
    { href: "/services#social-media", label: "Social Media" },
    { href: "/services#content", label: "Content & Copy" },
  ],
  "Free Tools": [
    { href: "/tools/seo-audit", label: "SEO Audit" },
    { href: "/tools/meta-generator", label: "Meta Generator" },
    { href: "/tools/speed-checker", label: "Speed Checker" },
    { href: "/tools/digital-checklist", label: "Digital Checklist" },
  ],
  Learn: [
    { href: "/learn", label: "Guides & Tips" },
    { href: "/about", label: "About Zag" },
    { href: "https://wa.me/64XXXXXXXXX", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/"><Logo /></Link>
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-xs">
              Web design, SEO & digital growth for NZ small businesses. Fair prices, real results.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} Scale with Zag. All rights reserved.</p>
          <p>Built with care in New Zealand</p>
        </div>
      </div>
    </footer>
  );
}
