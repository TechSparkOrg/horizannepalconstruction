"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VendorCard } from "@/components/global_ui/VendorCard";
import { getVendorsSafe } from "@/api/services/vendor-public.service";
import type { PublicVendor } from "@/api/types/material.types";

const VendorsSection = ({ initialVendors, svgUrl }: { initialVendors?: PublicVendor[]; svgUrl?: string }) => {
  const [vendors, setVendors] = useState<PublicVendor[]>(initialVendors ?? []);

  useEffect(() => {
    if (initialVendors) return;
    let mounted = true;
    getVendorsSafe()
      .then((res) => { if (mounted) setVendors(res.results ?? []); });
    return () => { mounted = false; };
  }, [initialVendors]);

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-16 sm:py-24 min-h-[420px] sm:min-h-[520px]">
      <Image
        src={svgUrl || "/video-gif/truck-loading.svg"}
        alt="" aria-hidden fill unoptimized
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none select-none"
        style={{ opacity: 0.2 }}
      />

      {vendors.length > 0 && (
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Our Partners</p>
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              Trusted Suppliers &amp; Vendors
            </h2>
            <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[480px] mx-auto leading-relaxed">
              We source materials from Nepal&apos;s most reputable vendors, ensuring quality and reliability.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {vendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default VendorsSection;
