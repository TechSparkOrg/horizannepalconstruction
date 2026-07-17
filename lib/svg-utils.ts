import type { PageSvgItem } from "@/api/types/page.types"

export function getSvgUrl(
  svgItems: PageSvgItem[] | undefined | null,
  index: number,
  fallback: string,
): string {
  if (!svgItems || svgItems.length === 0) return fallback
  const sorted = [...svgItems].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  return sorted[index]?.url ?? fallback
}
