import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { getBanners } from "@/api/services/banner.service";
import type { MediaItem } from "@/api/types/media.types";

const UnitConverterGrid = dynamic(() => import("@/components/page_ui/UnitConverterGrid.client"));

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Unit Converter | Horizan Nepal",
    description:
      "Convert construction measurements and units with Horizan Nepal's easy-to-use unit converter. Quickly convert length, area, volume, weight, and more.",
    openGraph: {
      title: "Unit Converter | Horizan Nepal",
      description:
        "Convert construction measurements and units with Horizan Nepal&apos;s easy-to-use unit converter.",
    },
  };
}

export default async function UnitConvertPage() {
  const banners = await getBanners("unit-converter-page-hero").catch(() => null);
  const bannerImages: MediaItem[] = (banners ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: b.alt || b.title || "Unit Converter",
    title: b.title,
  }));

  return (
    <>
      <h1 className="sr-only">Unit Converter — Horizan Nepal</h1>

      {bannerImages.map((b) =>
        b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null
      )}

      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#162d62]">
        <BannerCarousel
          initialBanners={bannerImages}
          imgClassName="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2557]/90 via-[#0f2557]/40 to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-white/70 border border-white/20 px-3 py-1 rounded mb-5">
            Unit Converter
          </span>
          <h2
            className="font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Unit Converter
          </h2>
          <div className="mt-5 mb-5 mx-auto w-12 h-[3px] bg-[#cd2028]" />
          <p className="text-white/65 text-[1.05rem] max-w-[580px] mx-auto leading-relaxed">
            Quickly convert construction measurements and units — from length and area to volume and weight.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <UnitConverterGrid />
      </Suspense>
    </>
  );
}
