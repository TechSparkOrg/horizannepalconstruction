export default function MaterialDetailLoading() {
  return (
    <>
      <section className="relative min-h-[60vh] bg-brand-dark animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-3">
        <div className="h-7 w-64 rounded bg-light-gray/30 animate-pulse" />
        <div className="h-4 w-40 rounded bg-light-gray/30 animate-pulse" />
      </div>
    </>
  );
}
