"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

export function BrowserMockup({ url = "raglandigital.com", children, className }: BrowserMockupProps) {
  return (
    <div className={cn("rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden", className)}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-hover)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ed6a5e]" />
          <div className="w-3 h-3 rounded-full bg-[#f5bf4f]" />
          <div className="w-3 h-3 rounded-full bg-[#62c554]" />
        </div>
        <div className="flex-1 mx-4 h-7 rounded-full bg-[var(--background)] flex items-center px-3">
          <svg className="w-3 h-3 text-success-500 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M12 2a10 10 0 0 1 7.38 16.75" strokeLinecap="round" />
            <path d="M12 2a10 10 0 0 0-7.38 16.75" strokeLinecap="round" />
            <rect x="6" y="8" width="12" height="8" rx="1" />
          </svg>
          <span className="text-xs text-[var(--muted)] truncate">{url}</span>
        </div>
      </div>
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
