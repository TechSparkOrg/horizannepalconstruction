import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page } from "@/api/types/page.types";
import type { FaqItem } from "@/api/types/faq.types";

const FloorPlanner = dynamic(() => import("@/components/page_ui/FloorPlanner"));
const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  page: Page | null;
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
  bundle: { faqs: FaqItem[] };
}

export function FloorPlannerContent({ page, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const formattedFaqs = formatFaq(bundle.faqs);

  return (
    <>
      <section id="planner" className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Interactive Tool</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Design Your Floor Plan</h2>
            <p className="mt-3 text-[14px] text-[#64748b] max-w-[440px] mx-auto leading-relaxed">
              Draw rooms, place walls, add stairs and furniture — then export your plan.
            </p>
          </div>
          <FloorPlanner />
        </div>
      </section>

      {page?.banner_images && page.banner_images.length > 0 && (
        <ViewportSection fallback={F("py-16 sm:py-24 bg-[#f8fafc] min-h-[400px]")}>
          <ImageGrid slug="floor-planner-gallery" initialItems={page.banner_images} label="Gallery" heading="Project Gallery" description="Browse our completed floor plans and construction projects." />
        </ViewportSection>
      )}

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
            <BlogContent content={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}
