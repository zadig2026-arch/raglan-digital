"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-hand text-2xl text-accent-500 mb-2">About</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            I&apos;m Zag. I help you get found online.
          </h1>

          <div className="mt-10 flex justify-center">
            <div className="w-48 h-60 rounded-2xl overflow-hidden">
              <Image
                src="/images/zag.png"
                alt="Zag"
                width={192}
                height={240}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-10 space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              I spent years at a digital agency in France. I built websites, ran SEO campaigns,
              managed social media — for businesses of all sizes. I know what actually works online,
              and what&apos;s just expensive noise.
            </p>
            <p>
              Then I moved to New Zealand. And I saw the same thing everywhere: small businesses
              paying $5,000+ for a basic website. Or stuck with a DIY page that didn&apos;t match
              how good their actual work is.
            </p>
            <p className="text-[var(--foreground)] font-medium">
              So I built Scale with Zag. You get one person who does this really well,
              at a price that makes sense, with no middlemen.
            </p>
            <p>
              I also built a set of tools you can run on your website right now — they&apos;ll show you
              your SEO score, your speed, your meta tags, and everything that&apos;s missing from
              your online presence. No sign-up needed.
            </p>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <h2 className="font-bold text-lg">What you get when you work with me</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[
                { title: "You talk to me directly", detail: "No account managers. You message me, I respond." },
                { title: "You own everything", detail: "Code, design, content — it's all yours. No lock-in." },
                { title: "Agency quality, honest price", detail: "I did this professionally. I just don't charge agency rates." },
                { title: "I know your market", detail: "I live in NZ. I understand your customers." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-[var(--background)]">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold">Want to work together?</h2>
            <p className="mt-2 text-[var(--muted)]">
              Run the tools first. Then send me your results — I&apos;ll tell you what I&apos;d fix.
            </p>
            <a
              href="https://wa.me/64XXXXXXXXX?text=Hey%20Zag%2C%20I%20want%20to%20chat%20about%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-accent-500 text-white font-medium mt-4 hover:bg-accent-600 transition-colors gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Message me on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
