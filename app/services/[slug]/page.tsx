import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { stripHtml } from "@/lib/extractTocItems";
import { siteUrl } from "@/lib/constants";
import { getServiceCategoryDetailSafe } from "@/api/services/category.service";
import { getBlogsByCategorySafe } from "@/api/services/blog.service";
import { getProjectsByCategorySafe } from "@/api/services/project.service";
import { getFaqsByGroupSlugSafe } from "@/api/services/faq.service";
import { ServiceDetailInner } from "./_content";
import type { ServiceCategoryDetail } from "@/api/types/category.types";
import type { BlogPost } from "@/api/types/blog.types";
import type { Project } from "@/api/types/project.types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getServiceCategoryDetailSafe(slug);
  if (!detail) return {};
  return {
    title: detail.meta_title || `${detail.name} | Horizan Nepal`,
    description: detail.meta_description || stripHtml(detail.description).substring(0, 160),
    alternates: { canonical: `${siteUrl}/services/${slug}` },
    openGraph: {
      title: detail.meta_title || detail.name,
      description: detail.meta_description || stripHtml(detail.description).substring(0, 160),
      type: "website",
      url: `${siteUrl}/services/${slug}`,
      images: detail.banner_images?.[0]?.url ? [{ url: detail.banner_images[0].url }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const detail = await getServiceCategoryDetailSafe(slug);
  if (!detail) notFound();

  const [blog_categories, projects_by_category, faqs] = await Promise.all([
    fetchGroupedByCategory(detail.blog_categories, getBlogsByCategorySafe),
    fetchGroupedByCategory(detail.project_categories, getProjectsByCategorySafe),
    detail.faq_group_slug ? getFaqsByGroupSlugSafe(detail.faq_group_slug) : Promise.resolve([] as import("@/api/types/faq.types").FaqItem[]),
  ]);

  const bundle = { blog_categories, projects_by_category, faqs };

  return (
    <>
      <h1 className="sr-only">{detail.name}</h1>
      {detail.banner_images?.[0]?.url && <link rel="preload" as="image" href={detail.banner_images[0].url} />}

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        {detail.banner_images?.[0]?.url && (
          <Image src={detail.banner_images[0].url} alt={`${detail.name} banner`}
            fill className="object-cover opacity-50" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3d]/95 via-[#0f2557]/50 to-transparent" />
        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-18 pt-32">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Services</span>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h1 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>{detail.name}</h1>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 1000 }} />}>
        <ServiceDetailInner detail={detail} bundle={bundle} />
      </Suspense>
    </>
  );
}

async function fetchGroupedByCategory<T>(
  cats: { name: string; slug: string }[] | undefined,
  fetcher: (slug: string) => Promise<T[]>,
): Promise<Record<string, T[]>> {
  if (!cats || cats.length === 0) return {};
  const results = await Promise.all(cats.map((c) => fetcher(c.slug)));
  const grouped: Record<string, T[]> = {};
  cats.forEach((c, i) => {
    grouped[c.slug] = results[i];
  });
  return grouped;
}
