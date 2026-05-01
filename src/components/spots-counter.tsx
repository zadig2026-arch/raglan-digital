import { getLaunchSpotsLeft } from '@/lib/db/queries';

export interface SpotsCounterProps {
  variant?: 'inline' | 'badge' | 'sentence';
  className?: string;
}

export async function SpotsCounter({
  variant = 'inline',
  className,
}: SpotsCounterProps) {
  const left = await safeGetSpots();
  if (left == null) return null;

  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-medium ${className ?? ''}`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent-500"
          aria-hidden="true"
        />
        {left} spot{left === 1 ? '' : 's'} left this month
      </span>
    );
  }

  if (variant === 'sentence') {
    return (
      <span className={className}>
        {left === 0
          ? 'All spots taken this month — join the waitlist'
          : `${left} of 5 launch spots left this month`}
      </span>
    );
  }

  return (
    <span className={className}>
      {left}/5 spots
    </span>
  );
}

async function safeGetSpots(): Promise<number | null> {
  try {
    return await getLaunchSpotsLeft();
  } catch (err) {
    console.warn('SpotsCounter: failed to read launch_spots', err);
    return null;
  }
}
