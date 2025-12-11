// app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
//import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', 
      defaults: '2025-05-24'
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PageViewTracker />
      {children}
    </PHProvider>
  )
}

function PageViewTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
  
    useEffect(() => {
      // Track pageview
      if (pathname) {
        let url = window.origin + pathname
        if (searchParams?.toString()) {
          url = url + `?${searchParams.toString()}`
        }
        
        posthog.capture('$pageview', {
          $current_url: url,
        })
      }
    }, [pathname, searchParams])
  
    return null
  }