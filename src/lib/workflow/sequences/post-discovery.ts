import { sleep } from "workflow";
import { sendSequenceEmail } from "../steps";

export async function postDiscoveryWorkflow(args: {
  leadId: string;
  callAt: string; // ISO date of the discovery call
}) {
  "use workflow";

  const callTime = new Date(args.callAt).getTime();
  const now = Date.now();

  // T-24h prep (only if call is more than 24h away)
  const timeUntilPrep = callTime - 24 * 3600 * 1000 - now;
  if (timeUntilPrep > 0) {
    await sleep(`${Math.floor(timeUntilPrep / 1000)}s`);
    await sendSequenceEmail({
      leadId: args.leadId,
      template: "post_discovery_24h_prep",
      sequence: "post-discovery",
    });
  }

  // T+2h recap (after the call)
  const timeUntilRecap = callTime + 2 * 3600 * 1000 - Date.now();
  if (timeUntilRecap > 0) {
    await sleep(`${Math.floor(timeUntilRecap / 1000)}s`);
  }
  await sendSequenceEmail({
    leadId: args.leadId,
    template: "post_discovery_2h_recap",
    sequence: "post-discovery",
  });

  await sleep("46 hours");
  await sendSequenceEmail({
    leadId: args.leadId,
    template: "post_discovery_48h_nudge",
    sequence: "post-discovery",
  });

  await sleep("3 days");
  await sendSequenceEmail({
    leadId: args.leadId,
    template: "post_discovery_5d_close",
    sequence: "post-discovery",
  });

  return { completed: true };
}
