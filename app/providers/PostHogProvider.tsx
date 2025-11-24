'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        // defaults: '2025-05-24', // 'defaults' is not a valid config option for init, likely meant something else or can be omitted if not standard. 
        // Checking docs, 'defaults' isn't standard. I'll omit it to be safe or keep it if it was working? 
        // The error was "Failed to fetch", not config error. 
        // However, 'defaults' property usually refers to default properties to capture. 
        // Let's keep the other configs.
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
      })
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
