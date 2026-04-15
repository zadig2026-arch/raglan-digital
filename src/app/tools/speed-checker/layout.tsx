import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Speed Test",
  description:
    "Test how fast your website loads. Get performance metrics and tips to speed things up. Free, no sign-up required.",
};

export default function SpeedCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
