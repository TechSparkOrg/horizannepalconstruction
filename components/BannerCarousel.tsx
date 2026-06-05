"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { BannerService } from "@/api/services/banner.service";
import type { MediaItem } from "@/api/types/media.types";

interface Props {
  slug: string;
  children?: ReactNode;
  overlay?: string;
  carousel?: boolean;
  className?: string;
  imgClassName?: string;
}

export function BannerCarousel({ slug, children, overlay, carousel = true, className = "", imgClassName = "object-cover" }: Props) {
  const [banners, setBanners] = useState<MediaItem[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    BannerService.getBySlug(slug).then(setBanners);
  }, [slug]);

  const slides = banners.filter(b => b.url);
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (!carousel || slides.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [carousel, slides.length]);

  return (
    <>
      {hasSlides ? (
        slides.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${className}`}
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={b.url}
              alt={b.alt || b.meta_title || ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className={imgClassName}
            />
          </div>
        ))
      ) : (
        <div className={`absolute inset-0 bg-brand-dark ${className}`} />
      )}

      {overlay && (
        <div className="absolute inset-0" style={{ background: overlay }} aria-hidden="true" />
      )}

      {children}

      {carousel && hasSlides && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
