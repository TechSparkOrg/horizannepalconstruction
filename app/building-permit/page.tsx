import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { getBuildingPermitSingle as getBuildingPermit } from "@/api/services/building-permit.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import BuildingPermitContent from "./BuildingPermitClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Building Permit Assistant | Horizan Nepal",
  description:
    "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, regulations, and municipality directory for construction permits.",
  openGraph: {
    title: "Building Permit Assistant | Horizan Nepal",
    description:
      "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, and municipality directory.",
    type: "website",
    url: `${siteUrl}/building-permit`,
  },
  alternates: { canonical: `${siteUrl}/building-permit` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Building Permit", item: `${siteUrl}/building-permit` },
  ],
};

export default async function BuildingPermitPage() {
  const config = await getBuildingPermit();
  if (!config) notFound();

  const banners = (config.banners ?? []).map((b, i) => ({
    id: `bp-banner-${i}`,
    url: b.url,
    alt: b.name,
  }));

  return (
    <>
      <LdJson data={breadcrumb} />

      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
        {banners.length > 0 ? (
          <BannerCarousel
            slug="building-permit-hero"
            carousel
            imgClassName="object-cover opacity-60"
            initialBanners={banners}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 to-brand-dark/70" />
        )}
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
            <h1 className="font-display font-bold text-white mt-6 leading-[1.08]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
              Building Permit<br />Assistant
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-[540px] leading-relaxed font-semibold">Navigate Nepal&apos;s building permit process with confidence.</p>
            <div className="mt-8">
              <a href="#workflow" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/30">
                <FileText className="size-4" />
                Get Permit Assistance
              </a>
            </div>
          </div>
        </div>
      </section>

      <BuildingPermitContent config={config} />
    </>
  );
}
