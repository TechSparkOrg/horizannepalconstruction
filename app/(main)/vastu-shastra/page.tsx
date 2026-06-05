"use client";

import { useState, useEffect } from "react";
import VastuShastraGuide from "@/components/sections/VastuShastraGuide";
import { BannerCarousel } from "@/components/BannerCarousel";
import { VastuService } from "@/api/services/vastu.service";
import type { VastuConfig } from "@/stores/admin-types";

export default function VastuShastraPage() {
  const [data, setData] = useState<VastuConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    VastuService.getPublic()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="size-10 rounded-full border-2 border-brand-primary/30 border-t-brand-primary animate-spin" />
      </section>
    );
  }

  if (!data) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-brand-dark">
        <p className="text-white/50 text-sm">Failed to load Vastu guide.</p>
      </section>
    );
  }

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-dark">
        <BannerCarousel slug="vastu-shastra-page-hero" imgClassName="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          {data.hero?.badge && (
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
              {data.hero.badge}
            </span>
          )}
          <h1 className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
            {data.hero?.title || "Vastu Shastra"}
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
            {data.hero?.subtitle || ""}
          </p>
        </div>
      </section>
      <VastuShastraGuide data={data} />
    </>
  );
}
