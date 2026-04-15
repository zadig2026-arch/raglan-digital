import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SEO Audit Tool",
  description:
    "Enter your website URL and get an instant SEO health check. Free, no sign-up required.",
};

export default function SeoAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
