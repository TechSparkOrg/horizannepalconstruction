import type { Metadata } from "next";
import VastuShastraClient from "./VastuShastraClient";
import { getVastuConfig } from "@/api/services/vastu.service";
import type { VastuConfig } from "@/api/types/vastu.types";
import { getBanners } from "@/api/services/banner.service";
import { LdJson } from "@/components/global_ui/JsonLd";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Vastu Shastra | Horizan Nepal",
  description:
    "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom for harmonious living spaces in Nepal.",
  openGraph: {
    title: "Vastu Shastra | Horizan Nepal",
    description:
      "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom.",
    type: "website",
    url: `${siteUrl}/vastu-shastra`,
  },
  alternates: { canonical: `${siteUrl}/vastu-shastra` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Vastu Shastra", item: `${siteUrl}/vastu-shastra` },
  ],
};

export default async function VastuShastraPage() {
  let initialData: VastuConfig | null = null;
  try {
    const configs = await getVastuConfig();
    initialData = configs[0] ?? null;
  } catch {
    initialData = null;
  }

  const banners = await getBanners("vastu-shastra-page-hero").catch(() => null);

  return (
    <>
      {banners?.map((b) =>
        b.url ? <link rel="preload" as="image" href={b.url} key={b.id} /> : null
      )}
      <LdJson data={breadcrumb} />
      <VastuShastraClient initialData={initialData} initialBanners={banners ?? undefined} />
    </>
  );
}
