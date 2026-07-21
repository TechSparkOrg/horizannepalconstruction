import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUnitConversionBySlugSafe } from "@/api/services/unit-converter-public.service";
import { getFaqsByGroupSlugSafe } from "@/api/services/faq.service";
import { stripHtml } from "@/lib/extractTocItems";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import type { MediaItem } from "@/api/types/media.types";
import type { PublicUnitConversionDetail } from "@/api/types/unit-converter.types";
import { siteUrl } from "@/lib/constants";
import { UnitConvertDetailContent } from "./_content";

interface Props {
  params: Promise<{ slug: string }>;
}

function getMeta(item: PublicUnitConversionDetail, slug: string) {
  const url = `${siteUrl}/unit-convert/${slug}`;
  const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.title;
  const ogImage = item.banner_images?.[0]?.url || undefined;
  return { url, description, ogImage };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getUnitConversionBySlugSafe(slug);
  if (!item) return { title: "Not Found", robots: { index: false } };

  const { url, description, ogImage } = getMeta(item, slug);

  return {
    title: item.meta_title || `${item.title} | Horizan Nepal`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: item.meta_title || item.title,
      description,
      type: "article",
      url,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: item.meta_title || item.title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function UnitConvertDetailPage({ params }: Props) {

  const { slug } = await params;
  const item = await getUnitConversionBySlugSafe(slug);
  if (!item) notFound();

  const faqs = item.faq_group_slug ? await getFaqsByGroupSlugSafe(item.faq_group_slug) : [];

  const { url } = getMeta(item, slug);

  const bannerImages: MediaItem[] = (item.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: item.title,
    title: b.name,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Unit Converter", item: `${siteUrl}/unit-convert` },
      { "@type": "ListItem", position: 3, name: item.title, item: url },
    ],
  };

  return (
    <>
      <LazyAiBot />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="sr-only">{item.title}</h1>
      {bannerImages.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[56svh] sm:min-h-[62svh] flex items-end">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />

        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-10 sm:pb-14 pt-28">
          <div className="max-w-[600px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4 text-[11px] text-white/50 flex-wrap">
              <a href="/" className="hover:text-white/90 transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/unit-convert" className="hover:text-white/90 transition-colors">Unit Converter</a>
              <span aria-hidden="true">/</span>
              <span className="text-white/80 truncate max-w-[200px]">{item.title}</span>
            </nav>
            <h1 className="font-display font-black text-white leading-tight tracking-[-0.02em] mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>{item.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center h-8 px-4 bg-[#cd2028] text-white text-[13px] font-bold rounded-full">
                Base: {item.base_unit}
              </span>
              {item.conversions.length > 0 && (
                <span className="inline-flex items-center h-8 px-4 bg-white/10 border border-white/20 text-white/80 text-[13px] font-medium rounded-full">
                  {item.conversions.length} conversion{item.conversions.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 1050 }} />}>
        <UnitConvertDetailContent item={item} faqs={faqs} />
      </Suspense>
    </>
  );
}
