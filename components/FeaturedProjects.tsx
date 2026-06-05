"use client";

import { useEffect } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useClientStore } from "@/stores/client-store";

const statusConfig: Record<string, { label: string; bg: string; color: string; progress: string; width: string }> = {
  Completed: {
    label: "Completed",
    bg: "oklch(0.96 0.04 145)",
    color: "oklch(0.38 0.13 145)",
    progress: "oklch(0.45 0.13 145)",
    width: "100%",
  },
  Ongoing: {
    label: "Ongoing",
    bg: "oklch(0.97 0.04 80)",
    color: "oklch(0.53 0.12 55)",
    progress: "oklch(0.62 0.14 55)",
    width: "65%",
  },
  Planning: {
    label: "Planning",
    bg: "oklch(0.96 0.03 240)",
    color: "oklch(0.45 0.15 240)",
    progress: "oklch(0.45 0.15 240)",
    width: "30%",
  },
};

export function FeaturedProjects() {
  const projects = useClientStore((s) => s.projects);
  const loading = useClientStore((s) => s.projectsLoading);
  const fetchProjects = useClientStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const featured = projects.slice(0, 6);

  return (
    <section id="works" className="py-16 sm:py-28 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Portfolio</SectionLabel>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/our-work"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && featured.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <div className="size-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            featured.map((p) => {
              const statusLabel = p.completion ? "Completed" : "Ongoing";
              const s = statusConfig[statusLabel] || statusConfig.Ongoing;
              return (
                <Link
                  key={p.id}
                  href={`/project-details/${p.slug}`}
                  className="group relative flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
                >
                  <div className="relative h-40 overflow-hidden">
                    {(p.thumbnail || p.images?.[0]) && (
                      <Image
                        src={p.thumbnail || p.images[0]}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="flex flex-col flex-1 px-5 py-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium uppercase tracking-wider text-mid-gray">
                        {p.category_id || "Project"}
                      </span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <h3 className="font-display text-base leading-snug group-hover:underline decoration-black/20 text-brand-dark">
                      {p.title}
                    </h3>
                    {p.location && (
                      <span className="mt-1.5 flex items-center gap-1 text-xs text-mid-gray">
                        <MapPin className="size-3" />
                        {p.location}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 size-7 rounded-full flex items-center justify-center opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 bg-brand-primary">
                    <ArrowRight className="size-3.5 text-white" />
                  </div>
                </Link>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
