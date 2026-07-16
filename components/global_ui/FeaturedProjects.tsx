"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectPublic } from "@/api/services/project.service";
import type { Project } from "@/api/types/project.types";
import { ProjectCard, SkeletonCard } from "@/components/global_ui/ProjectCard";

/* Rumble.svg internal animation is ~8s — sync card swap to that */
const SVG_CYCLE_MS = 8000;

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
          <Link prefetch={false}
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
            sizes="100vw"
            className="object-cover"
            priority={false}
            unoptimized
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
