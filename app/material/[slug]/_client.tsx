"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { PublicMaterialDetail } from "@/api/types/material.types"
import type { MediaItem } from "@/api/types/media.types"

const MaterialDetailContent = dynamic(() => import("@/components/page_ui/MaterialDetailContent.client"))
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"))
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"))

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
      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[62svh] sm:min-h-[68svh] flex items-end">

        {/* BannerCarousel — full background */}
        <BannerCarousel
          initialBanners={bannerImages}
          slug={slug}
          overlay="linear-gradient(to top, rgba(15,37,87,0.95) 0%, rgba(15,37,87,0.55) 40%, rgba(15,37,87,0.15) 100%)"
          carousel={bannerImages.length > 1}
          imgClassName="object-cover"
        />

        {/* Top red accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />

        {/* Text content */}
        <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16 pt-28">
          <div className="max-w-[600px]">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-[11px] text-white/50 flex-wrap">
              <a href="/" className="hover:text-white/90 transition-colors">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/material" className="hover:text-white/90 transition-colors">Materials</a>
              <span aria-hidden="true">/</span>
              <span className="text-white/80 truncate max-w-[200px]">{item.name}</span>
            </nav>

            {/* Logo + name */}
            <div className="flex items-center gap-4 mb-4">
              {item.logo && (
                <div className="size-12 shrink-0 rounded-xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={44}
                    height={44}
                    className="object-contain p-1.5 w-full h-full"
                  />
                </div>
              )}
              <h2
                className="font-display font-black text-white leading-tight tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {item.name}
              </h2>
            </div>

            {/* Price + company pills */}
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

      {/* ── Description ── */}
      {item.description && <MaterialDetailContent content={item.description} />}

      {/* ── Variants ── */}
      {item.variants && item.variants.length > 0 && (
        <section className="bg-[#f8fafc] py-12 sm:py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Options</p>
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-[#0f2557] text-xl sm:text-2xl tracking-tight">
                Available Variants
              </h2>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0f2557]">
                      <th scope="col" className="px-5 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white">Image</th>
                      <th scope="col" className="px-5 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white">Variant</th>
                      <th scope="col" className="px-5 py-3.5 text-right text-[12px] font-bold uppercase tracking-[0.14em] text-white">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.variants.map((v, i) => (
                      <tr
                        key={v.id}
                        className={[
                          i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                          i < item.variants.length - 1 ? "border-b border-[#e2e8f0]" : "",
                        ].join(" ")}
                      >
                        <td className="px-5 py-3.5">
                          {v.img ? (
                            <div className="relative size-10 rounded-lg overflow-hidden bg-[#f1f5f9]">
                              <Image
                                src={v.img}
                                alt={v.market_name || "Variant"}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="size-10 rounded-lg bg-[#f1f5f9]" />
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-[14px] font-semibold text-[#0f2557]">{v.market_name}</td>
                        <td className="px-5 py-3.5 text-right text-[14px] font-bold text-[#cd2028]">Rs.&nbsp;{v.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── Video ── */}
      {item.video_url && <VideoEmbed url={item.video_url} title={`${item.name} — Product Video`} />}

      {/* ── FAQ ── */}
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
