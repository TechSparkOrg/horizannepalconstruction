import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { cacheLife } from "next/cache";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getProjects } from "@/api/services/project.service";
import { getPublicProjectCategories } from "@/api/services/category.service";
import { getFaqs } from "@/api/services/faq.service";
import { htmlToText } from "@/lib/htmlToText";
import { ProjectsGrid } from "@/components/page_ui/ProjectsGrid.client";
import type { Page } from "@/api/types/page.types";

const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

interface Props {
  page: Page | null;
}

export function ProjectPageContent({ page }: Props) {
  const F = (className: string) => <div className={className} />;
  const bannerItems = (page?.banner_images ?? []).map((b) => ({
    id: b.id, url: b.url, alt: b.alt ?? b.title ?? "",
  }));

  return (
    <>

      <Suspense fallback={<div className="py-12 bg-[#f8fafc] min-h-[500px]" />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsSection />
      </Suspense>
      {bannerItems.length > 0 && (
        <ImageGrid slug="project-details" initialItems={bannerItems}
          label="Portfolio" heading="Project Gallery"
          description="A visual journey through our completed projects and ongoing works." priority />
      )}


      <ViewportSection fallback={F("min-h-[600px] mx-auto max-w-6xl bg-[#f8fafc]")}>
        <ConsultationForm />
      </ViewportSection>

      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <ProjectFaqInner faqGroupSlug={page.faq_group_slug} />
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

async function CategoriesSection() {
  "use cache";
  cacheLife("hours");
  const categories = await getPublicProjectCategories().catch(() => []);

  if (categories.length === 0) {
    return (
      <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No project categories available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              Project Categories
            </p>
            <h2 className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}>
              Browse by Category
            </h2>
            <p className="mt-3 text-[#64748b] text-[14.5px] leading-relaxed">
              Explore our work across residential, commercial, heritage, and interior projects.
            </p>
          </div>

          <div className="relative shrink-0 w-[200px] h-[150px] hidden md:block select-none" aria-hidden="true">
            <Image src="/video-gif/builds3.svg" alt=""
              fill unoptimized className="object-contain object-center" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#e2e8f0] mb-10"
          style={{ background: "var(--color-light-gray)", gap: "1px" }}>
          {categories.map((cat, i) => {
            const blurb = htmlToText(cat.description);
            return (
              <a key={cat.id} href={`/project-details/category/${cat.slug}`}
                className="group relative flex flex-col gap-3 bg-white p-5 sm:p-6 hover:bg-[#f8faff] transition-colors duration-150">
                <div className="size-10 sm:size-11 rounded-xl flex items-center justify-center bg-[#eff6ff] text-[#0f2557] font-black text-lg group-hover:bg-[#0f2557] group-hover:text-white transition-colors duration-200 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-[#0f2557] leading-snug capitalize">{cat.name}</h3>
                  {blurb && (
                    <p className="text-[12px] text-[#64748b] mt-1.5 leading-relaxed line-clamp-2">{blurb}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View projects <span className="text-lg leading-none">&rarr;</span>
                </div>
                <div className="absolute bottom-0 left-4 right-4 h-px rounded-full bg-[#1d4ed8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

async function ProjectsSection() {
  "use cache";
  cacheLife("default");
  const res = await getProjects().catch(() => ({ results: [] }));
  const projects = res.results ?? [];

  if (projects.length === 0) {
    return (
      <section className="bg-[#f8fafc] py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#94a3b8]">No projects found.</p>
        </div>
      </section>
    );
  }

  return (
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
  );
}

function ProjectsGridSkeleton() {
  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-[#e2e8f0] animate-pulse" />
            <div className="h-8 w-52 rounded-lg bg-[#e2e8f0] animate-pulse" />
          </div>
          <div className="h-8 w-24 rounded-full bg-[#e2e8f0] animate-pulse" />
        </div>
        <div className="flex gap-2 mb-7">
          {[80, 100, 96, 88].map((w, i) => (
            <div key={i} className="h-9 rounded-full bg-[#e2e8f0] animate-pulse" style={{ width: w }} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-[#dde6f8] animate-pulse aspect-[4/3]" />
          ))}
        </div>
      </div>
    </section>
  );
}

async function ProjectFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  cacheLife("default");
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
