import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page } from "@/api/types/page.types";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";
import type { FaqItem } from "@/api/types/faq.types";

const BlogGrid = dynamic(() => import("@/components/page_ui/BlogGrid.client"));
const ImageGrid = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

interface Props {
  page: Page | null;
  blogs: BlogPost[];
  categories: Category[];
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
  bundle: { faqs: FaqItem[] };
}

export function BlogPageContent({ page, blogs, categories, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const formattedFaqs = formatFaq(bundle.faqs ?? []);

  return (
    <>
      <BlogGrid posts={blogs} categories={categories} />

      <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
        <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <FaqClient categorySlug={page?.faq_group_slug ?? "blog"} initialFaqs={formattedFaqs} />
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
