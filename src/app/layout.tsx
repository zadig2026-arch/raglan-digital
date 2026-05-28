import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { BlobField } from "@/components/site/blob-field";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { WaFloating } from "@/components/site/wa-floating";
import { ClientScripts } from "@/components/site/client-scripts";
import { IntroOverlay } from "@/components/site/intro-overlay";
import { RouteProgress } from "@/components/site/route-progress";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const TITLE = "Raglan Digital — An AI agency";
const DESCRIPTION =
  "A focused team building websites, custom tools, automations & AI agents. Designed and shipped fast. You own everything.";

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s · Raglan Digital" },
  description: DESCRIPTION,
  keywords: [
    "Raglan Digital",
    "AI agency",
    "AI agents",
    "automation",
    "n8n automation",
    "custom tools",
    "web application development",
    "Next.js agency",
    "AI integration",
    "France",
    "New Zealand",
  ],
  alternates: { canonical: "https://raglandigital.com" },
  openGraph: {
    type: "website",
    locale: "en",
    url: "https://raglandigital.com",
    siteName: "Raglan Digital",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "https://raglandigital.com/images/raglan-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Raglan Digital — an AI agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raglan Digital — An AI agency",
    description: DESCRIPTION,
    images: ["https://raglandigital.com/images/raglan-sunset.jpg"],
  },
  metadataBase: new URL("https://raglandigital.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Raglan Digital",
                description: DESCRIPTION,
                url: "https://raglandigital.com",
                areaServed: [
                  { "@type": "Country", name: "France" },
                  { "@type": "Country", name: "New Zealand" },
                ],
                knowsAbout: [
                  "Artificial Intelligence",
                  "AI agents",
                  "Workflow automation",
                  "Web development",
                  "Custom software tools",
                ],
                sameAs: ["https://instagram.com/raglandigital"],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Services",
                  itemListElement: [
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Websites & web apps" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom tools & dashboards" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automation" } },
                    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI agents & assistants" } },
                  ],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Raglan Digital",
                url: "https://raglandigital.com",
              },
            ]),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <IntroOverlay />
        <RouteProgress />
        <BlobField />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <WaFloating />
        <ClientScripts />
        <Analytics />
      </body>
    </html>
  );
}
