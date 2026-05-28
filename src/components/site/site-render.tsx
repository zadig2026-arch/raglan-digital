/* Site render templates — one per project. Same markup at laptop and phone scale
   (CSS container queries + .phone overrides handle responsive). Ported from renders.js. */

import type { ReactElement } from "react";

const renders: Record<string, ReactElement> = {
  site: (
    <div className="render render-site">
      <div className="top">
        <div className="brand">
          <span className="brand-dot" />
          Northwind
        </div>
        <div className="nav">
          <span>Product</span>
          <span>Customers</span>
          <span>Pricing</span>
          <span className="nav-cta">Get started</span>
        </div>
      </div>
      <div className="body">
        <div className="hero-left">
          <div className="pill">New · v2.4 shipped</div>
          <h1>Operations,<br />in one place.</h1>
          <p>One tool replaces the spreadsheet, the Slack thread, and the daily check-in.</p>
          <div className="cta-row">
            <div className="cta cta-primary">Start free <span className="arrow" /></div>
            <div className="cta cta-ghost">See demo</div>
          </div>
        </div>
        <div className="hero-right">
          <div className="card-stack c1">
            <div className="card-bar" />
            <div className="card-line" />
            <div className="card-line short" />
          </div>
          <div className="card-stack c2">
            <div className="card-bar accent" />
            <div className="card-line" />
            <div className="card-line short" />
          </div>
          <div className="card-stack c3">
            <div className="card-bar" />
            <div className="card-line" />
          </div>
        </div>
      </div>
      <div className="logos">
        <span>ACME</span>
        <span>FIRST CO</span>
        <span>NORTH ▽</span>
        <span>kindred</span>
        <span>VAULT</span>
      </div>
    </div>
  ),
  app: (
    <div className="render render-app">
      <div className="app-sidebar">
        <div className="app-brand">
          <span className="app-brand-dot" />
          <span className="app-brand-name">Console</span>
        </div>
        <div className="app-nav-item active"><span className="ic" />Overview</div>
        <div className="app-nav-item"><span className="ic" />Customers</div>
        <div className="app-nav-item"><span className="ic" />Invoices</div>
        <div className="app-nav-item"><span className="ic" />Reports</div>
        <div className="app-nav-item"><span className="ic" />Settings</div>
      </div>
      <div className="app-main">
        <div className="app-topbar">
          <div className="app-crumbs">Overview <span>›</span> This week</div>
          <div className="app-user">
            <span className="app-avatar" />
          </div>
        </div>
        <div className="app-stats">
          <div className="app-stat">
            <div className="lbl">Active users</div>
            <div className="val">1,284</div>
            <div className="delta up">+12.4%</div>
          </div>
          <div className="app-stat">
            <div className="lbl">Revenue (MTD)</div>
            <div className="val">$48.2k</div>
            <div className="delta up">+8.1%</div>
          </div>
          <div className="app-stat">
            <div className="lbl">Churn</div>
            <div className="val">1.8%</div>
            <div className="delta down">-0.3%</div>
          </div>
        </div>
        <div className="app-chart">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M 0 24 L 12 20 L 24 22 L 36 14 L 48 16 L 60 8 L 72 11 L 84 5 L 100 6" stroke="rgba(168,159,227,0.85)" strokeWidth="0.6" fill="none" />
            <path d="M 0 24 L 12 20 L 24 22 L 36 14 L 48 16 L 60 8 L 72 11 L 84 5 L 100 6 L 100 30 L 0 30 Z" fill="rgba(168,159,227,0.12)" />
          </svg>
        </div>
        <div className="app-table">
          <div className="row head"><span>Customer</span><span>Plan</span><span>MRR</span><span>Status</span></div>
          <div className="row"><span>Acme Inc.</span><span>Pro</span><span>$890</span><span className="badge ok">Active</span></div>
          <div className="row"><span>First Co.</span><span>Starter</span><span>$190</span><span className="badge ok">Active</span></div>
          <div className="row"><span>Vault Labs</span><span>Pro</span><span>$890</span><span className="badge warn">Past due</span></div>
        </div>
      </div>
    </div>
  ),
  report: (
    <div className="render render-report">
      <div className="report-top">
        <div className="report-target">
          <div className="report-favicon" />
          <div>
            <div className="report-domain">acme-store.com</div>
            <div className="report-meta">Audited 28 May · Mobile · Real device</div>
          </div>
        </div>
        <div className="report-grade">B+</div>
      </div>
      <div className="report-scores">
        <div className="score">
          <svg viewBox="0 0 36 36" className="score-ring">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.4" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7BBF9C" strokeWidth="2.4" strokeDasharray="92 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <div className="score-num">92</div>
          <div className="score-lbl">Performance</div>
        </div>
        <div className="score">
          <svg viewBox="0 0 36 36" className="score-ring">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.4" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F0C760" strokeWidth="2.4" strokeDasharray="74 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <div className="score-num">74</div>
          <div className="score-lbl">SEO</div>
        </div>
        <div className="score">
          <svg viewBox="0 0 36 36" className="score-ring">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.4" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#A89FE3" strokeWidth="2.4" strokeDasharray="88 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <div className="score-num">88</div>
          <div className="score-lbl">A11y</div>
        </div>
        <div className="score">
          <svg viewBox="0 0 36 36" className="score-ring">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.4" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EE9F7F" strokeWidth="2.4" strokeDasharray="61 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <div className="score-num">61</div>
          <div className="score-lbl">Best pract.</div>
        </div>
      </div>
      <div className="report-findings">
        <div className="finding-head">Top issues · 3 to fix</div>
        <div className="finding">
          <span className="prio p1">P1</span>
          <span className="finding-text">Hero image 1.2MB unoptimized · LCP 3.2s</span>
          <span className="finding-fix">~2h</span>
        </div>
        <div className="finding">
          <span className="prio p2">P2</span>
          <span className="finding-text">No meta description on 14 pages</span>
          <span className="finding-fix">~1h</span>
        </div>
        <div className="finding">
          <span className="prio p3">P3</span>
          <span className="finding-text">Heading hierarchy broken on /about</span>
          <span className="finding-fix">~30m</span>
        </div>
      </div>
    </div>
  ),
  peintres: (
    <div className="render render-peintres">
      <div className="top">
        <div className="brand">Les Peintres de Royan</div>
        <div className="nav">
          <span>Œuvres</span>
          <span>Artistes</span>
          <span>Expositions</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="hero">
        <div>
          <h1>
            Les couleurs<br />de la côte<br />atlantique.
          </h1>
          <p className="sub">Un collectif de peintres entre Royan et l&apos;estuaire.</p>
        </div>
        <div className="gallery">
          <div className="g1" />
          <div className="g2" />
          <div className="g3" />
          <div className="g4" />
        </div>
      </div>
    </div>
  ),
  flow: (
    <div className="render render-flow">
      <div className="top">
        <div className="brand">Flow</div>
        <div className="nav">
          <span>About</span>
          <span>Sessions</span>
          <span>Journal</span>
          <span>Book</span>
        </div>
      </div>
      <div className="body">
        <div>
          <h1>
            Slow down.<br />Tune in.
          </h1>
          <p>Bodywork, breathwork &amp; energy healing in Raglan, Aotearoa.</p>
          <div className="cta">Book a session</div>
        </div>
        <div className="img-circle" />
      </div>
    </div>
  ),
  gppr: (
    <div className="render render-gppr">
      <div className="top">
        <div className="brand">GPPR</div>
        <div className="nav">
          <span className="active">Galerie</span>
          <span>Sorties</span>
          <span>Actualités</span>
          <span>Membres</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="grid">
        <div className="p1" />
        <div className="p2" />
        <div className="p3" />
        <div className="p4" />
        <div className="p5" />
        <div className="p6" />
        <div className="p7" />
        <div className="p8" />
      </div>
    </div>
  ),
  outreach: (
    <div className="render render-outreach">
      <div className="top">
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
        <div className="title">outreach-engine · n8n</div>
      </div>
      <div className="canvas">
        <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 18 16 L 38 16" stroke="rgba(123,191,156,0.4)" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
          <path d="M 56 16 L 76 16" stroke="rgba(168,159,227,0.4)" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
          <path d="M 36 22 Q 30 50 30 78" stroke="rgba(168,159,227,0.4)" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
          <path d="M 60 22 Q 65 50 65 78" stroke="rgba(240,199,96,0.4)" strokeWidth="0.3" fill="none" strokeDasharray="1 1" />
        </svg>
        <div className="node n1"><div className="ico" /><div className="label">Sheet<span className="sub">read leads</span></div></div>
        <div className="node n2"><div className="ico" /><div className="label">AI draft<span className="sub">personalize</span></div></div>
        <div className="node n3"><div className="ico" /><div className="label">Throttle<span className="sub">delay</span></div></div>
        <div className="node n4"><div className="ico" /><div className="label">Gmail<span className="sub">send</span></div></div>
        <div className="node n5"><div className="ico" /><div className="label">Follow-up<span className="sub">+3d</span></div></div>
      </div>
    </div>
  ),
  control: (
    <div className="render render-control">
      <div className="sidebar">
        <div className="brand">Studio</div>
        <div className="item active">Repos</div>
        <div className="item">Deploys</div>
        <div className="item">Disk</div>
        <div className="item">Logs</div>
      </div>
      <div className="main">
        <h1>All repos</h1>
        <div className="row r1">
          <div className="dot" />
          <div className="name">raglan-website</div>
          <div className="meta">main · clean</div>
          <div className="meta">2h ago</div>
          <div className="rbtn">Deployed</div>
        </div>
        <div className="row r2">
          <div className="dot" />
          <div className="name">flow-healing</div>
          <div className="meta">dev · 3 files</div>
          <div className="meta">12m ago</div>
          <div className="rbtn">Push</div>
        </div>
        <div className="row r3">
          <div className="dot" />
          <div className="name">outreach-engine</div>
          <div className="meta">main · clean</div>
          <div className="meta">5h ago</div>
          <div className="rbtn">Deployed</div>
        </div>
        <div className="row r4">
          <div className="dot" />
          <div className="name">peintres-royan</div>
          <div className="meta">main · 1 file</div>
          <div className="meta">1d ago</div>
          <div className="rbtn">Push</div>
        </div>
        <div className="row r5">
          <div className="dot" />
          <div className="name">gppr-photographes</div>
          <div className="meta">main · clean</div>
          <div className="meta">3d ago</div>
          <div className="rbtn">Deployed</div>
        </div>
      </div>
    </div>
  ),
  ai: (
    <div className="render render-ai">
      <div className="top">
        <div className="dots">
          <span />
          <span />
          <span />
        </div>
        <div className="title">agent · v2.1 · live</div>
      </div>
      <div className="thread">
        <div className="msg msg-in">
          <div className="avatar a-user">Z</div>
          <div className="bubble">Qualify this lead and draft a follow-up.</div>
        </div>
        <div className="msg msg-out">
          <div className="avatar a-agent" />
          <div className="bubble">
            <div className="line">Pulled 4 signals: NZ business, recent funding, web stack outdated, 80+ employees.</div>
            <div className="tools">
              <span className="tool">apollo.search</span>
              <span className="tool">gmail.draft</span>
            </div>
          </div>
        </div>
        <div className="msg msg-in">
          <div className="avatar a-user">Z</div>
          <div className="bubble bubble-short">Send it.</div>
        </div>
        <div className="msg msg-out">
          <div className="avatar a-agent" />
          <div className="bubble bubble-status">
            <span className="dot live" /> Sent. Tracking reply in inbox.
          </div>
        </div>
      </div>
      <div className="composer">
        <div className="composer-text">Ask the agent…</div>
        <div className="composer-send" />
      </div>
    </div>
  ),
};

export function SiteRender({ kind }: { kind: string }) {
  return renders[kind] ?? null;
}
