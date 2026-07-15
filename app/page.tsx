import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getSettings } from "@/api/services/settings.service";
import { HeroSection } from "@/components/global_ui/HeroSection";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import {
  ServicesAsync,
  GalleryAsync,
  FeaturedAsync,
  BlogAsync,
  FAQAsync,
} from "@/components/sections/homepage-sections";

import ParsedContent from "@/lib/ParseContent.server";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

const settingsPromise = getSettings().catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const settings = await settingsPromise;
  const title = settings?.seo?.title || "Horizan Nepal — Architecture, Engineering & Construction";
  const description = settings?.seo?.description || "Horizan Nepal — trusted architecture, engineering, and construction firm delivering innovative and sustainable designs across Nepal.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: siteUrl },
    alternates: { canonical: siteUrl },
  };
}

function ServicesSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-light-gray" style={{ background: "var(--color-light-gray)" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-7 space-y-5">
              <div className="size-11 rounded-xl bg-light-gray/50 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-2/3 rounded bg-light-gray/50 animate-pulse" />
                <div className="h-3 w-full rounded bg-light-gray/40 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const settings = await settingsPromise;

  return (
    <>
      <HeroSection />
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesAsync />
      </Suspense>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
          <GalleryAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
          <FeaturedAsync />
        </Suspense>
      </ViewportSection>
      <QuoteBannerSecondary />
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[400px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[400px]" />}>
          <BlogAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-20 bg-[#f5f8ff] min-h-[500px]" />}>
        <Suspense fallback={<div className="py-20 bg-[#f5f8ff] min-h-[500px]" />}>
          <FAQAsync />
        </Suspense>
      </ViewportSection>
      {settings?.company_info?.description && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={settings.company_info.description} />
        </section>
      )}
    </>
  );
}
