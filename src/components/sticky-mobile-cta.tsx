"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "rd_smcta_dismissed";
const SHOW_AFTER_PX = 600;

export function StickyMobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;
  if (
    pathname === "/studio" ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/mockup") ||
    pathname?.startsWith("/thanks") ||
    pathname?.startsWith("/discover") ||
    pathname?.startsWith("/contact")
  )
    return null;

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/studio"
          className="flex-1 h-12 px-5 inline-flex items-center justify-center rounded-full bg-accent-500 text-white text-sm font-semibold shadow-lg active:scale-[0.98] transition-transform"
        >
          Start a project <span aria-hidden="true" className="ml-1.5">→</span>
        </Link>
        <button
          onClick={() => {
            window.sessionStorage.setItem(STORAGE_KEY, "1");
            setDismissed(true);
          }}
          className="shrink-0 w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] flex items-center justify-center"
          aria-label="Dismiss"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
