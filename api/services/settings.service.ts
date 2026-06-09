import { apiPrivate, apiPublic } from '../ServiceHelper/index';
import type { SiteSettings, SiteSettingsPayload } from '../types/settings.types';

export const SettingsPublic = {
    get: () =>
        apiPublic.get<SiteSettings>(`/settings/`).then(r => r.data),
};

export const SettingsAdmin = {
    put: (data: Partial<SiteSettingsPayload>) =>
        apiPrivate.put<SiteSettings>(`/settings/`, data).then(r => r.data),
};

