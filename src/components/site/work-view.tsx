"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowcaseGrid } from "./showcase";
import { WaIcon } from "./wa-icon";
import { FILTERS, WORK_ORDER, type CaseCategory } from "@/lib/site-cases";

export function WorkView() {
  const [filter, setFilter] = useState<CaseCategory | "all">("all");

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow reveal">Work</div>
          <h1 className="reveal" data-delay="1">
            <span
              style={{
                background: "linear-gradient(135deg, #5A7F86 0%, #82839E 50%, #A89FE3 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Selected projects.
            </span>
          </h1>

          <div className="filter-bar reveal" data-delay="3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filter-btn${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="showcase-section" style={{ marginTop: 30 }}>
        <div className="wrap">
          <ShowcaseGrid order={WORK_ORDER} activeFilter={filter} />
        </div>
      </section>

      <section className="cta-section" style={{ padding: "80px 0 60px" }}>
        <div className="wrap">
          <div className="cta-card reveal" style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "60px 40px" }}>
            <div>
              <div className="eyebrow">Got something in mind?</div>
              <h2 className="h-section" style={{ margin: "14px auto 22px", maxWidth: "22ch" }}>
                Tell us about it. We&apos;ll reply within 48h.
              </h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <Link className="btn btn-primary sheen" href="/contact">
                  Start a project<span className="btn-arrow" />
                </Link>
                <a className="btn btn-wa" href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
