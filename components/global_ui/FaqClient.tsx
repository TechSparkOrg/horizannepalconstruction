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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && <div className="mb-6 h-6 w-48 rounded bg-gray-100 animate-pulse" />}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-6 border-l-4 border-brand-primary pl-4">
            <h2 className="text-xl font-bold text-brand-dark">{title}</h2>
            {subtitle && <p className="text-xs text-mid-gray mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden bg-white">
          {faqs.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-medium leading-snug text-brand-dark group-open:text-brand-primary">{item.q}</span>
                <svg className="w-4 h-4 shrink-0 text-mid-gray transition-transform duration-200 group-open:rotate-180 group-open:text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-mid-gray leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
