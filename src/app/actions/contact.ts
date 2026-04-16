"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const business = formData.get("business") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;
  const city = formData.get("city") as string;
  const currentWebsite = formData.get("current_website") as string;
  const testimonialOk = formData.get("testimonial_ok") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const isFreeWebsite = service === "free-website-offer";
  const subjectPrefix = isFreeWebsite
    ? "FREE-SITE APPLICATION"
    : "New enquiry";
  const subject = `${subjectPrefix} from ${name}${
    business ? ` (${business})` : ""
  }`;

  const extraRows = [
    city ? `<p><strong>City:</strong> ${escapeHtml(city)}</p>` : "",
    currentWebsite
      ? `<p><strong>Current site/Insta:</strong> ${escapeHtml(currentWebsite)}</p>`
      : "",
    testimonialOk
      ? `<p><strong>Testimonial OK:</strong> ${escapeHtml(testimonialOk)}</p>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  try {
    await resend.emails.send({
      from: "Raglan Digital <noreply@raglandigital.com>",
      to: ["hello@raglandigital.com"],
      replyTo: email,
      subject,
      html: `
        <h2>${isFreeWebsite ? "Free Website Application" : "New Contact Form Submission"}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(business || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>
        ${extraRows}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error:
        "Something went wrong. Please try again or contact us via WhatsApp.",
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
