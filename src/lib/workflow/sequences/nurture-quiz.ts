import { sleep } from "workflow";
import { sendSequenceEmail } from "../steps";

export async function nurtureQuizWorkflow(leadId: string) {
  "use workflow";

  // Day 0 — recap (sent immediately, no sleep)
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day0_recap",
    sequence: "nurture-quiz",
  });

  await sleep("3 days");
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day3_story",
    sequence: "nurture-quiz",
  });

  await sleep("4 days");
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day7_tripwire",
    sequence: "nurture-quiz",
  });

  await sleep("5 days");
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day12_pricing",
    sequence: "nurture-quiz",
  });

  await sleep("6 days");
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day18_honest",
    sequence: "nurture-quiz",
  });

  await sleep("12 days");
  await sendSequenceEmail({
    leadId,
    template: "nurture_quiz_day30_newsletter",
    sequence: "nurture-quiz",
  });

  return { completed: true };
}
