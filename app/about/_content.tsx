import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { MediaItem } from "@/api/types/media.types";
import { getSvgUrl } from "@/lib/svg-utils";
import { ServicesAsync } from "@/components/sections/homepage-sections";
import { getVendors } from "@/api/services/vendor-public.service";
import { getBanks } from "@/api/services/emi.service";
import { ReviewPublic } from "@/api/services/review.service";
import { CategoryPublic } from "@/api/services/category.service";
import { getFaqsSafe } from "@/api/services/faq.service";
import { getTeam } from "@/api/services/team.service";
import { PartnersSection } from "@/components/page_ui/PartnersSection";
import type { PublicVendor } from "@/api/types/material.types";
import type { EmiBank } from "@/api/types/emi.types";
import { TestimonialsSection } from "@/components/global_ui/TestimonialsSection";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import FaqClient from "@/components/global_ui/FaqClient";
import { TeamSection } from "@/components/global_ui/TeamSection";

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })));
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));
import ParsedContent from "@/lib/ParseContent.server";

async function AboutPartnersAsync({ svgUrl }: { svgUrl?: string } = {}) {
  const [vRes, bRes] = await Promise.all([
    getVendors().catch((err) => { console.error("Failed to fetch vendors:", err); return { results: [] as PublicVendor[] }; }),
    getBanks().catch((err) => { console.error("Failed to fetch banks:", err); return [] as EmiBank[]; }),
  ]);
  return (
    <PartnersSection
      initialVendors={vRes.results ?? []}
      initialBanks={bRes as EmiBank[]}
      svgUrl={svgUrl}
    />
  );
}

async function AboutReviewsAsync({ svgUrl }: { svgUrl?: string } = {}) {
  const reviews = await ReviewPublic.list().catch((err) => { console.error("Failed to fetch reviews:", err); return { results: [] }; });
  return <TestimonialsSection initialReviews={reviews.results} svgUrl={svgUrl} />;
}

async function AboutConsultAsync({ headerSvgUrl, emailSvgUrl }: { headerSvgUrl?: string; emailSvgUrl?: string } = {}) {
  const cats = await CategoryPublic.list().catch((err) => { console.error("Failed to fetch categories:", err); return { results: [] }; });
  return <ConsultationForm initialCategories={cats.results} headerSvgUrl={headerSvgUrl} emailSvgUrl={emailSvgUrl} />;
}

async function AboutFaqAsync({ faqGroupSlug }: { faqGroupSlug: string }) {
  const faqs = await getFaqsSafe({ group__slug: faqGroupSlug, page_size: 10 });
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

async function AboutTeamAsync({ svgUrl }: { svgUrl?: string } = {}) {
  const res = await getTeam().catch((err) => { console.error("Failed to fetch team:", err); return { results: [] }; });
  return <TeamSection members={res.results} svgUrl={svgUrl} />;
}

interface Props {
  page: Page | null;
  gallery: MediaItem[];
  svgItems?: PageSvgItem[];
}

export function AboutContent({ page, gallery, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-white")}>
        <AboutTabs />
      </ViewportSection>
      <ViewportSection fallback={F("py-20 bg-white")}>
        <Suspense fallback={F("py-20 bg-white")}>
          <ServicesAsync svgUrl={getSvgUrl(svgItems, 0, "/video-gif/in-progress.svg")} />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-[#f8fafc]")}>
        <Suspense fallback={F("py-16 sm:py-28 bg-[#f8fafc]")}>
          <AboutTeamAsync svgUrl={getSvgUrl(svgItems, 1, "/video-gif/work-team.svg")} />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <Suspense fallback={F("py-16 sm:py-24 bg-white")}>
          <AboutPartnersAsync svgUrl={getSvgUrl(svgItems, 2, "/video-gif/Business.svg")} />
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
          <AboutReviewsAsync svgUrl={getSvgUrl(svgItems, 3, "/video-gif/review-animation.svg")} />
        </Suspense>
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <Suspense fallback={F("py-16 sm:py-24 bg-white")}>
          <AboutConsultAsync
            headerSvgUrl={getSvgUrl(svgItems, 4, "/video-gif/customer-inquires.svg")}
            emailSvgUrl={getSvgUrl(svgItems, 5, "/video-gif/email.svg")}
          />
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
