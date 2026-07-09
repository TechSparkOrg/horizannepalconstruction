import Image from "next/image";
import type { MunicipalityItem } from "@/api/types/building-permit.types";

export function MunicipalityTable({ items }: { items: MunicipalityItem[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 mb-12">
          <Image src="/video-gif/sign-document.svg" alt="Document signing illustration"
            width={80} height={120}
            className="hidden sm:block w-[65px] lg:w-[80px] h-auto object-contain shrink-0" style={{ height: "auto" }}
            sizes="(max-width: 1024px) 65px, 80px" />
          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Directory</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Municipality Directory</h2>
            <p className="mt-1.5 text-[13px] text-[#64748b] max-w-[360px] leading-relaxed">Contact your local municipality for permit inquiries.</p>
          </div>
          <Image src="/video-gif/saftey-warning.svg" alt="Document signing illustration"
            width={80} height={120}
            className="hidden sm:block w-[65px] lg:w-[80px] h-auto object-contain shrink-0 scale-x-[-1]" style={{ height: "auto" }}
            sizes="(max-width: 1024px) 65px, 80px" />
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f2557]">
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">Municipality</th>
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">District</th>
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">Phone</th>
                </tr>
              </thead>
              <tbody>
                {items.map((m, i) => (
                  <tr key={m.district + m.location}
                    className={[i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]", i < items.length - 1 ? "border-b border-[#e2e8f0]" : ""].join(" ")}>
                    <td className="px-5 py-3.5 text-[13.5px] font-semibold text-[#0f2557]">{m.location}</td>
                    <td className="px-5 py-3.5 text-[13.5px] text-[#334155]">{m.district}</td>
                    <td className="px-5 py-3.5">
                      <a href={"tel:" + m.phone} className="text-[13.5px] text-[#cd2028] font-semibold hover:underline">{m.phone}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
