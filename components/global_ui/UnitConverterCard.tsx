"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Repeat } from "lucide-react";
import { stripHtml } from "@/lib/extractTocItems";
import type { PublicUnitConversionItem } from "@/api/types/unit-converter.types";
import { useTrackAction } from "@/hooks/useTrackAction";
import { Events } from "@/lib/tracking";

interface Props {
  item: PublicUnitConversionItem;
}

export function UnitConverterCard({ item }: Props) {
  const image = item.banner_url;
  const description = item.description ? stripHtml(item.description).slice(0, 120) : null;
  const track = useTrackAction();

  return (
    <Link prefetch={false}
      href={`/unit-convert/${item.slug}`}
      onClick={() => track(Events.CONVERTER_CLICK, { slug: item.slug, title: item.title })}
      className="group flex flex-col bg-white rounded-lg border border-[#e8edf5] overflow-hidden hover:border-[#cd2028] transition-colors duration-200"
    >
      <div className="relative h-[180px] overflow-hidden bg-[#e8edf5] shrink-0">
        {image ? (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#e8edf5] to-[#d5dde8] flex items-center justify-center">
            <Repeat className="size-10 text-[#9aabbf]" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-[18px] pt-4 pb-[14px]">
        <h3 className="text-[14.5px] font-semibold text-[#0f2557] leading-snug group-hover:text-[#cd2028] transition-colors duration-150">
          {item.title}
        </h3>

        {description && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#3d526e] flex-1 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-[11px] font-semibold text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded border border-brand-primary/10">
            {item.base_unit}
          </span>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#e8edf5] flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#5a6e8a] leading-none">
            Convert now
          </span>
          <ArrowRight className="size-3.5 shrink-0 text-[#cd2028] transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
