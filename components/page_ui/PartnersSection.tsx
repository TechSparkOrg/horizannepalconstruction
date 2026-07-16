"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BankMark } from "@/components/global_ui/BankMark"
import { getVendors } from "@/api/services/vendor-public.service"
import { getBanks } from "@/api/services/emi.service"
import type { PublicVendor } from "@/api/types/material.types"
import type { EmiBank } from "@/api/types/emi.types"

function LogoGrid({ items }: { items: (EmiBank | PublicVendor)[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((item) => {
        const logo = "logo" in item ? item.logo : ""
        const name = item.name
        return (
          <div
            key={item.id}
            className="group bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4 flex flex-col items-center gap-2.5 hover:border-[#1d4ed8]/40 hover:bg-[#eff6ff] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="size-11 relative flex items-center justify-center">
              {logo ? (
                <Image src={logo} alt={`${name} logo`} fill sizes="69px" className="object-contain" />
              ) : (
                <BankMark name={name} />
              )}
            </div>
            <span className="text-[10.5px] font-semibold text-[#475569] text-center leading-snug">
              {name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4 flex flex-col items-center gap-2.5">
          <div className="size-11 rounded-xl bg-[#e2e8f0] animate-pulse" />
          <div className="h-2.5 w-14 rounded bg-[#e2e8f0] animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#94a3b8] px-1">{label}</span>
      <span className="h-px flex-1 bg-[#e2e8f0]" aria-hidden="true" />
    </div>
  )
}

export function PartnersSection({
  initialVendors,
  initialBanks,
}: {
  initialVendors?: PublicVendor[];
  initialBanks?: EmiBank[];
}) {
  const [vendors, setVendors] = useState<PublicVendor[] | null>(initialVendors ?? null)
  const [banks,   setBanks]   = useState<EmiBank[] | null>(initialBanks ?? null)

  useEffect(() => {
    if (initialVendors && initialBanks) return
    Promise.all([
      getVendors().then((r) => r.results ?? []).catch(() => [] as PublicVendor[]),
      getBanks().catch(() => [] as EmiBank[]),
    ]).then(([v, b]) => { setVendors(v); setBanks(b) })
  }, [initialVendors, initialBanks])

  const loading = vendors === null || banks === null
  const empty   = !loading && vendors!.length === 0 && banks!.length === 0
  if (empty) return null

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
           <Image
             src="/video-gif/Business.svg"
             alt="Partners illustration"
             width={148}
             height={92}
             unoptimized
             className="w-[100px] h-[62px] sm:w-[148px] sm:h-[92px] shrink-0 object-contain"
             sizes="(max-width: 640px) 100px, 148px"
           />
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d4ed8] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full mb-3">
              Our Partners
            </span>
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0f2557] leading-tight">
              Banks &amp; Vendors We Trust
            </h2>
            <p className="mt-2 text-[13.5px] text-[#475569] max-w-sm leading-relaxed">
              Backed by Nepal&apos;s leading financial institutions and trusted material suppliers.
            </p>
          </div>

         
        </div>

        {/* Grids */}
        {loading ? (
          <div className="space-y-8">
            <div><Divider label="Partner Banks" /><SkeletonGrid /></div>
            <div><Divider label="Trusted Vendors" /><SkeletonGrid /></div>
          </div>
        ) : (
          <div className="space-y-8">
            {banks!.length > 0 && (
              <div><Divider label="Partner Banks" /><LogoGrid items={banks!} /></div>
            )}
            {vendors!.length > 0 && (
              <div><Divider label="Trusted Vendors" /><LogoGrid items={vendors!} /></div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
