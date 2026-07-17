"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PencilRuler, LayoutGrid, Compass,
  FileBadge, Boxes, Wrench, ArrowRight, type LucideIcon,
} from "lucide-react"
import { getServiceCategories } from "@/api/services/category.service"
import { stripHtml } from "@/lib/extractTocItems"
import type { ServiceCategory } from "@/api/types/category.types"

const iconMap: Record<string, LucideIcon> = {
  "architectural-design": PencilRuler,
  "floor-planning": LayoutGrid,
  "vastu-shastra": Compass,
  "building-permits": FileBadge,
  "materials-supply": Boxes,
  construction: Wrench,
}

function truncate(text: string, max = 90): string {
  const clean = stripHtml(text)
  return clean.length > max ? clean.substring(0, max).trimEnd() + "…" : clean
}

function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const Icon = iconMap[service.slug] || Wrench

  return (
    <Link prefetch={false}
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-4 bg-white p-5 sm:p-7 hover:bg-[#f8faff] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-inset"
    >
      <span
        className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[11px] font-bold tracking-wide text-[#94a3b8]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="size-10 sm:size-11 rounded-xl flex items-center justify-center bg-[#eff6ff] text-[#1d4ed8] group-hover:bg-[#0f2557] group-hover:text-white transition-colors duration-200 shrink-0">
        <Icon className="size-[17px]" />
      </div>

      <div className="flex-1">
        <h3 className="text-[14px] sm:text-[14.5px] font-semibold text-[#0f2557] leading-snug mb-2">
          {service.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-[#475569]">
          {truncate(service.description)}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more
        <ArrowRight className="size-3.5" />
      </div>

      <div
        className="absolute bottom-0 left-5 sm:left-7 right-5 sm:right-7 h-px rounded-full bg-[#1d4ed8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        aria-hidden="true"
      />
    </Link>
  )
}

function ServiceSkeleton() {
  return (
    <div className="bg-white p-5 sm:p-7 flex flex-col gap-4">
      <div className="size-10 sm:size-11 rounded-xl bg-[#e2e8f0] animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 rounded bg-[#e2e8f0] animate-pulse" />
        <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-[#f1f5f9] animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-[#f1f5f9] animate-pulse" />
      </div>
      {/* matches "Learn more" row */}
      <div className="h-3 w-20 rounded bg-[#e2e8f0] animate-pulse" />
    </div>
  )
}

export function ServicesSection({ initialServices, svgUrl }: { initialServices?: ServiceCategory[]; svgUrl?: string }) {
  const [services, setServices] = useState<ServiceCategory[] | null>(null)

  useEffect(() => {
    if (initialServices) {
      setServices(initialServices)
      return undefined
    }
    getServiceCategories()
      .then(setServices)
      .catch(() => setServices([]))
  }, [initialServices])

  return (
    <section className="py-10 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div className="max-w-[480px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-[#1d4ed8] shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1d4ed8]">
                What We Offer
              </span>
            </div>
            <h2 className="text-[26px] sm:text-[38px] font-bold text-[#0f2557] leading-[1.1]">
              Our Services
            </h2>
            <p className="mt-3 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#475569]">
              Comprehensive architectural and construction services — from first sketch to final handover.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3">
            <Image
              src={svgUrl || "/video-gif/in-progress.svg"}
              alt="Construction in progress"
              width={56}
              height={56}
              unoptimized
              className="object-contain shrink-0"
              // sizes="56px"
            />
            <Link prefetch={false}
              href="/services"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#475569] hover:text-[#0f2557] transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2"
            >
              All services
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-[#e2e8f0]"
          style={{ background: "#e2e8f0", gap: "1px" }}
        >
          {services === null
            ? Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)
            : services.length === 0
              ? <div className="col-span-full text-center py-16 text-[#94a3b8] text-sm">No services available yet.</div>
              : services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>

      </div>
    </section>
  )
}
