<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:anchored-summary -->
# Session Summary — Bilingual Content + Admin Content Manager + Build Fixes

## Goal
Make the site fully production-ready: bilingual content (en/np) across all pages, dynamic icons from admin, global analytics/tracking, unified admin content manager, admin network optimization.

## Constraints
- No UI changes — functional code only
- Frontend reads from useClientStore for public pages
- Language state via React context (LanguageProvider)
- Analytics scripts injected from SiteSettings at runtime
- Existing API patterns (Django REST + axios ServiceHelper)
- Pre-existing mock-to-live conversions already done (blog pages, BlogSection, FAQ, FeaturedProjects, OurWorkSection all use useClientStore; lib/blog.ts and lib/projects.ts deleted)

## Completed
1. **Backend models extended**: Page (title_np, content_np, icon_name, meta_title_np, meta_description_np), BlogPost (title_np, excerpt_np, content_np), Category (name_np, icon_name), PageSection model (page FK, section_key, title_en/np, content_en/np, icon_name, sort_order) + migrations applied locally
2. **Backend API**: PageSectionViewSet (admin + public), serializer, routes in admin + public URL files. PageSerializer includes nested sections.
3. **Frontend types/services**: page.types.ts (PageSection, bilingual fields), category.types.ts (name_np, icon_name), blog.types.ts (title_np, excerpt_np, content_np), page-section.service.ts. Mappers in AdminStoreHydrator updated.
4. **LanguageProvider**: React context with lang/setLang/toggle, wired in RootLayout. Header now uses global context instead of local state.
5. **ScriptInjector**: Reads SettingsService.get(), injects scripts.head/body into DOM on mount.
6. **DynamicIcon**: Resolves lucide-react icon by name at runtime via `as unknown as Record<string, React.ComponentType<LucideProps>>` cast. Handles fallback, returns null for unknown.
7. **useTrackAction hook**: Batches events, sends to gtag + backend. AnalyticsTracker fires page_view on navigation.
8. **Admin content-management page**: Dropdown selects page, EN/NP tab switcher for bilingual content, icon selector (70+ lucide names), SEO fields, full PageSection CRUD with bilingual content + icons.
9. **Admin sidebar**: "Content" link added between Pages and Reviews.
10. **Admin StoreHydrator**: hydrated flag + setHydrated action, skips all fetches if already hydrated.
11. **Loading pages**: loading.tsx for /blog, /our-work, /faq, /about.
12. **Build fixes**: Fixed DynamicIcon.tsx, admin/blogs/page.tsx (BlogPostForm + toPayload), admin/categories/page.tsx (AdminCategory init + updateCategory), admin/pages/page.tsx (PageForm + apiToForm + save payload). Build compiles with 0 TS errors across all 36 routes.

## Not Yet Done
- Analytics backend endpoint (POST /api/analytics/events/) does not exist yet
- Language context does not persist to localStorage (future enhancement)
- Pre-existing mock-to-live conversion for remaining pages: /contact, /cost-estimation, /green-calculator, /floor-planner, /how-we-work, /design, /building-permit, /vastu-shastra, /pages/[slug], /project-details/[slug], /models/[slug] (many already partially wired)
- MIGRATIONS: Backend migrations have been applied locally but NOT deployed to production (user declined)

## Key Files
- `backend/constructionbackend/pages/models.py`: Page + PageSection models
- `backend/constructionbackend/categories/models.py`: Category with name_np, icon_name
- `backend/constructionbackend/blog/models.py`: BlogPost with title_np, excerpt_np, content_np
- `components/LanguageProvider.tsx`: Global language context
- `components/ScriptInjector.tsx`: Analytics script injection
- `components/DynamicIcon.tsx`: Runtime icon resolution
- `hooks/useTrackAction.ts`: User action tracking + AnalyticsTracker
- `api/types/page.types.ts`: PageSection type, bilingual fields
- `api/services/page-section.service.ts`: CRUD for page sections
- `app/admin/(protected)/content-management/page.tsx`: Unified content editor
- `stores/list-slice.ts`: hydrated flag + setHydrated
- `components/AdminStoreHydrator.tsx`: Skip fetch if hydrated
- `app/admin/(protected)/blogs/page.tsx`: Blog admin (now has fixed toPayload)
- `app/admin/(protected)/categories/page.tsx`: Category admin (now has nameNp/iconName)
- `app/admin/(protected)/pages/page.tsx`: Pages admin (now has bilingual fields)
- `AGENTS.md`: This file

## Build Status
✅ Clean build, 0 TS errors, 36 routes
<!-- END:anchored-summary -->
