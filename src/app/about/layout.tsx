import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Zadig — the person behind Raglan Digital. From audiovisual production in France to web design in New Zealand.",
  alternates: { canonical: "https://raglandigital.com/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
