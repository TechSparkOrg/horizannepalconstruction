"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BannerService } from "@/api/services/banner.service"
import type { MediaItem } from "@/api/types/media.types"

interface ImageGridProps {
  slug: string
  label: string
  heading: string
  description: string
  bg?: string
  priority?: boolean
}

function Skeleton({ bg }: { bg?: string }) {
  return (
    <section className={`py-16 sm:py-24 ${bg ?? ""}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="mx-auto h-3 w-28 rounded bg-light-gray animate-pulse" />
          <div className="mx-auto mt-4 h-7 w-56 rounded-lg bg-light-gray animate-pulse" />
          <div className="mx-auto mt-3 h-3.5 w-80 rounded bg-light-gray animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-xl bg-light-gray animate-pulse ${i >= 6 ? "hidden md:block" : ""} ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ImageGrid({
  slug,
  label,
  heading,
  description,
  bg = "bg-off-white",
  priority: enablePriority = false,
}: ImageGridProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    BannerService.getBySlug(slug).then(setItems).catch(() => setItems([])).finally(() => setLoaded(true))
  }, [slug])

  const images = items.filter((b) => b.url)

  if (!loaded || images.length === 0) return <Skeleton bg={bg} />

  return (
    <section className={`py-16 sm:py-24 ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 max-w-[520px] mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
            {label}
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.15]">
            {heading}
          </h2>
          <p className="mt-3 text-[14.5px] text-mid-gray leading-[1.7]">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((b, i) => (
            <div
              key={b.id}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                i >= 6 ? "hidden md:block" : ""
              } ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"}`}>
                <Image
                  src={b.url}
                  alt={b.alt || "Gallery image"}
                  fill
                  priority={enablePriority && i === 0}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading={enablePriority && i === 0 ? undefined : "lazy"}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-300" />

              {/* Caption */}
              {b.alt && (
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-[13px] font-medium leading-snug">{b.alt}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}