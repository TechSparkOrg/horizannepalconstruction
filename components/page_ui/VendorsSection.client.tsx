"use client";

import { useEffect, useState } from "react";
import { VendorCard } from "@/components/global_ui/VendorCard";
import { getVendors } from "@/api/services/vendor-public.service";
import type { PublicVendor } from "@/api/types/material.types";

const VendorsSection = () => {
  const [vendors, setVendors] = useState<PublicVendor[]>([]);

  useEffect(() => {
    getVendors()
      .then((res) => setVendors(res.results ?? []))
      .catch(() => {});
  }, []);

  if (vendors.length === 0) return null;

  return (
    <section className="bg-off-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-brand-primary border border-brand-primary/20 px-3 py-1 rounded mb-4">
            Our Partners
          </span>
          <h2 className="text-[30px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.1]">
            Trusted Suppliers &amp; Vendors
          </h2>
          <p className="mt-3 text-[14px] text-mid-gray max-w-xl mx-auto leading-relaxed">
            We source materials from Nepal&apos;s most reputable vendors, ensuring quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {vendors.map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorsSection;
