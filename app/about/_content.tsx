import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { MediaItem } from "@/api/types/media.types";
import type { ServiceCategory } from "@/api/types/category.types";
import type { TeamMember } from "@/api/types/team.types";
import type { PublicVendor } from "@/api/types/material.types";
import type { EmiBank } from "@/api/types/emi.types";
import type { Review } from "@/api/types/review.types";
import type { Category } from "@/api/types/category.types";
import type { FaqItem } from "@/api/types/faq.types";
import { getSvgUrl } from "@/lib/svg-utils";
import { ServicesSection } from "@/components/global_ui/ServicesSection";
import { PartnersSection } from "@/components/page_ui/PartnersSection";
import { TestimonialsSection } from "@/components/global_ui/TestimonialsSection";
import { ConsultationForm } from "@/components/global_ui/ConsultationForm";
import FaqClient from "@/components/global_ui/FaqClient";
import { TeamSection } from "@/components/global_ui/TeamSection";

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })));
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  page: Page | null;
  gallery: MediaItem[];
  svgItems?: PageSvgItem[];
  services: ServiceCategory[];
  team: { results: TeamMember[] };
  vendors: { results: PublicVendor[] };
  banks: EmiBank[];
  reviews: { results: Review[] };
  categories: { results: Category[] };
  faqs: FaqItem[];
}

const formatFaq = (items?: FaqItem[]) =>
  (items ?? []).map((f) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" }));

export function AboutContent({ page, gallery, svgItems, services, team, vendors, banks, reviews, categories, faqs }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-white")}>
        <AboutTabs />
      </ViewportSection>
      <ViewportSection fallback={F("py-20 bg-white")}>
        <ServicesSection initialServices={services} svgUrl={getSvgUrl(svgItems, 0, "/video-gif/in-progress.svg")} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-28 bg-[#f8fafc]")}>
        <TeamSection members={team.results ?? []} svgUrl={getSvgUrl(svgItems, 1, "/video-gif/work-team.svg")} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <PartnersSection initialVendors={vendors.results ?? []} initialBanks={banks} svgUrl={getSvgUrl(svgItems, 2, "/video-gif/Business.svg")} />
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
        <TestimonialsSection initialReviews={reviews.results} svgUrl={getSvgUrl(svgItems, 3, "/video-gif/review-animation.svg")} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <ConsultationForm initialCategories={categories.results} headerSvgUrl={getSvgUrl(svgItems, 4, "/video-gif/customer-inquires.svg")} emailSvgUrl={getSvgUrl(svgItems, 5, "/video-gif/email.svg")} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <LocationSection />
      </ViewportSection>
      {faqs.length > 0 && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white")}>
          <FaqClient categorySlug={page?.faq_group_slug ?? "about"} initialFaqs={formatFaq(faqs)} />
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
