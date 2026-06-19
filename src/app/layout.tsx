import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gera Hinjewadi Pune | Premium 2 & 3 BHK ChildCentric® Homes",
  description: "Explore Gera Winds of Joy & Joy on the Treetops in Hinjewadi Phase 3, Pune. 2 & 3 BHK apartments starting at ₹77.90 Lakhs*. Get pricing, floor plans, and brochures.",
  keywords: "Gera Hinjewadi, Gera Winds of Joy, Gera Joy on the Treetops, ChildCentric Homes Pune, real estate Hinjewadi, 2 BHK flat Hinjewadi, 3 BHK Hinjewadi Pune",
  authors: [{ name: "Gera Developments Sales Partner" }],
  metadataBase: new URL("https://www.gerahinjewadi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gera Hinjewadi Pune | Premium 2 & 3 BHK ChildCentric® Homes",
    description: "Explore Winds of Joy & Joy on the Treetops by Gera Developments in Hinjewadi, Pune. Luxury residences starting at ₹77.90 L*.",
    url: "https://www.gerahinjewadi.com",
    siteName: "Gera Hinjewadi Pune",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Gera Hinjewadi Premium Living",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gera Hinjewadi Pune | Premium 2 & 3 BHK ChildCentric® Homes",
    description: "Explore Winds of Joy & Joy on the Treetops by Gera Developments in Hinjewadi, Pune. Starting at ₹77.90 L*.",
    images: ["/hero-bg.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org RealEstateAgent structured markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Gera Hinjewadi Pune Sales",
    "image": "https://www.gerahinjewadi.com/hero-bg.png",
    "telephone": "+91-9673000053",
    "url": "https://www.gerahinjewadi.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Megapolis Circle, Hinjewadi Phase 3",
      "addressLocality": "Pune",
      "addressRegion": "MH",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "priceRange": "₹77.90 Lakhs - ₹1.41 Cr"
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
