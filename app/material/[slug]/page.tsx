import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { stripHtml } from "@/lib/extractTocItems";
import { LdJson } from "@/components/global_ui/JsonLd";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import type { MediaItem } from "@/api/types/media.types";
import type { PublicMaterialDetail } from "@/api/types/material.types";
import type { FaqItem } from "@/api/types/faq.types";
import { MaterialDetailContent } from "./_content";

import { siteUrl } from "@/lib/constants";

interface MaterialDetailBundle {
  material_detail: PublicMaterialDetail;
  faqs: FaqItem[];
}

interface Props {
  params: Promise<{ slug: string }>;
}


function getMeta(item: PublicMaterialDetail, slug: string) {
  const url = `${siteUrl}/material/${slug}`;
  const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.name;
  const ogImage = item.banner_images?.[0]?.url || item.logo || undefined;
  return { url, description, ogImage };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await getPageBundle<MaterialDetailBundle>(slug, "material/[slug]");
  const item = bundle.material_detail;
  if (!item) return { title: "Material Not Found" };

  const { url, description, ogImage } = getMeta(item, slug);

  return {
    title: item.meta_title || `${item.name} | Horizan Nepal`,
    description,
    alternates: { canonical: url },
    keywords: item.meta_keywords || undefined,
    openGraph: {
      title: item.meta_title || item.name,
      description,
      type: "article",
      url,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: item.meta_title || item.name,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function MaterialDetailPage({ params }: Props) {

  const { slug } = await params;
  const bundle = await getPageBundle<MaterialDetailBundle>(slug, "material/[slug]");
  const item = bundle.material_detail;
  if (!item) notFound();

  const { url, description, ogImage } = getMeta(item, slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description,
    ...(ogImage && { image: ogImage }),
    ...(item.price_per_unit && {
      offers: {
        "@type": "Offer",
        priceCurrency: "NPR",
        price: item.price_per_unit,
        availability: "https://schema.org/InStock",
        url,
        ...(item.company && { seller: { "@type": "Organization", name: item.company.name } }),
      },
    }),
  };

  const bannerImages: MediaItem[] = (item.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: item.name,
    title: b.name,
  }));

  return (
    <>
      <LazyAiBot />
      <LdJson data={productSchema} />
      <h1 className="sr-only">{item.name}</h1>
      {bannerImages.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[62svh] sm:min-h-[68svh] flex items-end">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />

        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16 pt-28">
          <div className="max-w-[600px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-[11px] text-white/50 flex-wrap">
              <a href="/" className="hover:text-white/90 transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/material" className="hover:text-white/90 transition-colors">Materials</a>
              <span aria-hidden="true">/</span>
              <span className="text-white/80 truncate max-w-[200px]">{item.name}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              {item.logo && (
                <div className="size-12 shrink-0 rounded-xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                  <Image src={item.logo} alt={`${item.name} logo`}
                    width={44} height={44}
                    className="object-contain p-1.5 w-full h-full" style={{ height: "auto" }} />
                </div>
              )}
              <h1 className="font-display font-black text-white leading-tight tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>{item.name}</h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {item.price_per_unit && (
                <span className="inline-flex items-center h-8 px-4 bg-[#cd2028] text-white text-[13px] font-bold rounded-full">
                  Rs.&nbsp;{item.price_per_unit}{item.unit_value ? ` /${item.unit_value}` : ""}
                </span>
              )}
              {item.company && (
                <span className="inline-flex items-center h-8 px-4 bg-white/10 border border-white/20 text-white/80 text-[13px] font-medium rounded-full">
                  {item.company.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 1200 }} />}>
        <MaterialDetailContent item={item} faqs={bundle.faqs} />
      </Suspense>
    </>
  );
}
