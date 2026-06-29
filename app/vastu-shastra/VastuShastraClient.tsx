'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { BannerCarousel } from '@/components/global_ui/BannerCarousel'
import { getVastuNav, getVastuItem } from '@/api/services/vastu.service'
import type { VastuNavResponse, VastuItemDetail } from '@/api/types/vastu.types'
import type { Page } from '@/api/types/page.types'
import { VastuSectionNav } from './VastuSectionNav'
import { VastuSectionContent } from './VastuSectionContent'
import { VastuQuickTools } from './VastuQuickTools'

const VastuParsedContent = dynamic(() => import('@/lib/Parse-Content'), { ssr: false })

interface Props {
  pageData?: Page | null
}

export default function VastuShastraClient({ pageData }: Props) {
  const [nav, setNav] = useState<VastuNavResponse | null>(null)
  const [navLoading, setNavLoading] = useState(true)

  const [sectionItem, setSectionItem] = useState<VastuItemDetail | null>(null)
  const [sectionLoading, setSectionLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    getVastuNav()
      .then((res) => {
        setNav(res)
        if (res.sections.length > 0) {
          setActiveSection(res.sections[0].slug)
        }
      })
      .catch(() => {})
      .finally(() => setNavLoading(false))
  }, [])

  useEffect(() => {
    if (!activeSection) return
    setSectionLoading(true)
    getVastuItem(activeSection)
      .then(setSectionItem)
      .catch(() => setSectionItem(null))
      .finally(() => setSectionLoading(false))
  }, [activeSection])

  const sectionKeys = nav?.sections ?? []
  const roomOptions = nav?.rooms ?? []
  const directionOptions = nav?.directions ?? []

  if (navLoading) {
    return (
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0f2557]">
        <div className="max-w-6xl mx-auto px-6 w-full pt-32 pb-20 text-center space-y-4">
          <div className="mx-auto h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-14 w-[550px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mx-auto h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb]">

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#0f2557]">
        {pageData?.banner_images && pageData.banner_images.length > 0 ? (
          <BannerCarousel initialBanners={pageData.banner_images} imgClassName="object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2557] to-[#0a1a3a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2557]/60 to-[#0f2557]/80" />
        <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-16 text-center">
          <p className="text-[#cd2028] text-xs font-bold tracking-[.2em] uppercase">Ancient Wisdom</p>
          <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
            {pageData?.title || 'Vastu Shastra'}
          </h1>
          <p className="mt-4 text-sm text-[#8fa8d8] max-w-xl mx-auto leading-relaxed">
            Explore Vastu principles for harmonious living spaces.
          </p>
        </div>
      </section>

      {/* Guide sections */}
      {sectionKeys.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex lg:hidden mb-4">
            <VastuSectionNav
              sectionKeys={sectionKeys.map((s) => s.slug)}
              sections={Object.fromEntries(sectionKeys.map((s) => [s.slug, { title: s.title }]))}
              activeSection={activeSection}
              onSelect={setActiveSection}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <div className="hidden lg:block w-64 shrink-0 lg:sticky lg:top-4">
              <VastuSectionNav
                sectionKeys={sectionKeys.map((s) => s.slug)}
                sections={Object.fromEntries(sectionKeys.map((s) => [s.slug, { title: s.title }]))}
                activeSection={activeSection}
                onSelect={setActiveSection}
              />
            </div>
            <div className="flex-1 min-w-0">
              <VastuSectionContent item={sectionItem} loading={sectionLoading} />
            </div>
          </div>

          <VastuQuickTools roomOptions={roomOptions} directionOptions={directionOptions} />
        </div>
      )}

      {/* Page content */}
      {pageData?.content && (
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
            <div className="border-b border-[#e8edf5] px-5 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557]">About Vastu Shastra</p>
            </div>
            <div className="px-5 py-4">
              <VastuParsedContent description={pageData.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
