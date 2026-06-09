import { cacheLife } from 'next/cache';
import { SettingsPublic } from '@/api/services/settings.service';

export const getSettings = async () => {
  'use cache';
  cacheLife('minutes');
  return SettingsPublic.get();
};
