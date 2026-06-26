import { HeroSkeleton, SectionSkeleton, IconCardSkeleton } from "@/components/global_ui/loading-skeleton";

export default function VastuLoading() {
  return (
    <div className="bg-off-white">
      <HeroSkeleton />
      <SectionSkeleton>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <IconCardSkeleton key={i} />
          ))}
        </div>
      </SectionSkeleton>
    </div>
  );
}
