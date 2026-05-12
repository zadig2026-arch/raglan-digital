import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send me a message about your project. Honest reply within 48h on weekdays.",
  alternates: { canonical: "https://raglandigital.com/contact" },
};

export default function ContactPage() {
  return (
    <section className="px-6 pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
          Contact
        </p>
        <h1 className="text-display-xl">Get in touch.</h1>
        <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
          A few honest sentences about what you&apos;re trying to build. I read every message personally and reply within 48h on weekdays.
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--border)] grid sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] font-medium mb-2">Email</p>
            <a href="mailto:zadig@raglandigital.com" className="hover:text-accent-500 transition-colors">
              zadig@raglandigital.com
            </a>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] font-medium mb-2">WhatsApp</p>
            <a
              href="https://wa.me/33752032213"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-500 transition-colors"
            >
              +33 7 52 03 22 13
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
