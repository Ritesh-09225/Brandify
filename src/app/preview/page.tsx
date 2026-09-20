'use client'

import { useSearchParams } from 'next/navigation'
import { SiteRenderer } from '@/renderer'
import { SiteConfig } from '@/types'

/**
 * Preview Page
 * 
 * Renders a generated site configuration for preview.
 * Access via: /preview?config=<encoded_site_config>
 */
export default function PreviewPage() {
  const searchParams = useSearchParams()
  const configParam = searchParams.get('config')
  
  let siteConfig: SiteConfig | null = null
  
  try {
    if (configParam) {
      // Try to parse the config from URL parameter
      const decoded = decodeURIComponent(configParam)
      siteConfig = JSON.parse(decoded) as SiteConfig
    }
  } catch (error) {
    console.error('Failed to parse site config:', error)
  }
  
  // For development/testing, you can also load from localStorage
  if (!siteConfig && typeof window !== 'undefined') {
    const savedConfig = localStorage.getItem('brandify_preview_config')
    if (savedConfig) {
      try {
        siteConfig = JSON.parse(savedConfig) as SiteConfig
      } catch (error) {
        console.error('Failed to load config from localStorage:', error)
      }
    }
  }
  
  if (!siteConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">No Site Configuration Found</h1>
          <p className="text-muted-foreground mb-6">
            Please provide a site configuration via URL parameter or generate a new site.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create New Site
          </a>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      <SiteRenderer siteConfig={siteConfig} />
    </div>
  )
}
