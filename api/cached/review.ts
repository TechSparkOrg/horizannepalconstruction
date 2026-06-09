import { cacheLife } from 'next/cache';
import { ReviewPublic } from '@/api/services/review.service';

export const getReviews = async () => {
  'use cache';
  cacheLife('minutes');
  return ReviewPublic.list();
};
