import type { Metadata } from "next";
import { getBanners } from "@/api/services/banner.service";
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
  const [settings, banners] = await Promise.all([
    settingsForPage,
    getBanners("home-page-hero").catch(() => null),
  ]);

  return (
    <>
      <h1 className="sr-only">{settings?.company_info?.name || "Horizan Nepal — Architecture, Engineering & Construction"}</h1>
      {banners?.map((b) =>
        b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null
      )}
      <HeroSection initialBanners={banners ?? undefined} />
      <HomepagePage description={settings?.company_info?.description || ""} />
    </>
  );
}
