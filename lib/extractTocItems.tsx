export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

export function extractTocItems(html: string): TocItem[] {
  if (!html) return [];
  const regex = /<h([2-6])[^>]*>([\s\S]*?)<\/h[2-6]>/gi;
  const items: TocItem[] = [];
  const idCounter: Record<string, number> = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (!text) continue;
    const baseId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const count = idCounter[baseId] ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count}`;
    idCounter[baseId] = count + 1;
    items.push({ id, text, level });
  }
  return items;
}
