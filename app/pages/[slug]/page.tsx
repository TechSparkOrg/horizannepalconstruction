import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlugSafe } from "@/api/services/page.service";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { siteUrl } from "@/lib/constants";
import { CmsPageInner } from "./_content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlugSafe(slug);
  if (!page) return { title: "Page Not Found" };
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || "",
    alternates: { canonical: `${siteUrl}/pages/${slug}` },
    keywords: page.meta_keywords || undefined,
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || "",
      type: "website",
      url: `${siteUrl}/pages/${slug}`,
      images: page.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function PageView({ params }: Props) {

  const { slug } = await params;
  const page = await getPageBySlugSafe(slug);
  if (!page) notFound();

  const banners = page.banner_images ?? [];

  return (
    <>
      <h1 className="sr-only">{page.title}</h1>

      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0f2557]">
        {banners.length > 0 ? (
          <BannerCarousel slug={`${slug}-hero`} carousel
            imgClassName="object-cover opacity-60" initialBanners={banners} />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2557]/40 to-[#0f2557]/70" />
        )}
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-2 text-center">
          <h1 className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>{page.title}</h1>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 bg-white" style={{ minHeight: 600 }} />}>
        <CmsPageInner page={page} />
      </Suspense>
    </>
  );
}
