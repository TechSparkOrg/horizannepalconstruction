import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import type { Page } from "@/api/types/page.types";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";

const BlogGrid = dynamic(() => import("@/components/page_ui/BlogGrid.client"));
const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  page: Page | null;
  blogs: BlogPost[];
  categories: Category[];
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
}

export function BlogPageContent({ page, blogs, categories }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <BlogGrid posts={blogs} categories={categories} />

    

      <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
        <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <BlogFaqInner faqGroupSlug={page?.faq_group_slug ?? "blog"} />
        </Suspense>
      </ViewportSection>

      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-off-white min-h-[300px]")}>
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}

async function BlogFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}
