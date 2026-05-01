interface Prop {
  eyebrow: string;
  title: string;
  body: string;
  icon: 'clock' | 'tag' | 'pin';
}

const props: Prop[] = [
  {
    eyebrow: '5–10 days',
    title: 'Fast.',
    body: 'Most launch sites go live between 5 and 10 days. No drawn-out kickoff calls, no endless rounds.',
    icon: 'clock',
  },
  {
    eyebrow: '$399 NZD',
    title: 'Fixed.',
    body: 'You see the price before you commit. No hourly billing surprises, no scope creep.',
    icon: 'tag',
  },
  {
    eyebrow: 'Aotearoa',
    title: 'Local.',
    body: 'Built in Raglan, made for NZ small businesses. Local SEO, local support, local cents.',
    icon: 'pin',
  },
];

export interface ValuePropBentoProps {
  className?: string;
}

export function ValuePropBento({ className = '' }: ValuePropBentoProps) {
  return (
    <section className={`px-6 py-20 ${className}`} aria-label="Value propositions">
      <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3">
        {props.map((p) => (
          <Card key={p.title} prop={p} />
        ))}
      </div>
    </section>
  );
}

function Card({ prop }: { prop: Prop }) {
  return (
    <div className="group p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-accent-500/40 transition-colors">
      <div className="flex items-center gap-3">
        <Icon name={prop.icon} />
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] font-medium">
          {prop.eyebrow}
        </span>
      </div>
      <h3 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
        {prop.title}
      </h3>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
        {prop.body}
      </p>
    </div>
  );
}

function Icon({ name }: { name: Prop['icon'] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'text-accent-500',
    'aria-hidden': true,
  };
  if (name === 'clock')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (name === 'tag')
    return (
      <svg {...common}>
        <path d="M20 12V5a1 1 0 0 0-1-1h-7L3 13l8 8 9-9z" />
        <circle cx="15" cy="9" r="1" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
