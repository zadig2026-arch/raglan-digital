'use server';

import { captureLead } from './leads';
import type { LeadSource } from '@/lib/lead-score';

export interface ContactFormState {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const business = (formData.get('business') as string | null)?.trim() ?? '';
  const service = (formData.get('service') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';
  const city = (formData.get('city') as string | null)?.trim() ?? '';
  const currentWebsite =
    (formData.get('current_website') as string | null)?.trim() ?? '';
  const phone = (formData.get('phone') as string | null)?.trim() ?? '';
  const testimonialOk = formData.get('testimonial_ok') === 'yes';

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  const result = await captureLead({
    email,
    name,
    business: business || undefined,
    city: city || undefined,
    current_website: currentWebsite || undefined,
    phone: phone || undefined,
    message,
    source: serviceToSource(service),
    source_detail: {
      service: service || undefined,
      message_excerpt: message.slice(0, 500),
      testimonial_ok: testimonialOk || undefined,
    },
    consent_marketing: testimonialOk,
  });

  if (!result.ok) {
    return { success: false, error: result.error ?? 'Something went wrong. Please try again.' };
  }

  return { success: true, redirectTo: result.redirectTo };
}

function serviceToSource(service: string): LeadSource {
  switch (service) {
    case 'free-website-offer':
      return 'free-website-form';
    case 'website':
      return 'quiz-website';
    case 'seo':
      return 'quiz-seo';
    case 'ads':
      return 'quiz-ads';
    case 'help':
      return 'quiz-help';
    case 'web-design':
    case 'social-media':
    case 'content':
    case 'other':
    case '':
      return 'contact-form';
    default:
      return 'contact-form';
  }
}
