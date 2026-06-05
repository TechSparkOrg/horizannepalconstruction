"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { useClientStore } from "@/stores/client-store";

export function OurWorkSection() {
  const projects = useClientStore((s) => s.projects);
  const loading = useClientStore((s) => s.projectsLoading);
  const fetchProjects = useClientStore((s) => s.fetchProjects);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const thumb = (p: typeof projects[number]) => p.thumbnail || p.images?.[0] || "";
  const gallery = projects.map((p) => thumb(p)).filter(Boolean).slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Our Work</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Projects We&apos;ve Delivered
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            A selection of residential, commercial, and heritage projects across Nepal.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {loading && projects.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="size-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            projects.map((p) => {
              const statusLabel = p.completion ? "Completed" : "Ongoing";
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-3 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative size-16 sm:size-20 rounded-lg overflow-hidden shrink-0">
                    {thumb(p) && <Image src={thumb(p)} alt={p.title} fill sizes="80px" className="object-cover" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-brand-dark truncate">{p.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      {p.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-mid-gray">
                          <MapPin className="size-3" />
                          {p.location}
                        </span>
                      )}
                      {p.completion && (
                        <span className="inline-flex items-center gap-1 text-xs text-mid-gray">
                          <Calendar className="size-3" />
                          {p.completion}
                        </span>
                      )}
                      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        statusLabel === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/project-details/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary/80 transition shrink-0"
                  >
                    View Project <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {gallery.length > 0 && (
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`Project photo ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
