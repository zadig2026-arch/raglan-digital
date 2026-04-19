"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/preview", "/mockup", "/examples"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
};

export function CursorGlow() {
  const pathname = usePathname();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPointerRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const now = performance.now();
      const last = lastPointerRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dt = Math.max(1, now - last.t);
      const speed = Math.hypot(dx, dy) / dt;
      const count = Math.min(4, 1 + Math.floor(speed * 6));

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = 0.3 + Math.random() * 0.5;
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * spread - dx * 0.015,
          vy: Math.sin(angle) * spread - dy * 0.015,
          size: 1.2 + Math.random() * 2.2,
          life: 0,
          maxLife: 700 + Math.random() * 600,
        });
      }
      if (particlesRef.current.length > 220) {
        particlesRef.current.splice(0, particlesRef.current.length - 220);
      }

      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let prev = performance.now();

    function tick(now: number) {
      const dt = now - prev;
      prev = now;
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "96,165,250" : "59,130,246";

      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          arr.splice(i, 1);
          continue;
        }
        const t = p.life / p.maxLife;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const alpha = (1 - t) * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  );
}
