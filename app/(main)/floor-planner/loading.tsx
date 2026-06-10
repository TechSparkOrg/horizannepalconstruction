export default function FloorPlannerLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[60vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="aspect-video max-w-4xl mx-auto rounded-xl bg-light-gray/30 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-off-white rounded-xl border border-light-gray/40 p-6 space-y-3">
                <div className="size-10 rounded-lg bg-light-gray/30 animate-pulse" />
                <div className="h-5 w-40 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-4/5 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
