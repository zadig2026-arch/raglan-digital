import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator",
  description:
    "Generate optimized Google meta titles and descriptions for your business. See how your site looks in search results. Free, no sign-up.",
  alternates: { canonical: "https://raglandigital.com/tools/meta-generator" },
};

export default function MetaGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
