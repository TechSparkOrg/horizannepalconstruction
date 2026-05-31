export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-label text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary ${className}`}>
      {children}
    </span>
  );
}
