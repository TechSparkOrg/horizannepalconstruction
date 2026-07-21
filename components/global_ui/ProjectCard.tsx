"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, CheckCircle2, Clock3, PauseCircle } from "lucide-react";
import type { Project } from "@/api/types/project.types";
import { getProjectStatus } from "@/lib/project-status";
import { useTrackAction } from "@/hooks/useTrackAction";
import { useTrackHover } from "@/hooks/useTrackHover";
import { Events } from "@/lib/tracking";

const statusStyle: Record<string, { icon: React.ElementType; cls: string }> = {
  completed: { icon: CheckCircle2, cls: "text-emerald-700 bg-emerald-50" },
  ongoing:   { icon: Clock3,       cls: "text-blue-700 bg-blue-50"       },
  paused:    { icon: PauseCircle,  cls: "text-amber-700 bg-amber-50"     },
};

export function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const status = getProjectStatus(p.status, p.completion);
  const { icon: StatusIcon, cls } = statusStyle[status.key];
  const label = status.label;
  const imgSrc = p.thumbnail || p.images?.[0] || p.banner_images?.[0]?.url || "";
  const track = useTrackAction();
  const hoverRef = useTrackHover<HTMLAnchorElement>(Events.PROJECT_HOVER);

  return (
    <Link
      prefetch={false}
      ref={hoverRef}
      href={`/project-details/${p.slug}`}
      onClick={() => track(Events.PROJECT_CLICK, { slug: p.slug, title: p.title })}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:border-[#0f2557]/25 hover:shadow-[0_12px_30px_rgba(15,37,87,0.08)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
      style={{ animation: `card-enter 0.5s ease-out ${delay}ms both` }}
      aria-label={`View project: ${p.title}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f1f5f9]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff] to-[#dde6f8]" />
        )}

        {/* Category badge */}
        {p.category?.id && (
          <span className="absolute top-3 left-3 inline-block px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[#0f2557] text-[9.5px] font-bold tracking-[0.16em] uppercase shadow-sm">
            {p.category?.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold ${cls}`}>
            <StatusIcon className="size-3 shrink-0" />
            {label}
          </span>
          {p.location && (
            <span className="inline-flex items-center gap-1 text-[11.5px] text-[#94a3b8] font-medium">
              <MapPin className="size-3 shrink-0" />
              {p.location}
            </span>
          )}
        </div>

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[#0f2557] font-bold text-[15.5px] sm:text-[16.5px] leading-[1.3] flex-1 font-display tracking-tight">
            {p.title}
          </h3>
          <div className="size-8 shrink-0 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#0f2557] group-hover:bg-[#cd2028] group-hover:border-[#cd2028] group-hover:text-white transition-all duration-200">
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden">
      <div className="aspect-[16/10] bg-[#dde6f8] animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 rounded bg-[#e2e8f0] animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-[#dde6f8] animate-pulse" />
      </div>
    </div>
  );
}
