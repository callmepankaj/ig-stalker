# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog analytics has been configured for IG Stalker, a Next.js 16 application that allows users to anonymously view Instagram profiles. The integration uses the modern `instrumentation-client.ts` approach for client-side initialization, with a reverse proxy configured via Next.js rewrites to improve tracking reliability.

Key changes include:
- Updated `.env` with new PostHog API credentials
- Simplified the PostHog provider to avoid duplicate initialization
- Created a server-side PostHog client helper at `app/lib/posthog-server.ts`
- Added 13 custom events across 5 files to track the core user journey from search to download

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `profile_searched` | User searches for an Instagram profile by username - key conversion event | `app/page.tsx` |
| `profile_loaded` | Instagram profile successfully loaded and displayed to user | `app/page.tsx` |
| `profile_search_failed` | Profile search failed due to an error (user not found, private, or API error) | `app/page.tsx` |
| `post_viewed` | User clicked on a post to view it in the modal | `app/page.tsx` |
| `profile_picture_viewed` | User clicked to view the full profile picture | `app/page.tsx` |
| `more_posts_loaded` | User scrolled and triggered infinite scroll to load more posts | `app/page.tsx` |
| `media_downloaded` | User downloaded media (image or video) - key conversion event | `app/components/Modal.tsx` |
| `download_failed` | Media download failed due to an error | `app/components/Modal.tsx` |
| `carousel_navigated` | User navigated through carousel slides in the modal | `app/components/Modal.tsx` |
| `cookie_consent_accepted` | User accepted cookie consent - important for analytics compliance | `app/components/CookieConsent.tsx` |
| `cookie_consent_declined` | User declined cookie consent - tracks opt-out rate | `app/components/CookieConsent.tsx` |
| `blog_article_clicked` | User clicked on a blog article from the listing page | `app/blog/page.tsx` |
| `external_tool_clicked` | User clicked on an external tool link in the navbar dropdown | `app/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/268650/dashboard/906263) - Core analytics dashboard for tracking profile searches, downloads, and user engagement

### Insights
- [Profile Searches Over Time](https://us.posthog.com/project/268650/insights/mYHXtvfw) - Daily trend of Instagram profile searches
- [Search to Download Funnel](https://us.posthog.com/project/268650/insights/sHDgMWGQ) - Conversion funnel from profile search to media download
- [Media Downloads by Type](https://us.posthog.com/project/268650/insights/27cOm7yg) - Breakdown of downloads by media type (image vs video)
- [Search Success vs Failure Rate](https://us.posthog.com/project/268650/insights/7vpp6UfM) - Comparison of successful profile loads vs failed searches
- [Cookie Consent Rate](https://us.posthog.com/project/268650/insights/9Gr7UsRJ) - Cookie consent acceptance vs decline rate
