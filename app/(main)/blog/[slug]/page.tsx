import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Quote } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/api/cached/blog";
import { getCategories } from "@/api/cached/category";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    if (!post) return { title: "Blog Not Found" };
    return {
      title: post.title,
      description: post.excerpt || "",
      openGraph: {
        title: post.title,
        description: post.excerpt || "",
        type: "article",
        ...(post.image && { images: [{ url: post.image }] }),
      },
    };
  } catch {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = await getBlogBySlug(slug);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const [blogsRes, categoriesRes] = await Promise.allSettled([
    getBlogs(),
    getCategories(),
  ]);
  const blogs = blogsRes.status === "fulfilled" ? blogsRes.value.results ?? [] : [];
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];

  const catName = (id: string) => categories.find((c: { id: string }) => c.id === id)?.name;

  const related = blogs
    .filter((p: { slug: string; category_id: string }) => p.slug !== slug && p.category_id === post.category_id)
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[55vh] flex items-end bg-brand-dark">
        <div className="absolute inset-0">
          {post.image ? (
            <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover opacity-60" />
          ) : (
            <div className="absolute inset-0 bg-brand-dark" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-transparent" />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-brand-primary text-white px-3 py-1 rounded-full mb-3">
            {catName(post.category_id) || post.category_id}
          </span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
            )}
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {post.date}
              </span>
            )}
          </div>
        </div>
      </section>

      <article className="bg-white py-16 sm:py-24">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          {post.author && (
            <div className="flex items-center gap-4 pb-8 mb-10 border-b border-light-gray/40">
              <div className="relative size-14 rounded-full overflow-hidden shrink-0">
                {post.author_image ? (
                  <Image src={post.author_image} alt={post.author} fill sizes="56px" className="object-cover" />
                ) : (
                  <div className="size-full bg-gray-200 flex items-center justify-center text-mid-gray text-sm font-bold">
                    {post.author?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-brand-dark">{post.author}</p>
                {post.author_role && <p className="text-xs text-mid-gray">{post.author_role}</p>}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {(post.content ?? []).map((block: { type: string; value?: string; items?: string[]; src?: string; caption?: string }, i: number) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={i} className="text-mid-gray leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: block.value || "" }} />
                  );
                case "heading":
                  return (
                    <h2 key={i} className="pt-4 font-display font-bold text-2xl sm:text-3xl text-brand-dark">{block.value}</h2>
                  );
                case "subheading":
                  return (
                    <h3 key={i} className="pt-2 font-display font-bold text-xl text-brand-secondary">{block.value}</h3>
                  );
                case "quote":
                  return (
                    <div key={i} className="relative pl-6 border-l-4 border-brand-primary bg-brand-primary/5 rounded-r-xl py-5 pr-5 my-8">
                      <Quote className="size-6 text-brand-primary/30 absolute top-3 left-3" />
                      <p className="text-lg italic text-brand-dark font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: `&ldquo;${block.value || ""}&rdquo;` }} />
                    </div>
                  );
                case "list":
                  return (
                    <ul key={i} className="space-y-3 my-6">
                      {block.items?.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 text-mid-gray">
                          <span className="size-1.5 rounded-full bg-brand-primary shrink-0 mt-2.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "image":
                  return (
                    <figure key={i} className="my-8">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                        {block.src ? (
                          <Image src={block.src} alt={block.caption || ""} fill sizes="720px" className="object-cover" />
                        ) : (
                          <div className="size-full bg-gray-200" />
                        )}
                      </div>
                      {block.caption && (
                        <figcaption className="mt-2 text-center text-xs text-mid-gray">{block.caption}</figcaption>
                      )}
                    </figure>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-off-white py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark text-center">Related Articles</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r: { slug: string; image?: string; title: string; category_id: string; date?: string }) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-xl border border-light-gray/40 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-44">
                    {r.image ? (
                      <Image src={r.image} alt={r.title} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="h-44 bg-gray-200" />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">{catName(r.category_id) || r.category_id}</span>
                    <h3 className="mt-1.5 font-display font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{r.title}</h3>
                    {r.date && (
                      <p className="mt-1.5 text-xs text-mid-gray flex items-center gap-1">
                        <Calendar className="size-3" />
                        {r.date}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
