import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getPageBySlugSafe } from "@/api/services/page.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { ProjectPageContent } from "./_content";

import { siteUrl } from "@/lib/constants";
const OurWorkHero = dynamic(() => import("@/components/page_ui/OurWorkHero").then((m) => ({ default: m.OurWorkHero })));
const SLUG = "project-details";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlugSafe(SLUG);
  return {
    title: page?.meta_title || "Projects | Horizan Nepal",
    description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
    alternates: { canonical: `${siteUrl}/project-details` },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Projects | Horizan Nepal",
      description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
      type: "website",
      url: `${siteUrl}/project-details`,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function ProjectsPage() {
  const page = await getPageBySlugSafe(SLUG);

  return (
    <>
      <h1 className="sr-only">{page?.title || "Projects — Horizan Nepal"}</h1>
      <OurWorkHero svgUrl={getSvgUrl(page?.svg_items, 0, "/video-gif/maintainace-building.svg")} />
      <LazyPlane src={getSvgUrl(page?.svg_items, 1, "/video-gif/Loading-Paperplane.svg")} />
      <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f8fafc]" style={{ minHeight: 2600 }} />}>
        <ProjectPageContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </>
  );
}
