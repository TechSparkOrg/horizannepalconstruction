'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
  const [nav, setNav]                       = useState<VastuNavResponse | null>(null)
  const [navLoading, setNavLoading]         = useState(true)
  const [sectionItem, setSectionItem]       = useState<VastuItemDetail | null>(null)
  const [sectionLoading, setSectionLoading] = useState(false)
  const [activeSection, setActiveSection]   = useState<string>('')

  useEffect(() => {
    getVastuNav()
      .then((res) => {
        setNav(res)
        if (res.sections.length > 0) setActiveSection(res.sections[0].slug)
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

  const sectionKeys      = nav?.sections ?? []
  const roomOptions      = nav?.rooms ?? []
  const directionOptions = nav?.directions ?? []

  if (navLoading) {
    return (
      <div className="min-h-screen">
        <section className="relative min-h-[72svh] flex items-center bg-[#0f2557]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16 space-y-5">
            <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
            <div className="h-14 w-[420px] max-w-full rounded-xl bg-white/10 animate-pulse" />
            <div className="h-4 w-[360px] max-w-full rounded-lg bg-white/10 animate-pulse" />
            <div className="h-4 w-[300px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[72svh] flex items-center overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028]" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0 2px,transparent 2px 16px)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to top,#fffbf5 0%,transparent 100%)" }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left */}
            <div className="flex-1 max-w-[560px]">
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="block w-5 h-px bg-[#f59e0b]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#f59e0b]">Ancient Wisdom</span>
                <span className="block w-5 h-px bg-[#f59e0b]" aria-hidden="true" />
              </div>
              <h1
                className="font-display font-black text-white leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}
              >
                {pageData?.title || (
                  <>Vastu<br /><span className="text-[#f59e0b]">Shastra</span></>
                )}
              </h1>
              <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[460px]">
                The ancient Vedic science of spatial harmony — align your spaces with
                nature, direction, and energy for prosperity, health, and peace.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a
                  href="#vastu-guide"
                  className="inline-flex items-center gap-2 h-11 px-7 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2557] font-bold text-sm rounded-xl transition-colors"
                >
                  Explore Guide <ArrowRight className="size-4" />
                </a>
                <a
                  href="#vastu-tools"
                  className="inline-flex items-center gap-2 h-11 px-7 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
                >
                  Try Tools
                </a>
              </div>
              <div className="mt-10 flex gap-3 flex-wrap">
                {[
                  { num: "8",  label: "Directions"  },
                  { num: "5",  label: "Elements"    },
                  { num: "64", label: "Vastu Zones" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-center min-w-[74px]">
                    <p className="text-[#f59e0b] font-bold text-xl leading-none">{s.num}</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-widest font-semibold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — ganesh-on.svg */}
            <div className="shrink-0 flex items-center justify-center relative lg:w-[440px]">
              <div
                className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
                aria-hidden="true"
                style={{ background: "radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)", filter: "blur(40px)" }}
              />
              <Image
                src="/video-gif/ganesh-on.svg"
                alt="Lord Ganesha — remover of obstacles and patron of new beginnings"
                width={420} height={420}
                className="w-[220px] sm:w-[340px] lg:w-[420px] h-auto object-contain relative z-10"
                priority unoptimized
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Guide sections ── */}
      {sectionKeys.length > 0 && (
        <div id="vastu-guide" className="bg-white border-t border-[#e2e8f0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-14">

            {/* Section heading */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
                <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#cd2028]">Explore Principles</p>
                <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
                Vastu Shastra Guide
              </h2>
            </div>

            {/* ShubhLabh — small centered decorative image */}
            <div className="flex justify-center mb-10" aria-hidden="true">
              <Image
                src="/video-gif/Kalash.svg"
                alt=""
                width={130} height={130}
                className="w-[90px] sm:w-[120px] h-auto object-contain opacity-50 select-none pointer-events-none"
                unoptimized
              />
            </div>

            {/* Mobile nav */}
            <div className="flex lg:hidden mb-6">
              <VastuSectionNav
                sectionKeys={sectionKeys.map((s) => s.slug)}
                sections={Object.fromEntries(sectionKeys.map((s) => [s.slug, { title: s.title }]))}
                activeSection={activeSection}
                onSelect={setActiveSection}
              />
            </div>

            {/* Sidebar + Content */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              <div className="hidden lg:block w-[240px] shrink-0 sticky top-24">
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
        </div>
      )}

      {/* ── CMS content ── */}
      {pageData?.content && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10">
          <VastuParsedContent description={pageData.content} />
        </div>
      )}

    </div>
  )
}
