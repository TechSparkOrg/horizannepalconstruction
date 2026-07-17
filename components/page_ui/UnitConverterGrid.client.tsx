"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { UnitConverterCard } from "@/components/global_ui/UnitConverterCard";
import { getUnitConversions } from "@/api/services/unit-converter-public.service";
import type { PublicUnitConversionItem } from "@/api/types/unit-converter.types";

const ITEMS_PER_PAGE = 9;

const UnitConverterGrid = ({ tapeSvgUrl, buildingSvgUrl }: { tapeSvgUrl?: string; buildingSvgUrl?: string }) => {
  const [items, setItems] = useState<PublicUnitConversionItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    getUnitConversions({ page: 1, page_size: ITEMS_PER_PAGE })
      .then((res) => {
        setItems(res.results ?? []);
        setTotalCount(res.count ?? 0);
      })
      .catch(() => {})
      .finally(() => setInitialLoading(false));
  }, []);

  const handleLoadMore = async () => {
    if (loading) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const res = await getUnitConversions({ page: nextPage, page_size: ITEMS_PER_PAGE });
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

        {/* Heading with tape.svg flanking */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <Image
            src={tapeSvgUrl || "/video-gif/tape.svg"}
            alt=""
            aria-hidden="true"
            width={90} height={110}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0" style={{ height: "auto" }}
            unoptimized
          />
          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Conversions</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              Unit Conversions
            </h2>
            <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[440px] leading-relaxed">
              Select a conversion type to get started with accurate, real-time unit calculations.
            </p>
          </div>
          <Image
            src={tapeSvgUrl || "/video-gif/tape.svg"}
            alt=""
            aria-hidden="true"
            width={90} height={110}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0 scale-x-[-1]" style={{ height: "auto" }}
            unoptimized
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {items.map((item) => (
            <UnitConverterCard key={item.slug} item={item} />
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

        {initialLoading && (
          <p className="text-center text-[#64748b] py-20">Loading converters…</p>
        )}
        {!initialLoading && items.length === 0 && (
          <p className="text-center text-[#64748b] py-20">No unit converters found.</p>
        )}

        {/* Building.svg — decorative footer illustration */}
        {!initialLoading && items.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#e2e8f0] flex flex-col items-center gap-3">
            <Image
              src={buildingSvgUrl || "/video-gif/Building.svg"}
              alt=""
              aria-hidden="true"
              width={320}
              height={200}
              className="w-[220px] sm:w-[300px] lg:w-[360px] h-auto object-contain opacity-80 select-none pointer-events-none"
              unoptimized
            />
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#cbd5e1]">
              Horizan Nepal Construction
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UnitConverterGrid;
