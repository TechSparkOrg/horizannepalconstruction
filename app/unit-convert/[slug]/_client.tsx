"use client"

import dynamic from "next/dynamic"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import UnitConverterWidget from "@/components/page_ui/UnitConverterWidget.client"
import type { PublicUnitConversionDetail } from "@/api/types/unit-converter.types"
import type { MediaItem } from "@/api/types/media.types"

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"))
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"))
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"))

export function UnitConvertDetailClient({
  item,
  slug,
}: {
  item: PublicUnitConversionDetail
  slug: string
}) {
  const bannerImages: MediaItem[] = (item.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: item.title,
    title: b.name,
  }))

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[56svh] sm:min-h-[62svh] flex items-end">
        <BannerCarousel
          initialBanners={bannerImages}
          slug={slug}
          overlay="linear-gradient(to top, rgba(15,37,87,0.95) 0%, rgba(15,37,87,0.55) 40%, rgba(15,37,87,0.15) 100%)"
          carousel={bannerImages.length > 1}
          imgClassName="object-cover"
        />

        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />

        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-10 sm:pb-14 pt-28">
          <div className="max-w-[600px]">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4 text-[11px] text-white/50 flex-wrap">
              <a href="/" className="hover:text-white/90 transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/unit-convert" className="hover:text-white/90 transition-colors">Unit Converter</a>
              <span aria-hidden="true">/</span>
              <span className="text-white/80 truncate max-w-[200px]">{item.title}</span>
            </nav>

            <h2
              className="font-display font-black text-white leading-tight tracking-[-0.02em] mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              {item.title}
            </h2>

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

      {/* ── Converter Widget ── */}
      <UnitConverterWidget
        title={item.title}
        baseUnit={item.base_unit}
        conversions={item.conversions}
      />

      {item.description && <BlogContent content={item.description} />}
      {item.video_url && <VideoEmbed url={item.video_url} title="Video Guide" />}

      <FaqClient
        categorySlug={item.faq_category?.slug ?? item.slug}
        type={item.faq_group_slug || undefined}
        title="Frequently Asked Questions"
      />
    </>
  )
}
