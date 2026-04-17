import type { Metadata } from "next";
import { CafeExperience } from "./experience";

export const metadata: Metadata = {
  title: "Café & restaurant — sample design · Raglan Digital",
  description:
    "A sample design from Raglan Digital showing how a café and restaurant website could look. A concept piece — not a live business site.",
  robots: { index: false, follow: false },
};

export default function CafeSamplePage() {
  return <CafeExperience />;
}
