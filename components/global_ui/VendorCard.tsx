import Image from "next/image"
import type { PublicVendor } from "@/api/types/material.types"

interface Props {
  vendor: PublicVendor
}

export function VendorCard({ vendor }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-none last:border-r-0 flex-1 min-w-[140px]">
      <div className="size-9 shrink-0 rounded-lg bg-[#f4f6fb] border border-[#e8edf5] flex items-center justify-center overflow-hidden">
        {vendor.logo ? (
          <Image
            src={vendor.logo}
            alt={vendor.name}
            width={36}
            height={36}
            className="size-full object-contain p-1"
          />
        ) : (
          <span className="text-xs font-extrabold text-[#0f2557]">
            {vendor.name.charAt(0)}
          </span>
        )}
      </div>
      <span className="text-xs font-semibold text-[#3d526e] leading-snug">
        {vendor.name}
      </span>
    </div>
  )
}