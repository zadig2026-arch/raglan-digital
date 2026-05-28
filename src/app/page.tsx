import Link from "next/link";
import { ShowcaseGrid } from "@/components/site/showcase";
import { BriefForm } from "@/components/site/brief-form";
import { HOME_ORDER } from "@/lib/site-cases";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow reveal">
                <span className="dot" /> Replying within 48h
              </div>
              <h1 className="h-display reveal" data-delay="1">
                Expert in <span className="accent">AI, websites</span> &amp; automation.
              </h1>
              <p className="lede hero-lede reveal" data-delay="2">
                Websites, custom tools, automations and AI agents — designed and shipped fast by
                our team. A focused crew. Fair fixed prices. You own everything.
              </p>
              <div className="hero-cta reveal" data-delay="3">
                <Link className="btn btn-primary sheen" href="/contact">
                  Start a project<span className="btn-arrow" />
                </Link>
                <Link className="btn btn-glass" href="#work">
                  See the work<span className="btn-arrow" />
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-pill reveal" data-delay="2">
                  <div className="val">
                    <span className="reveal" data-countup="48" data-suffix="h">0h</span>
                  </div>
                  <div className="lbl">Honest reply window</div>
                </div>
                <div className="stat-pill reveal" data-delay="3">
                  <div className="val">
                    <span className="reveal" data-countup="100" data-suffix="%">0%</span>
                  </div>
                  <div className="lbl">You own everything</div>
                </div>
              </div>
            </div>

            <div className="hero-orb reveal" data-delay="2" aria-hidden="true">
              <div className="stage" />
              <div className="orb-shape capsule-mint" />
              <div className="orb-shape capsule-coral" />
              <div className="orb-shape capsule-butter" />
              <div className="orb-shape dot-lavender" />
              <div className="orb-shape dot-sky" />
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="reveal">
              <div className="eyebrow">What we do</div>
              <h2 className="h-section" style={{ marginTop: 12 }}>
                From a brief on Monday<br />to a product that ships.
              </h2>
            </div>
            <p className="lede reveal" data-delay="1">
              Design, build, deploy — under one team, in one quote. No hand-offs to figure out.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card glass lift sheen s1 reveal" data-delay="1">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A3140" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="14" rx="3" />
                  <path d="M3 8h18" />
                  <circle cx="6.5" cy="6" r="0.5" fill="#2A3140" />
                  <circle cx="8.5" cy="6" r="0.5" fill="#2A3140" />
                </svg>
              </div>
              <div>
                <h3 className="h-card">Websites &amp; web apps</h3>
                <p>Fast, accessible, well-typed sites and apps. Editorial CMS so your team can publish without us.</p>
              </div>
            </div>
            <div className="service-card glass lift sheen s2 reveal" data-delay="2">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A3140" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="8" height="8" rx="2" />
                  <rect x="13" y="3" width="8" height="8" rx="2" />
                  <rect x="3" y="13" width="8" height="8" rx="2" />
                  <rect x="13" y="13" width="8" height="8" rx="2" />
                </svg>
              </div>
              <div>
                <h3 className="h-card">Custom tools &amp; dashboards</h3>
                <p>Internal tools that match how your team actually works — built around your data.</p>
              </div>
            </div>
            <div className="service-card glass lift sheen s3 reveal" data-delay="3">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A3140" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 1 1 0 8H8a4 4 0 0 1-4-4z" />
                  <circle cx="8" cy="12" r="1.5" fill="#2A3140" />
                </svg>
              </div>
              <div>
                <h3 className="h-card">Automation</h3>
                <p>n8n &amp; workflows that take the boring work off your desk.</p>
              </div>
            </div>
            <div className="service-card glass lift sheen s4 reveal" data-delay="4">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A3140" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <path d="M9 9h.01M15 9h.01" />
                  <path d="M7 19c0-2.5 2.2-4 5-4s5 1.5 5 4" />
                  <path d="M12 14v2" />
                </svg>
              </div>
              <div>
                <h3 className="h-card">AI agents &amp; assistants</h3>
                <p>Agents that read your data, follow your rules, and do the work — not just answer questions.</p>
              </div>
            </div>
            <div className="service-card glass lift sheen s5 reveal" data-delay="5">
              <div className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2A3140" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="h-card">AI integration &amp; advice</h3>
                <p>Honest scoping of what AI is genuinely good at for your business — and what isn&apos;t worth the spend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK — dark showcase */}
      <section id="work" className="showcase-section">
        <div className="wrap">
          <div className="section-head">
            <div className="reveal">
              <div className="eyebrow">Selected work</div>
              <h2 className="h-section" style={{ marginTop: 12 }}>
                Sites &amp; tools<br />
                <span className="accent">we&apos;ve shipped recently.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="btn btn-glass reveal"
              data-delay="1"
              style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#F5F6F8" }}
            >
              All work<span className="btn-arrow" />
            </Link>
          </div>
          <ShowcaseGrid order={HOME_ORDER} />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="reveal">
              <div className="eyebrow">How we work</div>
              <h2 className="h-section" style={{ marginTop: 12 }}>
                Five steps. No surprises.
              </h2>
            </div>
            <p className="lede reveal" data-delay="1">
              Fixed prices, written down upfront. No hourly billing, no scope-creep emails on a
              Friday afternoon.
            </p>
          </div>
          <div className="process">
            {[
              ["01", "You send a brief", "A paragraph is enough. Tell us what you want, who it's for, and roughly when."],
              ["02", "Honest reply within 48h", "If we can't help, we say so — and try to point you somewhere better."],
              ["03", "Scope & fixed quote", "One document, one price. No hourly meter ticking in the background."],
              ["04", "Design & build", "Clickable in days. You see real progress every few days, not at the end."],
              ["05", "Launch & hand over", "Code, domain, accounts, AI keys — all transferred. You own everything."],
            ].map(([num, title, body], i) => (
              <div className="step reveal" data-delay={i + 1} key={num}>
                <div className="num">{num}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="reveal">
              <div className="eyebrow">About · Manifesto</div>
              <h2 className="h-section" style={{ marginTop: 12 }}>
                Why we built<br />Raglan Digital.
              </h2>
            </div>
          </div>
          <div className="about-grid">
            <div className="about-card reveal">
              <div className="about-body">
                <p className="about-lead">
                  Most digital agencies still sell hours. You hand over a brief, they hand
                  over a vague quote, and somewhere in the middle the project drifts, the
                  bill grows, and the code ends up locked behind a retainer you never quite
                  agreed to.
                </p>
                <p>
                  We&apos;ve worked inside that model. We&apos;ve also seen what AI is doing
                  to it. One focused builder, with the right agents and tools, now ships
                  what used to take a team and a quarter. The agency model hasn&apos;t
                  caught up. So we rewrote it.
                </p>
                <p>
                  Raglan Digital is the agency we wanted to hire and couldn&apos;t find.
                  The person who scopes the work is the person who ships it. The price is
                  on the contract, written down once, before anything starts. Code, domain,
                  AI keys, accounts &mdash; yours from day one.
                </p>
                <p>
                  The work we do best is the work that barely existed a few years ago.
                  AI agents that pick up where SaaS stops. Internal tools that replace half
                  a job description. Websites that load before your visitor finishes
                  reading the headline. If you&apos;ve been burned by an agency, or quoted
                  six months for something we&apos;d ship in three weeks, talk to us first.
                </p>
              </div>
              <div className="about-sig">
                <div className="sig-mark">Z</div>
                <div>
                  <div className="sig-name">Zadig</div>
                  <div className="sig-role">Founder, Raglan Digital</div>
                </div>
              </div>
            </div>

            <div className="principles">
              {[
                ["Fixed prices, written down", "One scope, one price. No hourly billing surprises.", "mint"],
                ["You own everything", "Code, domain, accounts, AI keys — handed over on launch.", "lavender"],
                ["Honest reply within 48h", "Every brief gets a real answer — yes, no, or a referral.", "coral"],
              ].map(([title, body, tone], i) => (
                <div className={`principle reveal tone-${tone}`} data-delay={i + 1} key={title}>
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="copy">
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card reveal">
            <div>
              <div className="eyebrow">Start a project</div>
              <h2 className="h-section" style={{ marginTop: 14 }}>
                Send a brief.<br />We&apos;ll reply within 48h.
              </h2>
              <p className="lede" style={{ marginTop: 22 }}>
                A paragraph is enough. Tell us what you want, who it&apos;s for, and roughly when.
                We&apos;ll come back with an honest yes, no, or a referral.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a className="btn btn-glass" href="mailto:zadig@raglandigital.com">zadig@raglandigital.com</a>
                <a className="btn btn-glass" href="https://instagram.com/raglandigital" target="_blank" rel="noopener noreferrer">@raglandigital</a>
              </div>
            </div>
            <BriefForm />
          </div>
        </div>
      </section>
    </>
  );
}
