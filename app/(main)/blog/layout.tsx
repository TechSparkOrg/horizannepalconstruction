import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog | Horizan Nepal",
  description:
    "Read the latest articles from Horizan Nepal about architectural design, construction trends, material guides, and building insights across Nepal.",
  openGraph: {
    title: "Blog | Horizan Nepal",
    description:
      "Read the latest articles from Horizan Nepal about architectural design and construction.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
