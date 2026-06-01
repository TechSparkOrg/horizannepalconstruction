// 'use server'

// import type { SearchParams } from '@/app/api/types/_pageCategory';
// import type { ProductByCategoryResponse } from '@/app/api/types/product-by-category';
// import { apiPublic } from '../ServiceHelper/index';
// import { cache } from 'react';
// import { cacheLife } from 'next/cache';

// export const getAllCategories = async () => {
//     'use cache';
//     cacheLife('minutes'); // Cache for 1 hour
//     return apiPublic.get(`/categorys/navbarItems`).then(res => res.data.data);
// };

// export const getCategoryBySlug = async (slug: string) => {
//     return apiPublic.get(`/v1/categories/${slug}`).then(res => res.data);
// };

// export const getAllBrands = async () => {
//     return apiPublic.get(`/v1/get-all-brands`)
//         .then(res => res.data)
//         .catch((error: any) => {
//             if (error?.response?.status === 404) {
//                 return apiPublic.get(`/get-all-brands`)
//                     .then(res => res.data)
//                     .catch(() => ({ data: [] }));
//             }
//             return null;
//         });
// };

// export const getCategoryProducts = async (slug: string, params?: SearchParams) => {
//     const queryParams = new URLSearchParams();
//     if (params?.page) queryParams.append('page', params.page.toString());
//     if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
//     if (params?.sort) queryParams.append('sort', params.sort);
//     if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
//     if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
//     if (params?.brand) queryParams.append('brand', params.brand);
//     if (params?.category) queryParams.append('category', params.category);
//     if (params?.emi_enabled !== undefined) queryParams.append('emi_enabled', params.emi_enabled.toString());
//     if (params?.pre_order !== undefined) queryParams.append('pre_order', params.pre_order.toString());
//     if (params?.exchange_available !== undefined) queryParams.append('exchange_available', params.exchange_available.toString());
//     if (params?.offset !== undefined) queryParams.append('offset', params.offset.toString());
//     queryParams.append('include', 'brand,categories');
//     const query = queryParams.toString();
//     return apiPublic.get(`/v1/categories/${slug}/products${query ? `?${query}` : ''}`)
//         .then(res => res.data)
//         .catch((error: any) => {
//             if (error?.response?.status === 404) return null;
//             throw error;
//         });
// };