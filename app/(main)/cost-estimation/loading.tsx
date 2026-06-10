export default function CostEstimationLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[55vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-[550px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-80 rounded bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-3">
                <div className="h-6 w-24 rounded bg-light-gray/40 animate-pulse" />
                <div className="h-1 w-full rounded bg-brand-primary/20 animate-pulse" />
                <div className="h-8 w-32 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="h-6 w-48 rounded bg-light-gray/40 animate-pulse" />
              <div className="h-10 w-full rounded bg-light-gray/30 animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-5 flex-1 rounded bg-light-gray/30 animate-pulse" />
                    <div className="h-5 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-5 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-5 w-20 rounded bg-light-gray/40 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
