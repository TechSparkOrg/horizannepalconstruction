function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-light-gray/30 rounded ${className ?? ""}`} />;
}

export function HeroSkeleton({ minH = "100vh" }: { minH?: string }) {
  return (
    <section className={`relative min-h-[${minH}] h-full flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-[1200px] mx-auto w-full pt-32 pb-20 space-y-4">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-12 w-[550px] max-w-full rounded-lg" />
        <Skeleton className="h-5 w-[420px] max-w-full rounded" />
      </div>
    </section>
  );
}

export function SectionLabelSkeleton({ center }: { center?: boolean }) {
  const align = center ? "mx-auto" : "";
  return (
    <div className={`space-y-3 mb-12 ${center ? "text-center" : ""}`}>
      <Skeleton className={`h-4 w-24 rounded-full ${align}`} />
      <Skeleton className={`h-8 w-64 rounded-lg ${align}`} />
      <Skeleton className={`h-4 w-80 rounded ${align}`} />
    </div>
  );
}

export function CardSkeleton({ index, aspectRatio = "aspect-video" }: { index?: number; aspectRatio?: string }) {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-light-gray/40 overflow-hidden">
      <div className={`${aspectRatio} bg-light-gray/30 animate-pulse`} />
      <div className="flex flex-col flex-1 px-5 py-4 space-y-3">
        {index !== undefined && (
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        )}
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-3">
      <Skeleton className="size-16 sm:size-20 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-4 w-20 rounded shrink-0" />
    </div>
  );
}

export function TextBlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-3/4" : "w-full"} rounded`} />
      ))}
    </div>
  );
}

export function AccordionSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-lg" />
      ))}
    </div>
  );
}

export function IconCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-light-gray/40 p-6 text-center space-y-3">
      <Skeleton className="mx-auto size-12 rounded-lg" />
      <Skeleton className="mx-auto h-5 w-32 rounded" />
      <TextBlockSkeleton lines={2} />
    </div>
  );
}

export function SectionSkeleton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-16 sm:py-28 ${className ?? ""}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
