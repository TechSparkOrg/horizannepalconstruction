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
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-5 bg-white p-7 hover:bg-[#f8faff] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset"
    >
      <span
        className="absolute top-5 right-5 text-[11px] font-bold tracking-wide text-[#94a3b8] group-hover:text-brand-primary transition-colors duration-150"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="size-11 rounded-xl flex items-center justify-center bg-accent text-brand-primary group-hover:bg-brand-dark group-hover:text-white transition-colors duration-200 shrink-0">
        <Icon className="size-[18px]" />
      </div>

      <div className="flex-1">
        <h3 className="text-[14.5px] font-semibold text-brand-dark leading-snug mb-2">
          {service.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          {truncate(service.description)}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more
        <ArrowRight className="size-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200" />
      </div>

      <div
        className="absolute bottom-0 left-7 right-7 h-px rounded-full bg-brand-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        aria-hidden="true"
      />
    </Link>
  )
}

function ServiceSkeleton() {
  return (
    <div className="bg-white p-7 space-y-5">
      <div className="size-11 rounded-xl bg-light-gray/50 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-light-gray/50 animate-pulse" />
        <div className="h-3 w-full rounded bg-light-gray/40 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-light-gray/30 animate-pulse" />
      </div>
    </div>
  )
}

export function ServicesSection({ initialServices }: { initialServices?: ServiceCategory[] }) {
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
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-[480px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-brand-primary shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
                What We Offer
              </span>
            </div>
            <h2 className="text-[30px] sm:text-[38px] font-bold text-brand-dark leading-[1.1]">
              Our Services
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Comprehensive architectural and construction services — from first sketch to final handover.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src="/video-gif/in-progress.svg"
                alt="Construction in progress"
                fill
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mid-gray hover:text-brand-dark transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            >
              All services
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray"
          style={{ background: "var(--color-light-gray)", gap: "1px" }}
        >
          {services === null
            ? Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)
            : services.length === 0
              ? null
              : services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>

      </div>
    </section>
  )
}
