"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OrbMark } from "./orb-mark";
import { useRouteNavigating } from "./route-progress";

interface NavLink {
  href: string;
  label: string;
  matchKey: string;
  /** Home section id this link reflects while scrolling the one-pager. */
  spy?: string;
}

const LINKS: NavLink[] = [
  { href: "/#services", label: "Services", matchKey: "services", spy: "services" },
  { href: "/work", label: "Work", matchKey: "work", spy: "work" },
  { href: "/#process", label: "Process", matchKey: "process", spy: "process" },
  { href: "/#about", label: "About", matchKey: "about", spy: "about" },
];

export function Nav() {
  const pathname = usePathname();
  const navigating = useRouteNavigating();
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [brandHover, setBrandHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const onHome = pathname === "/";
  const onWork = pathname?.startsWith("/work") ?? false;
  const onContact = pathname?.startsWith("/contact") ?? false;

  // Scroll-spy — only on the homepage, where the anchor sections exist. Owns the
  // active state for the animated pill so there is a single source of truth (the
  // old DOM-toggling spy in client-scripts fought React's re-renders).
  useEffect(() => {
    if (!onHome || typeof IntersectionObserver === "undefined") {
      setActiveSection(null);
      return;
    }
    const ids = LINKS.map((l) => l.spy).filter((s): s is string => Boolean(s));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      // Thin band in the upper-middle of the viewport: the section crossing it wins.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome, pathname]);

  // Close the mobile menu on every route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the mobile menu is open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const routeKey = onWork ? "work" : null;
  const activeKey = routeKey ?? (onHome ? activeSection : null);
  const indicatorKey = hoverKey ?? activeKey;

  return (
    <>
      <nav className="nav glass" data-open={menuOpen ? "" : undefined}>
        <Link
          href="/"
          className="brand"
          onMouseEnter={() => setBrandHover(true)}
          onMouseLeave={() => setBrandHover(false)}
        >
          <OrbMark navigating={navigating} hoverIntent={brandHover || hoverKey !== null} />
          <span>Raglan Digital</span>
        </Link>

        <div className="links" onMouseLeave={() => setHoverKey(null)}>
          {LINKS.map((link) => {
            const isActive = link.matchKey === activeKey;
            const isIndicated = link.matchKey === indicatorKey;
            return (
              <Link
                key={link.matchKey}
                href={link.href}
                className={isActive ? "active" : undefined}
                onMouseEnter={() => setHoverKey(link.matchKey)}
              >
                {isIndicated && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav-label">{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`btn btn-primary cta${onContact ? " active" : ""}`}
          >
            Start a project<span className="btn-arrow" />
          </Link>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="burger-box" aria-hidden="true">
            <span className="burger-line" />
            <span className="burger-line" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="nav-backdrop"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              className="nav-sheet"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              {LINKS.map((link) => {
                const isActive = link.matchKey === activeKey;
                return (
                  <Link
                    key={link.matchKey}
                    href={link.href}
                    className={isActive ? "active" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="sheet-arrow" aria-hidden="true" />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`btn btn-primary cta-mobile${onContact ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                Start a project<span className="btn-arrow" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
