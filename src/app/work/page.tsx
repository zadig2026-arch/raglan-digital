import type { Metadata } from "next";
import { WorkView } from "@/components/site/work-view";

export const metadata: Metadata = {
  title: "Work — websites, automation & AI",
  description:
    "Selected projects from Raglan Digital — websites, custom tools, automations and AI agents.",
  alternates: { canonical: "https://raglandigital.com/work" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://raglandigital.com" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://raglandigital.com/work" },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WorkView />
    </>
  );
}
