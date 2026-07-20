import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqsSafe } from "@/api/services/faq.service";
import { getVendorsSafe } from "@/api/services/vendor-public.service";
import { getMaterialsSafe } from "@/api/services/material-public.service";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

const VendorsSection = dynamic(() => import("@/components/page_ui/VendorsSection.client"));
const MaterialGrid = dynamic(() => import("@/components/page_ui/MaterialGrid.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const ITEMS_PER_PAGE = 9;

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
          <Suspense fallback={F("py-16 sm:py-24 bg-[#f8fafc] min-h-[520px]")}>
            <VendorsSectionAsync svgUrl={getSvgUrl(svgItems, 0, "/video-gif/truck-loading.svg")} />
          </Suspense>
        </ViewportSection>
      </div>
      <div id="materials">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-white min-h-[400px]")}>
          <Suspense fallback={F("py-16 sm:py-24 bg-white min-h-[400px]")}>
            <MaterialGridAsync svgUrl1={getSvgUrl(svgItems, 1, "/video-gif/school-book.svg")} svgUrl2={getSvgUrl(svgItems, 2, "/video-gif/constuction-worker-building.svg")} />
          </Suspense>
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

async function VendorsSectionAsync({ svgUrl }: { svgUrl?: string }) {
  const res = await getVendorsSafe();
  return <VendorsSection initialVendors={res.results ?? []} svgUrl={svgUrl} />;
}

async function MaterialGridAsync({ svgUrl1, svgUrl2 }: { svgUrl1?: string; svgUrl2?: string }) {
  const res = await getMaterialsSafe({ page: 1, page_size: ITEMS_PER_PAGE });
  return <MaterialGrid initialItems={res.results} initialTotal={res.count} svgUrl1={svgUrl1} svgUrl2={svgUrl2} />;
}

async function MaterialFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  const faqs = await getFaqsSafe({ group__slug: faqGroupSlug, page_size: 20 });
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
