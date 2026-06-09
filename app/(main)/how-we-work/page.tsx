import type { Metadata } from "next";
import { Suspense } from "react";
import { HowWeWorkHero } from "@/components/sections/HowWeWorkHero";
import { WelcomeText } from "@/components/sections/WelcomeText";
import { HowWeWorkProcess } from "@/components/sections/HowWeWorkProcess";
import { HowWeWorkDesignGrid } from "@/components/sections/HowWeWorkDesignGrid";
import { FAQWrapper } from "@/components/FAQWrapper";
import { QuoteBannerSecondary } from "@/components/sections/QuoteBannerSecondary";
import { getBanners } from "@/api/cached/banner";
import type { MediaItem } from "@/api/types/media.types";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "How We Work | Horizan Nepal",
  description:
    "Discover Horizan Nepal's step-by-step design and construction process. From consultation to handover, see how we bring your dream project to life.",
  openGraph: {
    title: "How We Work | Horizan Nepal",
    description:
      "Discover Horizan Nepal's step-by-step design and construction process from consultation to handover.",
    type: "website",
    url: `${siteUrl}/how-we-work`,
  },
  alternates: { canonical: `${siteUrl}/how-we-work` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "How We Work", item: `${siteUrl}/how-we-work` },
  ],
};

export default async function HowWeWorkPage() {
  let heroBanners: MediaItem[];
  try {
    heroBanners = await getBanners("how-we-work-page-hero");
  } catch {
    heroBanners = [];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <HowWeWorkHero initialBanners={heroBanners} />
      <WelcomeText />
      <HowWeWorkProcess />
      <HowWeWorkDesignGrid />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <FAQWrapper />
      </Suspense>

      <QuoteBannerSecondary />
    </>
  );
}
