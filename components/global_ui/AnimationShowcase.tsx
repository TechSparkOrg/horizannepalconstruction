"use client";

import cityAnimationData from "@/components/video-gif/City Building Construction.lottie_FILES/animations/12345.json";
import roadAnimationData from "@/components/video-gif/Road repair square composition.lottie_FILES/animations/70dc7535-d7da-4128-bb1f-6b62cb07aafa.json";
import { LottiePlayer } from "@/components/global_ui/LottiePlayer";

const cards = [
  {
    animationData: cityAnimationData,
    label: "Construction Projects",
    description: "High-rise residential, commercial, and industrial builds crafted to last generations.",
  },
  {
    animationData: roadAnimationData,
    label: "Infrastructure Works",
    description: "Roads, bridges, and civil infrastructure connecting communities across Nepal.",
  },
];

export function AnimationShowcase() {
  return (
    <section
      aria-labelledby="animation-showcase-heading"
      className="w-full bg-[var(--background)] py-16 sm:py-20"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
            What We Do
          </p>
          <h2
            id="animation-showcase-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]"
          >
            Our Expertise in Action
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map(({ animationData, label, description }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--card)] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full max-w-[320px] mx-auto">
                <LottiePlayer animationData={animationData} loop />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[var(--foreground)]">
                {label}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] max-w-[280px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
