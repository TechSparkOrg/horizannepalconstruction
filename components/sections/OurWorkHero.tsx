import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=400&q=80",
];

export function OurWorkHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 grid grid-cols-3">
        {images.map((src, i) => (
          <div key={i} className="relative h-full opacity-30">
            <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/50" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
          Our Portfolio
        </span>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Projects That Speak for Themselves
        </h1>

        <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          Every project tells a story of collaboration, craftsmanship, and commitment. Browse our work across Nepal.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            Start Your Project <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
