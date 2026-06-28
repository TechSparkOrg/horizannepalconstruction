"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFaqs } from "@/api/services/faq.service";
import type { FaqItem } from "@/api/types/faq.types";

type Faq = { q: string; a: string };

export function FAQWrapper({ initialFaqs }: { initialFaqs?: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs ?? []);

  useEffect(() => {
    if (initialFaqs) return;
    getFaqs()
      .then((res) => {
        if (res.results?.length > 0) {
          setFaqs(res.results.map((f: FaqItem) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" })));
        }
      })
      .catch(() => {});
  }, [initialFaqs]);

  return (
    <section className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">

        {/* Left column */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
            Have Questions?
          </p>
          <h2 className="mt-3 text-[30px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.1]">
            Frequently<br />Asked Questions
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-mid-gray max-w-sm">
            Find answers to common enquiries about our services, process, and pricing.
          </p>

          <div className="mt-6 flex items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center h-10 gap-2 px-5 rounded-full text-[13px] font-semibold leading-none text-white bg-brand-primary hover:bg-blue-700 transition-colors"
            >
              Ask a question
              <ArrowRight className="size-3.5 shrink-0" />
            </Link>

            <Link
              href="/faq"
              className="inline-flex items-center h-10 gap-1.5 text-[13px] font-semibold leading-none text-mid-gray hover:text-brand-dark transition-colors"
            >
              View all FAQs
              <ArrowRight className="size-3.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Right column — accordion */}
        <div className="rounded-xl overflow-hidden border border-light-gray divide-y divide-light-gray bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`transition-colors duration-200 border-l-[3px] ${
                  isOpen ? "border-l-brand-primary" : "border-l-transparent"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span className="text-[14px] font-semibold leading-snug text-brand-dark">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 size-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "bg-light-gray text-mid-gray"
                    }`}
                  >
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>

                <div
                  id={`faq-${i}`}
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[13px] leading-relaxed text-mid-gray">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}