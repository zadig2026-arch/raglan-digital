"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const questions = [
  {
    id: "website",
    question: "Do you have a website?",
    options: [
      { label: "Yes, professional & mobile-friendly", score: 20 },
      { label: "Yes, but it's outdated or not mobile-friendly", score: 10 },
      { label: "I have a Facebook page only", score: 5 },
      { label: "No online presence", score: 0 },
    ],
  },
  {
    id: "google",
    question: "Is your Google Business Profile set up?",
    options: [
      { label: "Yes, fully optimised with photos & reviews", score: 20 },
      { label: "Yes, but it's basic or incomplete", score: 10 },
      { label: "I'm not sure what that is", score: 3 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "social",
    question: "How active are you on social media?",
    options: [
      { label: "I post 3+ times a week consistently", score: 20 },
      { label: "I post a few times a month", score: 12 },
      { label: "I have accounts but rarely post", score: 5 },
      { label: "I'm not on social media", score: 0 },
    ],
  },
  {
    id: "reviews",
    question: "How many Google reviews do you have?",
    options: [
      { label: "10+ reviews with recent ones", score: 15 },
      { label: "A few reviews (3-9)", score: 10 },
      { label: "1-2 reviews", score: 5 },
      { label: "No reviews", score: 0 },
    ],
  },
  {
    id: "seo",
    question: "Can people find you when they Google your services + Raglan?",
    options: [
      { label: "Yes, I'm on the first page", score: 15 },
      { label: "I show up but not on page 1", score: 8 },
      { label: "I've never checked", score: 3 },
      { label: "No, I can't find my business", score: 0 },
    ],
  },
  {
    id: "branding",
    question: "How consistent is your branding?",
    options: [
      { label: "Same logo, colours, and style everywhere", score: 10 },
      { label: "Mostly consistent with some variations", score: 6 },
      { label: "It's all over the place", score: 3 },
      { label: "I don't have defined branding", score: 0 },
    ],
  },
];

const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.score)), 0);

function getResult(score: number) {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return {
    grade: "A",
    color: "text-bush-500",
    bg: "bg-bush-500",
    title: "Excellent! You're ahead of most local businesses.",
    description: "Your online presence is strong. Focus on maintaining consistency and exploring advanced strategies like content marketing and paid advertising to stay ahead.",
    tips: [
      "Start a blog to boost organic traffic",
      "Run targeted local ads on Google or Meta",
      "Build an email list from your existing customers",
      "Create video content to stand out further",
    ],
  };
  if (pct >= 60) return {
    grade: "B",
    color: "text-ocean-500",
    bg: "bg-ocean-500",
    title: "Good foundation, but room to grow.",
    description: "You've got the basics in place. A few key improvements could significantly boost your visibility and bring in more customers.",
    tips: [
      "Complete your Google Business Profile — every field matters",
      "Increase your posting frequency on social media",
      "Ask happy customers for Google reviews",
      "Make sure your website loads fast on mobile",
    ],
  };
  if (pct >= 35) return {
    grade: "C",
    color: "text-sand-600",
    bg: "bg-sand-600",
    title: "There's significant opportunity to improve.",
    description: "You're missing out on customers who are looking for businesses like yours online. The good news: small changes can make a big difference.",
    tips: [
      "Set up and optimise your Google Business Profile (Chapter 1 of our Bible)",
      "Get your website mobile-friendly",
      "Start posting on Instagram or Facebook 3x per week",
      "Ask your next 5 happy customers to leave a Google review",
    ],
  };
  return {
    grade: "D",
    color: "text-red-500",
    bg: "bg-red-500",
    title: "Your business is nearly invisible online.",
    description: "But don't worry — every successful online presence started from zero. Let's build yours from the ground up.",
    tips: [
      "Start with our Digital Bible — it's free and step-by-step",
      "Create a Google Business Profile today (it's free)",
      "Set up a simple, professional website",
      "Pick one social media platform and start posting",
    ],
  };
}

export default function VisibilityScorePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);
  const pct = Math.round((totalScore / maxScore) * 100);

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div className="px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentQ === 0 && (
                <div className="mb-12">
                  <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Free Tool</span>
                  <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                    Online Visibility Score
                  </h1>
                  <p className="mt-4 text-[var(--muted)]">
                    Answer 6 quick questions to find out how visible your business is online
                    — and get personalised tips to improve.
                  </p>
                </div>
              )}

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-[var(--muted)] mb-2">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-ocean-500 rounded-full"
                    initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                {questions[currentQ].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQ].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-ocean-500/40 hover:bg-ocean-500/5 transition-all text-sm font-medium"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-[var(--border)] mb-6 relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="6" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={`${(pct / 100) * 339.292} 339.292`}
                      strokeLinecap="round"
                      className={result.color}
                    />
                  </svg>
                  <span className={`text-3xl font-bold ${result.color}`}>{pct}%</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${result.bg}/10 ${result.color} text-sm font-semibold mb-4`}>
                  Grade: {result.grade}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{result.title}</h1>
                <p className="mt-3 text-[var(--muted)] max-w-lg mx-auto">{result.description}</p>
              </div>

              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] mb-8">
                <h3 className="font-semibold mb-4">Your personalised action plan:</h3>
                <ul className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-ocean-500/10 text-ocean-500 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-ocean-950 to-ocean-800 text-white text-center">
                <h3 className="text-lg font-semibold">Want a detailed audit of your online presence?</h3>
                <p className="mt-2 text-sm text-ocean-200">
                  We&apos;ll go deeper than this quiz. A real audit of your website, Google profile,
                  social media, and SEO — with a tailored plan to improve.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex h-10 px-6 items-center justify-center rounded-lg bg-white text-ocean-900 text-sm font-medium hover:bg-ocean-50 transition-colors"
                  >
                    Get your free audit →
                  </Link>
                  <Link
                    href="/bible"
                    className="inline-flex h-10 px-6 items-center justify-center rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Read the Digital Bible
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button onClick={reset} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  Retake quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
