import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/hooks/useTrackAction";
import { JsonLd } from "@/components/JsonLd";
import { TrackingScripts } from "@/components/TrackingScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://horizannepal.com"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizan Nepal — Building Nepal's Tomorrow",
    description: "Architecture, Engineering & Construction services across Nepal.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <TrackingScripts />
        <AnalyticsTracker />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
