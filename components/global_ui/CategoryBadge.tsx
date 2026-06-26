"use client";

import { useRouter } from "next/navigation";

interface CategoryBadgeProps {
  name: string;
  slug?: string;
  size?: "sm" | "xs";
}

export function CategoryBadge({ name, slug, size = "sm" }: CategoryBadgeProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!slug) return;
    e.stopPropagation();
    e.preventDefault();
    router.push(`/blog?category=${slug}`);
  };

  return (
    <span
      onClick={handleClick}
      role={slug ? "link" : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={(e) => {
        if (slug && (e.key === "Enter" || e.key === " ")) {
          e.stopPropagation();
          router.push(`/blog?category=${slug}`);
        }
      }}
      className={
        size === "xs"
          ? "absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-[0.09em] text-[#0f2557] bg-white px-2 h-5 rounded inline-flex items-center leading-none border border-[#e8edf5] cursor-pointer hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors duration-150"
          : "absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.09em] text-[#0f2557] bg-white px-2.5 h-[22px] rounded inline-flex items-center leading-none border border-[#e8edf5] cursor-pointer hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors duration-150"
      }
    >
      {name}
    </span>
  );
}
