"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { QuizResult } from "@/components/quiz/quiz-result";
import { tracks, isValidService, type Service } from "@/lib/quiz-config";

export default function StartPage() {
  const [service, setService] = useState<Service>("help");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("service");
    if (isValidService(fromUrl)) setService(fromUrl);
    setReady(true);
  }, []);

  const track = tracks[service];
  const questions = track.questions;
  const total = questions.length;
  const isResult = step >= total;

  const handleAnswer = useCallback(
    (value: string) => {
      const q = questions[step];
      if (!q) return;
      setAnswers((prev) => ({ ...prev, [q.id]: value }));
      setStep((s) => s + 1);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    },
    [questions, step]
  );

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const handleRestart = useCallback(() => {
    setStep(0);
    setAnswers({});
  }, []);

  if (!ready) {
    return (
      <section className="min-h-[70vh] px-6 py-24 flex items-center">
        <div className="max-w-3xl mx-auto w-full" aria-busy="true" />
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto w-full">
        {!isResult && (
          <>
            <div className="mb-10">
              <QuizProgress current={step + 1} total={total} />
            </div>
            <AnimatePresence mode="wait">
              <QuizQuestion
                key={`${service}-${step}`}
                question={questions[step]}
                initialValue={answers[questions[step].id]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                canGoBack={step > 0}
              />
            </AnimatePresence>
          </>
        )}

        {isResult && (
          <QuizResult
            service={service}
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </section>
  );
}
