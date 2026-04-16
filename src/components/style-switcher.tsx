"use client";

import { motion } from "framer-motion";
import { BookOpen, UserCircle, Sparkles } from "lucide-react";

export type AxeType = "storytelling" | "persona" | "premium";

const axes: { id: AxeType; label: string; icon: typeof BookOpen }[] = [
  { id: "storytelling", label: "Story", icon: BookOpen },
  { id: "persona", label: "Persona", icon: UserCircle },
  { id: "premium", label: "Premium", icon: Sparkles },
];

interface StyleSwitcherProps {
  active: AxeType;
  onChange: (axe: AxeType) => void;
}

export function StyleSwitcher({ active, onChange }: StyleSwitcherProps) {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-white/90 dark:bg-warm-900/90 backdrop-blur-xl border border-[var(--border)] shadow-2xl shadow-black/10">
        <p className="text-sm text-accent-500 px-3 hidden sm:block font-hand">
          Switch style
        </p>
        {axes.map((axe) => {
          const Icon = axe.icon;
          const isActive = active === axe.id;
          return (
            <button
              key={axe.id}
              onClick={() => onChange(axe.id)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="switcher-pill"
                  className="absolute inset-0 bg-accent-500 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{axe.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
