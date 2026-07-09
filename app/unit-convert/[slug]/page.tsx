import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUnitConversionBySlug } from "@/api/services/unit-converter-public.service";
import { stripHtml } from "@/lib/extractTocItems";
import { getSiteUrl } from "@/lib/seo-utils";
import { LdJson } from "@/components/global_ui/JsonLd";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import { UnitConvertDetailClient } from "./_client";

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getUnitConversionBySlug(slug);
    if (!item) return { title: "Not Found", robots: { index: false } };

    const siteUrl = getSiteUrl()
    const url = `${siteUrl}/unit-convert/${slug}`
    const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.title;
    const ogImage = item.banner_images?.[0]?.url || undefined;

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
  } catch {
    return { title: "Not Found", robots: { index: false } };
  }
}

export default async function UnitConvertDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getUnitConversionBySlug(slug).catch(() => null);
  if (!item) notFound();

  const siteUrl = getSiteUrl()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Unit Converter", item: `${siteUrl}/unit-convert` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${siteUrl}/unit-convert/${slug}` },
    ],
  };

  return (
    <>
      <LazyAiBot />
      <LdJson data={breadcrumbSchema} />
      <h1 className="sr-only">{item.title}</h1>
      <UnitConvertDetailClient item={item} slug={slug} />
    </>
  );
}
