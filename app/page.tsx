import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { HeroSection } from "@/components/global_ui/HeroSection";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";

import { siteUrl } from "@/lib/constants";
import { LdJson } from "@/components/global_ui/JsonLd";
import ParsedContent from "@/lib/ParseContent.server";

interface HomeBundle {
  settings: import("@/api/types/settings.types").SiteSettings | null
  page: import("@/api/types/page.types").Page | null
  services: import("@/api/types/category.types").ServiceCategory[]
  projects: import("@/api/types/project.types").Project[]
  blogs: import("@/api/types/blog.types").BlogPost[]
  faqs: import("@/api/types/faq.types").FaqItem[]
}

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<HomeBundle>("home", "home", { faq_page_size: 10 });
  const settings = bundle.settings;
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
  const bundle = await getPageBundle<HomeBundle>("home", "home", { faq_page_size: 10 });
  const { settings = null, page: homePage = null, services = [], projects = [], blogs = [], faqs = [] } = bundle;
  const svgItems = homePage?.svg_items;

  return (
    <>
      <LdJson data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: settings?.company_info?.name || "Horizan Nepal Engineering Research & Construction",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg"),
        description: settings?.company_info?.description || "Trusted architecture, engineering, and construction firm in Nepal.",
        address: settings?.contact_info?.address ? {
          "@type": "PostalAddress",
          streetAddress: settings.contact_info.address,
          addressLocality: "Kathmandu",
          addressCountry: "NP",
        } : undefined,
        telephone: settings?.contact_info?.phone || undefined,
        priceRange: "NPR",
      }} />
      <link rel="preload" as="image" href={getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg")} fetchPriority="high" />
      <HeroSection svgUrl={getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg")} />
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesSection initialServices={services} svgUrl={getSvgUrl(svgItems, 1, "/video-gif/in-progress.svg")} />
      </Suspense>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
          <ImageGrid
            slug="home-page-gallary"
            initialItems={homePage?.banner_images ?? []}
            label="Our Gallery"
            heading="Photo Gallery"
            description="Explore our portfolio of completed projects and ongoing works across Nepal."
          />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
          <FeaturedProjects initialProjects={projects} limit={4} svgUrl={getSvgUrl(svgItems, 2, "/video-gif/Rumble.svg")} />
        </Suspense>
      </ViewportSection>
      <QuoteBannerSecondary />
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[400px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[400px]" />}>
          <BlogSection initialPosts={blogs} />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-20 bg-[#f5f8ff] min-h-[500px]" />}>
        <Suspense fallback={<div className="py-20 bg-[#f5f8ff] min-h-[500px]" />}>
          <FAQWrapper initialFaqs={faqs} svgUrl={getSvgUrl(svgItems, 3, "/video-gif/Live-chatbot.svg")} />
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
