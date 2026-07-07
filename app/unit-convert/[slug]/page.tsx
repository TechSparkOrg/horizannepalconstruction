import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUnitConversionBySlug } from "@/api/services/unit-converter-public.service";
import { stripHtml } from "@/lib/extractTocItems";
import { UnitConvertDetailClient } from "./_client";

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const item = await getUnitConversionBySlug(slug);
    if (!item) return { title: "Not Found" };
    const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.title;
    const ogImage = item.banner_images?.[0]?.url || undefined;
    return {
      title: item.meta_title || item.title,
      description,
      openGraph: {
        title: item.meta_title || item.title,
        description,
        type: "article",
        ...(ogImage && { images: [{ url: ogImage }] }),
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function UnitConvertDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = await getUnitConversionBySlug(slug).catch(() => null);
  if (!item) notFound();

  return (
    <>
      <h1 className="sr-only">{item?.title}</h1>
      <UnitConvertDetailClient item={item} slug={slug} />
    </>
  );
}
