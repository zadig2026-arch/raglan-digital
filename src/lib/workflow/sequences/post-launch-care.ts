import { sleep } from "workflow";
import { sendSequenceEmail } from "../steps";

export async function postLaunchCareWorkflow(leadId: string) {
  "use workflow";

  // Day 0 — site live + Care pitch (sent immediately on launch)
  await sendSequenceEmail({
    leadId,
    template: "post_launch_d0_live",
    sequence: "post-launch-care",
  });

  await sleep("14 days");
  await sendSequenceEmail({
    leadId,
    template: "post_launch_d14_gbp",
    sequence: "post-launch-care",
  });

  await sleep("16 days");
  await sendSequenceEmail({
    leadId,
    template: "post_launch_d30_seo_upsell",
    sequence: "post-launch-care",
  });

  await sleep("30 days");
  await sendSequenceEmail({
    leadId,
    template: "post_launch_d60_referral",
    sequence: "post-launch-care",
  });

  await sleep("30 days");
  await sendSequenceEmail({
    leadId,
    template: "post_launch_d90_annual",
    sequence: "post-launch-care",
  });

  return { completed: true };
}
