"use client";

import { useState, useEffect } from "react";
import type { AxeType } from "@/components/style-switcher";
import { StorytellingAxe } from "@/components/axes/storytelling";
import { PersonaAxe } from "@/components/axes/persona";
import { AppleAxe } from "@/components/axes/apple";

const axes: Record<AxeType, React.ComponentType> = {
  storytelling: StorytellingAxe,
  persona: PersonaAxe,
  premium: AppleAxe,
};

export default function Home() {
  const [activeAxe, setActiveAxe] = useState<AxeType>("premium");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("axe") as AxeType | null;
    if (fromUrl && fromUrl in axes) {
      setActiveAxe(fromUrl);
      sessionStorage.setItem("site-axe", fromUrl);
      return;
    }
    const stored = sessionStorage.getItem("site-axe") as AxeType | null;
    if (stored && stored in axes) setActiveAxe(stored);
  }, []);

  const ActiveComponent = axes[activeAxe];
  return <ActiveComponent />;
}
