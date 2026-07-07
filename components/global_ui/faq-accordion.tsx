"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, ArrowRight, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { getFaqs } from "@/api/services/faq.service";
import type { FaqItem } from "@/api/types/faq.types";

type Faq = { q: string; a: string };

function AccordionItem({ faq, index, isOpen, onToggle }: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={[
        "rounded-xl bg-white shadow-sm transition-shadow duration-200",
        isOpen ? "shadow-md" : "hover:shadow-md",
      ].join(" ")}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 rounded-xl"
      >
        <span
          className={`text-[14.5px] font-semibold leading-snug transition-colors duration-150 ${
            isOpen ? "text-brand-primary" : "text-[#111827]"
          }`}
        >
          {faq.q}
        </span>

        <span
          className={[
            "shrink-0 size-7 rounded-full flex items-center justify-center transition-colors duration-200",
            isOpen
              ? "bg-brand-primary text-white"
              : "bg-[#f0f5ff] text-brand-primary",
          ].join(" ")}
          aria-hidden="true"
        >
          {isOpen
            ? <Minus className="size-3.5" />
            : <Plus className="size-3.5" />}
        </span>
      </button>

      {/* Answer — CSS grid collapse */}
      <div
        id={`faq-panel-${index}`}
        role="region"
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[13.5px] leading-[1.75] text-[#6b7280]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function SkeletonItem({ wide }: { wide?: boolean }) {
  return (
    <div className="rounded-xl bg-white shadow-sm px-5 py-4 flex items-center justify-between gap-4">
      <div className={`h-4 rounded bg-[#eef2f9] animate-pulse ${wide ? "w-3/4" : "w-2/3"}`} />
      <div className="size-7 rounded-full bg-[#eef2f9] animate-pulse shrink-0" />
    </div>
  );
}

export function FAQWrapper({ initialFaqs }: { initialFaqs?: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs ?? []);

  useEffect(() => {
    if (initialFaqs) return;
    getFaqs()
      .then((res) => {
        if (res.results?.length > 0) {
          setFaqs(res.results.map((f: FaqItem) => ({
            q: f.question?.en ?? "",
            a: f.answer?.en ?? "",
          })));
        }
      })
      .catch(() => {});
  }, [initialFaqs]);

  return (
    <section className="py-16 sm:py-24 bg-[#f5f8ff]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: heading + CTAs ── */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-brand-primary shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
                Have Questions?
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[34px] font-bold text-brand-dark leading-[1.15]">
              Frequently<br />Asked Questions
            </h2>

            <p className="mt-4 text-[14px] leading-[1.75] text-[#6b7280] max-w-[300px]">
              Find answers to common enquiries about our services, process, and pricing.
            </p>

            {/* Icon stat */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm">
              <div className="size-10 rounded-xl bg-[#f0f5ff] flex items-center justify-center shrink-0">
                <MessageCircleQuestion className="size-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#111827]">Still have questions?</p>
                <p className="text-[12px] text-[#9ca3af]">We&apos;re happy to help.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-semibold text-white bg-brand-primary hover:bg-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                Ask a question
                <ArrowRight className="size-3.5 shrink-0" />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full text-[13px] font-semibold text-[#374151] border border-[#e8edf5] bg-white hover:border-brand-primary/30 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                View all FAQs
                <ArrowRight className="size-3.5 shrink-0" />
              </Link>
            </div>
          </div>

          {/* ── Right: accordion ── */}
          <div className="flex flex-col gap-3">
            {faqs.length === 0 ? (
              <>
                <SkeletonItem wide />
                <SkeletonItem />
                <SkeletonItem wide />
                <SkeletonItem />
                <SkeletonItem />
              </>
            ) : (
              faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  faq={f}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
