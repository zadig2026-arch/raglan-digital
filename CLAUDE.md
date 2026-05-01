# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- **Next.js 16.2.3** (App Router) + **React 19.2** + **TypeScript 5** + **Tailwind v4**
- **Neon Postgres** (`@neondatabase/serverless`) for the lead funnel — provisioned via Vercel Marketplace, schema lives in `src/lib/db/schema.sql`
- **Resend** for transactional email (lead notifications + future nurture sequences)
- **Framer Motion** + **Lenis** for animations / smooth scroll
- **MDX** for blog and "bible" article content (`@next/mdx` + `gray-matter`)

⚠️ See `AGENTS.md` — Next.js 16 has breaking changes vs. older training data. When unsure about a Next API, read `node_modules/next/dist/docs/` first. In particular: `middleware.ts` is renamed `proxy.ts`, route segment config (`dynamic`, `revalidate`, `fetchCache`) is replaced by `'use cache'` + `cacheLife()`, edge runtime is unsupported with Cache Components.

## Commands

```bash
npm run dev              # next dev — local dev server (port 3000, Turbopack)
npm run build            # next build
npm run start            # next start — production server (after build)
npm run lint             # eslint

# Database (one-shot scripts, run from repo root after `vercel env pull`)
node scripts/db/init.mjs   # apply src/lib/db/schema.sql to Neon (idempotent)
node scripts/db/smoke.mjs  # insert+select+cleanup smoke test
```

No test runner is configured. To validate changes, type-check (`npx tsc --noEmit`), then `npm run dev` and exercise the flow end-to-end.

## Architecture — the big picture

This repo is **two co-located products**:

### 1. Marketing site (Next.js App Router) — `src/`

**Routes**: `src/app/**/page.tsx` — homepage, services, `/launch` ($399 offer), `/free-website` (legacy free-site pitch), `/about`, tools (SEO audit, speed checker, meta generator, digital checklist), `/start` (4-track quiz), blog, "bible" articles, mockup gallery, individual `preview/<slug>` pages.

**Server Actions** in `src/app/actions/` — `leads.ts` (the unified entry point), `contact.ts` (thin wrapper that delegates to `captureLead`), `seo-audit.ts`, `speed-check.ts`. **All funnel writes go through `captureLead` in `leads.ts`**, never directly through DB queries from a form.

**Routing Middleware**: `src/proxy.ts` (NOT `src/middleware.ts` — that file convention is deprecated in Next.js 16). Reads UTM params + external referrer on first visit and stamps an `rd_attr` attribution cookie (90-day TTL). `captureLead` later reads it via `cookies()` to attribute conversions. Helpers: `src/lib/attribution.ts`.

### 2. Cold-outreach system — `scripts/cold-outreach/` (lives outside the Next app)

Google Apps Script bound to a Google Sheet. Reads prospects, sends personalized emails via Gmail (`raglandigital@gmail.com`), runs follow-ups, detects replies. Files: `Code.gs` (orchestration), `Templates.gs` (email copy), `sheet-schema.md`, `seed/prospects.csv`. Setup is in `scripts/cold-outreach/README.md`.

### Prospect pipeline (markdown is the source of truth)

`PROSPECTS.md`, `PROSPECTS-v2.md`, `PROSPECTS-v3.md` at the repo root are versioned waves of NZ small-business leads (with verified web problems → "free site" pitch). When sourcing new prospects, **always cross-check against all existing PROSPECTS\*.md files to avoid duplicates** and require binary technical proof of the web problem (HTTP code, DNS NXDOMAIN, verbatim placeholder text, expired SSL) — empty/aesthetic critiques aren't enough.

## The funnel infrastructure (read this before touching forms or pricing)

The site is being transformed into a sales funnel. Several pieces are interlocked:

**`captureLead` (`src/app/actions/leads.ts`)** is the only entry point for capturing a lead. It handles: email validation → upsert by email (citext, dedup) → score recompute → status transition → event log → sequence trigger → internal Resend notification → returns `{ ok, redirectTo, leadId }`. Hot leads (score ≥ 80) get a `[HOT]` subject line.

**Lead scoring (`src/lib/lead-score.ts`)** is a pure function — no I/O, fully testable. It rewards business email domains (non-freemail), NZ cities, urgency signals, qualified events. Status thresholds: ≥80 → `hot`, ≥50 → `qualified`, ≥1 → `nurturing`. Status transitions are one-way for terminal states (`won`, `lost`, `unsubscribed`, `booked`).

