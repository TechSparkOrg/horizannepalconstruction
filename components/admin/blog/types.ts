import type { ContentBlock, BlogPost } from "@/api/types/blog.types";
import type { AdminBlogPost } from "@/stores/admin-types";

export interface BlogPostForm {
  title: string;
  titleNp: string;
  excerpt: string;
  excerptNp: string;
  categoryId: string;
  projectId: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  content: ContentBlock[];
  contentNp: ContentBlock[];
}

export const EMPTY_FORM: BlogPostForm = {
  title: "", titleNp: "", excerpt: "", excerptNp: "", categoryId: "", projectId: "",
  image: "", date: new Date().toISOString().split("T")[0],
  author: "", authorRole: "", authorImage: "",
  content: [], contentNp: [],
};

export const BLOCK_TYPES: { label: string; value: ContentBlock["type"] }[] = [
  { label: "Heading", value: "heading" },
  { label: "Subheading", value: "subheading" },
  { label: "Paragraph", value: "paragraph" },
  { label: "Quote", value: "quote" },
  { label: "Image", value: "image" },
  { label: "List", value: "list" },
];

export function toForm(p: any): BlogPostForm {
  return {
    title: p.title,
    titleNp: p.title_np ?? "",
    excerpt: p.excerpt ?? "",
    excerptNp: p.excerpt_np ?? "",
    categoryId: p.category_id ?? "",
    projectId: p.project_id ?? "",
    image: p.image ?? "",
    date: p.date ?? "",
    author: p.author ?? "",
    authorRole: p.author_role ?? "",
    authorImage: p.author_image ?? "",
    content: p.content ?? [],
    contentNp: p.content_np ?? [],
  };
}

export function toPayload(f: BlogPostForm) {
  return {
    title: f.title,
    title_np: f.titleNp,
    excerpt: f.excerpt,
    excerpt_np: f.excerptNp,
    category_id: f.categoryId,
    project_id: f.projectId,
    image: f.image,
    date: f.date,
    author: f.author,
    author_role: f.authorRole,
    author_image: f.authorImage,
    content: f.content,
    content_np: f.contentNp,
  };
}

export function toAdminBlogPost(p: BlogPost): AdminBlogPost {
  return {
    ...p,
    titleNp: p.title_np ?? "",
    excerptNp: p.excerpt_np ?? "",
    contentNp: p.content_np ?? [],
    categoryId: p.category_id,
    projectId: p.project_id,
    authorRole: p.author_role,
    authorImage: p.author_image,
  };
}
