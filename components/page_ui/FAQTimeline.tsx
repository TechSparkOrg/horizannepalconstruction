"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Minus, Plus, HelpCircle } from "lucide-react";
import type { FaqGroupResponse } from "@/api/types/faq.types";
import { getFaqs } from "@/api/services/faq.service";

interface FaqDisplay {
  q: string;
  a: string;
}

interface GroupInfo {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  initialGroups: FaqGroupResponse[];
}

export function FAQTimeline({ initialGroups }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});
  const [groupItems, setGroupItems] = useState<Record<string, FaqDisplay[]>>({});
  const [loadingGroup, setLoadingGroup] = useState<string | null>(null);

  const groups: GroupInfo[] = initialGroups
    .filter((g) => g.is_active)
    .map((g) => ({
      id: g.id,
      title: g.title,
      slug: g.slug,
    }));

  const activeGroup = groups.find((g) => g.id === activeCategory) ?? null;
  const activeItems = activeGroup ? (groupItems[activeGroup.id] ?? null) : null;
  const isLoadingActive = loadingGroup === activeCategory;

  const handleCategoryClick = useCallback(async (groupId: string) => {
    const isActive = activeCategory === groupId;
    if (isActive) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory(groupId);

    if (groupItems[groupId]) return;

    setLoadingGroup(groupId);
    const group = groups.find((g) => g.id === groupId);
    if (!group) { setLoadingGroup(null); return; }

    try {
      const res = await getFaqs({ group__slug: group.slug, page_size: 50 });
      const items: FaqDisplay[] = (res.results ?? [])
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({ q: item.question?.en ?? "", a: item.answer?.en ?? "" }));
      setGroupItems((prev) => ({ ...prev, [groupId]: items }));
    } catch {
      setGroupItems((prev) => ({ ...prev, [groupId]: [] }));
    } finally {
      setLoadingGroup(null);
    }
  }, [activeCategory, groupItems, groups]);

  const toggleItem = (catId: string, idx: number) => {
    setOpenItems((prev) => ({ ...prev, [catId]: prev[catId] === idx ? null : idx }));
  };

  const totalGroups = groups.length;

  if (groups.length === 0) {
    return (
      <section className="relative py-16 sm:py-28 overflow-hidden">
        <Image src="/video-gif/plan-making.svg" fill alt="" aria-hidden className="object-cover object-center" sizes="100vw" unoptimized />
        <div className="absolute inset-0 bg-[#f5f7fb]/88" aria-hidden />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#5a6e8a] py-10">No FAQs available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-28 overflow-hidden">
      <Image src="/video-gif/plan-making.svg" fill alt="" aria-hidden className="object-cover object-center" sizes="100vw" unoptimized />
      <div className="absolute inset-0 bg-[#f5f7fb]/88" aria-hidden />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div className="max-w-xl">
            <p className="text-[#cd2028] text-xs font-bold tracking-[0.2em] uppercase mb-3">Got Questions?</p>
            <h2 className="font-display font-bold text-[#0f2557] text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Everything You<br />Need to Know
            </h2>
            <p className="mt-4 text-[#5a6e8a] text-base">Select a category below to find answers.</p>
          </div>
          <div className="bg-[#0f2557] rounded-xl px-5 py-4 text-white shrink-0">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">FAQ Categories</p>
            <p className="font-display font-bold text-4xl leading-none">{totalGroups}</p>
            <p className="text-white/40 text-xs mt-1">choose a topic</p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {groups.map((group) => {
            const isActive = activeCategory === group.id;
            return (
              <button key={group.id} type="button" onClick={() => handleCategoryClick(group.id)}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all border ${
                  isActive ? "bg-[#0f2557] border-[#0f2557] text-white shadow-md" : "bg-white/80 backdrop-blur-sm border-[#e2e8f0] text-[#3d526e] hover:border-[#0f2557]/30 hover:bg-white"
                }`}>
                <span className="font-semibold text-sm leading-snug block truncate">{group.title}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion panel */}
        {!activeGroup ? (
          <div className="hidden sm:flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] bg-white/50 text-center gap-3">
            <HelpCircle className="size-8 text-[#e8edf5]" />
            <p className="text-sm text-[#5a6e8a]/60">Select a category above to see questions</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <h3 className="font-display font-bold text-[#0f2557] text-base">{activeGroup.title}</h3>
              {activeItems && (
                <span className="ml-auto text-xs text-[#5a6e8a]/60 font-semibold">
                  {activeItems.length} question{activeItems.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {isLoadingActive ? (
              <div className="divide-y divide-[#e8edf5]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-4">
                    <div className="h-4 w-6 rounded bg-[#e2e8f0] animate-pulse shrink-0 mt-0.5" />
                    <div className="flex-1 h-4 rounded bg-[#e2e8f0] animate-pulse" />
                    <div className="size-6 rounded-md bg-[#e2e8f0] animate-pulse shrink-0" />
                  </div>
                ))}
              </div>
            ) : activeItems?.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-[#5a6e8a]/60">No questions in this category yet.</p>
              </div>
            ) : activeItems ? (
              <div className="divide-y divide-[#e8edf5]">
                {activeItems.map((item, idx) => {
                  const isOpen = openItems[activeGroup.id] === idx;
                  return (
                    <div key={item.q}>
                      <button type="button" onClick={() => toggleItem(activeGroup.id, idx)}
                        className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left group">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-xs font-bold text-[#cd2028] mt-0.5 shrink-0 w-5 text-right">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold text-[#1a2b4a] group-hover:text-[#0f2557] leading-snug">{item.q}</span>
                        </div>
                        <span className={`shrink-0 size-6 rounded-md flex items-center justify-center transition-colors mt-0.5 ${isOpen ? "bg-[#0f2557] text-white" : "bg-[#f5f7fb] text-[#5a6e8a]"}`}>
                          {isOpen ? <Minus className="size-3" /> : <Plus className="size-3" />}
                        </span>
                      </button>
                      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                        <div className="overflow-hidden">
                          <p className="pl-[3.25rem] pr-6 pb-5 text-sm text-[#5a6e8a] leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}

        {/* Mobile: show groups stacked */}
        <div className="flex flex-col gap-3 sm:hidden mt-4">
          {groups
            .filter((g) => activeCategory === null || g.id === activeCategory)
            .map((group) => {
              const items = groupItems[group.id];
              const isGroupLoading = loadingGroup === group.id;
              return (
                <div key={group.id} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e2e8f0]">
                    <h3 className="font-display font-bold text-[#0f2557] text-sm">{group.title}</h3>
                  </div>
                  {isGroupLoading ? (
                    <div className="divide-y divide-[#e8edf5]">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3">
                          <div className="h-2.5 w-5 rounded bg-[#e2e8f0] animate-pulse shrink-0" />
                          <div className="flex-1 h-2.5 rounded bg-[#e2e8f0] animate-pulse" />
                        </div>
                      ))}
                    </div>
                  ) : items ? (
                    <div className="divide-y divide-[#e8edf5]">
                      {items.map((item, idx) => {
                        const isOpen = openItems[group.id] === idx;
                        return (
                          <div key={item.q}>
                            <button type="button" onClick={() => toggleItem(group.id, idx)}
                              className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left">
                              <span className="text-xs font-semibold text-[#1a2b4a] flex-1 leading-snug">{item.q}</span>
                              <span className={`shrink-0 size-5 rounded-md flex items-center justify-center mt-0.5 ${isOpen ? "bg-[#0f2557] text-white" : "bg-[#f5f7fb] text-[#5a6e8a]"}`}>
                                {isOpen ? <Minus className="size-2.5" /> : <Plus className="size-2.5" />}
                              </span>
                            </button>
                            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                              <div className="overflow-hidden">
                                <p className="px-4 pb-3 text-xs text-[#5a6e8a] leading-relaxed">{item.a}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
