"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SearchResult {
  title: string;
  url: string;
  description: string;
  stars?: number;
  reviews?: number;
  highlight?: boolean;
}

interface GoogleSearchMockupProps {
  query: string;
  results: SearchResult[];
  progress?: MotionValue<number>;
  className?: string;
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1 mt-0.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? "text-[#fbbc04]" : "text-warm-300 dark:text-warm-700"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-[var(--muted)]">
        {rating} ({reviews})
      </span>
    </div>
  );
}

export function GoogleSearchMockup({
  query,
  results,
  className,
}: GoogleSearchMockupProps) {
  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-2xl border border-[var(--border)] bg-white dark:bg-warm-900 shadow-2xl overflow-hidden ${className ?? ""}`}
    >
      {/* Chrome-like top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#f1f3f4] dark:bg-warm-800 border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ed6a5e]" />
          <div className="w-3 h-3 rounded-full bg-[#f5bf4f]" />
          <div className="w-3 h-3 rounded-full bg-[#62c554]" />
        </div>
        <div className="flex-1 mx-4 h-7 rounded-full bg-white dark:bg-warm-700 flex items-center px-3">
          <span className="text-xs text-[var(--muted)] truncate">
            google.com/search?q={query.replace(/ /g, "+")}
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-[var(--border)] bg-white dark:bg-warm-800">
          <svg className="w-4 h-4 text-[#4285f4] shrink-0" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
            <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-[var(--foreground)]">{query}</span>
        </div>
        <p className="text-xs text-[var(--muted)] mt-3 px-1">
          About {(Math.random() * 900000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} results
        </p>
      </div>

      {/* Results */}
      <div className="px-6 pb-6 space-y-5">
        {results.map((result, i) => (
          <motion.div
            key={result.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className={`p-4 rounded-xl transition-all duration-500 ${
              result.highlight
                ? "bg-accent-50 dark:bg-accent-950/30 border border-accent-200 dark:border-accent-800 ring-2 ring-accent-500/20"
                : ""
            }`}
          >
            <p className="text-xs text-[var(--muted)]">{result.url}</p>
            <p
              className={`text-base font-medium mt-0.5 ${
                result.highlight
                  ? "text-accent-600 dark:text-accent-400"
                  : "text-[#1a0dab] dark:text-accent-400"
              }`}
            >
              {result.title}
            </p>
            {result.stars && result.reviews && (
              <StarRating rating={result.stars} reviews={result.reviews} />
            )}
            <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
              {result.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedSearchResultsProps {
  progress: MotionValue<number>;
  className?: string;
}

const beforeResults: SearchResult[] = [
  {
    title: "Raglan Surf Cafe — Best Coffee on the Coast",
    url: "raglansurfcafe.co.nz",
    description:
      "Award-winning coffee and brunch in the heart of Raglan. Open 7 days, 7am–3pm. Fresh local ingredients.",
    stars: 4.7,
    reviews: 312,
  },
  {
    title: "The Shack Raglan — Food & Drinks",
    url: "theshackraglan.nz",
    description:
      "Laid-back vibes and great food. Live music every Friday. Book online or walk in.",
    stars: 4.3,
    reviews: 189,
  },
  {
    title: "Raglan Cafes — TripAdvisor",
    url: "tripadvisor.com › raglan › restaurants",
    description:
      "Best cafes in Raglan: See reviews and photos of cafes in Raglan on TripAdvisor.",
  },
];

const afterResults: SearchResult[] = [
  {
    title: "Your Business — Now on Page 1",
    url: "yourbusiness.co.nz",
    description:
      "Raglan's favourite [business]. Open 7 days. See our menu, book online, read reviews.",
    stars: 4.8,
    reviews: 47,
    highlight: true,
  },
  {
    title: "Raglan Surf Cafe — Best Coffee on the Coast",
    url: "raglansurfcafe.co.nz",
    description:
      "Award-winning coffee and brunch in the heart of Raglan. Open 7 days, 7am–3pm.",
    stars: 4.7,
    reviews: 312,
  },
  {
    title: "The Shack Raglan — Food & Drinks",
    url: "theshackraglan.nz",
    description:
      "Laid-back vibes and great food. Live music every Friday.",
    stars: 4.3,
    reviews: 189,
  },
];

export function AnimatedSearchResults({
  progress,
  className,
}: AnimatedSearchResultsProps) {
  const opacity1 = useTransform(progress, [0, 0.3, 0.45, 0.55], [1, 1, 0, 0]);
  const opacity2 = useTransform(progress, [0.35, 0.45, 0.55, 1], [0, 0, 1, 1]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <motion.div style={{ opacity: opacity2 }}>
        <GoogleSearchMockup query="cafe in raglan" results={afterResults} />
      </motion.div>
      <motion.div style={{ opacity: opacity1 }} className="absolute inset-0">
        <GoogleSearchMockup query="cafe in raglan" results={beforeResults} />
      </motion.div>
    </div>
  );
}
