import { HeroSkeleton } from "@/components/global_ui/loading-skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-[#f8fafc]">
      <HeroSkeleton minH="85svh" />
    </div>
  );
}
