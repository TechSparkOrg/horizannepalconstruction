import { cacheLife } from 'next/cache';
import { BuildingPermitPublic } from '@/api/services/building-permit.service';

export const getBuildingPermit = async () => {
  'use cache';
  cacheLife('minutes');
  return BuildingPermitPublic.get();
};
