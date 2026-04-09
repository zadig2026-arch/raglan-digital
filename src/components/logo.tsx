import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <Image
        src="/images/zag-logo.png"
        alt="Zag"
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="flex items-baseline gap-0">
        <span className="text-xl font-black uppercase tracking-tight text-[var(--foreground)]">
          SCALE
        </span>
        <span className="font-hand text-2xl text-accent-500 ml-1 -mb-0.5">
          with Zag
        </span>
      </div>
    </div>
  );
}
