import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { getSiteUrl } from "@/lib/seo-utils";
import "./globals.css";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { SettingsLoader } from "@/components/global_ui/SettingsLoader";
import { TrackingScripts } from "@/components/global_ui/TrackingScripts";
import { ScriptInjector } from "@/components/global_ui/ScriptInjector";

const Header = dynamic(() => import("@/components/global_ui/Header").then((m) => ({ default: m.Header })));
const WhatsAppButton = dynamic(() => import("@/components/global_ui/WhatsAppButton").then((m) => ({ default: m.WhatsAppButton })));
const Footer = dynamic(() => import("@/components/global_ui/Footer").then((m) => ({ default: m.Footer })));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Horizan Nepal — Architecture, Engineering & Construction",
    template: "%s | Horizan Nepal",
  },
  description:
    "Horizan Nepal — trusted architecture, engineering, and construction firm delivering innovative and sustainable designs across Nepal.",
  openGraph: {
    type: "website",
    siteName: "Horizan Nepal",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <WhatsAppButton />
        <Footer />
        <SettingsLoader />
        <TrackingScripts />
        <ScriptInjector />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
