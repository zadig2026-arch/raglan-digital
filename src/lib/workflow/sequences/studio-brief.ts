import { sleep } from "workflow";
import { sendSequenceEmail } from "../steps";

export async function studioBriefWorkflow(leadId: string) {
  "use workflow";

  // D0 is sent immediately after capture (no sleep)
  await sendSequenceEmail({
    leadId,
    template: "studio_brief_d0_thanks",
    sequence: "studio-brief",
  });

  await sleep("2 days");
  await sendSequenceEmail({
    leadId,
    template: "studio_brief_d2_recent_work",
    sequence: "studio-brief",
  });

  await sleep("3 days");
  await sendSequenceEmail({
    leadId,
    template: "studio_brief_d5_scope",
    sequence: "studio-brief",
  });

  await sleep("4 days");
  await sendSequenceEmail({
    leadId,
    template: "studio_brief_d9_fr_nz",
    sequence: "studio-brief",
  });

  await sleep("5 days");
  await sendSequenceEmail({
    leadId,
    template: "studio_brief_d14_final",
    sequence: "studio-brief",
  });

  return { completed: true };
}
