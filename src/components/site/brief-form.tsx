"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { WaIcon } from "./wa-icon";

const initial: ContactFormState = { success: false };

export function BriefForm({ withLabels = false }: { withLabels?: boolean }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initial);

  return (
    <form className="cta-form" action={formAction}>
      <div style={{ display: "grid", gap: 14 }}>
        <div>
          {withLabels && <label className="field-label">Your name</label>}
          <input type="text" name="name" placeholder={withLabels ? "Jane Doe" : "Your name"} required />
        </div>
        <div>
          {withLabels && <label className="field-label">Email</label>}
          <input type="email" name="email" placeholder={withLabels ? "jane@company.com" : "Email"} required />
        </div>
        <div>
          {withLabels && <label className="field-label">What are you building?</label>}
          <textarea
            name="message"
            rows={withLabels ? 6 : 4}
            placeholder={
              withLabels
                ? "A website, an internal tool, an AI agent, an automation… give us a paragraph. Mention timing if it matters."
                : "What are you building?"
            }
            required
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary sheen" disabled={isPending}>
            {isPending ? "Sending…" : "Send brief"}
            <span className="btn-arrow" />
          </button>
          <a className="btn btn-wa" href="https://wa.me/33752032213" target="_blank" rel="noopener noreferrer">
            <WaIcon />
            {withLabels ? "Or WhatsApp" : "WhatsApp"}
          </a>
        </div>
        {state.success ? (
          <p className="form-ok">Got it — your brief is on its way. We&apos;ll reply within 48h.</p>
        ) : state.error ? (
          <p className="form-err">{state.error}</p>
        ) : (
          <p className="form-note">No newsletter, no sales pipeline. Your message goes straight to the team.</p>
        )}
      </div>
    </form>
  );
}
