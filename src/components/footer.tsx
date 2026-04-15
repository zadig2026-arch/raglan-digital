import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div>
            <span className="text-sm font-semibold tracking-tight">raglan<span className="text-accent-400">digital</span></span>
            <p className="mt-2 text-[11px] text-[var(--muted)] max-w-[200px] leading-relaxed">
              Web design, SEO & digital growth for small businesses in New Zealand.
            </p>
          </div>

          <div className="flex gap-10 text-[11px]">
            <div className="space-y-2.5">
              <p className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-widest mb-3">Work</p>
              <Link href="/services" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Services</Link>
              <Link href="/tools" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Free tools</Link>
              <Link href="/learn" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Learn</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[10px] font-medium text-[var(--muted)] uppercase tracking-widest mb-3">Connect</p>
              <Link href="/about" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">About</Link>
              <a href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer" className="block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-[var(--border)] text-[10px] text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Raglan Digital
        </div>
      </div>
    </footer>
  );
}
