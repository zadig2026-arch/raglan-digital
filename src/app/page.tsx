"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StyleSwitcher, type AxeType } from "@/components/style-switcher";
import { StorytellingAxe } from "@/components/axes/storytelling";
import { PersonaAxe } from "@/components/axes/persona";
import { PremiumAxe } from "@/components/axes/premium";

const axes: Record<AxeType, React.ComponentType> = {
  storytelling: StorytellingAxe,
  persona: PersonaAxe,
  premium: PremiumAxe,
};

export default function Home() {
  const [activeAxe, setActiveAxe] = useState<AxeType>("storytelling");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("site-axe") as AxeType | null;
    if (stored && stored in axes) {
      setActiveAxe(stored);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("site-axe", activeAxe);
  }, [activeAxe]);

  const switchAxe = useCallback((axe: AxeType) => {
    if (axe === activeAxe || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveAxe(axe);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setTimeout(() => setTransitioning(false), 50);
    }, 400);
  }, [activeAxe, transitioning]);

  const ActiveComponent = axes[activeAxe];

  return (
    <>
      <div
        className="transition-opacity duration-400"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <ActiveComponent />
      </div>

      <StyleSwitcher active={activeAxe} onChange={switchAxe} />
    </>
  );
}
