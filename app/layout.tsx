import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Real-Time Safe Bunk Calculator & Simulator`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "RBU attendance planner",
    "Ramdeobaba University",
    "RCOEM attendance calculator",
    "safe bunk calculator",
    "attendance simulator",
    "college attendance tracker",
    "browser extension",
    "attendance percentage",
  ],
  authors: [
    {
      name: "Mohammad Adnan",
      url: "https://github.com/MohammadAdnan14",
    },
  ],
  creator: "Mohammad Adnan",
  publisher: "Mohammad Adnan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Real-Time Safe Bunk Calculator & Simulator`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Real-Time Safe Bunk Calculator & Simulator`,
    description: siteConfig.description,
    creator: "@0xAdnanDalal",
  },
  icons: {
    icon: [
      { url: "/icon16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon128.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [{ url: "/icon128.png", sizes: "128x128", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  operatingSystem: "Windows, macOS, Linux, ChromeOS",
  applicationCategory: "EducationalApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description: siteConfig.description,
  url: siteConfig.url,
  softwareVersion: "1.0.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-[var(--bg-color)] text-[var(--text-color)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        {(process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ||
          "f85846d8170d4bf2891bdf4f843263c3") && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token:
                process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ||
                "f85846d8170d4bf2891bdf4f843263c3",
            })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
