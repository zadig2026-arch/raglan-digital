import { getLaunchSpotsLeft } from "@/lib/db/queries";
import { LaunchBannerInner } from "./launch-banner-inner";

export async function LaunchBanner() {
  let spotsLeft = 0;
  try {
    spotsLeft = await getLaunchSpotsLeft();
  } catch (err) {
    console.warn("LaunchBanner: failed to read launch_spots", err);
    return null;
  }
  if (spotsLeft <= 0) return null;
  return <LaunchBannerInner spotsLeft={spotsLeft} />;
}
