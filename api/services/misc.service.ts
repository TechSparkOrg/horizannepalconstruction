// 'use server'

// import { apiPublic, n8nApi } from '../ServiceHelper/index';

// export const getBannerBySlug = async (slug: string) => {
//     try {
//         const res = await apiPublic.get(`/v1/banners/${slug}`);
//         return res.data?.data
//     } catch {
//         return null;
//     }
// };

// export const chatBotQuery = async (data: { message: string; sessionId?: string | number }) =>
//     n8nApi.post(`/chatbot`, data).then(res => res.data);

// export const getChatbotHistory = async (sessionId?: string | number) => {
//     const params = sessionId ? `?sessionId=${sessionId}` : '';
//     return n8nApi.get(`/chatbot${params}`).then(res => res.data);
// };

// export const getFaqs = async (params: { type?: string; per_page?: number; page?: number }) => {
//     const query = new URLSearchParams();
//     if (params.type) query.set('type', params.type);
//     if (params.per_page) query.set('per_page', params.per_page.toString());
//     if (params.page) query.set('page', params.page.toString());

//     return apiPublic.get(`/v1/faqs?${query.toString()}`).then(res => res.data);
// };