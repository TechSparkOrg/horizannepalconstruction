import { apiPublic, apiPrivate } from '../ServiceHelper/index';
import type { BuildingPermitConfig, BuildingPermitConfigUpdate } from '../types/building-permit.types';

export const BuildingPermitService = {
  get: () =>
    apiPublic.get<BuildingPermitConfig>('/building-permit/').then(r => r.data),

  adminGet: () =>
    apiPrivate.get<BuildingPermitConfig>('/admin/building-permit/').then(r => r.data),

  adminUpdate: (data: BuildingPermitConfigUpdate) =>
    apiPrivate.put<BuildingPermitConfig>('/admin/building-permit/', data).then(r => r.data),
};
