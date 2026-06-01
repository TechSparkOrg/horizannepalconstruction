// 'use server';

// import { apiPublic } from '../ServiceHelper/index';
// import type {
//     BlogCategoryResponse,
//     BlogDetailsResponse,
//     BlogListParams,
//     BlogListResponse,
//     WebStoriesParams,
//     WebStoriesResponse,
// } from '@/app/api/types/_pageBlogs';

// export const getBlogList = async (params?: BlogListParams): Promise<BlogListResponse> => {
//     const queryParams = new URLSearchParams();
//     if (params?.page) queryParams.append('page', params.page.toString());
//     if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
//     if (params?.category) queryParams.append('category', params.category);
//     if (params?.search) queryParams.append('search', params.search);
//     if (params?.sort) queryParams.append('sort', params.sort);
//     const query = queryParams.toString();
//     return apiPublic.get<BlogListResponse>(`/v1/blogs${query ? `?${query}` : ''}`).then(res => res.data);
// };

// export const getBlogBySlug = async (slug: string): Promise<BlogDetailsResponse> => {
//     return apiPublic.get<BlogDetailsResponse>(`/v1/blogs/${slug}`).then(res => res.data);
// };

// export const getRelatedBlogs = async (slug: string, limit: number = 4): Promise<BlogListResponse> => {
//     return apiPublic.get<BlogListResponse>(`/v1/blogs/${slug}/related?limit=${limit}`).then(res => res.data);
// };

// export const getBlogCategories = async (): Promise<BlogCategoryResponse> => {
//     return apiPublic.get<BlogCategoryResponse>(`/v1/blogs/categories`).then(res => res.data);
// };

// export const getWebstories = async (params?: WebStoriesParams): Promise<{ data: WebStoriesResponse } | WebStoriesResponse> => {
//     const queryParams = new URLSearchParams();
//     if (params?.page) queryParams.append('page', params.page.toString());
//     if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
//     if (params?.category?.length) {
//         const categories = params.category.map((cat) => cat.trim()).filter((cat) => cat.length > 0);
//         if (categories.length > 0) queryParams.append('category', categories.join(','));
//     }
//     const query = queryParams.toString();
//     return apiPublic.get<{ data: WebStoriesResponse } | WebStoriesResponse>(`/v1/webstories${query ? `?${query}` : ''}`).then(res => res.data);
// };

