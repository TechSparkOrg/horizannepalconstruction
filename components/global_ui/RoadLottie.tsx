"use client";

import { LottiePlayer } from "@/components/global_ui/LottiePlayer";
import roadAnimationData from "@/components/video-gif/Road repair square composition.lottie_FILES/animations/70dc7535-d7da-4128-bb1f-6b62cb07aafa.json";

export function RoadLottie() {
  return (
    <section aria-hidden="true" className="w-full overflow-hidden" style={{ height: "260px" }}>
      <LottiePlayer animationData={roadAnimationData} loop className="w-full h-full" />
    </section>
  );
}
