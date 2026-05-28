"use client";

import type { ReactNode } from "react";

interface Service {
  number: string;
  tone: "lavender" | "mint" | "dark";
  title: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
}

function WindowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" />
      <circle cx="9" cy="6.5" r="0.6" fill="currentColor" />
      <circle cx="11.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
      <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L13.6 9.4 L20 11 L13.6 12.6 L12 19 L10.4 12.6 L4 11 L10.4 9.4 Z" fill="currentColor" />
      <path d="M18 4 L18.6 5.8 L20.4 6.4 L18.6 7 L18 8.8 L17.4 7 L15.6 6.4 L17.4 5.8 Z" fill="currentColor" />
    </svg>
  );
}

const SERVICES: Service[] = [
  {
    number: "01",
    tone: "lavender",
    title: "Custom websites",
    description:
      "Marketing sites, landing pages, e-commerce, platforms. Fast, focused, built to convert and last. No generic templates, no plugins that rot.",
    bullets: [
      "Bespoke design, never a template",
      "Performance and SEO baked in",
      "A CMS your team actually uses",
      "Hosting and maintenance handled",
    ],
    icon: <WindowIcon />,
  },
  {
    number: "02",
    tone: "mint",
    title: "Custom internal tools",
    description:
      "Dashboards, automations, integrations between your existing tools. The goal: your team spends less time on repetitive work, more on what matters.",
    bullets: [
      "Dashboards and admin panels",
      "API integrations (Stripe, Notion, Google…)",
      "Automations (n8n, Make, scripts)",
      "Team training included",
    ],
    icon: <SlidersIcon />,
  },
  {
    number: "03",
    tone: "dark",
    title: "Applied AI solutions",
    description:
      "AI agents, chatbots, LLM integrations inside your processes. AI that solves real business problems, not pretty homepage decoration.",
    bullets: [
      "Automated AI agents",
      "Smart chatbots for your site",
      "Custom content generation",
      "AI audit of your current processes",
    ],
    icon: <SparklesIcon />,
  },
];

export function ServiceTrio() {
  return (
    <div className="service-trio">
      {SERVICES.map((s, i) => (
        <article
          key={s.number}
          className={`service-card-big tone-${s.tone} reveal`}
          data-delay={(i % 3) + 1}
        >
          <span className="br br-tl" aria-hidden="true" />
          <span className="br br-tr" aria-hidden="true" />
          <span className="br br-bl" aria-hidden="true" />
          <span className="br br-br" aria-hidden="true" />

          <header className="service-card-head">
            <span className="service-num">{s.number}</span>
            <span className="service-icon-box" aria-hidden="true">
              {s.icon}
            </span>
          </header>

          <div className="service-card-body">
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.description}</p>
          </div>

          <ul className="service-bullets">
            {s.bullets.map((b) => (
              <li key={b}>
                <span className="bullet-dot" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
