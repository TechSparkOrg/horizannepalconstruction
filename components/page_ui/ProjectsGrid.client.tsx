"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/global_ui/ProjectCard";
import type { Project } from "@/api/types/project.types";

interface Props {
  projects: Project[];
}

export function ProjectsGrid({ projects }: Props) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const categoryMap = new Map<string, string>();
  projects.forEach((p) => {
    if (p.category?.id && !categoryMap.has(p.category?.id)) {
      categoryMap.set(p.category?.id, p.category?.name || p.category?.id);
    }
  });

  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category?.id === active);

  return (
    <>
      {/* Filter bar */}
      {categoryMap.size > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-7" role="tablist" aria-label="Filter by category">
          <button
            role="tab"
            aria-selected={active === "All"}
            onClick={() => setActive("All")}
            className={[
              "h-9 px-4 rounded-full text-[12.5px] font-semibold transition-all duration-150",
              "focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2",
              active === "All"
                ? "bg-[#0f2557] text-white shadow-sm"
                : "bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#0f2557]/40 hover:text-[#0f2557]",
            ].join(" ")}
          >
            All
          </button>
          {Array.from(categoryMap.entries()).map(([id, name]) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={[
                "h-9 px-4 rounded-full text-[12.5px] font-semibold transition-all duration-150 capitalize",
                "focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2",
                active === id
                  ? "bg-[#0f2557] text-white shadow-sm"
                  : "bg-white border border-[#e2e8f0] text-[#374151] hover:border-[#0f2557]/40 hover:text-[#0f2557]",
              ].join(" ")}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-[11.5px] text-[#94a3b8] font-medium mb-5">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {active !== "All" && ` in ${categoryMap.get(active) || active}`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center py-16 text-[#94a3b8] text-sm">
            No projects in this category yet.
          </p>
        ) : (
          filtered.map((p, i) => (
            <ProjectCard key={`${p.id}-${active}`} p={p} delay={i * 60} />
          ))
        )}
      </div>
    </>
  );
}
