export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-baseline gap-0 select-none ${className}`}>
      <span className="text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
        SCALE
      </span>
      <span className="font-hand text-2xl text-accent-500 ml-0.5 -mb-0.5">
        with Zag
      </span>
    </div>
  );
}
