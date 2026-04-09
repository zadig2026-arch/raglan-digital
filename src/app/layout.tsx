import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LaunchBanner } from "@/components/launch-banner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Raglan Digital | Helping Local Businesses Thrive Online",
    template: "%s | Raglan Digital",
  },
  description:
    "Raglan's local digital agency. We help small businesses build their online presence, attract more customers, and grow. Web design, SEO, social media & more.",
  keywords: [
    "Raglan",
    "digital agency",
    "web design Raglan",
    "SEO New Zealand",
    "local business",
    "online presence",
    "social media management",
    "Waikato",
  ],
  authors: [{ name: "Raglan Digital" }],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Raglan Digital",
    title: "Raglan Digital | Helping Local Businesses Thrive Online",
    description:
      "Raglan's local digital agency helping small businesses build their online presence and grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <LaunchBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
