"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  PencilRuler, LayoutGrid, Compass,
  FileBadge, Boxes, Wrench, type LucideIcon,
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

function truncate(text: string, max = 95): string {
  const clean = stripHtml(text)
  return clean.length > max ? clean.substring(0, max).trimEnd() + "…" : clean
}

function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const Icon = iconMap[service.slug] || Wrench

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block bg-white hover:bg-accent transition-colors duration-150 p-7"
    >
      <span className="absolute top-5 right-[22px] text-[11px] font-bold tracking-wide text-light-gray group-hover:text-brand-primary transition-colors duration-150">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="size-[42px] rounded-[10px] flex items-center justify-center mb-[18px] bg-accent text-brand-primary group-hover:bg-brand-dark group-hover:text-white transition-colors duration-150">
        <Icon className="size-5" />
      </div>

      <h3 className="text-[15px] font-semibold text-brand-dark leading-snug mb-2">
        {service.name}
      </h3>
      <p className="text-[13px] leading-relaxed text-mid-gray">
        {truncate(service.description)}
      </p>

      <div className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full bg-brand-dark origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </Link>
  )
}

export function ServicesSection() {
  const [services, setServices] = useState<ServiceCategory[] | null>(null)

  useEffect(() => {
    getServiceCategories()
      .then(setServices)
      .catch(() => setServices([]))
  }, [])

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[520px] mx-auto mb-12">
          <span className="inline-flex items-center h-[26px] px-3 bg-white border border-light-gray rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-primary">
            What We Offer
          </span>
          <h2 className="mt-4 text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-tight leading-[1.15]">
            Our Services
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mid-gray">
            Comprehensive architectural and construction services — from first sketch to final handover.
          </p>
        </div>

        {services === null ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray"
            style={{ background: "var(--color-light-gray)", gap: "1px" }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-7 space-y-4">
                <div className="size-[42px] rounded-[10px] bg-light-gray/30 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? null : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray"
            style={{ background: "var(--color-light-gray)", gap: "1px" }}
          >
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
