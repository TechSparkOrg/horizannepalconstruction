"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, ImageIcon, Eye, X } from "lucide-react";
import { useAdminStore, type AdminBlogPost, type BlogContentBlock } from "@/stores/admin-store";

function genId() {
  return crypto.randomUUID();
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function toDateInput(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

function toDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminBlogsPage() {
  const { blogPosts, categories, projects, mediaItems, addBlogPost, updateBlogPost, deleteBlogPost } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showImgPicker, setShowImgPicker] = useState(false);
  const [showAuthorPicker, setShowAuthorPicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blockImgPickerIdx, setBlockImgPickerIdx] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const authorImgRef = useRef<HTMLInputElement>(null);

  const emptyPost = (): AdminBlogPost => ({
    id: "", slug: "", title: "", excerpt: "", categoryId: "", projectId: "", image: "", date: "", author: "", authorRole: "", authorImage: "", content: [],
  });

  const [form, setForm] = useState<AdminBlogPost>(emptyPost());

  const resetForm = () => setForm(emptyPost());

  const startEdit = (post: AdminBlogPost) => {
    setForm({ ...post, content: [...post.content] });
    setEditingId(post.id);
  };

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "authorImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const dataUrl = await toBase64(file);
    setForm({ ...form, [field]: dataUrl });
    setUploading(false);
    if (e.target) e.target.value = "";
  };

  const pickExisting = (url: string, field: "image" | "authorImage") => {
    setForm({ ...form, [field]: url });
    setShowImgPicker(false);
    setShowAuthorPicker(false);
  };

  const save = () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    const date = toDisplayDate(form.date);
    if (editingId) {
      updateBlogPost(editingId, { ...form, date });
    } else {
      addBlogPost({ ...form, id: genId(), date: date || toDisplayDate(new Date().toISOString()) });
    }
    resetForm();
    setEditingId(null);
  };

  const addContentBlock = (type: BlogContentBlock["type"]) =>
    setForm({ ...form, content: [...form.content, { type, value: "", items: [] }] });

  const updateContentBlock = (i: number, field: string, value: unknown) =>
    setForm((prev) => {
      const c = [...prev.content];
      c[i] = { ...c[i], [field]: value } as BlogContentBlock;
      return { ...prev, content: c };
    });

  const removeContentBlock = (i: number) =>
    setForm({ ...form, content: form.content.filter((_, j) => j !== i) });

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= form.content.length) return;
    const c = [...form.content];
    [c[i], c[j]] = [c[j], c[i]];
    setForm({ ...form, content: c });
  };

  const getCategoryName = (id: string) => categories.find((c) => c.id === id)?.name || "—";
  const getProjectName = (id: string) => projects.find((p) => p.id === id)?.title || "—";
  const galleryImages = mediaItems.filter((m) => !m.banner);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Blogs</h1>
        <button onClick={() => { resetForm(); setEditingId(null); }} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Plus className="size-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-light-gray/40">
          {blogPosts.length === 0 ? (
            <p className="text-sm text-mid-gray py-8 text-center">No blog posts yet.</p>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
                  <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img src={post.image} alt="" className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{post.title}</p>
                    <div className="flex gap-2 mt-0.5 flex-wrap">
                      <span className="text-[11px] bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded">{getCategoryName(post.categoryId)}</span>
                      {post.projectId && <span className="text-[11px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded">{getProjectName(post.projectId)}</span>}
                      <span className="text-[11px] text-mid-gray">{post.date}</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition">
                    <button onClick={() => startEdit(post)} className="p-1.5 rounded-md hover:bg-gray-200 text-mid-gray"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deleteBlogPost(post.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-400"><Trash2 className="size-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <h2 className="font-bold text-brand-dark mb-4">{editingId ? "Edit Post" : "New Post"}</h2>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Category</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm">
                    <option value="">— Select —</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Project</label>
                  <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm">
                    <option value="">— None —</option>
                    {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Featured Image</label>
                <div className="flex gap-2">
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="URL or upload" />
                  <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleImgUpload(e, "image")} hidden />
                  <button onClick={() => imgRef.current?.click()} disabled={uploading} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                    {uploading ? "..." : <Upload className="size-4" />}
                  </button>
                  <button onClick={() => setShowImgPicker(!showImgPicker)} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                    <ImageIcon className="size-4" />
                  </button>
                </div>
                {showImgPicker && galleryImages.length > 0 && (
                  <div className="mt-2 rounded-lg border border-light-gray bg-gray-50 p-2 grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto">
                    {galleryImages.map((m) => (
                      <button key={m.id} onClick={() => pickExisting(m.url, "image")} className={`aspect-video rounded overflow-hidden border-2 ${form.image === m.url ? "border-brand-primary" : "border-transparent"}`}>
                        <img src={m.url} alt="" className="size-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {form.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-light-gray group">
                  <img src={form.image} alt="" className="size-full object-cover" />
                  <button onClick={() => setPreviewUrl(form.image)} className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition opacity-0 group-hover:opacity-100">
                    <span className="size-8 rounded-full bg-white/90 flex items-center justify-center"><Eye className="size-4 text-brand-dark" /></span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Date</label>
                  <input type="date" value={toDateInput(form.date)} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Role</label>
                  <input value={form.authorRole} onChange={(e) => setForm({ ...form, authorRole: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
              </div>

              {/* Author Image */}
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Author Image</label>
                <div className="flex gap-2">
                  <input value={form.authorImage} onChange={(e) => setForm({ ...form, authorImage: e.target.value })} className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="URL or upload" />
                  <input ref={authorImgRef} type="file" accept="image/*" onChange={(e) => handleImgUpload(e, "authorImage")} hidden />
                  <button onClick={() => authorImgRef.current?.click()} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                    <Upload className="size-4" />
                  </button>
                  <button onClick={() => setShowAuthorPicker(!showAuthorPicker)} className="h-10 px-3 rounded-md border border-light-gray text-mid-gray hover:bg-gray-50 text-sm shrink-0">
                    <ImageIcon className="size-4" />
                  </button>
                </div>
                {showAuthorPicker && galleryImages.length > 0 && (
                  <div className="mt-2 rounded-lg border border-light-gray bg-gray-50 p-2 grid grid-cols-4 gap-1.5 max-h-28 overflow-y-auto">
                    {galleryImages.map((m) => (
                      <button key={m.id} onClick={() => pickExisting(m.url, "authorImage")} className={`aspect-square rounded overflow-hidden border-2 ${form.authorImage === m.url ? "border-brand-primary" : "border-transparent"}`}>
                        <img src={m.url} alt="" className="size-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {form.authorImage && (
                <div className="relative size-14 rounded-full overflow-hidden bg-gray-100 border border-light-gray group">
                  <img src={form.authorImage} alt="" className="size-full object-cover" />
                  <button onClick={() => setPreviewUrl(form.authorImage)} className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition opacity-0 group-hover:opacity-100 rounded-full">
                    <Eye className="size-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            <button onClick={save} className="w-full h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button onClick={() => { resetForm(); setEditingId(null); }} className="w-full h-10 mt-2 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition">
                Cancel
              </button>
            )}
          </div>

          {/* Content Blocks */}
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-brand-dark">Content Blocks</h3>
              <div className="flex gap-1 flex-wrap">
                {(["heading", "subheading", "paragraph", "quote", "image", "list"] as const).map((type) => (
                  <button key={type} onClick={() => addContentBlock(type)} className="px-2 py-1 text-[10px] font-semibold rounded bg-gray-100 text-mid-gray hover:bg-brand-primary/10 hover:text-brand-primary transition">
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {form.content.length === 0 && (
              <p className="text-xs text-mid-gray text-center py-4">No content blocks. Click a type above to add.</p>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {form.content.map((block, i) => (
                <div key={i} className="p-3 rounded-lg border border-light-gray/40 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-mid-gray">{block.type}</span>
                    <div className="flex gap-1">
                      <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="p-0.5 text-mid-gray disabled:opacity-20">↑</button>
                      <button onClick={() => moveBlock(i, 1)} disabled={i === form.content.length - 1} className="p-0.5 text-mid-gray disabled:opacity-20">↓</button>
                      <button onClick={() => removeContentBlock(i)} className="p-0.5 text-red-400 hover:text-red-500">✕</button>
                    </div>
                  </div>

                  {(block.type === "heading" || block.type === "subheading" || block.type === "paragraph" || block.type === "quote") && (
                    <textarea value={block.value || ""} onChange={(e) => updateContentBlock(i, "value", e.target.value)} rows={block.type === "quote" ? 2 : 1} className="w-full px-2 py-1.5 rounded border border-light-gray text-xs resize-none" placeholder={`Enter ${block.type} text...`} />
                  )}

                  {block.type === "image" && (
                    <div>
                      <div className="flex gap-2 mb-1">
                        <input value={block.src || ""} onChange={(e) => updateContentBlock(i, "src", e.target.value)} className="flex-1 h-8 px-2 rounded border border-light-gray text-xs" placeholder="Image URL" />
                        <button onClick={() => setBlockImgPickerIdx(blockImgPickerIdx === i ? null : i)} className="h-8 px-2 rounded border border-light-gray text-mid-gray hover:bg-gray-200 text-xs shrink-0"><ImageIcon className="size-3.5" /></button>
                        {block.src && <button onClick={() => setPreviewUrl(block.src!)} className="h-8 px-2 rounded border border-light-gray text-mid-gray hover:bg-gray-200 text-xs shrink-0"><Eye className="size-3.5" /></button>}
                        <input value={block.caption || ""} onChange={(e) => updateContentBlock(i, "caption", e.target.value)} className="w-24 h-8 px-2 rounded border border-light-gray text-xs" placeholder="Caption" />
                      </div>
                      {blockImgPickerIdx === i && galleryImages.length > 0 && (
                        <div className="grid grid-cols-5 gap-1 max-h-20 overflow-y-auto mb-1">
                          {galleryImages.map((m) => (
                            <button key={m.id} onClick={() => { updateContentBlock(i, "src", m.url); setBlockImgPickerIdx(null); }} className={`aspect-video rounded overflow-hidden border ${block.src === m.url ? "border-brand-primary" : "border-transparent"}`}>
                              <img src={m.url} alt="" className="size-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {block.type === "quote" && (
                    <input value={block.caption || ""} onChange={(e) => updateContentBlock(i, "caption", e.target.value)} className="w-full h-8 px-2 rounded border border-light-gray text-xs mt-1" placeholder="Attribution (optional)" />
                  )}

                  {block.type === "list" && (
                    <div className="space-y-1">
                      {(block.items || [""]).map((item, li) => (
                        <div key={li} className="flex gap-1">
                          <span className="text-xs text-mid-gray mt-1.5">•</span>
                          <input value={item} onChange={(e) => {
                            const items = [...(block.items || [""])];
                            items[li] = e.target.value;
                            updateContentBlock(i, "items", items);
                          }} className="flex-1 h-8 px-2 rounded border border-light-gray text-xs" placeholder="List item" />
                          <button onClick={() => {
                            const items = (block.items || []).filter((_, j) => j !== li);
                            updateContentBlock(i, "items", items);
                          }} disabled={(block.items || []).length <= 1} className="p-1 text-red-400 disabled:opacity-20">✕</button>
                        </div>
                      ))}
                      <button onClick={() => updateContentBlock(i, "items", [...(block.items || []), ""])} className="text-[10px] text-brand-primary font-semibold hover:underline">+ Add item</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewUrl(null)} className="absolute -top-3 -right-3 size-8 rounded-full bg-white shadow-md flex items-center justify-center text-mid-gray hover:text-brand-dark z-10">
              <X className="size-4" />
            </button>
            <img src={previewUrl} alt="" className="w-full h-full object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
