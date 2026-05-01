"use client";

import { useState } from "react";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { FloatingBack } from "@/components/floating-back";

const categories = [
  {
    title: "Website Essentials",
    items: [
      { id: "w1", label: "Website is mobile-friendly and responsive" },
      { id: "w2", label: "Site loads in under 3 seconds" },
      { id: "w3", label: "HTTPS is enabled (padlock icon in browser)" },
      { id: "w4", label: "Clear contact info on every page (phone, email, address)" },
      { id: "w5", label: "Call-to-action buttons are visible and clear" },
      { id: "w6", label: "Business hours are displayed" },
      { id: "w7", label: "Site has a favicon (small icon in browser tab)" },
      { id: "w8", label: "404 error page is customized, not default" },
    ],
  },
  {
    title: "Google & SEO",
    items: [
      { id: "g1", label: "Google Business Profile is claimed and verified" },
      { id: "g2", label: "Business name, address, phone (NAP) is consistent everywhere" },
      { id: "g3", label: "Google Business has photos (at least 10)" },
      { id: "g4", label: "Google Business hours are up to date" },
      { id: "g5", label: "You respond to Google reviews (positive and negative)" },
      { id: "g6", label: "Each page has a unique title tag" },
      { id: "g7", label: "Each page has a meta description" },
      { id: "g8", label: "Images have alt text descriptions" },
      { id: "g9", label: "Site is submitted to Google Search Console" },
    ],
  },
  {
    title: "Social Media",
    items: [
      { id: "s1", label: "Facebook Business page is set up and active" },
      { id: "s2", label: "Instagram profile is set up with a bio link" },
      { id: "s3", label: "Posting at least 3 times per week" },
      { id: "s4", label: "Responding to comments and messages within 24 hours" },
      { id: "s5", label: "Profile photos and cover images are professional" },
      { id: "s6", label: "Social media links are on your website" },
    ],
  },
  {
    title: "Content & Trust",
    items: [
      { id: "c1", label: "About page tells your story (not just what you do)" },
      { id: "c2", label: "Customer testimonials or reviews are displayed" },
      { id: "c3", label: "Photos are real (not just stock photos)" },
      { id: "c4", label: "Privacy policy page exists" },
      { id: "c5", label: "Content is free of spelling and grammar errors" },
      { id: "c6", label: "Blog or news section with recent posts" },
    ],
  },
  {
    title: "Local & Directories",
    items: [
      { id: "l1", label: "Listed on Yellow Pages NZ" },
      { id: "l2", label: "Listed on NoCowboys (if applicable)" },
      { id: "l3", label: "Listed on relevant industry directories" },
      { id: "l4", label: "Bing Places for Business is set up" },
      { id: "l5", label: "Apple Maps listing is claimed" },
    ],
  },
];

export default function DigitalChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = checked.size;
  const percentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="px-6 py-20">
      <FloatingBack href="/tools" label="Back to tools" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Digital Presence Checklist</h1>
        <p className="mt-3 text-[var(--muted)]">
          Go through each item. Check off what you already have. I&apos;ll help you see what&apos;s missing.
        </p>

        {/* Progress bar */}
        <div className="mt-8 p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Your progress</span>
            <span className="text-sm font-bold text-accent-600 dark:text-accent-500">{completedItems}/{totalItems} ({percentage}%)</span>
          </div>
          <div className="h-3 rounded-full bg-[var(--surface-hover)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-[var(--muted)]">
            {percentage === 100
              ? "Perfect score! Your online presence is solid."
              : percentage >= 70
                ? "Great foundation! A few more items will make a big difference."
                : percentage >= 40
                  ? "Decent start. Focus on the unchecked items to improve your visibility."
                  : "Plenty of room to grow. Start with Google Business and website basics."}
          </p>
        </div>

        {/* Categories */}
        <div className="mt-8 space-y-8">
          {categories.map((category) => {
            const catDone = category.items.filter((item) => checked.has(item.id)).length;
            return (
              <div key={category.title}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold">{category.title}</h2>
                  <span className="text-xs text-[var(--muted)]">{catDone}/{category.items.length}</span>
                </div>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        checked.has(item.id)
                          ? "border-success-500/30 bg-success-500/5"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-accent-500/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked.has(item.id)}
                        onChange={() => toggle(item.id)}
                        className="w-4 h-4 rounded accent-accent-500"
                      />
                      <span className={`text-sm ${checked.has(item.id) ? "line-through text-[var(--muted)]" : ""}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <WhatsAppCTA
          result={`Digital Checklist and completed ${completedItems}/${totalItems} items (${percentage}%)`}
        />
      </div>
    </div>
  );
}
