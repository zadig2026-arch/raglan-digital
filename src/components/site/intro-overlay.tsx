"use client";

import { useEffect, useState } from "react";

export function IntroOverlay() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("rd_intro_v2")) {
      setHide(true);
      return;
    }
    sessionStorage.setItem("rd_intro_v2", "1");
    const t = setTimeout(() => setHide(true), 4800);
    return () => clearTimeout(t);
  }, []);

  if (hide) return null;

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-orb">
        <span className="intro-stage" />
        <span className="intro-shape intro-mint" />
        <span className="intro-shape intro-lavender" />
        <span className="intro-shape intro-butter" />
        <span className="intro-shape intro-coral" />
      </div>
    </div>
  );
}
