"use client";

import { useState } from "react";
import { Minus, Plus, HelpCircle, DollarSign, Settings, Shield, FileText } from "lucide-react";

const categories = [
  {
    icon: HelpCircle,
    title: "General Questions",
    subtitle: "Everything you need to know to get started",
    items: [
      { q: "What services does Horizon Nepal offer?", a: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal." },
      { q: "Where do you operate?", a: "We are based in Kathmandu and work across all districts of Nepal, including Pokhara, Chitwan, Bhaktapur, Lalitpur, and Dhulikhel." },
      { q: "How long has Horizon Nepal been in business?", a: "We have been shaping Nepal's built environment since 1999, with over 25 years of experience in architecture, engineering, and construction." },
    ],
  },
  {
    icon: DollarSign,
    title: "Pricing & Payments",
    subtitle: "Transparent costs, no hidden surprises",
    items: [
      { q: "How do you price your services?", a: "We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment." },
      { q: "Is the initial consultation free?", a: "Yes, the first consultation and site visit are completely free with no obligation to proceed." },
      { q: "Do you require a deposit to start?", a: "A standard upfront payment is required to begin design work. The amount varies by project scope and is clearly outlined in your proposal." },
    ],
  },
  {
    icon: Settings,
    title: "Process & Timeline",
    subtitle: "How we deliver your project on schedule",
    items: [
      { q: "How long does a typical project take?", a: "A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size." },
      { q: "What is your design process?", a: "We follow a structured approach: initial consultation, concept design, site assessment, detailed planning, approvals, construction, and handover — with you involved at every stage." },
      { q: "Can I make changes during construction?", a: "Yes, changes can be accommodated. We assess the impact on timeline and budget and discuss options with you before proceeding." },
    ],
  },
  {
    icon: Shield,
    title: "Quality & Compliance",
    subtitle: "Built to last, built to code",
    items: [
      { q: "Do you handle permits and approvals?", a: "Yes, we manage all municipal approvals, building permits, and environmental clearances as part of our full-service offering." },
      { q: "What quality guarantees do you offer?", a: "We conduct regular quality audits and safety inspections throughout construction. All work complies with Nepali building codes and standards." },
      { q: "Do you offer post-completion support?", a: "Absolutely. We provide documentation, warranties, and remain available for maintenance and post-completion support." },
    ],
  },
  {
    icon: FileText,
    title: "Documentation & Contracts",
    subtitle: "Clear paperwork, clear expectations",
    items: [
      { q: "What documents do I receive?", a: "You receive detailed architectural drawings, structural calculations, BOQ, permits, warranties, and a completion certificate." },
      { q: "Is there a written contract?", a: "Yes, every project begins with a detailed contract outlining scope, timeline, payment schedule, and terms." },
    ],
  },
];

export function FAQTimeline() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
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

          {categories.map((cat, catIdx) => {
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
                        <p className="text-xs text-mid-gray mt-0.5">{cat.subtitle}</p>
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
