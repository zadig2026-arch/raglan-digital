import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="eyebrow">404</div>
        <h1 className="h-display" style={{ marginTop: 12, fontSize: "clamp(40px, 6vw, 80px)" }}>
          <span className="accent">Page not found.</span>
        </h1>
        <p className="lede" style={{ margin: "20px auto 0" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link className="btn btn-primary sheen" href="/">
            Back home<span className="btn-arrow" />
          </Link>
          <Link className="btn btn-glass" href="/contact">
            Get in touch<span className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
