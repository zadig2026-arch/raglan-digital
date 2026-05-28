import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link
              href="/"
              className="brand"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              <span
                className="mark"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #5A7F86 0%, #82839E 60%, #A89FE3 100%)",
                }}
              />
              Raglan Digital
            </Link>
            <p
              style={{
                marginTop: 16,
                color: "var(--muted)",
                maxWidth: "32ch",
                fontSize: "14.5px",
                lineHeight: 1.55,
              }}
            >
              An AI agency that ships. Websites, custom tools, automations and AI agents.
            </p>
          </div>
          <div>
            <h5>Pages</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li><Link href="/#services">Websites &amp; web apps</Link></li>
              <li><Link href="/#services">Custom tools</Link></li>
              <li><Link href="/#services">Automation</Link></li>
              <li><Link href="/#services">AI agents</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:zadig@raglandigital.com">zadig@raglandigital.com</a></li>
              <li><a href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer">+33 7 52 03 22 13</a></li>
              <li><a href="https://instagram.com/raglandigital" target="_blank" rel="noopener noreferrer">@raglandigital</a></li>
            </ul>
          </div>
        </div>
        <div className="end">
          <div>© {new Date().getFullYear()} Raglan Digital. A focused team.</div>
        </div>
      </div>
    </footer>
  );
}
