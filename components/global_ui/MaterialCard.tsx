import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stripHtml } from "@/lib/extractTocItems";
import type { PublicMaterialItem } from "@/api/types/material.types";

interface Props {
  item: PublicMaterialItem;
}

export function MaterialCard({ item }: Props) {
  const image = item.banner_url || item.logo;
  const description = item.description ? stripHtml(item.description).slice(0, 120) : null;

  return (
    <Link prefetch={false}
      href={`/material/${item.slug}`}
      className="group flex flex-col bg-white rounded-lg border border-[#e8edf5] overflow-hidden hover:border-[#cd2028] transition-colors duration-200"
    >
      <div className="relative h-[180px] overflow-hidden bg-[#e8edf5] shrink-0">
        {image ? (
          <Image
            src={image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-[#e8edf5]" />
        )}
      </div>

      <div className="flex flex-col flex-1 px-[18px] pt-4 pb-[14px]">
        <h3 className="text-[14.5px] font-semibold text-[#0f2557] leading-snug group-hover:text-[#cd2028] transition-colors duration-150">
          {item.name}
        </h3>

        {description && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#3d526e] flex-1 line-clamp-2">
            {description}
          </p>
        )}

        {item.price_per_unit && (
          <div className="mt-2 text-[13px] font-semibold text-brand-primary">
            Rs. {item.price_per_unit}{item.unit_value ? ` /${item.unit_value}` : ""}
          </div>
        )}

        <div className="mt-3.5 pt-3 border-t border-[#e8edf5] flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#5a6e8a] leading-none">
            View details
          </span>
          <ArrowRight className="size-3.5 shrink-0 text-[#cd2028] transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
