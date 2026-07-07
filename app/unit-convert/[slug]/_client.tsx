"use client"

import dynamic from "next/dynamic"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { PublicUnitConversionDetail } from "@/api/types/unit-converter.types"
import type { MediaItem } from "@/api/types/media.types"

const UnitConverterWidget = dynamic(() => import("@/components/page_ui/UnitConverterWidget.client"), { ssr: false })
const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"), { ssr: false })
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"), { ssr: false })
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"), { ssr: false })

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
      <section className="relative min-h-[70vh] flex items-end bg-brand-dark">
        <BannerCarousel
          initialBanners={bannerImages}
          slug={slug}
          overlay="linear-gradient(to top, rgba(15,37,87,0.8) 0%, rgba(15,37,87,0.3) 50%, transparent 100%)"
          carousel={bannerImages.length > 1}
          imgClassName="object-cover opacity-60"
        />
      </section>

      <section className="bg-white border-b border-light-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-[22px] sm:text-[28px] font-bold text-brand-dark leading-tight">
                {item.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[13px] text-mid-gray">
                <span className="font-semibold text-brand-primary">
                  Base unit: {item.base_unit}
                </span>
                {item.conversions.length > 0 && (
                  <span>
                    {item.conversions.length} conversion{item.conversions.length !== 1 ? "s" : ""} available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <UnitConverterWidget
        title={item.title}
        baseUnit={item.base_unit}
        conversions={item.conversions}
      />

      {item.description && <BlogContent content={item.description} />}

      {item.video_url && <VideoEmbed url={item.video_url} title="Video Guide" />}

      {item.faq_category && (
        <FaqClient
          categorySlug={item.faq_category.slug}
          type={item.faq_group_slug || undefined}
          title="Frequently Asked Questions"
        />
      )}
    </>
  )
}
