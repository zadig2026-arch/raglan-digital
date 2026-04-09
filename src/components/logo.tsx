interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="64" height="64" rx="14" fill="url(#logo-gradient)" />

      {/* Wave shape - Raglan surf vibe */}
      <path
        d="M0 42c8-4 12-8 18-8s10 6 16 6 10-6 16-6 8 4 14 8v22H0V42z"
        fill="white"
        opacity="0.15"
      />
      <path
        d="M0 48c6-3 10-6 16-6s10 5 16 5 10-5 16-5 8 3 16 6v16H0V48z"
        fill="white"
        opacity="0.1"
      />

      {/* Letter R */}
      <path
        d="M20 16h12c3 0 5.5 0.8 7.2 2.5C41 20.2 42 22.5 42 25.5c0 2.5-0.7 4.5-2 6-1.3 1.5-3 2.5-5.2 3L42 46h-7.5l-6.5-10.5H27V46h-7V16zm7 6v8.5h5c1.5 0 2.7-0.4 3.5-1.3 0.8-0.9 1.2-2 1.2-3.3 0-1.2-0.4-2.2-1.2-3C34.7 22.3 33.5 22 32 22h-5z"
        fill="white"
      />

      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563a8" />
          <stop offset="1" stopColor="#1e4a82" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={32} />
      <span className="font-semibold text-lg tracking-tight">
        Raglan<span className="text-ocean-500">Digital</span>
      </span>
    </div>
  );
}
