export default function HowWeWorkLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[60vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-[550px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[420px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-4 w-80 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-light-gray/30 -translate-x-1/2" />
            <div className="space-y-12">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`flex items-start gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="flex-1 bg-white rounded-xl border border-light-gray/40 p-6 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                      <div className="h-3 w-5/6 rounded bg-light-gray/30 animate-pulse" />
                    </div>
                  </div>
                  <div className="hidden lg:flex shrink-0 size-12 rounded-full bg-white border-2 border-light-gray/30 items-center justify-center">
                    <div className="size-4 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-80 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-light-gray/30 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-off-white rounded-xl border border-light-gray/40 p-4">
                <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-brand-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="mx-auto h-8 w-72 rounded-lg bg-white/10 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-white/10 animate-pulse" />
            <div className="mx-auto h-12 w-40 rounded-lg bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
