import { Suspense, cache } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getPageBySlug } from "@/api/services/page.service";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { ProjectPageContent } from "./_content";

const OurWorkHero = dynamic(() => import("@/components/page_ui/OurWorkHero").then((m) => ({ default: m.OurWorkHero })));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "project-details";
const getPage = cache(async (slug: string) => getPageBySlug(slug).catch(() => null));

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage(SLUG);
  return {
    title: page?.meta_title || "Projects | Horizan Nepal",
    description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
    alternates: { canonical: `${SITE_URL}/project-details` },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Projects | Horizan Nepal",
      description: page?.meta_description || "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
      type: "website",
      url: `${SITE_URL}/project-details`,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function ProjectsPage() {
  const page = await getPage(SLUG);

  return (
    <>
      <h1 className="sr-only">{page?.title || "Projects — Horizan Nepal"}</h1>
      <OurWorkHero />
      <LazyPlane />
      <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f8fafc]" style={{ minHeight: 2600 }} />}>
        <ProjectPageContent page={page} />
      </Suspense>
    </>
  );
}
