export default function DesignLoading() {
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
          <div className="text-center space-y-3">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 text-center space-y-3">
                <div className="mx-auto size-12 rounded-lg bg-light-gray/30 animate-pulse" />
                <div className="mx-auto h-5 w-32 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-4/5 mx-auto rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="mx-auto h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-80 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-off-white rounded-2xl border border-light-gray/40 overflow-hidden">
                <div className="aspect-video bg-light-gray/30 animate-pulse" />
                <div className="p-5 space-y-3">
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
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-brand-dark rounded-2xl p-8 sm:p-12 space-y-6">
              <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
              <div className="h-10 w-72 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-4 w-80 rounded bg-white/10 animate-pulse" />
              <div className="h-32 rounded-xl bg-white/8 animate-pulse" />
            </div>
            <div className="bg-off-white rounded-2xl p-8 sm:p-10 space-y-6">
              <div className="h-8 w-56 rounded-lg bg-light-gray/40 animate-pulse" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-11 w-full rounded-md bg-light-gray/30 animate-pulse" />
                  </div>
                ))}
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-24 w-full rounded-md bg-light-gray/30 animate-pulse" />
                </div>
              </div>
              <div className="h-[52px] w-full rounded-md bg-light-gray/30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
