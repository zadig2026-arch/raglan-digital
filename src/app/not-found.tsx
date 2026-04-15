import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-20 min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-accent-500">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="h-11 px-6 inline-flex items-center rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="h-11 px-6 inline-flex items-center rounded-xl border border-[var(--border)] text-sm font-medium hover:border-accent-500/30 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
