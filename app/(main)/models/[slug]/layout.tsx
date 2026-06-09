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
    description: `View the 3D model of ${title} by Horizan Nepal — explore architectural designs in interactive 3D.`,
    openGraph: {
      title: `${title} | Horizan Nepal`,
      description: `View the 3D model of ${title} by Horizan Nepal.`,
      type: "website",
    },
  };
}

export default function ModelLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
