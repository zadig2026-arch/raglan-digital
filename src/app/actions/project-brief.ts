'use server';

import { captureLead } from './leads';

export interface ProjectBriefState {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function submitProjectBrief(
  _prevState: ProjectBriefState,
  formData: FormData,
): Promise<ProjectBriefState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const business = (formData.get('business') as string | null)?.trim() ?? '';
  const city = (formData.get('city') as string | null)?.trim() ?? '';
  const phone = (formData.get('phone') as string | null)?.trim() ?? '';
  const currentWebsite = (formData.get('current_website') as string | null)?.trim() ?? '';
  const projectType = (formData.get('project_type') as string | null)?.trim() ?? '';
  const budgetBand = (formData.get('budget_band') as string | null)?.trim() ?? '';
  const timeline = (formData.get('timeline') as string | null)?.trim() ?? '';
  const language = (formData.get('language') as string | null)?.trim() ?? 'en';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email and a short description are required.' };
  }
  if (message.length < 30) {
    return {
      success: false,
      error: 'Tell me a bit more about your project (at least a few sentences) so I can give you a real answer.',
    };
  }

  const result = await captureLead({
    email,
    name,
    business: business || undefined,
    city: city || undefined,
    current_website: currentWebsite || undefined,
    phone: phone || undefined,
    message,
    source: 'project-brief',
    source_detail: {
      project_type: projectType || undefined,
      budget_band: budgetBand || undefined,
      timeline: timeline || undefined,
      language: language || 'en',
      message_excerpt: message.slice(0, 500),
    },
    consent_marketing: true,
  });

  if (!result.ok) {
    return { success: false, error: result.error ?? 'Something went wrong. Please try again.' };
  }

  return { success: true, redirectTo: result.redirectTo ?? '/thanks/studio-brief' };
}
