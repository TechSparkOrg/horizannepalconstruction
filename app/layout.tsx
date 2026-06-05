import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScriptInjector } from "@/components/ScriptInjector";

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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
          {children}
        <ScriptInjector />
      </body>
    </html>
  );
}
