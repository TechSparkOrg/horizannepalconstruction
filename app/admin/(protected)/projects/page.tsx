"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore, type AdminProject } from "@/stores/admin-store";
import { ProjectAdmin } from "@/api/services/project.service";
import type { Project } from "@/api/types/project.types";
import { useState } from "react";
import { toast } from "sonner";

function toAdminProject(p: Project): AdminProject {
  return {
    id: p.id, title: p.title, slug: p.slug, categoryId: p.category_id ?? "", file: p.file ?? "",
    location: p.location ?? "", startDate: p.start_date ?? "", completion: p.completion ?? "",
    thumbnail: p.thumbnail ?? "", images: p.images ?? [], description: p.description ?? "",
    materials: p.materials ?? [], costEstimation: p.cost_estimation ?? [],
    specs: p.specs ?? [], gallery: p.gallery ?? [], socialLinks: p.social_links ?? [],
  };
}

export default function AdminProjectsPage() {
  const { projects, setProjects } = useAdminStore(useShallow((s) => ({ projects: s.projects, setProjects: s.setProjects })));
  const [deleting, setDeleting] = useState<string | null>(null);

  const remove = async (slug: string) => {
    setDeleting(slug);
    try {
      await ProjectAdmin.delete(slug);
      toast.success("Project deleted");
      const r = await ProjectAdmin.list();
      setProjects((r.results ?? []).map(toAdminProject));
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-dark">Projects</h1>
          <p className="text-sm text-mid-gray mt-1">{projects.length} project(s)</p>
        </div>
        <Link href="/admin/projects/new" className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {projects.length === 0 && (
          <div className="text-center py-16 text-mid-gray text-sm bg-white rounded-xl border border-light-gray/40">
            No projects yet. Click &ldquo;New Project&rdquo; to add one.
          </div>
        )}
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-4 hover:shadow-sm transition">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-dark">{p.title}</p>
              <p className="text-xs text-mid-gray mt-0.5">{p.location} &middot; {p.completion}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/projects/${p.id}`} className="size-9 rounded-lg grid place-items-center text-mid-gray hover:bg-off-white hover:text-brand-dark transition">
                <Edit2 className="size-4" />
              </Link>
              <Link href={`/project-details/${p.slug}`} target="_blank" className="size-9 rounded-lg grid place-items-center text-mid-gray hover:bg-off-white hover:text-brand-dark transition">
                <ExternalLink className="size-4" />
              </Link>
              <button
                onClick={() => remove(p.slug)}
                disabled={deleting === p.slug}
                className="size-9 rounded-lg grid place-items-center text-red-500 hover:bg-red-50 transition disabled:opacity-40"
              >
                {deleting === p.slug ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
