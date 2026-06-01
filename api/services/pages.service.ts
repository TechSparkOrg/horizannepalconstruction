import { apiPublic } from '../ServiceHelper/index';

export const PagesService = {
    GetPages: (slug: string) => apiPublic.get(`/v1/pages/${slug}`).then(res => res.data),
};
