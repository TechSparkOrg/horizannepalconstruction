"use client";

import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { useAdminStore } from "@/stores/admin-store";

export default function AdminProjectsPage() {
  const { projects, deleteProject } = useAdminStore();

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
              <button onClick={() => deleteProject(p.id)} className="size-9 rounded-lg grid place-items-center text-red-500 hover:bg-red-50 transition">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
