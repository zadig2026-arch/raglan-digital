"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/lib/quiz-config";

export function QuizQuestion({
  question,
  initialValue,
  onAnswer,
  onBack,
  canGoBack,
}: {
  question: Question;
  initialValue?: string;
  onAnswer: (value: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(initialValue ?? null);
  const [focused, setFocused] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(initialValue ?? null);
    setFocused(0);
  }, [question.id, initialValue]);

  function choose(value: string) {
    if (selected === value) return;
    setSelected(value);
    setTimeout(() => onAnswer(value), 150);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setFocused((f) => Math.min(question.choices.length - 1, f + 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setFocused((f) => Math.max(0, f - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const choice = question.choices[focused];
      if (choice) choose(choice.value);
    }
  }

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLButtonElement>(
      `button[data-idx="${focused}"]`
    );
    node?.focus();
  }, [focused]);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-full px-3 py-1.5"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      )}

      <h2 className="text-display-lg mb-10" aria-live="polite">
        {question.prompt}
      </h2>

      <div
        ref={listRef}
        role="radiogroup"
        aria-label={question.prompt}
        onKeyDown={onKeyDown}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {question.choices.map((c, i) => {
          const isSelected = selected === c.value;
          return (
            <button
              key={c.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              data-idx={i}
              onClick={() => choose(c.value)}
              onFocus={() => setFocused(i)}
              className={`text-left min-h-16 px-6 py-5 rounded-2xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                isSelected
                  ? "border-accent-500 bg-accent-500/5 shadow-sm"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--foreground)]/30 hover:bg-[var(--surface-hover)]"
              }`}
            >
              <div className="text-base font-medium">{c.label}</div>
              {c.hint && (
                <div className="mt-1 text-sm text-[var(--muted)]">{c.hint}</div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
