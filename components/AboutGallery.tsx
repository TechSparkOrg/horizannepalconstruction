"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BannerService } from "@/api/services/banner.service";
import type { MediaItem } from "@/api/types/media.types";

const SLUG = "about-page-gallary-list";

function Skeleton() {
  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mx-auto size-4 rounded-full bg-light-gray/50 animate-pulse" />
          <div className="mx-auto mt-3 h-8 w-64 rounded-lg bg-light-gray/50 animate-pulse" />
          <div className="mx-auto mt-3 h-4 w-80 rounded bg-light-gray/50 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-xl bg-light-gray/30 animate-pulse ${
                i >= 6 ? "hidden md:block" : ""
              } ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className={`${i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    BannerService.getBySlug(SLUG).then(setItems).catch(() => setItems([])).finally(() => setLoaded(true));
  }, []);

  const images = items.filter((b) => b.url);

  if (!loaded || images.length === 0) return <Skeleton />;

  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>Our Work in Action</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl text-brand-dark">
            A Glimpse Into What We Do
          </h2>
          <p className="mt-3 text-mid-gray text-lg max-w-xl mx-auto">
            From concept to completion — the projects and people that define Horizon Nepal.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
                  priority={i === 0}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={i === 0 ? undefined : "lazy"}
                />
              </div>
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">{b.alt || "Gallery image"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
