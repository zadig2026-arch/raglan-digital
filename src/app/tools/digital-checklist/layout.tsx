import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Presence Checklist",
  description:
    "40-item checklist to audit your full digital presence. Website, Google, social media, content, and directories. Free, no sign-up.",
};

export default function DigitalChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
