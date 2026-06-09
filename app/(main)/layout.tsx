import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SettingsLoader } from "@/components/SettingsLoader";
import { TrackingScripts } from "@/components/TrackingScripts";
import { ScriptInjector } from "@/components/ScriptInjector";
import { AnalyticsTracker } from "@/hooks/useTrackAction";
import { JsonLd } from "@/components/JsonLd";
import { StoreInitializer } from "@/components/StoreInitializer";
import { SettingsService } from "@/api/services/settings.service";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import type { ReactNode } from "react";

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

async function getSettings() {
  "use cache";
  cacheLife({ revalidate: 60 });
  try {
    return await SettingsService.get();
  } catch {
    return null;
  }
}

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSettings();

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
      <StoreInitializer settings={settings} />
      <Suspense
        fallback={
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(baseOrgSchema),
            }}
          />
        }
      >
        <JsonLd settings={settings} />
      </Suspense>
    </>
  );
}
