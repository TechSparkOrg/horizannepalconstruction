export default function UnitConvertDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-[70vh] bg-[#e8edf5]" />

      {/* Header skeleton */}
      <div className="bg-white border-b border-[#e8edf5] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-64 bg-[#e8edf5] rounded mb-2" />
          <div className="h-4 w-32 bg-[#e8edf5] rounded" />
        </div>
      </div>

      {/* Converter widget skeleton */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#e8edf5] overflow-hidden">
              <div className="h-14 bg-[#e8edf5]" />
              <div className="p-6 space-y-4">
                <div className="h-11 bg-[#e8edf5] rounded-lg" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-11 bg-[#e8edf5] rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-white py-12 sm:py-16 border-t border-[#e8edf5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-8">
            <div className="space-y-3">
              <div className="h-5 w-full bg-[#e8edf5] rounded" />
              <div className="h-5 w-3/4 bg-[#e8edf5] rounded" />
              <div className="h-5 w-full bg-[#e8edf5] rounded" />
              <div className="h-5 w-1/2 bg-[#e8edf5] rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
