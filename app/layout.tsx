import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

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



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>

      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main id="main-content">{children}</main>
        <WhatsAppButton />
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
