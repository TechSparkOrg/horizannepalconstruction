import Image from "next/image";
import type { PublicVendor } from "@/api/types/material.types";

interface Props {
  vendor: PublicVendor;
}

export function VendorCard({ vendor }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-[#e8edf5]">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#f1f5f9]">
        {vendor.logo ? (
          <Image
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            fill
            sizes="64px"
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-[#94a3b8] text-lg font-bold">
            {vendor.name.charAt(0)}
          </div>
        )}
      </div>
      <span className="text-[13px] font-semibold text-brand-dark text-center leading-snug">
        {vendor.name}
      </span>
    </div>
  );
}
