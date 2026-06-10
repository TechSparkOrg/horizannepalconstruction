import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SettingsLoader } from "@/components/SettingsLoader";
import { JsonLd, LdJson } from "@/components/JsonLd";
import { Suspense } from "react";
import type { ReactNode } from "react";

const TrackingScripts = dynamic(() => import("@/components/TrackingScripts").then((m) => ({ default: m.TrackingScripts })));
const ScriptInjector = dynamic(() => import("@/components/ScriptInjector").then((m) => ({ default: m.ScriptInjector })));
const AnalyticsTracker = dynamic(() => import("@/hooks/useTrackAction").then((m) => ({ default: m.AnalyticsTracker })));
const Header = dynamic(() => import("@/components/Header").then((m) => ({ default: m.Header })));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton").then((m) => ({ default: m.WhatsAppButton })));
const Footer = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: {
    default: "Horizan Nepal — Building Nepal's Tomorrow",
    template: "%s | Horizan Nepal",
  },
  description: "Architecture, Engineering & Construction services across Nepal.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Horizan Nepal",
  },
};

const baseOrgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horizan Nepal",
  url: siteUrl,
};

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TrackingScripts />
      <ScriptInjector />
      <AnalyticsTracker />
      <SettingsLoader />
      <Header />
      <main id="main-content">{children}</main>
      <WhatsAppButton />
      <Footer />
      <Suspense fallback={<LdJson data={baseOrgSchema} />}>
        <JsonLd settings={null} />
      </Suspense>
    </>
  );
}
