import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80",
];

export function HowWeWorkHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white bg-white/15 px-3 py-1 rounded-full border border-white/20 inline-block">
              Our Process
            </span>
          </div>

          <h1
            className="font-display font-bold text-white mt-6 leading-[1.05] animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", animationDelay: "0.2s" }}
          >
            How We Work
          </h1>

          <p
            className="mt-6 text-white/80 text-lg max-w-[480px] leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            From the first conversation to the final handover — a transparent, collaborative process built around your vision.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              href="#process"
              className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
            >
              See Our Process <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 h-12 px-6 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-brand-dark transition"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10">
          <div
            className="flex gap-4 absolute inset-0"
            style={{
              animation: "scroll-x 20s linear infinite",
            }}
          >
            {[...images, ...images].map((src, i) => (
              <div key={i} className="relative h-full w-[300px] shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
