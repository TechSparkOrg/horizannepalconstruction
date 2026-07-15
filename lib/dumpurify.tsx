// ponytail: client-side no-op, server sanitizes via sanitize.server.ts
export function sanitizeHtml(html: string, _options?: any): string {
  return html;
}
