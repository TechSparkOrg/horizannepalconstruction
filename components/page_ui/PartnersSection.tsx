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
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((item) => {
        const logo = "logo" in item ? item.logo : ""
        const name = item.name
        return (
          <div
            key={item.id}
            className="group bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-5 flex flex-col items-center gap-3 hover:border-[#1d4ed8]/40 hover:bg-[#eff6ff] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="size-12 relative flex items-center justify-center">
              {logo ? (
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  fill
                  className="object-contain"
                />
              ) : (
                <BankMark name={name} />
              )}
            </div>
            <span className="text-[11px] font-semibold text-[#475569] text-center leading-snug">
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
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-5 flex flex-col items-center gap-3"
        >
          <div className="size-12 rounded-xl bg-[#e2e8f0] animate-pulse" />
          <div className="h-3 w-16 rounded bg-[#e2e8f0] animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function SubLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="h-px w-10 bg-[#e2e8f0]" aria-hidden="true" />
      <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#64748b]">{text}</span>
      <span className="h-px w-10 bg-[#e2e8f0]" aria-hidden="true" />
    </div>
  )
}

export function PartnersSection() {
  const [vendors, setVendors] = useState<PublicVendor[] | null>(null)
  const [banks, setBanks] = useState<EmiBank[] | null>(null)

  useEffect(() => {
    Promise.all([
      getVendors().then((r) => r.results ?? []).catch(() => [] as PublicVendor[]),
      getBanks().catch(() => [] as EmiBank[]),
    ]).then(([v, b]) => {
      setVendors(v)
      setBanks(b)
    })
  }, [])

  const loading = vendors === null || banks === null
  const empty   = !loading && vendors!.length === 0 && banks!.length === 0

  if (empty) return null

  return (
    <section className="bg-white py-20 sm:py-28 border-t border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#b91c1c]">
            Our Partners
          </p>
          <div className="w-10 h-[3px] bg-[#b91c1c] mx-auto mt-2.5 mb-4" />
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0f2557] tracking-tight leading-tight font-display">
            Banks &amp; Vendors We Trust
          </h2>
          <p className="mt-3 text-sm text-[#475569] max-w-sm mx-auto leading-relaxed">
            Backed by Nepal&apos;s leading financial institutions and trusted material suppliers.
          </p>
        </div>

        {loading ? (
          <div className="space-y-10">
            <div>
              <SubLabel text="Partner Banks" />
              <SkeletonGrid />
            </div>
            <div>
              <SubLabel text="Trusted Vendors" />
              <SkeletonGrid />
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {banks!.length > 0 && (
              <div>
                <SubLabel text="Partner Banks" />
                <LogoGrid items={banks!} />
              </div>
            )}
            {vendors!.length > 0 && (
              <div>
                <SubLabel text="Trusted Vendors" />
                <LogoGrid items={vendors!} />
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
