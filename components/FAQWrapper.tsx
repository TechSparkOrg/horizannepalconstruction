"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useClientStore } from "@/stores/client-store";

const fallback = [
  { q: "What services does Horizon Nepal offer?", a: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal." },
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size." },
  { q: "Do you handle government approvals and permits?", a: "Yes, we manage all necessary municipal approvals, building permits, and environmental clearances as part of our full-service offering, ensuring a hassle-free experience for our clients." },
  { q: "What is the cost structure for your services?", a: "Our pricing is transparent and project-specific. We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment." },
  { q: "Can I visit ongoing projects to see your work?", a: "Absolutely. We encourage potential clients to visit our active project sites. Please contact us to schedule a visit at your convenience." },
];

export function FAQWrapper() {
  const [open, setOpen] = useState<number | null>(0);
  const faqItems = useClientStore((s) => s.faqItems);
  const fetchFaqs = useClientStore((s) => s.fetchFaqs);

  useEffect(() => {
    if (faqItems.length === 0) fetchFaqs();
  }, [fetchFaqs, faqItems.length]);

  const faqs = faqItems.length > 0
    ? faqItems.map((f) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" }))
    : fallback;

  return (
    <section className="py-16 sm:py-28 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <div>
          <SectionLabel>Have Questions?</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-brand-dark">
            Frequently<br />Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-sm text-mid-gray">
            Find answers to common enquiries about our services, process, and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white bg-brand-primary hover:brightness-110 transition"
          >
            Ask a question
            <ArrowRight className="size-4" />
          </Link>
          <div className="mt-3">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:underline"
            >
              View all FAQs
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-light-gray/50 divide-y divide-light-gray/50">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-white transition-colors duration-200 ${
                  isOpen ? "border-l-brand-primary" : "border-l-transparent"
                }`}
                style={{ borderLeftWidth: "3px" }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span className="text-sm font-medium leading-snug text-brand-dark">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 size-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "bg-light-gray/30 text-mid-gray"
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-mid-gray">
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
