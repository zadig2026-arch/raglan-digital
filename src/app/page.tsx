import {
  AppleHero,
  AppleStickyShowcase,
  AppleDiagnostic,
  AppleStats,
  AppleCta,
} from "@/components/axes/apple";
import { TrustStrip } from "@/components/home/trust-strip";
import { ValuePropBento } from "@/components/value-prop-bento";
import { SocialProof } from "@/components/home/social-proof";
import { PricingBlock } from "@/components/pricing-block";
import { ProcessTimeline } from "@/components/process-timeline";

export default function Home() {
  return (
    <>
      <AppleHero />
      <TrustStrip />
      <ValuePropBento />
      <SocialProof />
      <AppleStickyShowcase />
      <AppleDiagnostic />
      <PricingBlock />
      <ProcessTimeline />
      <AppleStats />
      <AppleCta />
    </>
  );
}
