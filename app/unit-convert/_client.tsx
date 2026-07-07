"use client"

import dynamic from "next/dynamic"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { Page } from "@/api/types/page.types"

const UnitConverterGrid = dynamic(() => import("@/components/page_ui/UnitConverterGrid.client"), { ssr: false })
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

export function UnitConvertClient({ page }: { page?: Page | null }) {
  const bannerImages = page?.banner_images ?? []

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#162d62]">
        <BannerCarousel
          initialBanners={bannerImages}
          imgClassName="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2557]/90 via-[#0f2557]/40 to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-white/70 border border-white/20 px-3 py-1 rounded mb-5">
            Unit Converter
          </span>
          <h2
            className="font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Unit Converter
          </h2>
          <div className="mt-5 mb-5 mx-auto w-12 h-[3px] bg-brand-red" />
          <p className="text-white/65 text-[1.05rem] max-w-[580px] mx-auto leading-relaxed">
            Quickly convert construction measurements and units — from length and area to volume and weight.
          </p>
        </div>
      </section>

      <UnitConverterGrid />

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
