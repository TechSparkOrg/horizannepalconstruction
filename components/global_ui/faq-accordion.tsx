"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { getFaqsSafeRaw } from "@/api/services/faq.service";
import type { FaqItem } from "@/api/types/faq.types";

interface Faq { q: string; a: string }

function FaqRow({
  faq,
  isOpen,
  isLast,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative flex gap-4">
      {/* Rail */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors duration-200 ${
            isOpen
              ? "bg-brand-primary text-white shadow-sm"
              : "border border-light-gray bg-white text-muted-foreground"
          }`}
        >
          Q
        </div>
        {!isLast && <div className="my-1.5 w-px flex-1 bg-light-gray" />}
      </div>

      {/* Content */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="min-w-0 flex-1 pb-6 pt-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <p className={`text-[14.5px] font-semibold leading-snug transition-colors duration-150 ${isOpen ? "text-brand-primary" : "text-brand-dark"}`}>
            {faq.q}
          </p>
          <ChevronDown
            className={`size-4 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-primary" : ""}`}
          />
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
        >
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
            {faq.a}
          </p>
        </div>
      </button>
    </div>
  );
}

function SkeletonRow({ isLast }: { isLast?: boolean }) {
  return (
    <div className="flex gap-4 pb-6">
      <div className="flex flex-col items-center shrink-0">
        <div className="h-7 w-7 rounded-full bg-light-gray/60 animate-pulse" />
        {!isLast && <div className="my-1.5 w-px flex-1 bg-light-gray" />}
      </div>
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3.5 w-2/3 rounded bg-light-gray/60 animate-pulse" />
      </div>
    </div>
  );
}

export function FAQWrapper({ initialFaqs, svgUrl }: { initialFaqs?: FaqItem[]; svgUrl?: string }) {
  const [faqs, setFaqs]           = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    if (initialFaqs) {
      setFaqs(initialFaqs.map((f) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" })));
      return;
    }
    let mounted = true;
    getFaqsSafeRaw()
      .then((items) => {
        if (mounted) setFaqs(items.map((f: FaqItem) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" })));
      })
      .catch((err) => { if (mounted) console.error("Failed to fetch FAQs:", err); });
    return () => { mounted = false; };
  }, [initialFaqs]);

  return (
    <section className="py-20 bg-[#f5f8ff]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Live-chatbot SVG — full width above */}
        <div className="relative w-full overflow-hidden rounded-2xl mb-10" style={{ height: "clamp(160px, 22vw, 300px)" }}>
          <Image
            src={svgUrl || "/video-gif/Live-chatbot.svg"}
            alt="Live chat support illustration"
            fill
            sizes="100vw"
            className="object-contain object-center"
            priority={false}
            unoptimized
          />
        </div>

        {/* Two-column: heading left, FAQ right */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-brand-primary shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
                Common Questions
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-brand-dark leading-[1.15] mb-3">
              Frequently Asked<br />Questions
            </h2>
            <p className="text-[14px] leading-relaxed text-muted-foreground mb-8">
              Can&apos;t find what you&apos;re looking for? Reach out directly — we&apos;re happy to help.
            </p>
            <div className="flex flex-col gap-3">
              <Link prefetch={false}
                href="/contact"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-semibold text-[13px] transition-colors w-fit focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                <MessageCircle className="size-4" />
                Ask a Question
              </Link>
              <Link prefetch={false}
                href="/faq"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-brand-dark transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                View all FAQs
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — FAQ list */}
          <div>
            {faqs.length === 0
              ? [0, 1, 2, 3].map((i) => <SkeletonRow key={i} isLast={i === 3} />)
              : faqs.map((faq, i) => (
                  <FaqRow
                    key={i}
                    faq={faq}
                    isLast={i === faqs.length - 1}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                  />
                ))}
          </div>

        </div>
      </div>
    </section>
  );
}
