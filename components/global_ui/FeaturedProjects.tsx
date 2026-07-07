"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MapPin, CheckCircle2, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectPublic } from "@/api/services/project.service";
import type { Project } from "@/api/types/project.types";

const statusMap: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  Completed: { label: "Completed", icon: CheckCircle2, color: "text-emerald-400" },
  Ongoing:   { label: "Ongoing",   icon: Clock3,       color: "text-blue-300"   },
};

/* Rumble.svg internal animation is ~8s — sync card swap to that */
const SVG_CYCLE_MS = 8000;

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const statusKey = p.completion ? "Completed" : "Ongoing";
  const { label, icon: StatusIcon, color } = statusMap[statusKey] ?? statusMap.Ongoing;
  const imgSrc = p.thumbnail || p.images?.[0] || "";

  return (
    <Link
      href={`/project-details/${p.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-brand-dark aspect-[4/3] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
      style={{ animation: `card-enter 0.5s ease-out ${delay}ms both` }}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-primary/30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07112b] via-[#07112b]/20 to-transparent" />
      <div className="absolute inset-0 bg-brand-dark/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
        <div className="mb-3.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          {p.category_id && (
            <p className="text-[9.5px] font-bold tracking-[0.26em] uppercase text-brand-secondary mb-2.5">
              {p.category_id}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-[12px]">
            <span className={`flex items-center gap-1 font-semibold ${color}`}>
              <StatusIcon className="size-3.5 shrink-0" />
              {label}
            </span>
            {p.location && (
              <span className="flex items-center gap-1 text-white/55">
                <MapPin className="size-3 shrink-0" />
                {p.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h3
            className="text-white font-bold text-[16px] sm:text-[18px] leading-[1.25] flex-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {p.title}
          </h3>
          <div className="size-9 shrink-0 rounded-full border border-white/25 flex items-center justify-center text-white group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors duration-200">
            <ArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return <div className="rounded-2xl bg-[#dde6f8] animate-pulse aspect-[4/3]" />;
}

export function FeaturedProjects({
  initialProjects,
  limit = 6,
}: {
  initialProjects?: Project[];
  limit?: number;
}) {
  const [projects, setProjects]         = useState<Project[]>(initialProjects ?? []);
  const [batch, setBatch]               = useState(0);
  const [visible, setVisible]           = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    if (initialProjects) return;
    ProjectPublic.list()
      .then((res) => setProjects(res.results ?? []))
      .catch(() => {});
  }, [initialProjects]);

  /* Responsive cards per view */
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640)       setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else                               setCardsPerView(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* Cycle cards in sync with SVG's own animation */
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setBatch((b) => b + 1);
        setVisible(true);
      }, 420);
    }, SVG_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const featured      = projects.slice(0, limit);
  const totalBatches  = Math.max(1, Math.ceil(featured.length / cardsPerView));
  const activeBatch   = batch % totalBatches;
  const batchCards    = featured.slice(
    activeBatch * cardsPerView,
    activeBatch * cardsPerView + cardsPerView,
  );

  return (
    <section id="works" className="py-16 sm:py-24 bg-[#f5f8ff]">
      <style>{`
        @keyframes card-enter {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes card-exit {
          from { opacity: 1; transform: translateX(0);     }
          to   { opacity: 0; transform: translateX(-36px); }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-brand-primary shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
                Our Portfolio
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-brand-dark leading-[1.15]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-brand-dark transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
          >
            View all projects
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[260px]">
          {featured.length === 0
            ? Array.from({ length: cardsPerView }).map((_, i) => <SkeletonCard key={i} />)
            : visible
              ? batchCards.map((p, i) => (
                  <ProjectCard key={`${p.id}-${activeBatch}`} p={p} delay={i * 80} />
                ))
              : batchCards.map((_, i) => (
                  <div
                    key={`exit-${i}`}
                    className="rounded-2xl bg-brand-dark/10 aspect-[4/3]"
                    style={{ animation: "card-exit 0.4s ease-in both" }}
                  />
                ))}
        </div>

        {/* Ground line */}
        <div className="mt-6 border-t border-brand-primary/10" />

        {/* Rumble SVG — full bleed */}
        </div>
        <div className="w-screen relative left-1/2 -translate-x-1/2" style={{ height: "clamp(140px, 22vw, 280px)" }}>
          <Image
            src="/video-gif/Rumble.svg"
            alt=""
            fill
            className="object-cover"
            unoptimized
            priority={false}
            aria-hidden="true"
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Batch dots */}
        {totalBatches > 1 && (
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Project batches">
            {Array.from({ length: totalBatches }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeBatch}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => { setBatch(i); setVisible(true); }, 420);
                }}
                className="h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                style={{
                  width:      i === activeBatch ? "20px" : "6px",
                  background: i === activeBatch ? "var(--color-brand-primary)" : "var(--color-light-gray)",
                }}
                aria-label={`Batch ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
