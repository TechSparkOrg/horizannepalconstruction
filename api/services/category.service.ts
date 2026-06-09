import { apiPublic, apiPrivate } from '../ServiceHelper/index';
import type { Category, CategoryCreate, CategoryUpdate } from '../types/category.types';
import type { PaginatedResponse } from '../types/consultation.types';

export const CategoryPublic = {
  list: () =>
    apiPublic.get<PaginatedResponse<Category>>('/categories/').then(r => r.data),
  getById: (id: string) =>
    apiPublic.get<Category>(`/categories/${id}/`).then(r => r.data),
};

export const CategoryAdmin = {
  list: () =>
    apiPrivate.get<PaginatedResponse<Category>>('/admin/categories/').then(r => r.data),
  adminGet: (id: string) =>
    apiPrivate.get<Category>(`/admin/categories/${id}/`).then(r => r.data),
  create: (data: CategoryCreate) =>
    apiPrivate.post<Category>('/admin/categories/', data).then(r => r.data),
  update: (id: string, data: CategoryUpdate) =>
    apiPrivate.put<Category>(`/admin/categories/${id}/`, data).then(r => r.data),
  delete: (id: string) =>
    apiPrivate.delete<{ ok: boolean }>(`/admin/categories/${id}/`).then(r => r.data),
};

