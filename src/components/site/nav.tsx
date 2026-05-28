"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();
  const onWork = pathname?.startsWith("/work");
  const onContact = pathname?.startsWith("/contact");

  return (
    <nav className="nav glass">
      <Link href="/" className="brand">
        <span className="mark" aria-hidden="true">
          <span className="mark-stage" />
          <span className="mark-shape mark-mint" />
          <span className="mark-shape mark-coral" />
          <span className="mark-shape mark-butter" />
          <span className="mark-shape mark-lavender" />
        </span>
        <span>Raglan Digital</span>
      </Link>
      <div className="links">
        <Link href="/#services" data-section="services">
          Services
        </Link>
        <Link href="/work" className={onWork ? "active" : undefined} data-section="work">
          Work
        </Link>
        <Link href="/#process" data-section="process">
          Process
        </Link>
        <Link href="/#about" data-section="about">
          About
        </Link>
        <Link href="/contact" className={`btn btn-primary cta${onContact ? " active" : ""}`}>
          Start a project<span className="btn-arrow" />
        </Link>
      </div>
    </nav>
  );
}
