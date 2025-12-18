'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// PostHog is initialized in instrumentation-client.ts
// This provider just wraps the app to provide context for usePostHog hook
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
