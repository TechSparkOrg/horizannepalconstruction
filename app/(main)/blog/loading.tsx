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

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-xl border border-light-gray/40 overflow-hidden">
                <div className="h-48 bg-light-gray/30 animate-pulse" />
                <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-3">
                  <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-5 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-3 w-5/6 rounded bg-light-gray/40 animate-pulse" />
                  </div>
                  <div className="h-4 w-20 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
