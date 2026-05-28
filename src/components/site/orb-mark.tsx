"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface OrbMarkProps {
  navigating: boolean;
  hoverIntent: boolean;
}

export function OrbMark({ navigating, hoverIntent }: OrbMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  const mintX = useTransform(sx, (v) => v * 4);
  const mintY = useTransform(sy, (v) => v * 4);
  const coralX = useTransform(sx, (v) => v * -3.5);
  const coralY = useTransform(sy, (v) => v * 3);
  const butterX = useTransform(sx, (v) => v * 3);
  const butterY = useTransform(sy, (v) => v * -3);
  const lavenderX = useTransform(sx, (v) => v * -4);
  const lavenderY = useTransform(sy, (v) => v * -4);
  const stageX = useTransform(sx, (v) => v * 1.5);
  const stageY = useTransform(sy, (v) => v * 1.5);

  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const tiltRaw = useTransform(scrollVel, [-1500, 0, 1500], [10, 0, -10]);
  const tilt = useSpring(tiltRaw, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const range = 320;
      if (dist > range) {
        mx.set(0);
        my.set(0);
        return;
      }
      const k = 1 - dist / range;
      mx.set((dx / range) * k);
      my.set((dy / range) * k);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mounted, mx, my]);

  const stateClass = navigating ? "is-navigating" : hoverIntent ? "is-intent" : "";

  return (
    <motion.span
      ref={ref}
      className={`mark is-alive ${stateClass}`}
      aria-hidden="true"
      animate={{
        scale: navigating ? 1.18 : hoverIntent ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      style={{ rotate: tilt }}
    >
      <motion.span className="mark-stage-wrap" style={{ x: stageX, y: stageY }}>
        <span className="mark-stage" />
      </motion.span>
      <motion.span className="mark-shape-wrap mark-mint-wrap" style={{ x: mintX, y: mintY }}>
        <span className="mark-shape mark-mint" />
      </motion.span>
      <motion.span className="mark-shape-wrap mark-coral-wrap" style={{ x: coralX, y: coralY }}>
        <span className="mark-shape mark-coral" />
      </motion.span>
      <motion.span className="mark-shape-wrap mark-butter-wrap" style={{ x: butterX, y: butterY }}>
        <span className="mark-shape mark-butter" />
      </motion.span>
      <motion.span className="mark-shape-wrap mark-lavender-wrap" style={{ x: lavenderX, y: lavenderY }}>
        <span className="mark-shape mark-lavender" />
      </motion.span>
      <span className="mark-aura" />
    </motion.span>
  );
}
