"use client";

import { useEffect, useState } from "react";
import {
  CASES,
  STATUS_LABEL,
  STATUS_PILL_CLASS,
  type CaseCategory,
} from "@/lib/site-cases";
import { SiteRender } from "./site-render";

function ShowcaseCard({
  caseKey,
  delay,
  hidden,
  onOpen,
}: {
  caseKey: string;
  delay: number;
  hidden: boolean;
  onOpen: (key: string) => void;
}) {
  const c = CASES[caseKey];
  if (!c) return null;
  const pillClass = STATUS_PILL_CLASS[c.status];
  /* eslint-disable-next-line @next/next/no-img-element */
  const laptopScreen = c.shotDesktop ? <img src={c.shotDesktop} alt={`${c.title} — site preview`} loading="lazy" /> : <SiteRender kind={c.render} />;
  /* eslint-disable-next-line @next/next/no-img-element */
  const phoneScreen = c.shotMobile ? <img src={c.shotMobile} alt="" loading="lazy" /> : <SiteRender kind={c.render} />;
  return (
    <button
      type="button"
      className="showcase-card reveal"
      data-delay={delay}
      data-cat={c.category}
      onClick={() => onOpen(caseKey)}
      style={hidden ? { display: "none" } : undefined}
      aria-label={`Read case study — ${c.title}`}
    >
      <div className="showcase-stage">
        <div className="device laptop main">
          <div className="screen">{laptopScreen}</div>
          <div className="base" />
        </div>
        <div className="device phone">
          <div className="screen">{phoneScreen}</div>
        </div>
      </div>
      <div className="showcase-info">
        <div>
          <div className="name">{c.title}</div>
          <div className="blurb">{c.blurb}</div>
        </div>
        <span className={`pill${pillClass ? " " + pillClass : ""}`}>
          <span className="dot" />
          {STATUS_LABEL[c.status]}
        </span>
      </div>
    </button>
  );
}

function CaseModal({ caseKey, onClose }: { caseKey: string | null; onClose: () => void }) {
  const c = caseKey ? CASES[caseKey] : null;
  return (
    <div
      className={`modal-backdrop${caseKey ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className={`modal-banner ${c?.canvas ?? ""}`} />
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="modal-body">
          {c && (
            <>
              <div className="modal-tags">
                {c.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <h2>{c.title}</h2>
              <p className="modal-role">{c.role}</p>
              <div className="modal-section">
                <h4>The brief</h4>
                <p>{c.brief}</p>
              </div>
              {c.stack && c.stack.length > 0 && (
                <div className="modal-section">
                  <h4>Stack</h4>
                  <div className="modal-tags">
                    {c.stack.map((s) => (
                      <span className="tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {c.decisions && c.decisions.length > 0 && (
                <div className="modal-section">
                  <h4>Key decisions</h4>
                  <ul>
                    {c.decisions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {c.quote && (
                <div className="modal-quote">
                  &ldquo;{c.quote}&rdquo;
                  <span className="who">— {c.author}</span>
                </div>
              )}
              {c.url && (
                <div className="modal-section" style={{ marginTop: 28 }}>
                  <a className="btn btn-glass" href={c.url} target="_blank" rel="noopener noreferrer">
                    Visit live site<span className="btn-arrow" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ShowcaseGrid({
  order,
  activeFilter = "all",
}: {
  order: string[];
  activeFilter?: CaseCategory | "all";
}) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <>
      <div className="showcase-grid">
        {order.map((key, i) => {
          const c = CASES[key];
          const hidden = activeFilter !== "all" && c?.category !== activeFilter;
          return (
            <ShowcaseCard
              key={key}
              caseKey={key}
              delay={(i % 3) + 1}
              hidden={hidden}
              onOpen={setSelected}
            />
          );
        })}
      </div>
      <CaseModal caseKey={selected} onClose={() => setSelected(null)} />
    </>
  );
}
