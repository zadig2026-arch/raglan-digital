"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitProjectBrief, type ProjectBriefState } from "@/app/actions/project-brief";

const initialState: ProjectBriefState = { success: false };

const inputClass =
  "w-full h-11 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors";
const selectClass = inputClass + " appearance-none cursor-pointer";
const labelClass = "block text-xs uppercase tracking-wider text-[var(--muted)] font-medium mb-2";

export function ProjectBriefForm() {
  const [state, formAction, isPending] = useActionState(submitProjectBrief, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.success, state.redirectTo, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="brief-name" className={labelClass}>
            Your name <span className="text-accent-500">*</span>
          </label>
          <input id="brief-name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="brief-email" className={labelClass}>
            Email <span className="text-accent-500">*</span>
          </label>
          <input id="brief-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="brief-business" className={labelClass}>
            Business / Organisation
          </label>
          <input id="brief-business" name="business" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="brief-city" className={labelClass}>
            City / Region
          </label>
          <input id="brief-city" name="city" type="text" className={inputClass} placeholder="Raglan, Royan, Paris…" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="brief-website" className={labelClass}>
            Existing website (if any)
          </label>
          <input id="brief-website" name="current_website" type="text" className={inputClass} placeholder="https://" />
        </div>
        <div>
          <label htmlFor="brief-phone" className={labelClass}>
            Phone (optional)
          </label>
          <input id="brief-phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="brief-project-type" className={labelClass}>
            Project type
          </label>
          <select id="brief-project-type" name="project_type" defaultValue="" className={selectClass}>
            <option value="" disabled>Choose one…</option>
            <option value="new-site">New site from scratch</option>
            <option value="refresh">Refresh / redesign</option>
            <option value="migration">Migration from Wix / Squarespace / WordPress</option>
            <option value="portfolio">Portfolio / showcase</option>
            <option value="ecommerce">E-commerce</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="brief-budget" className={labelClass}>
            Budget band (NZD)
          </label>
          <select id="brief-budget" name="budget_band" defaultValue="" className={selectClass}>
            <option value="" disabled>Choose one…</option>
            <option value="under-1.5k">Under $1,500</option>
            <option value="1.5k-3k">$1,500 – $3,000</option>
            <option value="3k-5k">$3,000 – $5,000</option>
            <option value="5k-plus">$5,000+</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="brief-timeline" className={labelClass}>
            Timeline
          </label>
          <select id="brief-timeline" name="timeline" defaultValue="" className={selectClass}>
            <option value="" disabled>Choose one…</option>
            <option value="asap">ASAP / within a month</option>
            <option value="1-3-months">1–3 months</option>
            <option value="3-6-months">3–6 months</option>
            <option value="exploring">Exploring / no rush</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Preferred language</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="language" value="en" defaultChecked className="w-4 h-4 accent-accent-500" />
            <span className="text-sm">English</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="language" value="fr" className="w-4 h-4 accent-accent-500" />
            <span className="text-sm">Français</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="brief-message" className={labelClass}>
          Tell me about the project <span className="text-accent-500">*</span>
        </label>
        <textarea
          id="brief-message"
          name="message"
          required
          rows={6}
          minLength={30}
          className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm focus:outline-none focus:border-accent-500 transition-colors resize-y"
          placeholder="What are you trying to make? Who is it for? What's the constraint that brought you here? Don't worry about polish — just real sentences."
        />
        <p className="mt-2 text-xs text-[var(--muted)]">
          A few honest sentences beat a polished spec. I read every one.
        </p>
      </div>

      {state.error && (
        <p className="text-sm text-red-500 dark:text-red-400">{state.error}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="h-12 px-7 inline-flex items-center justify-center rounded-full bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending…" : "Send the brief →"}
        </button>
        <p className="text-xs text-[var(--muted)]">
          I read every brief personally. Honest reply within 48h on weekdays.
        </p>
      </div>
    </form>
  );
}
