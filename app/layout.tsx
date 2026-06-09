import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Horizan Nepal — Building Nepal's Tomorrow",
    template: "%s | Horizan Nepal",
  },
  description: "Horizan Nepal — Architecture, Engineering & Construction",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Horizan Nepal",
    title: "Horizan Nepal — Building Nepal's Tomorrow",
    description: "Architecture, Engineering & Construction services across Nepal.",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizan Nepal — Building Nepal's Tomorrow",
    description: "Architecture, Engineering & Construction services across Nepal.",
    images: [{ url: `${siteUrl}/twitter-image`, width: 1200, height: 600 }],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/api\/?$/, "");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href={apiOrigin} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
