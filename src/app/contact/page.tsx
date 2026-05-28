import type { Metadata } from "next";
import { BriefForm } from "@/components/site/brief-form";
import { WaIcon } from "@/components/site/wa-icon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Raglan Digital a brief. Honest reply within 48h.",
  alternates: { canonical: "https://raglandigital.com/contact" },
};

const faqs: [string, string][] = [
  ["How do prices work?", "Once we agree on scope, we send a fixed quote. One document, one price. No hourly meter."],
  ["How fast can you ship?", "Clickable in days for most websites and tools. Full launches usually 2–6 weeks depending on scope."],
  ["What does “you own everything” mean?", "Code, repo, domain, hosting, accounts, AI keys — all in your name from the start, or transferred on launch."],
  ["Do you do retainers?", "After launch, yes — small monthly arrangements for ongoing improvements and support. Always optional."],
];

export default function ContactPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow reveal">Contact</div>
          <h1 className="reveal" data-delay="1">
            Send us a brief.<br />
            <span
              style={{
                background: "linear-gradient(135deg, #5A7F86 0%, #82839E 50%, #A89FE3 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              We reply within 48h.
            </span>
          </h1>
          <p className="lede reveal" data-delay="2">
            A paragraph is enough. Tell us what you want, who it&apos;s for, and roughly when. We
            come back with an honest yes, no, or a referral.
          </p>

          <div className="contact-grid">
            <div className="contact-form-card reveal" data-delay="2">
              <BriefForm withLabels />
            </div>

            <aside className="contact-side reveal" data-delay="3">
              <a className="contact-tile" href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer">
                <div className="ico-lg wa">
                  <WaIcon size={26} />
                </div>
                <div>
                  <div className="ttl">WhatsApp</div>
                  <div className="val">+33 7 52 03 22 13</div>
                </div>
              </a>
              <a className="contact-tile" href="mailto:zadig@raglandigital.com">
                <div className="ico-lg mail">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <div className="ttl">Email</div>
                  <div className="val">zadig@raglandigital.com</div>
                </div>
              </a>
              <a className="contact-tile" href="https://instagram.com/raglandigital" target="_blank" rel="noopener noreferrer">
                <div className="ico-lg ig">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="ttl">Instagram</div>
                  <div className="val">@raglandigital</div>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </header>

      <section className="section section--tight" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="section-head">
            <div className="reveal">
              <div className="eyebrow">Common questions</div>
              <h2 className="h-section" style={{ marginTop: 12 }}>
                Before you write.
              </h2>
            </div>
          </div>
          <div className="faq-grid">
            {faqs.map(([q, a]) => (
              <div className="glass faq-card" key={q}>
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
