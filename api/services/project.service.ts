import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Project } from "@/api/types/project.types"

export function getProjects(): Promise<PaginatedResponse<Project>> {
  return apiGet<PaginatedResponse<Project>>("/projects/")
}

export function getProjectBySlug(slug: string): Promise<Project> {
  return apiGet<Project>(`/projects/${slug}/`)
}

export function getProjectsByCategory(categorySlug: string): Promise<PaginatedResponse<Project>> {
  return apiGet<PaginatedResponse<Project>>(`/projects/?category=${categorySlug}`)
}

export const ProjectPublic = { list: getProjects }
