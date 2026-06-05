"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore } from "@/stores/admin-store";
import { BlogService } from "@/api/services/blog.service";
import type { BlogPost } from "@/api/types/blog.types";
import BlogList from "@/components/admin/blog/BlogList";
import BlogForm from "@/components/admin/blog/BlogForm";
import { toAdminBlogPost } from "@/components/admin/blog/types";

type View = "list" | "form";

export default function AdminBlogsPage() {
  const { blogPosts, categories, projects, setBlogPosts, deleteBlogPost } = useAdminStore(
    useShallow((s) => ({
      blogPosts: s.blogPosts,
      categories: s.categories,
      projects: s.projects,
      setBlogPosts: s.setBlogPosts,
      deleteBlogPost: s.deleteBlogPost,
    }))
  );

  const [view, setView] = useState<View>("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const refetchList = () =>
    BlogService.adminList().then((r) => setBlogPosts((r.results ?? []).map(toAdminBlogPost)));

  const openNew = () => {
    setEditingSlug(null);
    setView("form");
  };

  const openEdit = (slug: string) => {
    setEditingSlug(slug);
    setView("form");
  };

  const onSaved = async (_post: BlogPost) => {
    await refetchList();
    setEditingSlug(null);
    setView("list");
  };

  const remove = async (slug: string) => {
    await BlogService.delete(slug);
    deleteBlogPost(slug);
  };

  if (view === "form") {
    return (
      <BlogForm
        editingSlug={editingSlug}
        categories={categories}
        projects={projects}
        onSaved={onSaved}
        onBack={() => { setEditingSlug(null); setView("list"); }}
      />
    );
  }

  return (
    <BlogList
      posts={blogPosts}
      onNew={openNew}
      onEdit={openEdit}
      onDelete={remove}
    />
  );
}
