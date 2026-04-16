import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Raglan Digital. Send a message or reach out on WhatsApp.",
  alternates: { canonical: "https://raglandigital.com/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
