import { HeroSkeleton, CardSkeleton } from "@/components/global_ui/loading-skeleton";

export default function MaterialLoading() {
  return (
    <>
      <HeroSkeleton minH="55vh" />
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-4 w-96 max-w-full rounded bg-light-gray/30 animate-pulse" />
          </div>
        </div>
      </section>
      <section className="bg-off-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-5 text-center space-y-3">
                <div className="mx-auto size-14 rounded-full bg-light-gray/30 animate-pulse" />
                <div className="mx-auto h-4 w-24 rounded bg-light-gray/30 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
