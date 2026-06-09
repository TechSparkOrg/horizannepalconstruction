import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Horizan Nepal`,
    description: `Read ${title} — a blog post from Horizan Nepal about architectural design, construction, and building in Nepal.`,
    openGraph: {
      title: `${title} | Horizan Nepal`,
      description: `Read ${title} — a blog post from Horizan Nepal.`,
      type: "article",
    },
  };
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
