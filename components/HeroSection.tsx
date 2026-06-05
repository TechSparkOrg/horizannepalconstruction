"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BannerCarousel } from "@/components/BannerCarousel";
import { BannerService } from "@/api/services/banner.service";

export function HeroSection() {
  const [featuredImg, setFeaturedImg] = useState("");

  useEffect(() => {
    BannerService.getBySlug("home-page-hero").then((banners) => {
      const b = banners.find((b) => b.url);
      if (b) setFeaturedImg(b.url);
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <BannerCarousel
        slug="home-page-hero"
        carousel
        imgClassName="object-cover scale-[1.02]"
        overlay="linear-gradient(105deg, var(--color-brand-dark) 0%, color-mix(in oklch, var(--color-brand-dark) 60%, transparent) 55%, color-mix(in oklch, var(--color-brand-dark) 25%, transparent) 100%)"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, color-mix(in oklch, var(--color-brand-dark) 50%, transparent), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 max-w-[640px]">
          <div>
            <SectionLabel>Architecture &amp; Design</SectionLabel>
          </div>
          <h1 className="font-display font-bold text-white leading-[1.05] mt-5" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}>
            Building Dreams,<br />Shaping Nepal&apos;s Future
          </h1>
          <p className="text-white/75 text-lg max-w-[480px] leading-relaxed mt-5">
            From concept to completion — we deliver exceptional architectural solutions across Nepal with innovation, precision, and passion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-white font-semibold shadow-lg shadow-brand-primary/30 bg-brand-primary hover:brightness-110 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-all duration-200"
            >
              Start Your Project
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 hover:border-white/60 active:scale-[0.98] transition-all duration-200"
            >
              <Play className="size-3.5 fill-white" />
              View Our Works
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm" />
              ))}
            </div>
            <p className="text-white/55 text-sm">Trusted by 50+ clients across Nepal</p>
          </div>
        </div>
        {/* {featuredImg && (
          <aside className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="w-full max-w-[360px] relative group">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/40">
                <div className="relative h-56">
                  <Image
                    src={featuredImg}
                    alt="Featured project"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                </div>
                <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">Featured Project</p>
                    <p className="text-white/50 text-xs mt-0.5">Horizon Nepal</p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-brand-primary/20 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-brand-primary/25">
                    <Check className="size-3" />
                    Completed
                  </span>
                </div>
              </div>
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.15), 0 24px 48px -12px rgba(0,0,0,0.5)" }}
                aria-hidden="true"
              />
            </div>
          </aside>
        )} */}
      </div>
    </section>
  );
}
