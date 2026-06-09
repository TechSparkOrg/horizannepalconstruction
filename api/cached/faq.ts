import { cacheLife } from 'next/cache';
import { FaqPublic } from '@/api/services/faq.service';

export const getFaqs = async () => {
  'use cache';
  cacheLife('minutes');
  return FaqPublic.list();
};
