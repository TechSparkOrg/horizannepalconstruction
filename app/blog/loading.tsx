import { HeroSkeleton, SectionSkeleton, CardSkeleton } from "@/components/global_ui/loading-skeleton";

export default function BlogLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[55vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 text-center space-y-4">
          <div className="mx-auto h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mx-auto h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <SectionSkeleton>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} aspectRatio="h-48" />
          ))}
        </div>
      </SectionSkeleton>
    </div>
  );
}
