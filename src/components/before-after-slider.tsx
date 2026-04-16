"use client";

import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  className?: string;
}

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  beforeContent,
  afterContent,
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updatePosition(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(x * 100);
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl border border-[var(--border)] overflow-hidden select-none cursor-col-resize ${className}`}
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onMouseMove={(e) => { if (dragging.current) updatePosition(e.clientX); }}
      onTouchMove={(e) => { updatePosition(e.touches[0].clientX); }}
    >
      {/* After (full width behind) */}
      <div className="w-full">{afterContent}</div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div style={{ width: containerRef.current?.offsetWidth || "100%" }}>
          {beforeContent}
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent-500 z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-warm-800/80 text-white text-xs font-medium backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-accent-500/90 text-white text-xs font-medium backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
