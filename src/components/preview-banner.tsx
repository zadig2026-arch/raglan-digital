import Link from "next/link";

export function PreviewBanner() {
  return (
    <div className="sticky top-0 z-50 bg-neutral-950 text-white border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-11 flex items-center justify-between gap-3 text-xs md:text-[13px]">
        <span className="truncate">
          <span className="opacity-60">Preview by</span>{" "}
          <span className="font-medium">Zadig · Raglan Digital</span>
        </span>
        <Link
          href="/free-website"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <span className="hidden sm:inline">Like it?</span>
          <span>Get in touch</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
