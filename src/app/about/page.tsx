"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/section";

const values = [
  {
    title: "Keep It Real",
    description: "No jargon, no buzzwords, no BS. We explain things in plain English and only recommend what your business actually needs.",
  },
  {
    title: "Local First",
    description: "We live here, we work here, we surf here. We understand Raglan businesses because we're part of the community.",
  },
  {
    title: "Give Before You Take",
    description: "Our Digital Bible is free because we believe in helping first. When you're ready for more, we'll be here.",
  },
  {
    title: "Results Over Vanity",
    description: "We don't care about vanity metrics. We care about phone calls, bookings, and customers walking through your door.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">About Us</span>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
              Born in Raglan, built for Raglan
            </h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              We&apos;re a small digital agency with a big mission: help every local business in
              Raglan build a strong online presence — without the big-city price tag or the
              corporate attitude.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <Section className="pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Story</h2>
            <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                Raglan is special. It&apos;s a town where the baker knows your name, the surf
                instructor is your neighbour, and every business has a story worth telling.
              </p>
              <p>
                But when it comes to the digital world, too many of these amazing businesses
                are invisible. They&apos;re losing customers to competitors who simply show up
                better online — not because they&apos;re better businesses, but because they have
                better websites, better Google listings, better social media.
              </p>
              <p>
                That didn&apos;t sit right with us. So we started Raglan Digital to level the
                playing field. To give local businesses the same digital tools and strategies
                that big companies take for granted — but tailored to our community, our pace,
                and our values.
              </p>
              <p>
                We&apos;re not a faceless agency in Auckland charging $10,000 for a website you
                don&apos;t understand. We&apos;re your neighbours. We&apos;ll sit down with you over a
                flat white and figure out what your business actually needs.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/raglan-coast.jpg"
                alt="Raglan coastline, New Zealand"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-ocean-500 uppercase tracking-wider">Our Values</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">How we work</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]"
            >
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Let&apos;s build something together
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Whether you need a full digital overhaul or just a hand with your Google listing,
            we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 px-7 items-center justify-center rounded-xl bg-ocean-600 text-white font-medium mt-8 hover:bg-ocean-700 transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </Section>
    </>
  );
}
