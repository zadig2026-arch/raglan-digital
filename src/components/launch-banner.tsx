"use client";

import { useState } from "react";
import Link from "next/link";

export function LaunchBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-warm-900 text-white text-center py-2 px-4 text-sm">
      <span>
        I build websites for businesses from <strong>$599</strong>.{" "}
        <Link href="/services" className="underline underline-offset-2 hover:text-accent-400 transition-colors">
          See pricing →
        </Link>
      </span>
      <button onClick={() => setDismissed(true)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors" aria-label="Dismiss">✕</button>
    </div>
  );
}
