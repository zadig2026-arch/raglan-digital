"use client";

import Link from "next/link";
import { ServiceTrio } from "./service-trio";
import { WaIcon } from "./wa-icon";

export function WorkView() {
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
              What we build.
            </span>
          </h1>
          <p className="lede reveal" data-delay="2">
            Three categories. Every project we ship fits one of them. Pick the
            one that sounds like yours.
          </p>
        </div>
      </header>

      <section className="trio-section">
        <div className="wrap">
          <ServiceTrio />
        </div>
      </section>

      <section className="cta-section" style={{ padding: "80px 0 60px" }}>
        <div className="wrap">
          <div
            className="cta-card reveal"
            style={{ gridTemplateColumns: "1fr", textAlign: "center", padding: "60px 40px" }}
          >
            <div>
              <div className="eyebrow">Got something in mind?</div>
              <h2 className="h-section" style={{ margin: "14px auto 22px", maxWidth: "22ch" }}>
                Tell us about it. We&apos;ll reply within 48h.
              </h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <Link className="btn btn-primary sheen" href="/contact">
                  Start a project<span className="btn-arrow" />
                </Link>
                <a
                  className="btn btn-wa"
                  href="https://wa.me/33752032213"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
