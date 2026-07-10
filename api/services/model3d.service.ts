import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { DesignModel, Model3D } from "@/api/types/model3d.types"

export function getModels(): Promise<PaginatedResponse<Model3D>> {
  return apiGet<PaginatedResponse<Model3D>>("/models/")
}

export function getModelBySlug(slug: string): Promise<Model3D> {
  return apiGet<Model3D>(`/models/${slug}/`)
}

export function getDesignModels(): Promise<{ results: DesignModel[] }> {
  return apiGet<{ results: DesignModel[] }>("/models/designs/")
}

export const Model3dPublic = { list: getModels }
