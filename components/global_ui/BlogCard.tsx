import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { CategoryBadge } from "@/components/global_ui/CategoryBadge";
import { stripHtml } from "@/lib/html-content";
import type { BlogPost } from "@/api/types/blog.types";

type BlogCardPost = Pick<BlogPost,"slug" | "title" | "image" | "category" | "date" | "content">;

interface BlogCardProps {
  post: BlogCardPost;
  variant?: "default" | "featured" | "compact";
}

function DateRow({ date, size = "sm" }: { date: string; size?: "sm" | "xs" }) {
  return (
    <div
      className={`flex items-center gap-1.5 text-[#5a6e8a] leading-none ${
        size === "xs" ? "text-[11px] mb-1.5" : "text-[11.5px] mb-2"
      }`}
    >
      <Calendar className={size === "xs" ? "size-3 shrink-0" : "size-3.5 shrink-0"} />
      {date}
    </div>
  );
}

export function BlogCard({
  post,
  variant = "default",
}: BlogCardProps) {
  const category = post?.category ?? null;
  const description = post?.content ? stripHtml(post.content).slice(0, 200) : null;

  if (variant === "featured") {
    return (
      <Link
        href={`/blog/${post?.slug}`}
        className="group col-span-2 flex flex-col sm:flex-row bg-white rounded-lg border border-[#e8edf5] overflow-hidden hover:border-[#cd2028] transition-colors duration-200"
      >
        <div className="relative w-full sm:w-1/2 aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden bg-[#e8edf5]">
          {post?.image ? (
            <Image
              src={post.image}
              alt={post?.title ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-[#e8edf5]" />
          )}
          {category && <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} />}
        </div>

        <div className="flex flex-col justify-center flex-1 p-6 sm:p-8">
          {post?.date && <DateRow date={post.date} />}

          <h3 className="text-xl sm:text-2xl font-bold text-[#0f2557] leading-snug group-hover:text-[#cd2028] transition-colors duration-150">
            {post?.title}
          </h3>

          {description && (
            <p className="mt-2.5 text-sm leading-relaxed text-[#3d526e] line-clamp-2">
              {description}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#cd2028]">
            Read article
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/blog/${post?.slug}`}
        className="group bg-white rounded-lg border border-[#e8edf5] overflow-hidden hover:border-[#cd2028] transition-colors duration-200"
      >
        <div className="relative h-40 overflow-hidden bg-[#e8edf5]">
          {post?.image ? (
            <Image
              src={post.image}
              alt={post?.title ?? ""}
              fill
              sizes="400px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-[#e8edf5]" />
          )}
          {category && <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} size="xs" />}
        </div>

        <div className="p-4">
          {post?.date && <DateRow date={post.date} size="xs" />}

          <h3 className="text-[13.5px] font-semibold text-[#0f2557] leading-snug group-hover:text-[#cd2028] transition-colors duration-150 line-clamp-2">
            {post?.title}
          </h3>

          <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#cd2028]">
            Read
            <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post?.slug}`}
      className="group flex flex-col bg-white rounded-lg border border-[#e8edf5] overflow-hidden hover:border-[#cd2028] transition-colors duration-200"
    >
      <div className="relative h-[180px] overflow-hidden bg-[#e8edf5] shrink-0">
        {post?.image ? (
          <Image
            src={post.image}
            alt={post?.title ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-[#e8edf5]" />
        )}
        {category && <CategoryBadge name={category.name ?? ""} slug={category.slug ?? undefined} />}
      </div>

      <div className="flex flex-col flex-1 px-[18px] pt-4 pb-[14px]">
        {post?.date && <DateRow date={post.date} />}

        <h3 className="text-[14.5px] font-semibold text-[#0f2557] leading-snug group-hover:text-[#cd2028] transition-colors duration-150">
          {post?.title}
        </h3>

        {description && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#3d526e] flex-1 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-3.5 pt-3 border-t border-[#e8edf5] flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#5a6e8a] leading-none">
            Read article
          </span>
          <ArrowRight className="size-3.5 shrink-0 text-[#cd2028] transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
