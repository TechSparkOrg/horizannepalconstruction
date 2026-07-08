import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { HeroScrollSvg } from "./HeroScrollSvg";
import type { MediaItem } from "@/api/types/media.types";

const stats = [
  { label: "50+",  sub: "Projects delivered" },
  { label: "12+",  sub: "Years in Nepal"     },
  { label: "98%",  sub: "Client satisfaction" },
  { label: "200+", sub: "Happy clients"      },
];

export async function AboutHero({ initialBanners }: { initialBanners?: MediaItem[] }) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      {/* Background carousel */}
      <BannerCarousel slug="about-page-hero" imgClassName="object-cover" initialBanners={initialBanners} />

      {/* Dark overlay — plain rgba, no color-mix */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(15,37,87,0.55) 0%, rgba(15,37,87,0.88) 100%)" }}
        aria-hidden="true"
      />

      {/* SVG parallax + middle decorative (client) */}
      <HeroScrollSvg />

      {/* Content — left-aligned on desktop, centered on mobile */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="lg:max-w-[55%]">

          {/* Badge */}
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/80 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
            About Horizon Nepal
          </span>

          {/* Heading */}
          <h1
            className="font-display font-bold text-white leading-[1.1] text-center lg:text-left"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            Crafting Nepal&apos;s<br />
            <span className="text-[#93c5fd]">Built Environment</span>
          </h1>

          {/* Sub */}
          <p className="mt-5 text-white/70 text-lg leading-relaxed text-center lg:text-left max-w-[540px]">
            From heritage restorations to modern high-rises — architecture, engineering, and construction under one roof.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1d4ed8] text-white font-semibold shadow-lg shadow-[#1d4ed8]/30 hover:bg-[#1e40af] hover:-translate-y-px transition-all duration-200"
            >
              Start a Project <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold backdrop-blur-sm bg-white/5 hover:bg-white/15 transition-all duration-200"
            >
              View Our Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 max-w-[540px] lg:max-w-none">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm px-4 py-5 text-center">
                <p className="font-display font-bold text-white text-2xl">{s.label}</p>
                <p className="text-white/55 text-sm mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
