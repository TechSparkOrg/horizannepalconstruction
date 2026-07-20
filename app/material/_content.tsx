import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { PublicVendor, PublicMaterialItem } from "@/api/types/material.types";
import type { FaqItem } from "@/api/types/faq.types";
import { getSvgUrl } from "@/lib/svg-utils";

const VendorsSection = dynamic(() => import("@/components/page_ui/VendorsSection.client"));
const MaterialGrid = dynamic(() => import("@/components/page_ui/MaterialGrid.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
  bundle: {
    vendors: { results: PublicVendor[] };
    materials: { results: PublicMaterialItem[]; count: number };
    faqs: FaqItem[];
  };
}

export function MaterialContent({ page, svgItems, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const formattedFaqs = formatFaq(bundle.faqs ?? []);

  return (
    <>
      <div id="vendors">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-[#f8fafc] min-h-[520px]")}>
          <VendorsSection initialVendors={bundle.vendors?.results ?? []} svgUrl={getSvgUrl(svgItems, 0, "/video-gif/truck-loading.svg")} />
        </ViewportSection>
      </div>
      <div id="materials">
        <ViewportSection fallback={F("py-16 sm:py-24 bg-white min-h-[400px]")}>
          <MaterialGrid initialItems={bundle.materials?.results ?? []} initialTotal={bundle.materials?.count ?? 0} svgUrl1={getSvgUrl(svgItems, 1, "/video-gif/school-book.svg")} svgUrl2={getSvgUrl(svgItems, 2, "/video-gif/constuction-worker-building.svg")} />
        </ViewportSection>
      </div>
      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <FaqClient categorySlug={page.faq_group_slug} initialFaqs={formattedFaqs} />
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
