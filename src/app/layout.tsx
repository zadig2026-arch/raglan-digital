import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ThemeProvider } from "@/components/theme-provider";

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
    default: "Raglan Digital | Web Design for NZ Small Businesses",
    template: "%s | Raglan Digital",
  },
  description:
    "Web design, SEO, social media & content for local businesses in New Zealand. Real results, fair prices.",
  keywords: [
    "web design New Zealand",
    "affordable website NZ",
    "SEO New Zealand",
    "small business website",
    "digital agency NZ",
    "social media management",
    "Raglan Digital",
  ],
  alternates: {
    canonical: "https://raglandigital.com",
  },
  authors: [{ name: "Raglan Digital" }],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://raglandigital.com",
    siteName: "Raglan Digital",
    title: "Raglan Digital | Web Design for NZ Small Businesses",
    description:
      "Web design, SEO, social media & content for local businesses in New Zealand. Real results, fair prices.",
    images: [
      {
        url: "https://raglandigital.com/images/raglan-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Raglan Digital — Web Design for NZ Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raglan Digital | Web Design & Digital Growth for NZ Businesses",
    description:
      "Web design, SEO, social media & content for local businesses in New Zealand.",
    images: ["https://raglandigital.com/images/raglan-sunset.jpg"],
  },
  metadataBase: new URL("https://raglandigital.com"),
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Raglan Digital",
                description:
                  "Web design, SEO, social media & content for New Zealand small businesses.",
                url: "https://raglandigital.com",
                areaServed: { "@type": "Country", name: "New Zealand" },
                founder: { "@type": "Person", name: "Zadig" },
                sameAs: ["https://instagram.com/raglandigital"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
