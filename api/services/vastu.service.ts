import { apiPublic, apiPrivate } from '../ServiceHelper/index';
import type { VastuConfig } from '@/stores/admin-types';

export const VastuService = {
  getPublic: () =>
    apiPublic.get<VastuConfig>('/vastu/').then(r => r.data),

  update: (data: Partial<VastuConfig>) =>
    apiPrivate.put<VastuConfig>('/admin/vastu/', data).then(r => r.data),
};
