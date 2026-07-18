import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqsSafe } from "@/api/services/faq.service";
import { getBlogsByCategorySafe } from "@/api/services/blog.service";
import { getProjectsByCategorySafe } from "@/api/services/project.service";
import Link from "next/link";
import Image from "next/image";
import type { ServiceCategoryDetail } from "@/api/types/category.types";

import ParsedContent from "@/lib/ParseContent.server";
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
const BlogCard = dynamic(() => import("@/components/global_ui/BlogCard").then(m => ({ default: m.BlogCard })));

interface Props {
  detail: ServiceCategoryDetail;
}

export function ServiceDetailInner({ detail }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      {/* ── Description ── */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ParsedContent description={detail.description} />
      </section>

      {/* ── Roles & Attributes ── */}
      {((detail.roles?.length ?? 0) > 0 || (detail.attributes?.length ?? 0) > 0) && (
        <section className="bg-[#f8fafc] py-16 sm:py-20">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {(detail.roles?.length ?? 0) > 0 && (
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Roles</p>
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(detail.roles ?? []).map((r) => (
                    <span key={r.id} className="px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[13px] font-medium text-[#0f2557]">{r.name}</span>
                  ))}
                </div>
              </div>
            )}
            {(detail.attributes?.length ?? 0) > 0 && (
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Attributes</p>
                  <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(detail.attributes ?? []).map((a) => (
                    <span key={a.id} className="px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-[13px] font-medium text-[#64748b]">{a.name}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Blog Categories ── */}
      {detail.blog_categories?.map((cat) => (
        <ViewportSection key={cat.slug} fallback={F("py-12 sm:py-16 bg-white min-h-[300px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[300px]")}>
            <BlogCatSection categorySlug={cat.slug} categoryName={cat.name} />
          </Suspense>
        </ViewportSection>
      ))}

      {/* ── Project Categories ── */}
      {detail.project_categories?.map((cat) => (
        <ViewportSection key={cat.slug} fallback={F("py-12 sm:py-16 bg-[#f8fafc] min-h-[300px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-[#f8fafc] min-h-[300px]")}>
            <ProjectCatSection categorySlug={cat.slug} categoryName={cat.name} />
          </Suspense>
        </ViewportSection>
      ))}

      {/* ── FAQ ── */}
      <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
        <ServiceFaqInner faqSlug={detail.faq_group_slug ?? detail.slug} />
      </Suspense>
    </>
  );
}

async function BlogCatSection({ categorySlug, categoryName }: { categorySlug: string; categoryName: string }) {
  const posts = (await getBlogsByCategorySafe(categorySlug)).slice(0, 4);
  if (posts.length === 0) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No blog posts in this category yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Blog</p>
          <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-[#0f2557] text-2xl mb-6">{categoryName}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.slug || post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

async function ProjectCatSection({ categorySlug, categoryName }: { categorySlug: string; categoryName: string }) {
  const projects = (await getProjectsByCategorySafe(categorySlug)).slice(0, 4);
  if (projects.length === 0) {
    return (
      <section className="bg-[#f8fafc] py-12 sm:py-16">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No projects in this category yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8fafc] py-12 sm:py-16">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Projects</p>
          <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
        </div>
        <h2 className="font-display font-bold text-[#0f2557] text-2xl mb-6">{categoryName}</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <Link key={p.slug} href={`/project-details/${p.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-md transition-shadow">
              {p.thumbnail && (
                <div className="relative aspect-video overflow-hidden bg-[#f1f5f9]">
                  <Image src={p.thumbnail} alt={p.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-[#0f2557] text-[15px] leading-snug mb-2 group-hover:text-[#cd2028] transition-colors">{p.title}</h3>
                {p.description && <p className="text-[13px] text-[#64748b] leading-relaxed line-clamp-2">{p.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

async function ServiceFaqInner({ faqSlug }: { faqSlug: string }) {
  const faqs = await getFaqsSafe({ group__slug: faqSlug, page_size: 20 });
  return <FaqClient categorySlug={faqSlug} initialFaqs={faqs} />;
}
