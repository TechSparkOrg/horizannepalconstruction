import { cacheLife } from 'next/cache';
import { VastuPublic } from '@/api/services/vastu.service';

export const getVastuConfig = async () => {
  'use cache';
  cacheLife('minutes');
  return VastuPublic.get();
};
