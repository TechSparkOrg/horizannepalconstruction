import Image from "next/image";
import { getPublicProjectCategories } from "@/api/services/category.service";
import { htmlToText } from "@/lib/htmlToText";

export async function ProjectCategoriesGrid({ svgUrl }: { svgUrl?: string }) {
  "use cache";
  const categories = await getPublicProjectCategories().catch((err) => { console.error("Failed to fetch project categories:", err); return []; });

  if (categories.length === 0) {
    return (
      <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">No project categories available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              Project Categories
            </p>
            <h2 className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}>
              Browse by Category
            </h2>
            <p className="mt-3 text-[#64748b] text-[14.5px] leading-relaxed">
              Explore our work across residential, commercial, heritage, and interior projects.
            </p>
          </div>

          <div className="relative shrink-0 w-[200px] h-[150px] hidden md:block select-none" aria-hidden="true">
            <Image src={svgUrl || "/video-gif/builds3.svg"} alt=""
              fill unoptimized className="object-contain object-center" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[#e2e8f0] mb-10"
          style={{ background: "var(--color-light-gray)", gap: "1px" }}>
          {categories.map((cat, i) => {
            const blurb = htmlToText(cat.description);
            return (
              <a key={cat.id} href={`/project-details/category/${cat.slug}`}
                className="group relative flex flex-col gap-3 bg-white p-5 sm:p-6 hover:bg-[#f8faff] transition-colors duration-150">
                <div className="size-10 sm:size-11 rounded-xl flex items-center justify-center bg-[#eff6ff] text-[#0f2557] font-black text-lg group-hover:bg-[#0f2557] group-hover:text-white transition-colors duration-200 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-[#0f2557] leading-snug capitalize">{cat.name}</h3>
                  {blurb && (
                    <p className="text-[12px] text-[#64748b] mt-1.5 leading-relaxed line-clamp-2">{blurb}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View projects <span className="text-lg leading-none">&rarr;</span>
                </div>
                <div className="absolute bottom-0 left-4 right-4 h-px rounded-full bg-[#1d4ed8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
