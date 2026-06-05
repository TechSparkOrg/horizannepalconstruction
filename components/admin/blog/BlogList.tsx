"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import type { AdminBlogPost } from "@/stores/admin-types";

interface Props {
  posts: AdminBlogPost[];
  onNew: () => void;
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
}

export default function BlogList({ posts, onNew, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Blogs</h1>
        <button
          onClick={onNew}
          className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
        >
          <Plus className="size-4" /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-light-gray/40">
        {posts.length === 0 ? (
          <p className="text-sm text-mid-gray py-8 text-center">No blog posts yet.</p>
        ) : (
          <div className="divide-y divide-light-gray/30">
            {posts.map((post) => (
              <div key={post.slug} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  {post.image ? <img src={post.image} alt="" className="size-full object-cover" /> : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-dark truncate">{post.title}</p>
                  <div className="flex gap-2 mt-0.5 flex-wrap">
                    <span className="text-[11px] text-mid-gray">{post.date}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(post.slug)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray">
                    <Pencil className="size-3.5" />
                  </button>
                  <button onClick={() => onDelete(post.slug)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
