"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";

const intents = [
  { href: "/services", label: "I have a website" },
  { href: "/launch", label: "I don't have one yet" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, mounted, toggle } = useTheme();
  if (
    pathname?.startsWith("/mockup") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/examples")
  )
    return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[var(--background)]/80">
      <nav aria-label="Primary" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <span className="text-sm font-semibold tracking-tight">raglan<span className="text-accent-400">digital</span></span>
        </Link>

        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-[var(--surface)] rounded-full px-1 py-1 border border-[var(--border)]">
            {intents.map((intent) => {
              const active = pathname === intent.href;
              return (
                <Link
                  key={intent.href}
                  href={intent.href}
                  aria-current={active ? "page" : undefined}
                  className={`h-9 inline-flex items-center px-4 rounded-full text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] ${
                    active
                      ? "bg-[var(--background)] text-[var(--foreground)] font-medium shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {intent.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className="hidden md:inline-flex items-center h-11 px-3 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            About me
          </Link>
          <button
            onClick={toggle}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
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
            className="hidden md:inline-flex h-11 px-5 items-center rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Get in touch
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-11 h-11 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <div className="px-6 py-5 space-y-2">
              {intents.map((intent) => {
                const active = pathname === intent.href;
                return (
                  <Link
                    key={intent.href}
                    href={intent.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center h-12 px-4 rounded-full text-sm transition-colors ${
                      active
                        ? "bg-[var(--surface-hover)] text-[var(--foreground)] font-medium"
                        : "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {intent.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-3 border-t border-[var(--border)] flex items-center justify-between">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  aria-current={pathname === "/about" ? "page" : undefined}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
                >
                  Get in touch →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
