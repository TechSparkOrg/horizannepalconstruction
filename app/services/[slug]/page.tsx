import { Suspense, cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServiceCategoryDetail } from "@/api/services/category.service";
import { stripHtml } from "@/lib/extractTocItems";
import { siteUrl } from "@/lib/constants";
import { ServiceDetailInner } from "./_content";

interface Props {
  params: Promise<{ slug: string }>;
}

const getDetail = cache(async (slug: string) => getServiceCategoryDetail(slug).catch((err) => { console.error("Failed to fetch service category detail:", err); return null; }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getDetail(slug);
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
  const detail = await getDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <h1 className="sr-only">{detail.name}</h1>

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
        <ServiceDetailInner detail={detail} />
      </Suspense>
    </>
  );
}
