"use client"

import dynamic from "next/dynamic"
import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { Page } from "@/api/types/page.types"

const VendorsSection = dynamic(() => import("@/components/page_ui/VendorsSection.client"), { ssr: false })
const MaterialGrid = dynamic(() => import("@/components/page_ui/MaterialGrid.client"), { ssr: false })
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

export function MaterialClient({ page }: { page?: Page | null }) {
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
            Materials
          </span>
          <h2
            className="font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Construction Materials
          </h2>
          <div className="mt-5 mb-5 mx-auto w-12 h-[3px] bg-brand-red" />
          <p className="text-white/65 text-[1.05rem] max-w-[580px] mx-auto leading-relaxed">
            High-quality construction materials from trusted partners across Nepal, ensuring durability and excellence in every project.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-brand-primary border border-brand-primary/20 px-3 py-1 rounded mb-4">
              Why Quality Matters
            </span>
            <h2 className="text-[30px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.1]">
              The Importance of Quality Materials in Construction
            </h2>
            <p className="mt-5 text-[14px] leading-relaxed text-mid-gray">
              The strength, longevity, and safety of any structure begin with the materials used to build it.
              From foundation to finishing, every material plays a critical role in determining how a building
              withstands time, weather, and daily use. We partner with Nepal&apos;s most reliable suppliers to
              bring you materials that meet rigorous quality standards — because the integrity of your project
              depends on what it&apos;s built with.
            </p>
          </div>
        </div>
      </section>

      <VendorsSection />
      <MaterialGrid />

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
