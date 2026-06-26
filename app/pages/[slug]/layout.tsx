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
    description: `Learn more about ${title} — information from Horizan Nepal.`,
  };
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
