import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

const UnitConverterGrid = dynamic(() => import("@/components/page_ui/UnitConverterGrid.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
}

export function UnitConvertContent({ page, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <div id="converter">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-white min-h-[600px]")}>
          <UnitConverterGrid tapeSvgUrl={getSvgUrl(svgItems, 0, "/video-gif/tape.svg")} buildingSvgUrl={getSvgUrl(svgItems, 1, "/video-gif/Building.svg")} />
        </ViewportSection>
      </div>
      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <UnitConvertFaqInner faqGroupSlug={page.faq_group_slug} />
          </Suspense>
        </ViewportSection>
      )}
      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[200px]")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}

async function UnitConvertFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch((err) => { console.error("Failed to fetch FAQs:", err); return { results: [] }; });
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
