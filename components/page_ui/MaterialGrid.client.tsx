"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MaterialCard } from "@/components/global_ui/MaterialCard";
import { getMaterials } from "@/api/services/material-public.service";
import type { PublicMaterialItem } from "@/api/types/material.types";

const ITEMS_PER_PAGE = 9;

const MaterialGrid = () => {
  const [items, setItems] = useState<PublicMaterialItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMaterials({ page: 1, page_size: ITEMS_PER_PAGE })
      .then((res) => {
        setItems(res.results ?? []);
        setTotalCount(res.count ?? 0);
      })
      .catch(() => {});
  }, []);

  const handleLoadMore = async () => {
    if (loading) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const res = await getMaterials({ page: nextPage, page_size: ITEMS_PER_PAGE });
      setItems((prev) => [...prev, ...(res.results ?? [])]);
      setTotalCount(res.count ?? 0);
      setPage(nextPage);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const hasMore = items.length < totalCount;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 mb-12">
          <Image
            src="/video-gif/school-book.svg"
            alt="Construction materials catalogue"
            width={90} height={120}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0"
            unoptimized
          />
          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Materials</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              Construction Materials
            </h2>
            <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[480px] leading-relaxed">
              Explore our comprehensive range of construction materials sourced from trusted partners.
            </p>
          </div>
          <Image
            src="/video-gif/school-book.svg"
            alt=""
            width={90} height={120}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0 scale-x-[-1]"
            unoptimized
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {items.map((item) => (
            <MaterialCard key={item.slug} item={item} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-[#e2e8f0] text-[13px] font-semibold text-[#0f2557] hover:border-[#cd2028] hover:text-[#cd2028] transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {items.length === 0 && (
          <p className="text-center text-[#64748b] py-20">No materials found.</p>
        )}
      </div>
    </section>
  );
};

export default MaterialGrid;
