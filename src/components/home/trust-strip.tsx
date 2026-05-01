import { Suspense } from 'react';
import { SpotsCounter } from '@/components/spots-counter';

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--background)]" aria-label="Trust signals">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
        <Suspense fallback={null}>
          <SpotsCounter variant="badge" />
        </Suspense>

        <Separator />

        <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
          <Star /> <span>NZ small businesses · honest pricing</span>
        </span>

        <Separator />

        <span className="text-[var(--muted)]">
          Live in <span className="font-medium text-[var(--foreground)]">5–10 days</span>
        </span>
      </div>
    </section>
  );
}

function Separator() {
  return <span className="w-1 h-1 rounded-full bg-[var(--border)] hidden sm:block" aria-hidden="true" />;
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent-500" aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
