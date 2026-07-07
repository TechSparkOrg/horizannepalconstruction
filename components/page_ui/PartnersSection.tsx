"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BankMark } from "@/components/global_ui/BankMark"
import { getVendors } from "@/api/services/vendor-public.service"
import { getBanks } from "@/api/services/emi.service"
import type { PublicVendor } from "@/api/types/material.types"
import type { EmiBank } from "@/api/types/emi.types"

function LogoStrip({ title, items }: { title: string; items: (EmiBank | PublicVendor)[] }) {
  return (
    <div className="rounded-xl border border-[#e8edf5] bg-white overflow-hidden">
      <div className="flex flex-wrap items-stretch">
        {items.map((item, i) => {
          const logo = "logo" in item ? item.logo : ""
          const name = item.name
          const id = item.id
          return (
            <div
              key={id}
              className="flex flex-col items-center justify-center gap-2 px-6 py-5 border-r border-[#e8edf5] last:border-r-0 flex-1 min-w-[130px]"
            >
              <div className="size-10 relative">
                {logo ? (
                  <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
                ) : (
                  <BankMark name={name} />
                )}
              </div>
              <span className="text-[11px] font-semibold text-[#3d526e] text-center leading-snug">
                {name}
              </span>
            </div>
          )
        })}
      </div>
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

  if (vendors === null || banks === null) {
    return (
      <section className="bg-[#f4f6fb] py-16 sm:py-20 border-t border-[#e8edf5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <div className="mx-auto h-3 w-16 rounded bg-[#e8edf5] animate-pulse" />
            <div className="mx-auto h-7 w-56 rounded bg-[#e8edf5] animate-pulse" />
          </div>
          <div className="rounded-xl border border-[#e8edf5] bg-white h-24 animate-pulse" />
        </div>
      </section>
    )
  }

  if (vendors.length === 0 && banks.length === 0) return null

  return (
    <section className="bg-[#f4f6fb] py-16 sm:py-20 border-t border-[#e8edf5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#cd2028]">
            Our Partners
          </p>
          <div className="w-10 h-[3px] bg-[#cd2028] mx-auto mt-2.5 mb-4" />
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0f2557] tracking-tight leading-tight font-display">
            Banks &amp; Vendors We Trust
          </h2>
          <p className="mt-3 text-sm text-[#5a6e8a] max-w-md mx-auto leading-relaxed">
            Backed by Nepal&apos;s leading financial institutions and trusted material suppliers.
          </p>
        </div>

        {/* Banks */}
        {banks.length > 0 && (
          <div className="mt-10">
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8fa3c8] text-center mb-4">
              Partner Banks
            </p>
            <LogoStrip title="Partner Banks" items={banks} />
          </div>
        )}

        {/* Vendors */}
        {vendors.length > 0 && (
          <div className="mt-10">
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8fa3c8] text-center mb-4">
              Trusted Vendors
            </p>
            <LogoStrip title="Trusted Vendors" items={vendors} />
          </div>
        )}

      </div>
    </section>
  )
}
