import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { ProjectCategoriesGrid } from "@/components/page_ui/ProjectCategoriesGrid";
import { ProjectsGrid } from "@/components/page_ui/ProjectsGrid.client";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { Project } from "@/api/types/project.types";
import type { FaqItem } from "@/api/types/faq.types";
import { getSvgUrl } from "@/lib/svg-utils";

const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
  bundle: { projects: Project[]; faqs: FaqItem[] };
}

export function ProjectPageContent({ page, svgItems, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const bannerItems = (page?.banner_images ?? []).map((b) => ({
    id: b.id, url: b.url, alt: b.alt ?? b.title ?? "",
  }));
  const projects = bundle.projects ?? [];
  const formattedFaqs = formatFaq(bundle.faqs ?? []);

  return (
    <>
      <Suspense fallback={<div className="py-12 bg-[#f8fafc] min-h-[500px]" />}>
        <ProjectCategoriesGrid svgUrl={getSvgUrl(svgItems, 0, "/video-gif/builds3.svg")} />
      </Suspense>

      {projects.length === 0 ? (
        <section className="bg-[#f8fafc] py-14 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-[#94a3b8]">No projects found.</p>
          </div>
        </section>
      ) : (
        <section className="bg-[#f8fafc] pb-16 sm:pb-24">
          <style>{`@keyframes card-enter{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}`}</style>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <h3 className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase flex items-center gap-2">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />All Projects
              </h3>
              <div className="shrink-0 rounded-full bg-white border border-[#e2e8f0] px-4 py-2 text-[12px] font-bold text-[#0f2557]">
                {projects.length} Projects
              </div>
            </div>
            <ProjectsGrid projects={projects} />
          </div>
        </section>
      )}

      {bannerItems.length > 0 && (
        <ImageGrid slug="project-details" initialItems={bannerItems}
          label="Portfolio" heading="Project Gallery"
          description="A visual journey through our completed projects and ongoing works." priority />
      )}

      <ViewportSection fallback={F("min-h-[600px] mx-auto max-w-6xl bg-[#f8fafc]")}>
        <ConsultationForm headerSvgUrl={getSvgUrl(svgItems, 1, "/video-gif/customer-inquires.svg")} emailSvgUrl={getSvgUrl(svgItems, 2, "/video-gif/email.svg")} />
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
