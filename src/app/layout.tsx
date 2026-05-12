import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { ExitIntentModal } from "@/components/exit-intent-modal";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorGlow } from "@/components/cursor-glow";

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
    default: "Raglan Digital · by Zadig — Independent web work, FR & NZ",
    template: "%s · Raglan Digital",
  },
  description:
    "Independent web work by Zadig for small businesses, artists and practitioners. Selected projects across France and Aotearoa NZ.",
  keywords: [
    "Zadig",
    "Raglan Digital",
    "freelance web design",
    "Next.js freelancer",
    "Sanity CMS",
    "web design New Zealand",
    "web design France",
    "bilingual web designer",
    "small business website",
  ],
  alternates: {
    canonical: "https://raglandigital.com",
  },
  authors: [{ name: "Zadig" }],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    alternateLocale: ["fr_FR"],
    url: "https://raglandigital.com",
    siteName: "Raglan Digital",
    title: "Raglan Digital · by Zadig — Independent web work, FR & NZ",
    description:
      "Independent web work by Zadig for small businesses, artists and practitioners. Selected projects across France and Aotearoa NZ.",
    images: [
      {
        url: "https://raglandigital.com/images/raglan-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Raglan Digital — independent web work by Zadig",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raglan Digital · by Zadig",
    description:
      "Independent web work for small businesses, artists and practitioners. France & NZ.",
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
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Raglan Digital",
                alternateName: "Raglan Digital · by Zadig",
                description:
                  "Independent web work by Zadig for small businesses, artists and practitioners. France & Aotearoa NZ.",
                url: "https://raglandigital.com",
                areaServed: [
                  { "@type": "Country", name: "New Zealand" },
                  { "@type": "Country", name: "France" },
                ],
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
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Script
          id="theme-detect"
          strategy="beforeInteractive"
        >{`(function(){try{var m=localStorage.getItem('theme');if(m==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`}</Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <CursorGlow />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <StickyMobileCta />
          <ExitIntentModal />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
