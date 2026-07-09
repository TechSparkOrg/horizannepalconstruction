"use client";

import { useState } from "react";
import { Minus, Plus, HelpCircle, DollarSign, Settings, Shield, FileText, Building2 } from "lucide-react";
import type { FaqGroupResponse } from "@/api/types/faq.types";

const CATEGORY_ICONS: Record<string, typeof HelpCircle> = {
  "general-faqs": HelpCircle,
  "pricing-faqs": DollarSign,
  "service-faqs": Settings,
  "project-planning-faqs": Shield,
  "documentation-faqs": FileText,
  "construction-faqs": Building2,
};

const FALLBACK_ICONS = [HelpCircle, DollarSign, Settings, Shield, FileText, Building2];

interface GroupDisplay {
  id: string;
  title: string;
  categorySlug: string;
  icon: typeof HelpCircle;
  items: { q: string; a: string }[];
}

interface Props {
  initialGroups: FaqGroupResponse[];
}

function getIcon(categorySlug: string, idx: number): typeof HelpCircle {
  return CATEGORY_ICONS[categorySlug] ?? FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
}

export function FAQTimeline({ initialGroups }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const groups: GroupDisplay[] = initialGroups
    .filter((g) => g.is_active && g.items.length > 0)
    .map((g, idx) => ({
      id: g.id,
      title: g.title,
      categorySlug: g.category_slug,
      icon: getIcon(g.category_slug, idx),
      items: g.items
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({ q: item.question?.en ?? "", a: item.answer?.en ?? "" })),
    }));

  const toggleItem = (catId: string, itemIdx: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [catId]: prev[catId] === itemIdx ? null : itemIdx,
    }));
  };

  const activeGroup = groups.find((g) => g.id === activeCategory) ?? null;

  if (groups.length === 0) {
    return (
      <section className="bg-[#f5f7fb] py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#5a6e8a] py-10">No FAQs available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f5f7fb] py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="text-[#cd2028] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Got Questions?
          </p>
          <h2 className="font-display font-bold text-[#0f2557] text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Everything You<br />Need to Know
          </h2>
          <p className="mt-4 text-[#5a6e8a] text-base">
            Select a category below to find answers.
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

          {/* Left — Category tabs */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
              {groups.map((group) => {
                const Icon = group.icon;
                const isActive = activeCategory === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveCategory(isActive ? null : group.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-left transition-all shrink-0 lg:shrink lg:w-full border ${
                      isActive
                        ? "bg-[#0f2557] border-[#0f2557] text-white shadow-sm"
                        : "bg-white border-[#e2e8f0] text-[#3d526e] hover:border-[#0f2557]/30 hover:text-[#0f2557]"
                    }`}
                  >
                    <div
                      className={`size-8 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-white/15" : "bg-[#eff6ff]"
                      }`}
                    >
                      <Icon className={`size-4 ${isActive ? "text-white" : "text-[#0f2557]"}`} />
                    </div>
                    <span className="font-semibold text-sm leading-snug">{group.title}</span>
                    <span
                      className={`ml-auto text-xs font-bold shrink-0 hidden lg:block ${
                        isActive ? "text-white/60" : "text-[#5a6e8a]/60"
                      }`}
                    >
                      {group.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Decorative stat block — desktop only */}
            <div className="hidden lg:block mt-6 bg-[#0f2557] rounded-xl p-5 text-white">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Total FAQs</p>
              <p className="font-display font-bold text-4xl">
                {groups.reduce((acc, g) => acc + g.items.length, 0)}
              </p>
              <p className="text-white/40 text-xs mt-1">across {groups.length} categories</p>
            </div>
          </div>

          {/* Right — Accordion panel */}
          <div className="flex-1 min-w-0">
            {!activeGroup ? (
              <div className="hidden lg:flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] text-center gap-3">
                <HelpCircle className="size-8 text-[#e8edf5]" />
                <p className="text-sm text-[#5a6e8a]/60">Select a category to see questions</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                {/* Panel header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e2e8f0]">
                  {(() => { const Icon = activeGroup.icon; return <Icon className="size-4 text-[#cd2028] shrink-0" />; })()}
                  <h3 className="font-display font-bold text-[#0f2557] text-base">{activeGroup.title}</h3>
                  <span className="ml-auto text-xs text-[#5a6e8a]/60 font-semibold">
                    {activeGroup.items.length} question{activeGroup.items.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#e8edf5]">
                  {activeGroup.items.map((item, itemIdx) => {
                    const isOpen = openItems[activeGroup.id] === itemIdx;
                    return (
                      <div key={item.q}>
                        <button
                          type="button"
                          onClick={() => toggleItem(activeGroup.id, itemIdx)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left group"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-xs font-bold text-[#cd2028] mt-0.5 shrink-0 w-5 text-right">
                              {String(itemIdx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm font-semibold text-[#1a2b4a] group-hover:text-[#0f2557] leading-snug">
                              {item.q}
                            </span>
                          </div>
                          <span
                            className={`shrink-0 size-6 rounded-md flex items-center justify-center transition-colors mt-0.5 ${
                              isOpen
                                ? "bg-[#0f2557] text-white"
                                : "bg-[#f5f7fb] text-[#5a6e8a]"
                            }`}
                          >
                            {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                          </span>
                        </button>

                        <div
                          className="grid transition-all duration-300 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="pl-[3.25rem] pr-6 pb-5 text-sm text-[#5a6e8a] leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile: show all groups inline when none selected */}
            <div className="flex flex-col gap-3 lg:hidden">
              {groups
                .filter((g) => activeCategory === null || g.id === activeCategory)
                .map((group) => (
                  <div key={group.id} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e2e8f0]">
                      {(() => { const Icon = group.icon; return <Icon className="size-4 text-[#cd2028]" />; })()}
                      <h3 className="font-display font-bold text-[#0f2557] text-sm">{group.title}</h3>
                    </div>
                    <div className="divide-y divide-[#e8edf5]">
                      {group.items.map((item, itemIdx) => {
                        const isOpen = openItems[group.id] === itemIdx;
                        return (
                          <div key={item.q}>
                            <button
                              type="button"
                              onClick={() => toggleItem(group.id, itemIdx)}
                              className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left"
                            >
                              <span className="text-xs font-semibold text-[#1a2b4a] flex-1 leading-snug">{item.q}</span>
                              <span className={`shrink-0 size-5 rounded-md flex items-center justify-center mt-0.5 ${isOpen ? "bg-[#0f2557] text-white" : "bg-[#f5f7fb] text-[#5a6e8a]"}`}>
                                {isOpen ? <Minus className="size-2.5" /> : <Plus className="size-2.5" />}
                              </span>
                            </button>
                            <div
                              className="grid transition-all duration-300 ease-out"
                              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                            >
                              <div className="overflow-hidden">
                                <p className="px-4 pb-3 text-xs text-[#5a6e8a] leading-relaxed">{item.a}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}