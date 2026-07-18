import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqsSafe } from "@/api/services/faq.service";
import type { BuildingPermitConfig } from "@/api/types/building-permit.types";
import type { Page } from "@/api/types/page.types";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { RegulationsGrid } from "./RegulationsGrid";
import { MunicipalityTable } from "./MunicipalityTable";

const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  config: BuildingPermitConfig;
  page: Page | null;
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
}

export function BuildingPermitContent({ config, page, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;

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
          <BPFaqInner faqGroupSlug={page.faq_group_slug} />
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

async function BPFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  const faqs = await getFaqsSafe({ group__slug: faqGroupSlug, page_size: 20 });
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
