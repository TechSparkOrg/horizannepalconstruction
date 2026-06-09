import { cacheLife } from 'next/cache';
import { Model3dPublic } from '@/api/services/model3d.service';

export const getModels = async () => {
  'use cache';
  cacheLife('minutes');
  return Model3dPublic.list();
};

export const getModelBySlug = async (slug: string) => {
  'use cache';
  cacheLife('minutes');
  return Model3dPublic.getBySlug(slug);
};
