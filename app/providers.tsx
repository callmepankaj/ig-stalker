'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: "/ingest",
          ui_host: "https://us.posthog.com",
          defaults: '2025-05-24',
          capture_exceptions: true,
          debug: process.env.NODE_ENV === "development",
        })
      }
    }, [])
  
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
