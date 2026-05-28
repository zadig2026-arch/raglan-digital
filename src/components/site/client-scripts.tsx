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

    // ---------- Hero orb + roaming bubble field ----------
    // All motion is a single JS-driven `transform` per frame. A per-frame inline
    // transform repaints reliably on every GPU; a CSS animation on the individual
    // `translate`/`rotate` properties did not (the orb looked frozen in headed
    // Chrome even though its timeline kept advancing).
    const orb = document.querySelector<HTMLElement>(".hero-orb");
    const stage = orb?.querySelector<HTMLElement>(".stage") ?? null;
    const bubbles = Array.from(document.querySelectorAll<HTMLElement>(".hero-field .bubble"));
    let orbRaf = 0;
    let onOrbMove: ((ev: MouseEvent) => void) | null = null;
    if (!reduce && (stage || bubbles.length)) {
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
      // o* = cursor relative to the orb centre (sphere tilt).
      // v* = cursor relative to the viewport centre (field parallax).
      let omx = 0, omy = 0, ocx = 0, ocy = 0;
      let vmx = 0, vmy = 0, vcx = 0, vcy = 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        const t = (now - t0) / 1000;
        ocx += (omx - ocx) * 0.08; ocy += (omy - ocy) * 0.08;
        vcx += (vmx - vcx) * 0.06; vcy += (vmy - vcy) * 0.06;
        if (stage) {
          const fy = Math.sin(t * 0.7) * -10;   // gentle vertical bob
          const fr = Math.sin(t * 0.45) * 1.6;  // slow sway
          stage.style.transform =
            `translate3d(${ocx * 16}px, ${ocy * 16 + fy}px, 0) ` +
            `rotate(${fr}deg) rotateX(${-ocy * 7}deg) rotateY(${ocx * 9}deg)`;
        }
        for (let i = 0; i < bubbles.length; i++) {
          const p = i * 1.7;
          // Two summed sines per axis -> organic, non-repeating wandering that
          // ranges across most of the hero.
          const ax = 130 + (i % 4) * 42;
          const ay = 92 + (i % 3) * 46;
          const w1 = 0.22 + (i % 5) * 0.028;
          const w2 = 0.16 + (i % 3) * 0.022;
          const x = ax * Math.sin(t * w1 + p) + ax * 0.45 * Math.sin(t * w2 * 1.7 + p * 0.6);
          const y = ay * Math.cos(t * w2 + p) + ay * 0.5 * Math.cos(t * w1 * 1.3 + p * 0.9);
          const depth = 12 + (i % 4) * 9;       // parallax strength
          const sc = 1 + 0.09 * Math.sin(t * 0.5 + p);
          const rot = 7 * Math.sin(t * 0.22 + p);
          bubbles[i].style.transform =
            `translate3d(${x + vcx * depth}px, ${y + vcy * depth}px, 0) rotate(${rot}deg) scale(${sc})`;
        }
        orbRaf = requestAnimationFrame(loop);
      };
      orbRaf = requestAnimationFrame(loop);
      onOrbMove = (ev: MouseEvent) => {
        if (orb) {
          const r = orb.getBoundingClientRect();
          omx = clamp((ev.clientX - r.left - r.width / 2) / (r.width / 2), 1);
          omy = clamp((ev.clientY - r.top - r.height / 2) / (r.height / 2), 1);
        }
        vmx = clamp((ev.clientX / window.innerWidth - 0.5) * 2, 1);
        vmy = clamp((ev.clientY / window.innerHeight - 0.5) * 2, 1);
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
