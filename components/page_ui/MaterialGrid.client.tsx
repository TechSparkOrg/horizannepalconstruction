"use client";

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
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-brand-primary border border-brand-primary/20 px-3 py-1 rounded mb-4">
            Materials
          </span>
          <h2 className="text-[30px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.1]">
            Construction Materials
          </h2>
          <p className="mt-3 text-[14px] text-mid-gray max-w-xl mx-auto leading-relaxed">
            Explore our comprehensive range of construction materials sourced from trusted partners.
          </p>
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
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-[#e8edf5] text-[13px] font-semibold text-brand-dark hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {items.length === 0 && (
          <p className="text-center text-mid-gray py-20">No materials found.</p>
        )}
      </div>
    </section>
  );
};

export default MaterialGrid;
