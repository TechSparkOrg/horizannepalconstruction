"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import type { Page } from "@/api/types/page.types"

const UnitConverterGrid = dynamic(() => import("@/components/page_ui/UnitConverterGrid.client"))
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"))

export function UnitConvertClient({ page }: { page?: Page | null }) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[68svh] sm:min-h-[72svh]">

        {/* Calculator.svg — anchored to right corner, fully visible */}
        <div className="absolute right-0 top-0 h-full w-[75%]">
          <Image
            src="/video-gif/Calculator.svg"
            alt=""
            aria-hidden="true"
            fill
            sizes="75vw"
            className="object-contain object-right-top"
            priority
            unoptimized
          />
          {/* left fade — protects text */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to right, #0f2557 30%, transparent)" }}
          />
        </div>

        {/* Top red accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }} />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[68svh] sm:min-h-[72svh] pb-12 sm:pb-16 pt-28">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Tools</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2
              className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              {page?.title
                ? <span>{page.title}</span>
                : <>Unit<br /><span className="text-[#cd2028]">Converter</span></>
              }
            </h2>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[440px]">
              Quickly convert construction measurements — length, area, volume, and weight, all in one place.
            </p>
            <a
              href="#converter"
              className="mt-7 inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
            >
              Start Converting <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <div id="converter">
        <UnitConverterGrid />
      </div>

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
