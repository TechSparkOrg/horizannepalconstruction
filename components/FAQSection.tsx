"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FaqService } from "@/api/services/faq.service";

const fallback = [
  { q: "What services does Horizon Nepal offer?", a: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal." },
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size." },
  { q: "Do you handle government approvals and permits?", a: "Yes, we manage all necessary municipal approvals, building permits, and environmental clearances as part of our full-service offering." },
  { q: "What is the cost structure for your services?", a: "Our pricing is transparent and project-specific. We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment." },
  { q: "Can I visit ongoing projects to see your work?", a: "Absolutely. We encourage potential clients to visit our active project sites. Please contact us to schedule a visit at your convenience." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [faqs, setFaqs] = useState(fallback);

  useEffect(() => {
    FaqService.list().then((r) => {
      if (r.results.length > 0) {
        setFaqs(r.results.map((f) => ({ q: f.question?.en ?? "", a: f.answer?.en ?? "" })));
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-16 sm:py-28 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">

        {/* Left — copy */}
        <div>
          <SectionLabel>Have Questions?</SectionLabel>
          <h2
            className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ color: "oklch(0.19 0.05 260)" }}
          >
            Frequently<br />Asked Questions
          </h2>
          <p
            className="mt-4 text-base leading-relaxed max-w-sm"
            style={{ color: "oklch(0.55 0.01 75)" }}
          >
            Find answers to common enquiries about our services, process, and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "oklch(0.55 0.15 35)" }}
          >
            Ask a question
            <ArrowRight className="size-4" />
          </Link>
          <div className="mt-3">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              style={{ color: "oklch(0.55 0.15 35)" }}
            >
              View all FAQs
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Right — accordion */}
        <div
          className="rounded-2xl overflow-hidden border divide-y"
          style={{
            borderColor: "oklch(0.88 0.01 75 / 0.5)",
          }}
        >
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white transition-colors duration-200"
                style={{
                  borderLeft: isOpen
                    ? "3px solid oklch(0.55 0.15 35)"
                    : "3px solid transparent",
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                >
                  <span
                    className="text-sm font-medium leading-snug"
                    style={{ color: "oklch(0.19 0.05 260)" }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 size-6 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={
                      isOpen
                        ? {
                            backgroundColor: "oklch(0.55 0.15 35 / 0.1)",
                            color: "oklch(0.55 0.15 35)",
                          }
                        : {
                            backgroundColor: "oklch(0.93 0.01 75 / 0.6)",
                            color: "oklch(0.55 0.01 75)",
                          }
                    }
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
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: "oklch(0.55 0.01 75)" }}
                    >
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