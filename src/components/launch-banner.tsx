"use client";

import { useState } from "react";
import Link from "next/link";

export function LaunchBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-ocean-700 via-ocean-600 to-bush-600 text-white text-center py-2.5 px-4 text-sm font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 bg-surf-400 rounded-full animate-pulse" />
        <span>
          Launch offer — Free website audit for our first 5 clients.{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-surf-300 transition-colors">
            Claim your spot →
          </Link>
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}
