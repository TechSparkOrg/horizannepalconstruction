import { cacheLife } from 'next/cache';
import { TeamPublic } from '@/api/services/team.service';

export const getTeam = async () => {
  'use cache';
  cacheLife('minutes');
  return TeamPublic.list();
};
