import { apiPublic, apiPrivate } from '../ServiceHelper/index';
import type { VastuConfig } from '@/stores/admin-types';

export const VastuPublic = {
  get: () =>
    apiPublic.get<VastuConfig>('/vastu/').then(r => r.data),
};

export const VastuAdmin = {
  update: (data: Partial<VastuConfig>) =>
    apiPrivate.put<VastuConfig>('/admin/vastu/', data).then(r => r.data),
};

