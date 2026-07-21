"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/api/types/media.types";
import { useTrackAction } from "@/hooks/useTrackAction";
import { Events } from "@/lib/tracking";

interface Props {
  banners: MediaItem[];
  className?: string;
  cardsPerView?: number;
}

function Card({ banner, index }: { banner: MediaItem; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="aspect-[9/16] relative rounded-2xl overflow-hidden bg-brand-dark group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "rotateX(0deg) translateY(0)"
          : "rotateX(12deg) translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <Image
        src={banner.url}
        alt={banner.alt || ""}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {banner.alt && (
        <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          {banner.alt}
        </p>
      )}
    </div>
  );
}

export function BannerGridCarousel({ banners, className = "", cardsPerView = 3 }: Props) {
  const items = banners.filter((b) => b.url);
  const totalSets = Math.ceil(items.length / cardsPerView);
  const [currentSet, setCurrentSet] = useState(0);
  const track = useTrackAction();

  const next = useCallback(() => {
    setCurrentSet((c) => (c + 1) % totalSets);
  }, [totalSets]);

  const prev = useCallback(() => {
    setCurrentSet((c) => (c - 1 + totalSets) % totalSets);
  }, [totalSets]);

  useEffect(() => {
    if (totalSets <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, totalSets]);

  if (!items.length) return null;

  const visible = items.slice(
    currentSet * cardsPerView,
    currentSet * cardsPerView + cardsPerView
  );

  return (
    <div className={className}>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((banner, i) => (
            <Card key={banner.id} banner={banner} index={i} />
          ))}
        </div>

        {totalSets > 1 && (
          <>
            <button
              type="button"
              onClick={() => { prev(); track(Events.BANNER_CLICK, { direction: "prev" }); }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-dark hover:text-brand-primary transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => { next(); track(Events.BANNER_CLICK, { direction: "next" }); }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-dark hover:text-brand-primary transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {totalSets > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalSets }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setCurrentSet(i); track(Events.BANNER_CLICK, { set: i }); }}
              className={`rounded-full transition-all duration-300 ${
                i === currentSet
                  ? "bg-brand-primary w-6 h-2"
                  : "bg-light-gray/40 w-2 h-2 hover:bg-light-gray/60"
              }`}
              aria-label={`Go to set ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
