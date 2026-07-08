import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { AboutTabs } from "@/components/page_ui/AboutTabs";
import { LazyPlane } from "./_components/LazyPlane";
import { LdJson } from "@/components/global_ui/JsonLd";
import { ViewportSection } from "@/app/_components/ViewportSection";
import { getTeam } from "@/api/services/team.service";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import type { TeamMember } from "@/api/types/team.types";
import {
  AboutServicesAsync,
  AboutPartnersAsync,
  AboutReviewsAsync,
  AboutConsultAsync,
} from "@/app/_sections/about-sections";

const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const TeamSection = dynamic(() => import("@/components/global_ui/TeamSection").then((m) => ({ default: m.TeamSection })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

const SLUG = "about";
const aboutPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await aboutPageP;
  const base = pageMetadataBase(page, SLUG);
  return {
    title: page?.meta_title || "About | Horizan Nepal",
    description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "About | Horizan Nepal",
      description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  };
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Horizan Nepal",
  description: "Architecture, Engineering & Construction services across Nepal since 1999.",
};

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
      <LdJson data={breadcrumbList("About", SLUG)} />
      <LdJson data={aboutPageSchema} />
      <link rel="preload" as="image" href="/video-gif/contruction-about.svg" fetchPriority="high" />
      {gallery.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <AboutHero />
      <LazyPlane />
      <AboutTabs />
      <Suspense fallback={<div className="py-20 bg-white" />}>
        <AboutServicesAsync />
      </Suspense>
      <TeamSection members={team} />
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
