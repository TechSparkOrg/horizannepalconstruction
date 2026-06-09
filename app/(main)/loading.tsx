export default function MainLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[70vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto w-full pt-32 pb-20">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mt-6 h-12 w-[600px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mt-4 h-12 w-[450px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mt-6 h-5 w-[500px] max-w-full rounded bg-white/10 animate-pulse" />
          <div className="mt-3 h-5 w-[350px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
              <div className="h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            </div>
            <div className="h-4 w-32 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-xl border border-light-gray/40 overflow-hidden">
                <div className="h-40 bg-light-gray/30 animate-pulse" />
                <div className="flex flex-col flex-1 px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-5 w-20 rounded-full bg-light-gray/30 animate-pulse" />
                  </div>
                  <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div className="space-y-4">
              <div className="h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
              <div className="h-10 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
              <div className="h-4 w-72 rounded bg-light-gray/30 animate-pulse" />
              <div className="h-10 w-32 rounded-lg bg-light-gray/30 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-white border border-light-gray/50 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
