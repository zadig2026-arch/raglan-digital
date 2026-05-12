'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('submitContactForm: RESEND_API_KEY missing — email not sent.');
    return { success: false, error: 'Email service not configured. Try WhatsApp instead.' };
  }

  try {
    await resend.emails.send({
      from: 'Raglan Digital <noreply@raglandigital.com>',
      to: ['zadig@raglandigital.com'],
      replyTo: email,
      subject: `[Contact] ${name}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <hr/>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });
  } catch (err) {
    console.error('Resend send failed:', err);
    return { success: false, error: 'Something went wrong. Try WhatsApp instead.' };
  }

  return { success: true };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
