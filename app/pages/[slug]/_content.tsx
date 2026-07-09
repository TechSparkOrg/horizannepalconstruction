import { Suspense } from "react";
import dynamic from "next/dynamic";

import { ViewportSection } from "@/components/viewport/ViewportSection";

import type { Page } from "@/api/types/page.types";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));


interface Props {
  page: Page;
}





export function CmsPageInner({ page }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
           <BlogContent content={page.content ?? ""} />

    </>
  );
}
