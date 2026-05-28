/* Service offerings — what Raglan Digital ships. */

export type CaseCategory = "web" | "automation" | "ai" | "tool";
export type CaseStatus = "live" | "progress" | "concept" | "active";

export interface CaseStudy {
  key: string;
  title: string;
  role: string;
  category: CaseCategory;
  canvas: string;
  tags: string[];
  brief: string;
  stack?: string[];
  decisions?: string[];
  quote?: string;
  author?: string;
  url?: string;
  render: string;
  shotDesktop?: string;
  shotMobile?: string;
  blurb: string;
  status: CaseStatus;
}

export const STATUS_LABEL: Record<CaseStatus, string> = {
  live: "Most popular",
  active: "Fast turnaround",
  progress: "Limited slots",
  concept: "Custom-built",
};

export const STATUS_PILL_CLASS: Record<CaseStatus, string> = {
  live: "live",
  active: "active",
  progress: "progress",
  concept: "concept",
};

export const CASES: Record<string, CaseStudy> = {
  website: {
    key: "website",
    title: "A site that converts",
    role: "Marketing site · CMS · from 7 days",
    category: "web",
    canvas: "canvas-website",
    tags: ["Marketing", "CMS", "Next.js"],
    brief:
      "Brand and marketing sites with sub-second mobile feel, a CMS your team actually uses, and the SEO baseline shipped on day one. Not a template. Not a Wix.",
    stack: ["Next.js", "Sanity CMS", "Vercel", "Edge runtime"],
    decisions: [
      "Sub-second Largest Contentful Paint on a real phone, not a lab test.",
      "CMS mapped to plain-language fields — a non-dev publishes a new page in a minute.",
      "Bilingual-ready (FR / EN) without a translator-in-the-loop.",
      "SEO baseline on launch: sitemap, OpenGraph, JSON-LD, Search Console verified.",
    ],
    render: "site",
    blurb: "Marketing site · CMS · from 7 days",
    status: "live",
  },
  webapp: {
    key: "webapp",
    title: "A custom web app",
    role: "Custom app · Auth · from 3 weeks",
    category: "web",
    canvas: "canvas-webapp",
    tags: ["Custom app", "Auth", "Database"],
    brief:
      "The bespoke app your team needs but cannot find off the shelf. Designed, built, deployed, and handed over end-to-end. Yours to extend the day it ships.",
    stack: ["Next.js", "Postgres", "Auth", "TypeScript"],
    decisions: [
      "Role-based access from day one. No 'we'll add it later'.",
      "Real database with backups and audit log. Not Airtable in disguise.",
      "Built around your actual workflow, not the one in the demo.",
      "No vendor lock. You own the code, the data, and the keys.",
    ],
    render: "app",
    blurb: "Web app · Auth + DB · from 3 weeks",
    status: "active",
  },
  automation: {
    key: "automation",
    title: "Workflows that run themselves",
    role: "Automation · n8n · from 2 weeks",
    category: "automation",
    canvas: "canvas-outreach",
    tags: ["n8n", "Webhooks", "Integrations"],
    brief:
      "The work that lives in spreadsheets, Slack threads, and your head — converted into a workflow that never forgets, never sleeps, and tells you when it breaks.",
    stack: ["n8n", "Webhooks", "Gmail / Slack API", "Schedulers"],
    decisions: [
      "Multi-step flows with retries, dead-letter queue, and full replay.",
      "Scheduled or event-driven. Both, if it makes sense for the job.",
      "Observability built-in: every run logged, every failure surfaced.",
      "Stop relying on Zaps stitched together and one fragile spreadsheet formula.",
    ],
    render: "outreach",
    blurb: "Workflow automation · from 2 weeks",
    status: "active",
  },
  ai: {
    key: "ai",
    title: "An AI agent on your payroll",
    role: "AI agent · Custom · from 3 weeks",
    category: "ai",
    canvas: "canvas-ai",
    tags: ["AI", "Claude", "Function calling"],
    brief:
      "A digital coworker that drafts your replies, qualifies your leads, triages your support, or writes your specs — at 3am, on Sundays, without coffee. Tools, memory, evals included.",
    stack: ["Claude / GPT", "Vector DB", "Function calling", "Eval pipeline"],
    decisions: [
      "Trained on your data, your voice, your edge cases. Generic chatbots banned.",
      "Tools and function calling so it actually does work, not just replies.",
      "Memory that compounds. Yesterday's conversation informs tomorrow's.",
      "Evals from day one. We measure quality. You don't guess.",
    ],
    render: "ai",
    blurb: "AI agent · Custom-built · from 3 weeks",
    status: "concept",
  },
  tool: {
    key: "tool",
    title: "One pane of glass",
    role: "Internal tool · Dashboard · from 10 days",
    category: "tool",
    canvas: "canvas-control",
    tags: ["Dashboard", "Internal", "Real-time"],
    brief:
      "The Notion-Slack-spreadsheet mess replaced by an interface built for exactly how you work. One pane of glass. Less tab juggling. More decisions.",
    stack: ["Next.js", "Postgres", "Tailwind", "Charts"],
    decisions: [
      "Sortable, filterable, real-time. The basics, done right.",
      "One-click actions on the things you do every day. Not buried in submenus.",
      "Role-based access so the right people see the right things.",
      "Alerts before things go bad, not after the customer notices.",
    ],
    render: "control",
    blurb: "Internal tool · from 10 days",
    status: "active",
  },
  audit: {
    key: "audit",
    title: "An audit, a plan, a fix",
    role: "Audit · Migration · from 3 days",
    category: "web",
    canvas: "canvas-audit",
    tags: ["Audit", "Migration", "Performance"],
    brief:
      "Your site or app, opened up. Performance, SEO, accessibility, code health. You get a plain-English report, a prioritised fix list, and a quote for whatever you want us to fix.",
    stack: ["Lighthouse", "Real device perf", "Code review", "GSC"],
    decisions: [
      "Concrete: 'your LCP is 3.2s, here's the 3 things that fix it.' Not 'consider optimising.'",
      "Stack-agnostic. WordPress, Wix, Webflow, Next, Rails — we audit it.",
      "Plain English. No 'CLS' and 'TTFB' without explanation.",
      "You get the report whether or not we do the fix. No hostage taking.",
    ],
    render: "report",
    blurb: "Audit + roadmap · from 3 days",
    status: "live",
  },
};

export const WORK_ORDER = ["website", "webapp", "automation", "ai", "tool", "audit"];
export const HOME_ORDER = ["website", "webapp", "automation", "ai", "tool", "audit"];

export const FILTERS: { key: CaseCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "automation", label: "Automation" },
  { key: "ai", label: "AI" },
  { key: "tool", label: "Tools" },
];
