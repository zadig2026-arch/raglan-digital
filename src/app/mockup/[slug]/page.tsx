import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockups, getMockup } from "@/lib/mockups";
import { BusinessMockup } from "@/components/business-mockup";

export function generateStaticParams() {
  return mockups.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getMockup(slug);
  if (!data) {
    return { title: "Mockup not found" };
  }
  return {
    title: `${data.business.name} — site mockup`,
    description: data.business.tagline,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MockupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getMockup(slug);
  if (!data) notFound();
  return <BusinessMockup data={data} />;
}
