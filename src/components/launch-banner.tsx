"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SPOTS_LEFT = 5;

export function LaunchBanner() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  if (
    pathname?.startsWith("/mockup") ||
    pathname?.startsWith("/preview") ||
    pathname?.startsWith("/examples")
  )
    return null;
  if (dismissed || SPOTS_LEFT <= 0) return null;

  return (
    <div className="relative bg-warm-900 text-white text-center py-2 px-10 text-xs sm:text-sm">
      <span>
        Limited launch —{" "}
        <strong>{SPOTS_LEFT} free websites</strong> for NZ small businesses this month.{" "}
        <Link
          href="/free-website"
          className="underline underline-offset-2 hover:text-accent-400 transition-colors"
        >
          See if you qualify →
        </Link>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
