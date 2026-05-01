import { sleep } from "workflow";
import { sendSequenceEmail } from "../steps";

export async function welcomeToolsWorkflow(leadId: string) {
  "use workflow";

  await sleep("2 days");
  await sendSequenceEmail({
    leadId,
    template: "welcome_tools_day2_top_fix",
    sequence: "welcome-tools",
  });

  await sleep("3 days");
  await sendSequenceEmail({
    leadId,
    template: "welcome_tools_day5_tripwire",
    sequence: "welcome-tools",
  });

  await sleep("4 days");
  await sendSequenceEmail({
    leadId,
    template: "welcome_tools_day9_case_studies",
    sequence: "welcome-tools",
  });

  await sleep("5 days");
  await sendSequenceEmail({
    leadId,
    template: "welcome_tools_day14_final",
    sequence: "welcome-tools",
  });

  return { completed: true };
}
