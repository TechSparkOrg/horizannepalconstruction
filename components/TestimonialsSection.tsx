"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Languages } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ReviewPublic } from "@/api/services/review.service";
import type { Review } from "@/api/types/review.types";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-1 text-amber-400 mb-3">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`size-4 ${s <= value ? "fill-current" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export function TestimonialsSection({ initialReviews }: { initialReviews?: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews ?? []);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (initialReviews) return;
    ReviewPublic.list().then((res) => setReviews(res.results ?? []));
  }, [initialReviews]);
  const [lang, setLang] = useState<"en" | "np">("en");
  const perView = 3;
  const max = Math.max(0, reviews.length - perView);
  const prev = () => setI((v) => Math.max(0, v - 1));
  const next = () => setI((v) => Math.min(max, v + 1));

  if (reviews.length === 0) {
    return (
      <section className="bg-off-white py-16 sm:py-28" aria-label="Customer testimonials">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="h-5 w-24 rounded-full bg-light-gray/50 animate-pulse mb-3" />
              <div className="h-8 w-64 rounded-lg bg-light-gray/50 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="size-11 rounded-full bg-light-gray/30 animate-pulse" />
              <div className="size-11 rounded-full bg-light-gray/30 animate-pulse" />
            </div>
          </div>
          <div className="mt-10 flex gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl p-6 border border-light-gray/40">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => <div key={s} className="size-4 rounded bg-light-gray/30 animate-pulse" />)}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-11/12 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-11 rounded-full bg-light-gray/30 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-2.5 w-16 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-off-white py-16 sm:py-28" aria-label="Customer testimonials">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "np" : "en")}
              className="h-10 px-3 rounded-lg border border-light-gray bg-white text-xs font-semibold text-mid-gray flex items-center gap-1.5 hover:border-brand-primary hover:text-brand-primary transition"
            >
              <Languages className="size-3.5" />
              {lang === "en" ? "NP" : "EN"}
            </button>
            <button
              onClick={prev}
              aria-label="Previous"
              className="size-11 rounded-full border border-light-gray bg-white grid place-items-center hover:border-brand-primary hover:text-brand-primary transition"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="size-11 rounded-full border border-light-gray bg-white grid place-items-center hover:border-brand-primary hover:text-brand-primary transition"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${i} * (100% / 3) - ${i} * 1.5rem / 3))`,
            }}
            aria-live="polite"
          >
            {reviews.map((t) => (
              <article
                key={t.id}
                className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl p-6 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <Stars value={t.rating} />
                <p className="text-brand-dark italic leading-relaxed">
                  <span className="text-brand-primary font-display text-xl">&ldquo;</span>
                  {t.quote[lang]}
                  <span className="text-brand-primary font-display text-xl">&rdquo;</span>
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-11 rounded-full bg-brand-secondary text-white grid place-items-center font-semibold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-secondary">{t.name}</p>
                    <p className="text-sm text-mid-gray">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
