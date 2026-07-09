"use client";

import { useEffect, useState } from "react";
import { getFaqsByCategory } from "@/api/services/faq.service";
import type { FaqItem } from "@/api/types/faq.types";

interface FaqDisplay {
  q: string;
  a: string;
}

interface Props {
  categorySlug: string;
  type?: string;
  title?: string;
  subtitle?: string;
  initialFaqs?: FaqDisplay[];
}

export default function FaqClient({ categorySlug, type, title, subtitle, initialFaqs }: Props) {
  const [faqs, setFaqs] = useState<FaqDisplay[]>(initialFaqs ?? []);
  const [loading, setLoading] = useState(!initialFaqs);

  useEffect(() => {
    if (initialFaqs) return;
    let cancelled = false;
    setLoading(true);
    getFaqsByCategory(categorySlug, type)
      .then((res) => {
        if (cancelled) return;
        setFaqs(
          (res.results ?? []).map((item: FaqItem) => ({
            q: item.question?.en ?? "",
            a: item.answer?.en ?? "",
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setFaqs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [categorySlug, type, initialFaqs]);

  if (loading) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-3 w-16 rounded bg-[#fee2e2] mx-auto mb-3 animate-pulse" />
            <div className="h-7 w-64 rounded bg-[#e2e8f0] mx-auto animate-pulse" />
          </div>
          <div className="space-y-3 max-w-[860px] mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-[#f1f5f9] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No questions in this category yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        {title && (
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">FAQ</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[440px] mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Accordion */}
        <div className="space-y-3 max-w-[860px] mx-auto">
          {faqs.map((item, i) => (
            <details key={i} className="group rounded-xl border border-[#e2e8f0] overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none hover:bg-[#f8fafc] transition-colors [&::-webkit-details-marker]:hidden">
                <span className="text-[14px] font-semibold leading-snug text-[#0f2557] group-open:text-[#cd2028] transition-colors">
                  {item.q}
                </span>
                <svg
                  className="w-4 h-4 shrink-0 text-[#94a3b8] transition-transform duration-200 group-open:rotate-180 group-open:text-[#cd2028]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-3 border-t border-[#e2e8f0]">
                <p className="text-[14px] text-[#64748b] leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
