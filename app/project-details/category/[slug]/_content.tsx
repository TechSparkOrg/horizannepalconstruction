import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getProjectsByCategory } from "@/api/services/project.service";
import { getFaqs } from "@/api/services/faq.service";
import { ProjectCard } from "@/components/global_ui/ProjectCard";
import type { ProjectCategoryDetail } from "@/api/types/category.types";

import ParsedContent from "@/lib/ParseContent.server";
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

interface Props {
  detail: ProjectCategoryDetail;
}

export function ProjectCategoryDetailInner({ detail }: Props) {
  return (
    <>
      {/* ── Description ── */}
      {detail.description && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <ParsedContent description={detail.description} />
        </section>
      )}

      {/* ── Projects in this category ── */}
      <CategoryProjects slug={detail.slug} name={detail.name} />

      {/* ── FAQ ── */}
      <Suspense fallback={<div className="py-12 sm:py-16 bg-white min-h-[200px]" />}>
        <CategoryFaq faqSlug={detail.faq_group_slug || detail.slug} />
      </Suspense>
    </>
  );
}

async function CategoryFaq({ faqSlug }: { faqSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqSlug, page_size: 20 }).catch((err) => { console.error("Failed to fetch FAQs:", err); return { results: [] }; });
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  if (faqs.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No FAQ in this category yet.</p>
        </div>
      </section>
    );
  }
  return <FaqClient categorySlug={faqSlug} initialFaqs={faqs} />;
}

async function CategoryProjects({ slug, name }: { slug: string; name: string }) {
  "use cache";
  const res = await getProjectsByCategory(slug).catch((err) => { console.error("Failed to fetch projects by category:", err); return { results: [] }; });
  const projects = res.results ?? [];

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24">
      <style>{`@keyframes card-enter{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-xl mb-10">
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            Projects
          </p>
          <h2 className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em] capitalize"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}>
            {name}
          </h2>
          <p className="mt-3 text-[#64748b] text-[14.5px] leading-relaxed">
            {projects.length} project{projects.length !== 1 ? "s" : ""} in this category.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center py-16 text-[#94a3b8] text-sm">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} delay={i * 60} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
