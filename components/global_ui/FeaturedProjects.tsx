"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectPublic } from "@/api/services/project.service";
import type { Project } from "@/api/types/project.types";

const statusConfig: Record<string, { label: string; classes: string }> = {
  Completed: { label: "Completed", classes: "bg-[#e8f5e9] text-[#2e7d32]" },
  Ongoing:   { label: "Ongoing",   classes: "bg-brand-primary/10 text-brand-primary" },
  Planning:  { label: "Planning",  classes: "bg-light-gray text-muted-foreground" },
};

export function FeaturedProjects({
  initialProjects,
  limit = 6,
}: {
  initialProjects?: Project[];
  limit?: number;
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? []);

  useEffect(() => {
    if (initialProjects) return;
    ProjectPublic.list()
      .then((res) => setProjects(res.results ?? []))
      .catch(() => {});
  }, [initialProjects]);

  const featured = projects.slice(0, limit);

  return (
    <section id="works" className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
              Our Portfolio
            </p>
            <h2 className="mt-3 text-[30px] sm:text-[34px] font-bold text-brand-dark tracking-tight leading-[1.1]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mid-gray hover:text-brand-dark transition-colors"
          >
            View all projects
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-light-gray overflow-hidden bg-white">
                  <div className="h-[180px] bg-light-gray animate-pulse" />
                  <div className="px-[18px] py-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-16 rounded bg-light-gray animate-pulse" />
                      <div className="h-5 w-20 rounded-full bg-light-gray animate-pulse" />
                    </div>
                    <div className="h-4 w-2/3 rounded bg-light-gray animate-pulse" />
                    <div className="h-3 w-1/3 rounded bg-light-gray animate-pulse" />
                  </div>
                </div>
              ))
            : featured.map((p) => {
                const statusLabel = p.completion ? "Completed" : "Ongoing";
                const s = statusConfig[statusLabel] || statusConfig.Ongoing;
                return (
                  <Link
                    key={p.id}
                    href={`/project-details/${p.slug}`}
                    className="group flex flex-col bg-white rounded-xl border border-light-gray overflow-hidden hover:border-brand-secondary transition-colors duration-200"
                  >
                    {/* Image */}
                    <div className="relative h-[180px] overflow-hidden bg-light-gray">
                      {(p.thumbnail || p.images?.[0]) && (
                        <Image
                          src={p.thumbnail || p.images?.[0] || ""}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 px-[18px] py-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                          {p.category_id || "Project"}
                        </span>
                        <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${s.classes}`}>
                          {s.label}
                        </span>
                      </div>

                      <h3 className="text-[14.5px] font-semibold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors duration-150">
                        {p.title}
                      </h3>

                      {p.location && (
                        <p className="mt-2 flex items-center gap-1 text-[12px] text-muted-foreground">
                          <MapPin className="size-3 shrink-0" />
                          {p.location}
                        </p>
                      )}

                      <div className="mt-4 pt-3 border-t border-light-gray flex items-center justify-between">
                        <span className="text-[12px] font-medium text-mid-gray">View Project</span>
                        <ArrowRight className="size-3.5 text-brand-primary transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>

      </div>
    </section>
  );
}