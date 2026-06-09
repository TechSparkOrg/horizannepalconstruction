"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, HelpCircle, DollarSign, Settings, Shield, FileText, Building2 } from "lucide-react";
import { FaqPublic } from "@/api/services/faq.service";
import { CategoryPublic } from "@/api/services/category.service";
import type { Category } from "@/api/types/category.types";
import type { FaqItem } from "@/api/types/faq.types";

const CATEGORY_ICONS = [HelpCircle, DollarSign, Settings, Shield, FileText, Building2];

interface FaqDisplay {
  q: string;
  a: string;
}

export function FAQTimeline({ initialCategories, initialFaqItems }: { initialCategories?: Category[]; initialFaqItems?: FaqItem[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories ?? []);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(initialFaqItems ?? []);
  const [loading, setLoading] = useState(!(initialCategories && initialFaqItems));

  useEffect(() => {
    if (initialCategories && initialFaqItems) return;
    Promise.all([
      CategoryPublic.list(),
      FaqPublic.list(),
    ]).then(([catRes, faqRes]) => {
      setCategories(catRes.results ?? []);
      setFaqItems(faqRes.results ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [initialCategories, initialFaqItems]);

  const grouped = categories
    .map((cat, idx) => ({
      icon: CATEGORY_ICONS[idx % CATEGORY_ICONS.length],
      title: cat.name,
      items: faqItems
        .filter((item) => item.category_id === cat.id)
        .map((item): FaqDisplay => ({ q: item.question?.en ?? "", a: item.answer?.en ?? "" })),
    }))
    .filter((g) => g.items.length > 0);

  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (catIdx: number, itemIdx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [catIdx]: prev[catIdx] === itemIdx ? null : itemIdx,
    }));
  };

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Find Your Answers
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Browse by category or use the links above to jump to a topic.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-light-gray hidden lg:block" />

          {loading ? (
            <div className="space-y-14">
              {Array.from({ length: 3 }).map((_, catIdx) => (
                <div key={catIdx} className={`relative flex items-start gap-6 lg:gap-0 pb-14 last:pb-0 ${catIdx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="hidden lg:block w-1/2 pr-14">
                    <div className="bg-white rounded-2xl border border-light-gray/40 overflow-hidden animate-pulse">
                      <div className="flex items-center gap-4 p-6">
                        <div className="size-12 rounded-full bg-light-gray/30" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 w-40 rounded bg-light-gray/40" />
                        </div>
                      </div>
                      <div className="border-t border-light-gray/40 divide-y divide-light-gray/20">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="px-6 py-3.5">
                            <div className="h-4 w-3/4 rounded bg-light-gray/30" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 relative z-10 hidden lg:flex items-center justify-center">
                    <div className="size-12 rounded-full bg-white border-2 border-light-gray/30 animate-pulse" />
                  </div>
                  <div className="w-1/2 hidden lg:block" />
                </div>
              ))}
            </div>
          ) : grouped.length === 0 ? (
            <p className="text-sm text-mid-gray py-10 text-center">No FAQs available yet.</p>
          ) : grouped.map((cat, catIdx) => {
            const Icon = cat.icon;
            const isLeft = catIdx % 2 === 0;

            return (
              <div
                key={cat.title}
                className={`relative flex items-start gap-6 lg:gap-0 pb-14 last:pb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`hidden lg:block w-1/2 ${isLeft ? "pr-14" : "pl-14"}`}>
                  <div className="bg-white rounded-2xl border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                    <button
                      onClick={() => setOpenCategory(openCategory === catIdx ? null : catIdx)}
                      className="w-full flex items-center gap-4 p-6 text-left"
                    >
                      <div className="size-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-lg text-brand-secondary">{cat.title}</h3>
                      </div>
                      <span className={`shrink-0 size-6 rounded-full flex items-center justify-center transition-colors ${
                        openCategory === catIdx ? "bg-brand-primary/10 text-brand-primary" : "bg-light-gray/30 text-mid-gray"
                      }`}>
                        {openCategory === catIdx ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                      </span>
                    </button>

                    {openCategory === catIdx && (
                      <div className="border-t border-light-gray/40 divide-y divide-light-gray/30">
                        {cat.items.map((item, itemIdx) => {
                          const isOpen = openItems[catIdx] === itemIdx;
                          return (
                            <div key={item.q}>
                              <button
                                onClick={() => toggleItem(catIdx, itemIdx)}
                                className="w-full flex items-center justify-between gap-3 px-6 py-3.5 text-left"
                              >
                                <span className="text-sm font-medium text-brand-dark flex-1">{item.q}</span>
                                <span className={`shrink-0 size-5 rounded-full flex items-center justify-center transition-colors ${
                                  isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-light-gray/30 text-mid-gray"
                                }`}>
                                  {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                                </span>
                              </button>
                              <div
                                className="grid transition-all duration-300 ease-out"
                                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                              >
                                <div className="overflow-hidden">
                                  <p className="px-6 pb-4 text-sm text-mid-gray leading-relaxed">{item.a}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 relative z-10 hidden lg:flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-md">
                    <Icon className="size-5 text-brand-primary" />
                  </div>
                </div>

                <div className="lg:hidden flex-1">
                  <div className="relative pl-10 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-light-gray">
                    <div className="absolute left-0 top-0 size-9 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-sm">
                      <Icon className="size-4 text-brand-primary" />
                    </div>
                    <div className="bg-white rounded-2xl border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                      <button
                        onClick={() => setOpenCategory(openCategory === catIdx ? null : catIdx)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-base text-brand-secondary">{cat.title}</h3>
                        </div>
                        <span className={`shrink-0 size-6 rounded-full flex items-center justify-center transition-colors ${
                          openCategory === catIdx ? "bg-brand-primary/10 text-brand-primary" : "bg-light-gray/30 text-mid-gray"
                        }`}>
                          {openCategory === catIdx ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                        </span>
                      </button>

                      {openCategory === catIdx && (
                        <div className="border-t border-light-gray/40 divide-y divide-light-gray/30">
                          {cat.items.map((item, itemIdx) => {
                            const isOpen = openItems[catIdx] === itemIdx;
                            return (
                              <div key={item.q}>
                                <button
                                  onClick={() => toggleItem(catIdx, itemIdx)}
                                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                                >
                                  <span className="text-xs font-medium text-brand-dark flex-1">{item.q}</span>
                                  <span className={`shrink-0 size-5 rounded-full flex items-center justify-center transition-colors ${
                                    isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-light-gray/30 text-mid-gray"
                                  }`}>
                                    {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                                  </span>
                                </button>
                                <div
                                  className="grid transition-all duration-300 ease-out"
                                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                  <div className="overflow-hidden">
                                    <p className="px-4 pb-3 text-xs text-mid-gray leading-relaxed">{item.a}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
