"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface FAQType {
  id: string;
  name: string;
  slug: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  faqType: FAQType;
}

interface FAQAccordionProps {
  items: FAQItem[];
  types: FAQType[];
  filterAll: string;
  empty: string;
}

export function FAQAccordion({ items, types, filterAll, empty }: FAQAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = typeFilter
    ? items.filter((f) => f.faqType?.id === typeFilter)
    : items;

  return (
    <div className="pb-16 bg-off-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {types.length > 1 && (
          <div className="mt-12 sm:mt-16 flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => { setTypeFilter(null); setOpen(null); }}
              className={`px-6 py-2.5 text-sm font-bold tracking-wide rounded-lg border-2 transition-all duration-200 ${
                !typeFilter
                  ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 scale-105"
                  : "bg-white text-mid-gray border-light-gray hover:border-brand-primary hover:text-brand-primary hover:shadow-md"
              }`}
            >
              {filterAll}
            </button>
            {types.map((ft) => (
              <button
                key={ft.id}
                type="button"
                onClick={() => { setTypeFilter(ft.id); setOpen(null); }}
                className={`px-6 py-2.5 text-sm font-bold tracking-wide rounded-lg border-2 transition-all duration-200 ${
                  typeFilter === ft.id
                    ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 scale-105"
                    : "bg-white text-mid-gray border-light-gray hover:border-brand-primary hover:text-brand-primary hover:shadow-md"
                }`}
              >
                {ft.name}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-mid-gray text-center mt-16 py-20">{empty}</p>
        ) : (
          <div className="mt-12 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((f) => {
              const isOpen = open === f.id;
              return (
                <div
                  key={f.id}
                  className={`break-inside-avoid rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-brand-primary shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                      : "border-light-gray/40 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="w-full flex items-start justify-between gap-3 text-left px-5 py-5"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className={`size-6 rounded-full grid place-items-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                          isOpen
                            ? "bg-brand-primary text-white"
                            : "bg-brand-primary/10 text-brand-primary"
                        }`}
                      >
                        ?
                      </span>
                      <span className={`font-body text-sm font-semibold leading-snug ${
                        isOpen ? "text-brand-primary" : "text-brand-secondary"
                      }`}>
                        {f.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <Minus className="size-4 text-brand-primary shrink-0 mt-1" />
                    ) : (
                      <Plus className="size-4 text-brand-primary/60 shrink-0 mt-1" />
                    )}
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pt-0 border-t border-brand-primary/10">
                        <p className="text-mid-gray text-sm leading-relaxed mt-3">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
