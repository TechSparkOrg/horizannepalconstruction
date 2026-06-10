export default function BuildingPermitLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[60vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-[550px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[420px] max-w-full rounded bg-white/10 animate-pulse" />
          <div className="h-5 w-[300px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-4">
                <div className="size-12 rounded-lg bg-light-gray/30 animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-4">
                <div className="size-5 rounded bg-light-gray/30 animate-pulse shrink-0" />
                <div className="flex-1 h-4 rounded bg-light-gray/40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
