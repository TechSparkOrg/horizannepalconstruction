import { parseHTML } from 'linkedom/worker';
import DOMPurify from 'dompurify';

const { window } = parseHTML('<!DOCTYPE html><html><body></body></html>');
const purify = DOMPurify(window);

export const sanitizeHtml = (html: string, options?: any): string => {
  return purify.sanitize(html, options) as unknown as string;
};
