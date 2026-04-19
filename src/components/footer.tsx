"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/mockup") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/examples")
  )
    return null;
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-10">
          <div>
            <span className="text-base font-semibold tracking-tight">raglan<span className="text-accent-400">digital</span></span>
            <p className="mt-3 text-xs text-[var(--muted)] max-w-[220px] leading-relaxed">
              Web design, SEO & digital growth for small businesses in New Zealand.
            </p>
          </div>

          <div className="flex gap-14 text-xs">
            <div className="space-y-3">
              <p className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.25em] mb-4">Work</p>
              <Link href="/services" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Services</Link>
              <Link href="/tools" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Free tools</Link>
              <Link href="/learn" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Learn</Link>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-[0.25em] mb-4">Connect</p>
              <Link href="/about" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
              <a href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Raglan Digital
        </div>
      </div>
    </footer>
  );
}
