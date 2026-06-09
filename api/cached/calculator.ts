import { cacheLife } from 'next/cache';
import { CalculatorPublic } from '@/api/services/calculator.service';
import type { CalcMaterialListParams } from '@/api/types/calculator.types';

export const getCalculatorMaterials = async (params?: CalcMaterialListParams) => {
  'use cache';
  cacheLife('minutes');
  return CalculatorPublic.getMaterials(params);
};