**DB layer (`src/lib/db.ts` + `src/lib/db/queries.ts`)**: thin SQL via Neon HTTP driver. `db.ts` returns a Proxy that throws with a clear "Install Neon via Vercel Marketplace" message if `DATABASE_URL` is missing — so the app boots in dev without a DB but any actual query fails fast. Tables: `leads`, `lead_events` (append-only audit), `sequences_state` (per-lead workflow position), `site_orders` (Stripe-backed purchases), `launch_spots` (monthly capacity for `/launch` scarcity counter, seeded by `init.mjs`, reset by future cron).

**Pricing (`src/lib/pricing.ts`) is the single source of truth**. Six plans: `roast-49`, `launch-399`, `growth-1490`, `care-129`, `seo-349`, `social-590`. Each has a `stripeEnvVar` (e.g. `STRIPE_LINK_LAUNCH_399`) — `getStripeLink(plan)` returns the env var's URL or `null`, in which case `PricingBlock` falls back to `/launch` or `/contact`. **Never hard-code prices in components or pages** — import from `pricing.ts`.

**Attribution** flows: `proxy.ts` sets `rd_attr` cookie on first external visit → `captureLead` reads it via `cookies()` → stored on the lead row in `utm` and `referrer` columns. UTM keys captured: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.

## Homepage architecture — Server / Client split

`src/app/page.tsx` is a Server Component that composes everything. The Apple-styled animated sections live in `src/components/axes/apple.tsx` (a single `"use client"` file that exports `AppleHero`, `AppleStickyShowcase`, `AppleDiagnostic`, `AppleStats`, `AppleCta`, `AppleWho` individually so the server-side `page.tsx` can interleave them with Server Components).

**Server Components on the homepage** (read DB / cache-friendly):
- `home/trust-strip.tsx` — wraps `<SpotsCounter variant="badge" />` in `<Suspense>`
- `home/social-proof.tsx` — currently static, will switch to Sanity later
- `value-prop-bento.tsx`, `process-timeline.tsx` — pure presentational
- `pricing-block.tsx` — reads from `pricing.ts`, contains nested `<Suspense>` for spots counter on the Launch tier
- `spots-counter.tsx` — async server component, reads `launch_spots` via `getLaunchSpotsLeft()`. Has a `safeGetSpots` fallback so a DB outage hides the counter rather than 500ing the page.

When adding a new home section, default to a Server Component. Only opt into `"use client"` if you genuinely need state, effects, or framer-motion.

### Two preview-page mechanisms (don't confuse them)

- **Dynamic Next pages**: `src/app/preview/<slug>/page.tsx` — full React with shared components, used for new mockups.
- **Static HTML**: `public/preview/<slug>/index.html` — pre-built mockups served from `public/`. Clean URLs are wired in `next.config.ts` `rewrites()` (e.g. `/preview/ms-sewing-station` → `/preview/ms-sewing-station/index.html`). When adding a new static preview, add the rewrite pair too.

## Conventions worth knowing

- **Path alias**: `@/*` → `src/*` (see `tsconfig.json`).
- **Email accounts** (don't mix them up):
  - `zadig@raglandigital.com` — recipient of internal lead notifications + public contact address
  - `noreply@raglandigital.com` — Resend `from:` for transactional sends
  - `raglandigital@gmail.com` — separate Gmail account used by the cold-outreach Apps Script only
- **Tailwind v4 dark mode**: configured via `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`. Without that, `dark:` classes follow the OS `prefers-color-scheme` and conflict with the manual `ThemeProvider` toggle. If you add new dark variants and they don't apply, check that line is intact.
- **Security headers** are set globally in `next.config.ts` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, restrictive `Permissions-Policy`). Don't duplicate per-route.
- **NZ legal compliance** (UEM Act 2007): every cold-outreach email must include sender ID + opt-out. Templates in `scripts/cold-outreach/Templates.gs` already do this — preserve when editing. The same goes for nurture sequences (when implemented): only send marketing email to leads with `consent_marketing = true`.
- **Project language**: business docs, prospect notes, and outreach copy are in **French**. Code, identifiers, and commit messages are English.
- **WhatsApp number** in floating CTA / contact / launch pages is `+33` (intentional — the user's working number). Don't "fix" it to a NZ number unless explicitly asked.
