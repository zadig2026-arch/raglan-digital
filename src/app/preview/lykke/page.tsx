import type { Metadata } from "next";
import { LykkeExperience } from "./experience";

export const metadata: Metadata = {
  title: "Lykke — preview",
  description:
    "A preview of what a Lykke Café website could look like. By Raglan Digital.",
  robots: { index: false, follow: false },
};

export default function LykkePreviewPage() {
  return <LykkeExperience />;
}
