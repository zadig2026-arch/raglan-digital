"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs">
        <div>
          <span className="text-sm font-semibold tracking-tight">
            raglan<span className="text-accent-400">digital</span>
          </span>
          <span className="ml-2 text-[var(--muted)]">· by Zadig</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[var(--muted)]">
          <Link href="/work" className="hover:text-[var(--foreground)] transition-colors">
            Work
          </Link>
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">
            Contact
          </Link>
          <a
            href="https://wa.me/33752032213"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="text-[var(--muted)] text-[11px]">
          &copy; {new Date().getFullYear()} · FR &amp; NZ
        </div>
      </div>
    </footer>
  );
}
