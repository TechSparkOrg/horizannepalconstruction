import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

const CostEstimator = dynamic(() => import("@/components/page_ui/CostEstimator").then(m => ({ default: m.CostEstimator })));
import ParsedContent from "@/lib/ParseContent.server";

interface Props { page: Page | null; svgItems?: PageSvgItem[] }

export function CostContent({ page, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;
  return (
    <>
      <ViewportSection fallback={F("min-h-[600px] bg-white")}>
        <CostEstimator svgUrl1={getSvgUrl(svgItems, 0, "/video-gif/plan-making.svg")} svgUrl2={getSvgUrl(svgItems, 1, "/video-gif/coming-soon.svg")} />
      </ViewportSection>
      {page?.content && (
        <ViewportSection fallback={F("max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 min-h-[200px]")}>
          <ParsedContent description={page.content} />
        </ViewportSection>
      )}
    </>
  );
}
