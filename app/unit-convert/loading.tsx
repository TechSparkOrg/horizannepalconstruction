export default function UnitConvertLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="min-h-[90vh] bg-[#e8edf5]" />

      {/* Grid skeleton */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-4 w-24 bg-[#e8edf5] rounded mx-auto mb-4" />
            <div className="h-8 w-64 bg-[#e8edf5] rounded mx-auto mb-3" />
            <div className="h-4 w-96 bg-[#e8edf5] rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-[#e8edf5] overflow-hidden">
                <div className="h-[180px] bg-[#e8edf5]" />
                <div className="p-[18px] space-y-3">
                  <div className="h-4 w-3/4 bg-[#e8edf5] rounded" />
                  <div className="h-3 w-full bg-[#e8edf5] rounded" />
                  <div className="h-3 w-1/2 bg-[#e8edf5] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
