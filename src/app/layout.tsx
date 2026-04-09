import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LaunchBanner } from "@/components/launch-banner";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Scale with Zag | Web Design & Digital Growth for NZ Businesses",
    template: "%s | Scale with Zag",
  },
  description:
    "Affordable web design, SEO, social media & content for New Zealand small businesses. Websites from $599 NZD. Real results, fair prices.",
  keywords: [
    "web design New Zealand",
    "affordable website NZ",
    "SEO New Zealand",
    "small business website",
    "digital agency NZ",
    "social media management",
    "Scale with Zag",
  ],
  authors: [{ name: "Scale with Zag" }],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Scale with Zag",
    title: "Scale with Zag | Web Design & Digital Growth for NZ Businesses",
    description:
      "Affordable web design, SEO, social media & content for New Zealand small businesses. Websites from $599 NZD.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Scale with Zag",
              "description": "Web design, SEO, social media & content for New Zealand small businesses.",
              "url": "https://scalewithzag.com",
              "areaServed": { "@type": "Country", "name": "New Zealand" },
              "priceRange": "$599 - $2499",
              "founder": { "@type": "Person", "name": "Zag" },
              "sameAs": ["https://instagram.com/scalewithzag"],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
          <LaunchBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
      </body>
    </html>
  );
}
