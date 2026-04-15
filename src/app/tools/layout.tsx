import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Free website tools for NZ small businesses. Check your SEO, test page speed, generate meta tags, and audit your digital presence.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
