import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LazyPlane } from "@/app/_components/LazyPlane";
import { ViewportSection } from "@/app/_components/ViewportSection";
import { getTeam } from "@/api/services/team.service";
import { getPageBySlug } from "@/api/services/page.service";
import type { TeamMember } from "@/api/types/team.types";
import {
  AboutServicesAsync,
  AboutPartnersAsync,
  AboutReviewsAsync,
  AboutConsultAsync,
} from "@/app/_sections/about-sections";

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })));
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const TeamSection = dynamic(() => import("@/components/global_ui/TeamSection").then((m) => ({ default: m.TeamSection })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "about";
const aboutPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await aboutPageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || "About | Horizan Nepal",
    description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "About | Horizan Nepal",
      description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function AboutPage() {
  const [page, teamRes] = await Promise.all([
    aboutPageP,
    getTeam().catch(() => ({ results: [] as TeamMember[] })),
  ]);
  const team = "results" in teamRes ? teamRes.results : [];
  const gallery = page?.banner_images ?? [];

  return (
    <>
      <h1 className="sr-only">{page?.meta_title || "About | Horizan Nepal"}</h1>
      <link rel="preload" as="image" href="/video-gif/contruction-about.svg" fetchPriority="high" />
      {gallery.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <AboutHero />
      <LazyPlane />
      <ViewportSection fallback={<div className="py-16 sm:py-28 bg-white" />}>
        <AboutTabs />
      </ViewportSection>
      <ViewportSection fallback={<div className="py-20 bg-white" />}>
        <Suspense fallback={<div className="py-20 bg-white" />}>
          <AboutServicesAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-28 bg-[#f8fafc]" />}>
        <TeamSection members={team} />
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-white" />}>
          <AboutPartnersAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-off-white" />}>
        <AboutGallery
          initialItems={gallery}
          slug="about-page-gallary-list"
          label="Our Work in Action"
          heading="A Glimpse Into What We Do"
          description="From concept to completion — the projects and people that define Horizon Nepal."
          bg=""
          priority
        />
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-white" />}>
          <AboutReviewsAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-white" />}>
          <AboutConsultAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <LocationSection />
      </ViewportSection>
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  );
}
