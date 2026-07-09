import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page } from "@/api/types/page.types";
import type { MediaItem } from "@/api/types/media.types";
import {
  AboutServicesAsync,
  AboutPartnersAsync,
  AboutReviewsAsync,
  AboutConsultAsync,
  AboutFaqAsync,
  AboutTeamAsync,
} from "@/components/sections/about-sections";

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })));
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

interface Props {
  page: Page | null;
  gallery: MediaItem[];
}

export function AboutContent({ page, gallery }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-white")}>
        <AboutTabs />
      </ViewportSection>
      <ViewportSection fallback={F("py-20 bg-white")}>
        <Suspense fallback={F("py-20 bg-white")}>
          <AboutServicesAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-[#f8fafc]")}>
        <Suspense fallback={F("py-16 sm:py-28 bg-[#f8fafc]")}>
          <AboutTeamAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <Suspense fallback={F("py-16 sm:py-24 bg-white")}>
          <AboutPartnersAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-off-white")}>
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
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <Suspense fallback={F("py-16 sm:py-24 bg-white")}>
          <AboutReviewsAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <Suspense fallback={F("py-16 sm:py-24 bg-white")}>
          <AboutConsultAsync />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <LocationSection />
      </ViewportSection>
      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white")}>
            <AboutFaqAsync faqGroupSlug={page.faq_group_slug} />
          </Suspense>
        </ViewportSection>
      )}
      {page?.content && (
        <ViewportSection fallback={F("py-16 bg-white")}>
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}
