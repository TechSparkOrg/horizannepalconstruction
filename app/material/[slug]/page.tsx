import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMaterialBySlug } from "@/api/services/material-public.service";
import { stripHtml } from "@/lib/extractTocItems";
import { MaterialDetailClient } from "./_client";

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getMaterialBySlug(slug).catch(() => null);
  if (!item) return { title: "Material Not Found" };
  const description = item.meta_description || stripHtml(item.description || "").slice(0, 160) || item.name;
  const ogImage = item.banner_images?.[0]?.url || item.logo || undefined;
  return {
    title: item.meta_title || item.name,
    description,
    openGraph: {
      title: item.meta_title || item.name,
      description,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = await getMaterialBySlug(slug).catch(() => null);
  if (!item) notFound();

  return (
    <>
      <h1 className="sr-only">{item.name}</h1>
      <MaterialDetailClient item={item} slug={slug} />
    </>
  );
}
