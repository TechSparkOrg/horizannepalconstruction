import { sanitizeHtml } from './sanitize.server';
import type { TocItem } from './extractTocItems';
import ParsedContent from './Parse-Content';

interface Props {
  description: string;
  className?: string;
  onTocExtracted?: (items: TocItem[]) => void;
}

export default function ParsedContentSSR({ description, className, onTocExtracted }: Props) {
  const clean = sanitizeHtml(description, {
    ADD_TAGS: ['iframe', 'span'],
    ADD_ATTR: [
      'allow', 'allowfullscreen', 'frameborder', 'src', 'style',
      'width', 'height', 'loading', 'id', 'class', 'data-list', 'data-indent',
    ],
  });
  return <ParsedContent description={clean} className={className} onTocExtracted={onTocExtracted} />;
}
