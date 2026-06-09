import { cacheLife } from 'next/cache';
import { ProjectPublic } from '@/api/services/project.service';
import type { ProjectListParams } from '@/api/types/project.types';

export const getProjects = async (params?: ProjectListParams) => {
  'use cache';
  cacheLife('minutes');
  return ProjectPublic.list(params);
};

export const getProjectBySlug = async (slug: string) => {
  'use cache';
  cacheLife('minutes');
  return ProjectPublic.getBySlug(slug);
};
