import { getSvgUrl } from "@/lib/svg-utils";
import Image from "next/image";
import { Building2, TriangleAlert, Flame, Wind } from "lucide-react";
import type { RegulationItem } from "@/api/types/building-permit.types";

const REG_ICONS = [Building2, TriangleAlert, Flame, Wind];

export function RegulationsGrid({ items, svgItems }: { items: RegulationItem[]; svgItems?: import("@/api/types/page.types").PageSvgItem[] }) {
  return (
    <section id="regulations" className="relative bg-[#f8fafc] py-16 sm:py-24 overflow-hidden">
      <Image src={getSvgUrl(svgItems, 0, "/video-gif/builder-constucntion.svg")} alt="" fill
        sizes="100vw"
        className="object-contain object-center pointer-events-none select-none"
        style={{ opacity: 0.1 }} aria-hidden="true" unoptimized />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Regulations</p>
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Building Regulations</h2>
          <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[480px] mx-auto">Key regulations you need to comply with in Nepal.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((reg, i) => {
            const Icon = REG_ICONS[i] || Building2;
            return (
              <div key={reg.name} className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-10 rounded-xl bg-[#0f2557]/8 flex items-center justify-center text-[#0f2557] shrink-0"><Icon className="size-5" /></div>
                  <h3 className="font-display font-bold text-[#0f2557] text-[17px] leading-snug">{reg.name}</h3>
                </div>
                <ul className="space-y-2.5">
                  {reg.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5">
                      <span className="size-1.5 rounded-full bg-[#cd2028]/50 shrink-0 mt-[7px]" aria-hidden="true" />
                      <span className="text-[13.5px] text-[#334155] leading-snug">{item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
