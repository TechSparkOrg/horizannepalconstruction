import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectCategoryDetail } from "@/api/services/category.service";
import { stripHtml } from "@/lib/extractTocItems";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import { ProjectCategoryDetailInner } from "./_content";

interface Props {
  params: Promise<{ slug: string }>;
}

import { siteUrl } from "@/lib/constants";
const getDetail = cache(async (slug: string) => getProjectCategoryDetail(slug).catch((err) => { console.error("Failed to fetch project category detail:", err); return null; }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getDetail(slug);
  if (!detail) return {};
  const url = `${siteUrl}/project-details/category/${slug}`;
  const desc = detail.meta_description || stripHtml(detail.description).substring(0, 160);
  const ogImage = detail.banner_images?.[0]?.url || detail.image;
  return {
    title: detail.meta_title || `${detail.name} | Horizan Nepal`,
    description: desc,
    keywords: detail.meta_keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: detail.meta_title || detail.name,
      description: desc,
      type: "website",
      url,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function ProjectCategoryDetailPage({ params }: Props) {
  "use cache";

  const { slug } = await params;
  const detail = await getDetail(slug);
  if (!detail) notFound();

  const heroImg = detail.banner_images?.[0]?.url || detail.image;

  return (
    <>
      <h1 className="sr-only">{detail.name}</h1>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        {heroImg && (
          <Image src={heroImg} alt={`${detail.name} banner`}
            fill className="object-cover opacity-50" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3d]/95 via-[#0f2557]/50 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] z-20 hidden lg:block" aria-hidden="true" />

        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-18 pt-32">
          <Link href="/project-details"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="size-3.5" />
            All Projects
          </Link>

          <div className="flex items-center gap-2.5 mb-4">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#cd2028]">Project Category</span>
          </div>
          <h1 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>{detail.name}</h1>
        </div>
      </section>
   <LazyAiBot />
      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 1100 }} />}>
        <ProjectCategoryDetailInner detail={detail} />
      </Suspense>

   
    </>
  );
}
