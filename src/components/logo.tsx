import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative w-8 h-8">
        <Image
          src="/images/zag-logo.png"
          alt="Zadig"
          width={32}
          height={32}
          className="rounded-full ring-2 ring-accent-200 dark:ring-accent-700"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-black uppercase tracking-wide text-[var(--foreground)]">
          Scale
        </span>
        <span className="font-hand text-base text-accent-500 -mt-1">
          with Zadig
        </span>
      </div>
    </div>
  );
}
