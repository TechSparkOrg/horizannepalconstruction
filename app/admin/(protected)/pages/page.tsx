"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { PageAdmin } from "@/api/services/page.service";
import type { Page as ApiPage } from "@/api/types/page.types";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

interface PageForm {
  title: string;
  titleNp: string;
  content: string;
  contentNp: string;
  iconName: string;
  metaTitle: string;
  metaTitleNp: string;
  metaDescription: string;
  metaDescriptionNp: string;
}

const EMPTY: PageForm = { title: "", titleNp: "", content: "", contentNp: "", iconName: "", metaTitle: "", metaTitleNp: "", metaDescription: "", metaDescriptionNp: "" };

type View = "list" | "new" | "edit";

function apiToForm(p: ApiPage): PageForm {
  return {
    title: p.title,
    titleNp: p.title_np ?? "",
    content: p.content ?? "",
    contentNp: p.content_np ?? "",
    iconName: p.icon_name ?? "",
    metaTitle: p.meta_title ?? "",
    metaTitleNp: p.meta_title_np ?? "",
    metaDescription: p.meta_description ?? "",
    metaDescriptionNp: p.meta_description_np ?? "",
  };
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<ApiPage[]>([]);
  const [view, setView] = useState<View>("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PageForm>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    PageAdmin.list().then((res) => setPages(res.results ?? []));
  }, []);

  const refetch = () => PageAdmin.list().then((res) => setPages(res.results ?? []));

  const openNew = () => { setForm(EMPTY); setEditingSlug(null); setView("new"); };
  const openEdit = (item: ApiPage) => { setForm(apiToForm(item)); setEditingSlug(item.slug); setView("edit"); };
  const back = () => { setForm(EMPTY); setView("list"); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = { title: form.title, title_np: form.titleNp, content: form.content, content_np: form.contentNp, icon_name: form.iconName, meta_title: form.metaTitle, meta_title_np: form.metaTitleNp, meta_description: form.metaDescription, meta_description_np: form.metaDescriptionNp };
      if (editingSlug) {
        await PageAdmin.update(editingSlug, payload);
      } else {
        await PageAdmin.create(payload);
      }
      await refetch();
      back();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (slug: string) => {
    await PageAdmin.delete(slug);
    setPages((prev) => prev.filter((p) => p.slug !== slug));
  };

  // ── List view ──────────────────────────────────────────────
  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-brand-dark">Pages</h1>
          <button
            onClick={openNew}
            className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
          >
            <Plus className="size-4" /> New Page
          </button>
        </div>

        <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_200px_120px_80px] items-center px-4 py-2.5 border-b border-light-gray/40 bg-off-white">
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wide">Title</span>
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wide">Slug</span>
            <span className="text-xs font-semibold text-mid-gray uppercase tracking-wide">Created</span>
            <span />
          </div>

          {pages.length === 0 ? (
            <div className="py-16 text-center">
              <FileText className="size-8 text-light-gray mx-auto mb-3" />
              <p className="text-sm text-mid-gray">No pages yet.</p>
              <button
                onClick={openNew}
                className="mt-3 text-sm text-brand-primary hover:underline"
              >
                Create your first page
              </button>
            </div>
          ) : (
            <div className="divide-y divide-light-gray/30">
              {pages.map((item) => (
                <div
                  key={item.slug}
                  className="grid grid-cols-[1fr_200px_120px_80px] items-center px-4 py-3 hover:bg-gray-50 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-7 rounded-md bg-off-white border border-light-gray/60 grid place-items-center shrink-0">
                      <FileText className="size-3.5 text-mid-gray/50" />
                    </div>
                    <span className="text-sm font-medium text-brand-dark truncate">{item.title}</span>
                  </div>
                  <span className="text-xs font-mono text-mid-gray truncate pr-4">/{item.slug}</span>
                  <span className="text-xs text-mid-gray">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </span>
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-mid-gray hover:text-brand-dark transition"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      onClick={() => remove(item.slug)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-mid-gray hover:text-red-500 transition"
                    >
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

  // ── New / Edit form view ───────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={back}
          className="size-9 grid place-items-center rounded-lg border border-light-gray text-mid-gray hover:bg-gray-50 transition"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div>
          <p className="text-xs text-mid-gray mb-0.5">Pages</p>
          <h1 className="font-display font-bold text-2xl text-brand-dark leading-none">
            {view === "edit" ? form.title || "Edit Page" : "New Page"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Main content */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <p className="text-xs font-semibold text-mid-gray uppercase tracking-wide mb-4">Content</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wide">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Page title"
                  className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:border-brand-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wide">Body</label>
                <RichEditor
                  value={form.content}
                  onChange={(html) => setForm({ ...form, content: html })}
                  minHeight={320}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish card */}
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <p className="text-xs font-semibold text-mid-gray uppercase tracking-wide mb-4">Publish</p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wide">Slug</label>
                <div className="flex rounded-lg border border-light-gray overflow-hidden bg-off-white">
                  <span className="px-3 h-10 flex items-center text-xs text-mid-gray bg-off-white border-r border-light-gray shrink-0">
                    /
                  </span>
                  <span className="flex-1 h-10 px-3 text-sm font-mono flex items-center text-mid-gray">
                    {editingSlug || "auto-generated"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={save}
                disabled={saving}
                className="w-full h-10 rounded-lg bg-brand-primary text-white text-sm font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-60"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? "Saving…" : (view === "edit" ? "Update Page" : "Publish Page")}
              </button>
              <button
                onClick={back}
                className="w-full h-10 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition"
              >
                Discard
              </button>
            </div>
          </div>

          {/* SEO card */}
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <p className="text-xs font-semibold text-mid-gray uppercase tracking-wide mb-4">SEO / Meta</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wide">Meta Title</label>
                <input
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  placeholder="Defaults to page title"
                  className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:border-brand-primary/50 transition"
                />
                <p className="text-right text-[11px] text-mid-gray/60 mt-1">
                  {form.metaTitle.length} / 60
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-mid-gray mb-1.5 uppercase tracking-wide">Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  rows={3}
                  placeholder="Brief description for search engines"
                  className="w-full px-3 py-2.5 rounded-lg border border-light-gray text-sm resize-none focus:outline-none focus:border-brand-primary/50 transition"
                />
                <p className="text-right text-[11px] text-mid-gray/60 mt-0.5">
                  {form.metaDescription.length} / 160
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
