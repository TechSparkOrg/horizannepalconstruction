import type { Metadata } from "next";
import { getSettings } from "@/api/services/settings.service";
import { HeroSection } from "@/components/global_ui/HeroSection";
import HomepagePage from "./homepage/page";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const settingsForPage = getSettings().catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const settings = await settingsForPage;
  const title = settings?.seo?.title || " Horizan Nepal";
  const description = settings?.seo?.description || "Horizan Nepal — trusted architecture, engineering, and construction firm delivering innovative and sustainable designs across Nepal.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: siteUrl },
    alternates: { canonical: siteUrl },
  };
}

export default async function HomePage() {
  const settings = await settingsForPage;

  return (
    <>
      <h1 className="sr-only">{settings?.company_info?.name || "Horizan Nepal — Architecture, Engineering & Construction"}</h1>
      <HeroSection />
      <HomepagePage description={settings?.company_info?.description || ""} />
    </>
  );
}
