"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import type { MediaItem } from "@/api/types/media.types";

interface Props {
  slug?: string;
  children?: ReactNode;
  overlay?: string;
  carousel?: boolean;
  className?: string;
  imgClassName?: string;
  initialBanners?: MediaItem[];
}

export function BannerCarousel({ children, overlay, carousel = true, className = "", imgClassName = "object-cover", initialBanners }: Props) {
  const [banners] = useState<MediaItem[]>(initialBanners ?? []);
  const [current, setCurrent] = useState(0);

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
            style={{ opacity: i === current ? 1 : 0, position: "absolute" }}
          >
            <Image
              src={b.url}
              alt={b.alt || b.meta_title || ""}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? undefined : "lazy"}
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
              className={`flex items-center justify-center size-6 rounded-full transition-opacity duration-300 ${
                i === current ? "" : "hover:opacity-60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`rounded-full transition-transform duration-300 w-6 h-2 ${
                i === current
                  ? "bg-brand-primary scale-x-100 opacity-100"
                  : "bg-white/40 scale-x-[0.33] opacity-100"
              }`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
