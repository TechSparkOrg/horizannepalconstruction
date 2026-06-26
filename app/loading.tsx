import { HeroSkeleton, SectionSkeleton, SectionLabelSkeleton, CardSkeleton, AccordionSkeleton } from "@/components/global_ui/loading-skeleton";

export default function MainLoading() {
  return (
    <div className="bg-off-white">
      <HeroSkeleton />

      <SectionSkeleton>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="h-4 w-32 rounded bg-light-gray/30 animate-pulse" />
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} index={i} />
          ))}
        </div>
      </SectionSkeleton>

      <SectionSkeleton>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="h-10 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="h-4 w-72 rounded bg-light-gray/30 animate-pulse" />
            <div className="h-10 w-32 rounded-lg bg-light-gray/30 animate-pulse" />
          </div>
          <AccordionSkeleton />
        </div>
      </SectionSkeleton>
    </div>
  );
}
