import { Suspense } from "react";
import type { Metadata } from "next";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { HeroSection } from "@/components/global_ui/HeroSection";
import { siteUrl } from "@/lib/constants";
import { HomeContent } from "./_content";

interface HomeBundle {
  page: import("@/api/types/page.types").Page | null
  services: import("@/api/types/category.types").ServiceCategory[]
  projects: import("@/api/types/project.types").Project[]
  blogs: import("@/api/types/blog.types").BlogPost[]
  faqs: import("@/api/types/faq.types").FaqItem[]
}

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<HomeBundle>("home", "home", { include: ["settings", "page", "services", "projects", "blogs", "faqs"], faq_page_size: 10 });
  const { page } = bundle;
  const title = page?.meta_title || page?.title || "Horizan Nepal — Architecture, Engineering & Construction";
  const description = page?.meta_description || "Horizan Nepal — trusted architecture, engineering, and construction firm delivering innovative and sustainable designs across Nepal.";
  return {
    title,
    description,
    openGraph: { title, description, type: "website", url: siteUrl },
    alternates: { canonical: siteUrl },
  };
}

export default async function HomePage() {
  const bundle = await getPageBundle<HomeBundle>("home", "home", { include: ["settings", "page", "services", "projects", "blogs", "faqs"], faq_page_size: 10 });
  const { page = null, services = [], projects = [], blogs = [], faqs = [] } = bundle;
  const svgItems = page?.svg_items;

  return (
    <>
      <link rel="preload" as="image" href={getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg")} fetchPriority="high" />
      <HeroSection svgUrl={getSvgUrl(svgItems, 0, "/video-gif/construnction-bull-dozer.svg")} />
      <Suspense fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <HomeContent page={page} services={services} projects={projects} blogs={blogs} faqs={faqs} />
      </Suspense>
    </>
  );
}
