import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { DesignShowcaseSection } from "@/components/page_ui/DesignShowcaseSection";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { FaqItem } from "@/api/types/faq.types";
import { getSvgUrl } from "@/lib/svg-utils";

const Design3DShowcase = dynamic(() => import("@/components/page_ui/Design3DShowcase").then(m => ({ default: m.Design3DShowcase })));
const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then(m => ({ default: m.ImageGrid })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then(m => ({ default: m.ConsultationForm })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  page: Page | null;
  modelCards: { key: string; src: string; title: string; subtitle?: string; href?: string }[];
  categories: { id: string; name: string; slug: string }[];
  svgItems?: PageSvgItem[];
  bundle: { faqs: FaqItem[] };
}

export function DesignContent({ page, modelCards, categories, svgItems, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const bannerItems = (page?.banner_images ?? []).map((b) => ({
    id: b.id, url: b.url, alt: b.alt ?? b.title ?? "",
  }));
  const formattedFaqs = formatFaq(bundle.faqs ?? []);

  return (
    <>
      <DesignShowcaseSection />

      <ViewportSection fallback={F("bg-off-white py-16 sm:py-28 min-h-[600px]")}>
        <Design3DShowcase initialItems={modelCards} />
      </ViewportSection>

      {bannerItems.length > 0 && (
        <ViewportSection fallback={F("bg-white py-16 min-h-[400px]")}>
          <ImageGrid slug="design" initialItems={bannerItems}
            label="Portfolio" heading="Design Gallery"
            description="Browse through our design portfolio showcasing architectural concepts and 3D visualizations." priority />
        </ViewportSection>
      )}

      <ViewportSection fallback={F("min-h-[600px] mx-auto max-w-6xl bg-[#f8fafc]")}>
        <ConsultationForm initialCategories={categories} headerSvgUrl={getSvgUrl(svgItems, 0, "/video-gif/customer-inquires.svg")} emailSvgUrl={getSvgUrl(svgItems, 1, "/video-gif/email.svg")} />
      </ViewportSection>

      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <FaqClient categorySlug={page.faq_group_slug} initialFaqs={formattedFaqs} />
          </Suspense>
        </ViewportSection>
      )}

      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[300px]")}>
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}
