import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { BuildingPermitConfig } from "@/api/types/building-permit.types";
import type { Page } from "@/api/types/page.types";
import type { FaqItem } from "@/api/types/faq.types";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { RegulationsGrid } from "./RegulationsGrid";
import { MunicipalityTable } from "./MunicipalityTable";

const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  config: BuildingPermitConfig;
  page: Page | null;
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
  bundle: { faqs: FaqItem[] };
}

export function BuildingPermitContent({ config, page, svgItems, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const formattedFaqs = formatFaq(bundle.faqs);

  return (
    <>
      <WorkflowTimeline steps={config.workflow_steps} svgItems={svgItems} />
      <ViewportSection fallback={F("py-16 sm:py-24 bg-[#f8fafc]")}>
        <RegulationsGrid items={config.regulation_items} svgItems={svgItems} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <MunicipalityTable items={config.municipality_items} svgItems={svgItems} />
      </ViewportSection>
      {page?.faq_group_slug && (
        <Suspense fallback={F("py-12 sm:py-16 bg-white")}>
          <FaqClient categorySlug={page.faq_group_slug} initialFaqs={formattedFaqs} />
        </Suspense>
      )}
      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-white")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}
