import { apiPublic, apiPrivate } from '../ServiceHelper/index';
import type { CalcBuildingType, CalcMaterial, CalcMaterialCreate, CalcMaterialUpdate, CalcMaterialListParams } from '../types/calculator.types';
import type { PaginatedResponse } from '../types/consultation.types';

export const CalculatorService = {
  getMaterials: (params?: CalcMaterialListParams) =>
    apiPublic.get<PaginatedResponse<CalcMaterial>>('/calculator/materials/', { params: params as Record<string, string | number | boolean> | undefined }).then(r => r.data),

  adminListBuildingTypes: () =>
    apiPrivate.get<CalcBuildingType[]>('/admin/calculator/building-types/').then(r => r.data),

  adminCreateBuildingType: (name: string) =>
    apiPrivate.post<CalcBuildingType>('/admin/calculator/building-types/', { name }).then(r => r.data),

  adminDeleteBuildingType: (name: string) =>
    apiPrivate.delete<{ ok: boolean }>(`/admin/calculator/building-types/${name}/`).then(r => r.data),

  adminListMaterials: () =>
    apiPrivate.get<PaginatedResponse<CalcMaterial>>('/admin/calculator/materials/').then(r => r.data),

  adminCreateMaterial: (data: CalcMaterialCreate) =>
    apiPrivate.post<CalcMaterial>('/admin/calculator/materials/', data).then(r => r.data),

  adminUpdateMaterial: (id: string, data: CalcMaterialUpdate) =>
    apiPrivate.put<CalcMaterial>(`/admin/calculator/materials/${id}/`, data).then(r => r.data),

  adminDeleteMaterial: (id: string) =>
    apiPrivate.delete<{ ok: boolean }>(`/admin/calculator/materials/${id}/`).then(r => r.data),
};
