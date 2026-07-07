"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { PublicMaterialDetail } from "@/api/types/material.types"
import type { MediaItem } from "@/api/types/media.types"

const MaterialDetailContent = dynamic(() => import("@/components/page_ui/MaterialDetailContent.client"), { ssr: false })
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"), { ssr: false })
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"), { ssr: false })

export function MaterialDetailClient({
  item,
  slug,
}: {
  item: PublicMaterialDetail
  slug: string
}) {
  const bannerImages: MediaItem[] = (item.banner_images ?? []).map((b) => ({
    id: b.id,
    url: b.url,
    alt: item.name,
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
            <div className="flex items-start gap-4">
              {item.logo && (
                <div className="shrink-0 w-14 h-14 rounded-lg border border-light-gray bg-[#f5f7fb] overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={56}
                    height={56}
                    className="object-contain p-1.5 w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-[22px] sm:text-[28px] font-bold text-brand-dark leading-tight">
                  {item.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[13px] text-mid-gray">
                  {item.price_per_unit && (
                    <span className="font-semibold text-brand-primary">
                      Rs. {item.price_per_unit}{item.unit_value ? ` /${item.unit_value}` : ""}
                    </span>
                  )}
                  {item.company && (
                    <span>
                      Provided by{" "}
                      <span className="font-medium text-brand-dark">{item.company.name}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {item.description && <MaterialDetailContent content={item.description} />}

      {item.variants && item.variants.length > 0 && (
        <section className="bg-off-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-brand-dark mb-6">Available Variants</h2>
            <div className="overflow-x-auto rounded-xl border border-light-gray">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-dark text-white text-left">
                    <th className="px-4 py-3 font-semibold">Image</th>
                    <th className="px-4 py-3 font-semibold">Market Name</th>
                    <th className="px-4 py-3 font-semibold text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-gray">
                  {item.variants.map((v) => (
                    <tr key={v.id} className="bg-white hover:bg-[#f8fafc] transition-colors">
                      <td className="px-4 py-3">
                        {v.img ? (
                          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={v.img}
                              alt={v.market_name || "Variant image"}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-muted" />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-brand-dark">{v.market_name}</td>
                      <td className="px-4 py-3 text-right font-semibold text-brand-primary">Rs. {v.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {item.video_url && <VideoEmbed url={item.video_url} title="Product Video" />}

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
