"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ReviewPublic } from "@/api/services/review.service";
import type { Review } from "@/api/types/review.types";
import Image from "next/image";

const PER_VIEW = 4;

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-1.5 mb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`size-3.5 ${s <= value ? "fill-amber-400 text-amber-400" : "text-[#e2e8f0] fill-[#e2e8f0]"}`} />
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
}

function ReviewCard({ t }: { t: Review }) {
  return (
    <article className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-[0_2px_16px_rgba(15,37,87,0.06)] hover:shadow-[0_8px_32px_rgba(15,37,87,0.12)] transition-shadow duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start">
      <div className="h-[3px] bg-[#1d4ed8] w-full" aria-hidden="true" />
      <div className="p-5">
        <Stars value={t.rating} />
        <div className="relative">
          <span className="absolute -top-2 -left-1 font-display text-[52px] leading-none text-[#1d4ed8] select-none" aria-hidden="true">&ldquo;</span>
          <p className="pt-6 text-[13px] leading-relaxed text-[#0f172a] line-clamp-4">{t.description}</p>
        </div>
        <div className="mt-4 flex items-center gap-3 pt-4 border-t border-[#f1f5f9]">
          <div className="size-9 rounded-full bg-[#0f2557] text-white ring-2 ring-[#bfdbfe] grid place-items-center font-bold text-[11px] shrink-0">
            {getInitials(t.name)}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#0f2557]">{t.name}</p>
            {t.rating >= 4 && <p className="text-[10.5px] text-[#1d4ed8] font-medium mt-0.5">Verified Client</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start">
      <div className="h-[3px] bg-[#e2e8f0] w-full animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="flex gap-1.5">{[1,2,3,4,5].map((s) => <div key={s} className="size-3.5 rounded bg-[#e2e8f0] animate-pulse" />)}</div>
        <div className="space-y-2 pt-4">
          <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-3 w-11/12 rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-[#f1f5f9] animate-pulse" />
        </div>
        <div className="pt-4 border-t border-[#f1f5f9] flex items-center gap-3">
          <div className="size-9 rounded-full bg-[#e2e8f0] animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 rounded bg-[#e2e8f0] animate-pulse" />
            <div className="h-2.5 w-16 rounded bg-[#f1f5f9] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ initialReviews, svgUrl }: { initialReviews?: Review[]; svgUrl?: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews ?? []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (initialReviews) return;
    ReviewPublic.list().then((res) => setReviews(res.results ?? []));
  }, [initialReviews]);

  /* Reset carousel index when viewport drops to mobile */
  useEffect(() => {
    const reset = () => { if (window.innerWidth < 640) setIdx(0); };
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  const loading = reviews.length === 0;
  const max = Math.max(0, reviews.length - PER_VIEW);

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-28 border-t border-[#e2e8f0]" aria-label="Customer testimonials">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">

          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src={svgUrl || "/video-gif/review-animation.svg"}
              alt="Client reviews illustration"
              width={140}
              height={88}
              unoptimized
              className="w-[72px] h-[45px] sm:w-[140px] sm:h-[88px] shrink-0 object-contain"
              sizes="(max-width: 640px) 72px, 140px" />
            <div>
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d4ed8] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full mb-2">
                Testimonials
              </span>
              <h2 className="font-display text-[22px] sm:text-[32px] font-bold text-[#0f2557] leading-tight">
                What Our Clients Say
              </h2>
            </div>
          </div>

          {/* Nav buttons — desktop only */}
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => setIdx((v) => Math.max(0, v - 1))} disabled={idx === 0} aria-label="Previous"
              className="size-10 rounded-xl bg-[#f1f5f9] border border-[#e2e8f0] grid place-items-center text-[#475569] hover:bg-[#1d4ed8] hover:text-white hover:border-[#1d4ed8] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={() => setIdx((v) => Math.min(max, v + 1))} disabled={idx >= max} aria-label="Next"
              className="size-10 rounded-xl bg-[#1d4ed8] border border-[#1d4ed8] grid place-items-center text-white hover:bg-[#1e40af] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Mobile: snap scroll | Desktop: controlled carousel */}
        <div className="sm:overflow-hidden overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
          <div
            className="flex gap-6 sm:transition-transform sm:duration-500 sm:ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(calc(-${idx} * (25% + 6px)))` }}
            aria-live="polite"
          >
            {loading
              ? [1, 2, 3, 4].map((k) => <SkeletonCard key={k} />)
              : reviews.map((t) => <ReviewCard key={t.id} t={t} />)}
          </div>
        </div>

      </div>
    </section>
  );
}
