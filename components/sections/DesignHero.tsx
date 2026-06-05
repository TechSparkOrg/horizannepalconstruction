import { BannerCarousel } from "@/components/BannerCarousel";

export function DesignHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-dark">
      <BannerCarousel slug="design-page-hero" imgClassName="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
          Design
        </span>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Design That Inspires
        </h1>

        <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          From concept to completion — our design team creates spaces that are beautiful, functional, and built to last.
        </p>
      </div>
    </section>
  );
}
