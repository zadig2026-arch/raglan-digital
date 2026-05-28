"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClientScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- Scroll reveal + count-up ----------
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              const t = e.target as HTMLElement;
              if (t.dataset.countup) startCountUp(t, reduce);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => io!.observe(el));
    } else {
      revealEls.forEach((el) => {
        el.classList.add("in");
        if (el.dataset.countup) startCountUp(el, reduce);
      });
    }

    // ---------- Hero orb parallax ----------
    const orb = document.querySelector<HTMLElement>(".hero-orb");
    let orbRaf = 0;
    let onOrbMove: ((ev: MouseEvent) => void) | null = null;
    if (orb && !reduce) {
      const shapes = Array.from(orb.querySelectorAll<HTMLElement>(".orb-shape"));
      const stage = orb.querySelector<HTMLElement>(".stage");
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
      let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
      const loop = () => {
        cx += (mx - cx) * 0.07;
        cy += (my - cy) * 0.07;
        // Parallax lives on `transform` and composes over the CSS idle float
        // (which animates `translate`/`rotate`). The stage also tilts in 3D
        // (the .hero-orb parent sets `perspective`).
        if (stage) {
          stage.style.transform =
            `translate3d(${cx * 16}px, ${cy * 16}px, 0) ` +
            `rotateX(${-cy * 7}deg) rotateY(${cx * 9}deg)`;
        }
        shapes.forEach((s, i) => {
          const depth = 22 + i * 9;
          s.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0)`;
        });
        if (Math.abs(mx - cx) > 0.0005 || Math.abs(my - cy) > 0.0005) {
          raf = requestAnimationFrame(loop);
          orbRaf = raf;
        } else {
          raf = 0;
        }
      };
      onOrbMove = (ev: MouseEvent) => {
        const rect = orb.getBoundingClientRect();
        // Offset from the orb centre, normalised by half-size and clamped so the
        // orb leans toward the cursor without chasing it across the whole screen.
        mx = clamp((ev.clientX - rect.left - rect.width / 2) / (rect.width / 2), 1);
        my = clamp((ev.clientY - rect.top - rect.height / 2) / (rect.height / 2), 1);
        if (!raf) {
          raf = requestAnimationFrame(loop);
          orbRaf = raf;
        }
      };
      document.addEventListener("mousemove", onOrbMove);
    }

    // Nav scroll-spy now lives in nav.tsx (React-owned, IntersectionObserver) so
    // it no longer fights React re-renders for the .active class.

    // ---------- Blob parallax ----------
    const blobs = Array.from(document.querySelectorAll<HTMLElement>(".blob"));
    let onBlobScroll: (() => void) | null = null;
    if (!reduce && blobs.length) {
      onBlobScroll = () => {
        const y = window.scrollY;
        blobs.forEach((b, i) => {
          const speed = i % 2 === 0 ? 0.06 : -0.04;
          b.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
      };
      window.addEventListener("scroll", onBlobScroll, { passive: true });
    }

    return () => {
      io?.disconnect();
      if (onOrbMove) document.removeEventListener("mousemove", onOrbMove);
      if (orbRaf) cancelAnimationFrame(orbRaf);
      if (onBlobScroll) window.removeEventListener("scroll", onBlobScroll);
    };
  }, [pathname]);

  return null;
}

function startCountUp(el: HTMLElement, reduce: boolean) {
  const targetStr = el.dataset.countup || "0";
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  if (reduce) {
    el.textContent = prefix + targetStr + suffix;
    return;
  }
  const target = parseFloat(targetStr);
  const isInt = Number.isInteger(target);
  const dur = 1400;
  const start = performance.now();
  function tick(now: number) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = target * eased;
    el.textContent = prefix + (isInt ? Math.round(v) : v.toFixed(1)) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
