interface Step {
  number: string;
  title: string;
  body: string;
  duration: string;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discovery',
    body: 'A 15-min call to understand your business, your customers, and what makes you you.',
    duration: 'Day 1',
  },
  {
    number: '02',
    title: 'Mockup',
    body: 'I send you a clickable mockup of the home page. You give feedback. We refine.',
    duration: 'Day 2–3',
  },
  {
    number: '03',
    title: 'Build',
    body: 'I build the full site — fast, mobile-first, optimized for Google. You review checkpoints.',
    duration: 'Day 3–8',
  },
  {
    number: '04',
    title: 'Launch',
    body: 'Domain, SSL, indexing, Google Business Profile linked. You\'re live and findable.',
    duration: 'Day 5–10',
  },
];

export interface ProcessTimelineProps {
  className?: string;
}

export function ProcessTimeline({ className = '' }: ProcessTimelineProps) {
  return (
    <section
      className={`px-6 py-24 md:py-32 bg-[var(--surface)] ${className}`}
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Process
          </p>
          <h2 id="process-heading" className="text-display-md md:text-display-lg">
            From idea to live in 5–10 days.
          </h2>
          <p className="mt-5 text-[var(--muted)]">
            Four checkpoints. Fixed price. No mystery.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-4 md:gap-6 relative">
          <div
            className="hidden md:block absolute top-8 left-8 right-8 h-px bg-[var(--border)]"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <li key={step.number} className="relative">
              <div className="flex md:flex-col gap-4 md:gap-5">
                <div
                  className="shrink-0 w-16 h-16 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center font-mono text-sm font-semibold relative z-10"
                >
                  {step.number}
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-accent-500 font-medium">
                    {step.duration}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
