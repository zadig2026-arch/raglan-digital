"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, mounted, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[var(--background)]/80">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="text-sm font-semibold tracking-tight">raglan<span className="text-accent-400">digital</span></span>
        </Link>

        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-[var(--surface)] rounded-full px-1 py-1 border border-[var(--border)]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--surface-hover)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="w-[14px] h-[14px]" />
            ) : theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <Link
            href="/contact"
            className="hidden md:inline-flex h-8 px-4 items-center rounded-full bg-accent-500 text-white text-xs font-medium hover:bg-accent-600 transition-colors"
          >
            Get in touch
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block pt-3 text-sm font-medium text-accent-400">Get in touch →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
