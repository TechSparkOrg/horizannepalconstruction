export default function EmiCalculatorLoading() {
  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="relative bg-[#0f2557] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028]" />
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 pt-28 pb-0 space-y-4">
          <div className="h-3 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-8 w-72 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-96 max-w-full rounded bg-white/10 animate-pulse" />
          <div className="flex gap-1 mt-8 border-t border-white/10 pt-0">
            <div className="h-10 w-32 rounded-t bg-white/10 animate-pulse" />
            <div className="h-10 w-36 rounded-t bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 py-6">
        <div className="grid gap-5 lg:grid-cols-2 items-start">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden">
                <div className="border-b border-[#e2e8f0] px-5 py-3">
                  <div className="h-3 w-24 rounded bg-[#e2e8f0] animate-pulse" />
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div className="h-10 w-full rounded-lg bg-[#f1f5f9] animate-pulse" />
                  {i === 1 && <div className="h-6 w-full rounded bg-[#f1f5f9] animate-pulse" />}
                  {i === 2 && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="h-14 rounded-lg bg-[#f1f5f9] animate-pulse" />
                      ))}
                    </div>
                  )}
                  {i === 3 && (
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="h-8 w-14 rounded-lg bg-[#f1f5f9] animate-pulse" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 lg:sticky lg:top-4">
            <div className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden">
              <div className="bg-[#0f2557] px-5 py-5 space-y-2">
                <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
                <div className="h-8 w-36 rounded bg-white/10 animate-pulse" />
                <div className="h-3 w-48 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="flex items-center gap-4 px-5 pt-4">
                <div className="size-20 rounded-full bg-[#f1f5f9] animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
                  <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
                </div>
              </div>
              <div className="px-5 pt-2 pb-1 space-y-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="h-3 w-24 rounded bg-[#f1f5f9] animate-pulse" />
                    <div className="h-3 w-20 rounded bg-[#f1f5f9] animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="mx-5 mb-3 h-10 rounded-lg bg-[#f1f5f9] animate-pulse" />
              <div className="flex gap-2 px-5 pb-4 pt-3 border-t border-[#e2e8f0]">
                <div className="h-10 flex-1 rounded-lg bg-[#f1f5f9] animate-pulse" />
                <div className="size-10 rounded-lg bg-[#f1f5f9] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
