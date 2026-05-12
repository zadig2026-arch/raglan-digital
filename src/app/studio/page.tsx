import type { Metadata } from "next";
import Link from "next/link";
import { ProjectBriefForm } from "@/components/project-brief-form";

export const metadata: Metadata = {
  title: "Studio — start a bespoke web project",
  description:
    "Tell me about your project. I read every brief personally and reply within 48h on weekdays. Studio projects from NZ$1,250, scoped per project.",
  alternates: { canonical: "https://raglandigital.com/studio" },
};

export default function StudioPage() {
  return (
    <>
      <section className="px-6 pt-28 md:pt-40 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Studio · bespoke web work
          </p>
          <h1 className="text-display-xl">
            Tell me about your project.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            Studio projects start from <strong className="text-[var(--foreground)] font-medium">NZ$1,250</strong>{" "}
            and are scoped around what you actually need. France or Aotearoa NZ. I read
            every brief personally and reply within 48h on weekdays.
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Want a smaller second opinion first? The <Link href="/services" className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors">$49 Site Roast</Link> is a 15-minute teardown of your current site.
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6">
          <Pillar
            eyebrow="01"
            title="You own everything"
            body="Domain, hosting, code, content — all yours. No retainer required, no lock-in. If you ever want to leave, you take it all with you."
          />
          <Pillar
            eyebrow="02"
            title="Real numbers up front"
            body="Once I've read the brief, I send back a scope and a fixed quote. Not hourly billing. Not scope-creep invoices. Not retainer-or-no-deal."
          />
          <Pillar
            eyebrow="03"
            title="Built for the long run"
            body="Next.js + a CMS so you can edit text and photos yourself. Mobile-first, fast on Google, hosted on Vercel. Sites that hold up."
          />
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
            The brief
          </p>
          <h2 className="text-display-md md:text-display-lg">
            Send me yours.
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-2xl">
            The shorter and more honest, the better. I&apos;d rather understand your real constraint than read a polished spec.
          </p>

          <div className="mt-12">
            <ProjectBriefForm />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Other ways in
          </p>
          <h2 className="text-display-md">Not ready for a full brief?</h2>
          <p className="mt-5 text-[var(--muted)] max-w-xl mx-auto">
            See the work, send a quick message, or jump on WhatsApp.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="h-12 px-7 inline-flex items-center rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              Quick message
            </Link>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 inline-flex items-center rounded-full border border-[var(--border)] text-sm font-medium hover:bg-[var(--surface-hover)] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-accent-500 text-sm font-mono tabular-nums">{eyebrow}</p>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}
