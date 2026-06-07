import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";



const stats = [
  { label: "50+", sub: "Projects delivered" },
  { label: "12+", sub: "Years in Nepal" },
  { label: "98%", sub: "Client satisfaction" },
  { label: "200+", sub: "Happy clients" },
];

export function AboutHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      <BannerCarousel slug="about-page-hero" imgClassName="object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, color-mix(in oklch, var(--color-brand-dark) 50%, transparent) 0%, color-mix(in oklch, var(--color-brand-dark) 80%, transparent) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-24 text-center">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-primary/80 bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full mb-5">
          About Horizon Nepal
        </span>

        <h1
          className="font-display font-bold text-white leading-[1.1]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Crafting Nepal&apos;s Built Environment Since 1999
        </h1>

        <p className="mt-5 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          From heritage restorations to modern high-rises, we bring together architecture, engineering, and construction under one roof.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/30 hover:brightness-110 hover:-translate-y-px transition-all duration-200"
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

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 backdrop-blur-sm px-4 py-5 text-center">
              <p className="font-display font-bold text-white text-2xl">{s.label}</p>
              <p className="text-white/55 text-sm mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
