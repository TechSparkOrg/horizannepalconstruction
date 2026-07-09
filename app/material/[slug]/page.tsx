import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMaterialBySlug } from "@/api/services/material-public.service";
import { stripHtml } from "@/lib/extractTocItems";
import { getSiteUrl } from "@/lib/seo-utils";
import { LdJson } from "@/components/global_ui/JsonLd";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import { MaterialDetailClient } from "./_client";

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getMaterialBySlug(slug).catch(() => null);
  if (!item) return { title: "Material Not Found" };

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/material/${slug}`;
  const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.name;
  const ogImage = item.banner_images?.[0]?.url || item.logo || undefined;

  return {
    title: item.meta_title || `${item.name} | Horizan Nepal`,
    description,
    alternates: { canonical: url },
    ...(item.meta_keywords ? { keywords: item.meta_keywords } : {}),
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
  const item = await getMaterialBySlug(slug).catch(() => null);
  if (!item) notFound();

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/material/${slug}`;
  const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.name;
  const ogImage = item.banner_images?.[0]?.url || item.logo || undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Materials", item: `${siteUrl}/material` },
      { "@type": "ListItem", position: 3, name: item.name, item: url },
    ],
  };

  const productSchema: Record<string, unknown> = {
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
        ...(item.company && {
          seller: { "@type": "Organization", name: item.company.name },
        }),
      },
    }),
  };

  return (
    <>
      <LazyAiBot />
      <LdJson data={breadcrumbSchema} />
      <LdJson data={productSchema} />
      <h1 className="sr-only">{item.name}</h1>
      <MaterialDetailClient item={item} slug={slug} />
    </>
  );
}
