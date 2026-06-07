"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BannerService } from "@/api/services/banner.service";
import type { MediaItem } from "@/api/types/media.types";

export function OurWorkHero() {
  const [images, setImages] = useState<MediaItem[]>([]);

  useEffect(() => {
    BannerService.getBySlug("our-work-page-hero").then(setImages);
  }, []);

  const slides = images.filter(b => b.url).slice(0, 3);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 grid grid-cols-3">
        {slides.length > 0 ? (
          slides.map((b) => (
            <div key={b.id} className="relative h-full opacity-60">
              <Image src={b.url} alt={b.alt || ""} fill sizes="33vw" className="object-cover" />
            </div>
          ))
        ) : (
          <div className="col-span-3 h-full bg-brand-dark" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/50 to-brand-dark/30" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
          Our Portfolio
        </span>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Projects That Speak for Themselves
        </h1>

        <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          Every project tells a story of collaboration, craftsmanship, and commitment. Browse our work across Nepal.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            Start Your Project <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
