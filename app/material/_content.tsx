import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

const VendorsSection = dynamic(() => import("@/components/page_ui/VendorsSection.client"));
const MaterialGrid = dynamic(() => import("@/components/page_ui/MaterialGrid.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
}

export function MaterialContent({ page, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <div id="vendors">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-[#f8fafc] min-h-[520px]")}>
          <VendorsSection svgUrl={getSvgUrl(svgItems, 0, "/video-gif/truck-loading.svg")} />
        </ViewportSection>
      </div>
      <div id="materials">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-white min-h-[400px]")}>
          <MaterialGrid svgUrl1={getSvgUrl(svgItems, 1, "/video-gif/school-book.svg")} svgUrl2={getSvgUrl(svgItems, 2, "/video-gif/constuction-worker-building.svg")} />
        </ViewportSection>
      </div>
      {page?.faq_group_slug && (
        <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <MaterialFaqInner faqGroupSlug={page.faq_group_slug} />
        </Suspense>
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

async function MaterialFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
