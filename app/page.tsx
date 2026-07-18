import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getSettingsSafe } from "@/api/services/settings.service";
import { getPageBySlugSafe } from "@/api/services/page.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { HeroSection } from "@/components/global_ui/HeroSection";
import { QuoteBannerSecondary } from "@/components/page_ui/QuoteBannerSecondary";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getServiceCategories } from "@/api/services/category.service";
import { getProjectsListSafe } from "@/api/services/project.service";
import { getBlogsSafe } from "@/api/services/blog.service";
import { getFaqsSafeRaw } from "@/api/services/faq.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { ImageGrid } from "@/components/global_ui/image-grid";
import { FeaturedProjects } from "@/components/global_ui/FeaturedProjects";
import { BlogSection } from "@/components/global_ui/BlogSection";
import { FAQWrapper } from "@/components/global_ui/faq-accordion";

import { siteUrl } from "@/lib/constants";
import ParsedContent from "@/lib/ParseContent.server";

async function ServicesAsync({ svgUrl }: { svgUrl?: string }) {
  const services = await getServiceCategories().catch((err) => { console.error("Failed to fetch services:", err); return []; });
  return <ServicesSection initialServices={services} svgUrl={svgUrl} />;
}

async function GalleryAsync({ items }: { items: { id: string; url: string; alt?: string }[] }) {
  return (
    <ImageGrid
      slug="home-page-gallary"
      initialItems={items}
      label="Our Gallery"
      heading="Photo Gallery"
      description="Explore our portfolio of completed projects and ongoing works across Nepal."
    />
  );
}

async function FeaturedAsync({ svgUrl }: { svgUrl?: string }) {
  const projects = await getProjectsListSafe();
  return <FeaturedProjects initialProjects={projects} limit={4} svgUrl={svgUrl} />;
}

async function BlogAsync() {
  const posts = await getBlogsSafe();
  return <BlogSection initialPosts={posts} />;
}

async function FAQAsync({ svgUrl }: { svgUrl?: string }) {
  const faqs = await getFaqsSafeRaw({ page_size: 10 });
  return <FAQWrapper initialFaqs={faqs} svgUrl={svgUrl} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsSafe();
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

  const [settings, homePage] = await Promise.all([
    getSettingsSafe(),
    getPageBySlugSafe("home"),
  ]);
  const svgItems = homePage?.svg_items;

  return (
    <>
      <HeroSection svgUrl={getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg")} />
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesAsync svgUrl={getSvgUrl(svgItems, 1, "/video-gif/in-progress.svg")} />
      </Suspense>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-off-white min-h-[600px]" />}>
          <GalleryAsync items={homePage?.banner_images ?? []} />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f5f8ff] min-h-[600px]" />}>
          <FeaturedAsync svgUrl={getSvgUrl(svgItems, 2, "/video-gif/Rumble.svg")} />
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
          <FAQAsync svgUrl={getSvgUrl(svgItems, 3, "/video-gif/Live-chatbot.svg")} />
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
