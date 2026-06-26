"use client";

import { sanitizeHtml } from "@/lib/html-content";

interface Props {
  content: string;
}

export default function BlogContent({ content }: Props) {
  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-a:text-brand-primary prose-img:rounded-xl"
          dangerouslySetInnerHTML={sanitizeHtml(content)}
        />
      </div>
    </article>
  );
}
