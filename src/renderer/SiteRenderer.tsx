'use client'

import React from 'react'
import { SiteConfig } from '@/types'
import { RendererContext, SectionRegistry } from './types'
import { sectionRegistry } from './registry'

interface SiteRendererProps {
  siteConfig: SiteConfig
  className?: string
}

/**
 * Main Site Renderer
 * 
 * Takes a SiteConfig and renders the complete website.
 * This is the core rendering engine that converts structured
 * configuration into actual React components.
 */
export function SiteRenderer({ siteConfig, className }: SiteRendererProps) {
  const context: RendererContext = {
    theme: siteConfig.theme,
    brand: siteConfig.brand,
    artDirection: siteConfig.artDirection,
  }

  // Get the first page (home page) for now
  // In the future, this could handle routing
  const homePage = siteConfig.pages.find(page => page.id === 'home') || siteConfig.pages[0]

  if (!homePage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">No pages found in site configuration</p>
      </div>
    )
  }

  return (
    <div 
      className={className}
      style={{
        '--font-display': context.theme.typography.fonts.display.fontFamily,
        '--font-body': context.theme.typography.fonts.body.fontFamily,
        '--font-mono': context.theme.typography.fonts.mono?.fontFamily || 'monospace',
      } as React.CSSProperties}
    >
      {/* CSS Variables for Theme */}
      <ThemeVariables theme={context.theme} />
      
      {/* Navigation */}
      {siteConfig.navigation && (
        <Navigation navigation={siteConfig.navigation} brand={context.brand} />
      )}
      
      {/* Main Content */}
      <main>
        {homePage.sections.map((section, index) => {
          const Renderer = sectionRegistry[section.type]
          
          if (!Renderer) {
            console.warn(`No renderer found for section type: ${section.type}`)
            return null
          }
          
          return (
            <Renderer
              key={section.id || `section-${index}`}
              section={section}
              context={context}
            />
          )
        })}
      </main>
      
      {/* Footer */}
      <Footer brand={context.brand} />
    </div>
  )
}

/**
 * Theme Variables Component
 * Injects CSS custom properties based on the theme
 */
function ThemeVariables({ theme }: { theme: RendererContext['theme'] }) {
  const cssVars = {
    // Colors
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--surface': theme.colors.surface,
    '--surface-muted': theme.colors.surfaceMuted,
    '--primary': theme.colors.primary,
    '--primary-foreground': theme.colors.primaryForeground,
    '--secondary': theme.colors.secondary,
    '--accent': theme.colors.accent,
    '--border': theme.colors.border,
    '--muted': theme.colors.muted,
    '--success': theme.colors.success,
    '--warning': theme.colors.warning,
    '--error': theme.colors.error,
    
    // Typography
    '--font-display': theme.typography.fonts.display.fontFamily,
    '--font-body': theme.typography.fonts.body.fontFamily,
    '--font-mono': theme.typography.fonts.mono?.fontFamily || 'monospace',
    
    // Spacing
    '--spacing-xs': theme.spacing['xs'] || '0.25rem',
    '--spacing-sm': theme.spacing['sm'] || '0.5rem',
    '--spacing-md': theme.spacing['md'] || '1rem',
    '--spacing-lg': theme.spacing['lg'] || '2rem',
    '--spacing-xl': theme.spacing['xl'] || '4rem',
    
    // Border Radius
    '--radius-sm': theme.radii['sm'] || '0.25rem',
    '--radius-md': theme.radii['md'] || '0.5rem',
    '--radius-lg': theme.radii['lg'] || '1rem',
    '--radius-xl': theme.radii['xl'] || '2rem',
    '--radius-full': theme.radii['full'] || '9999px',
  }

  return (
    <style jsx global>{`
      :root {
        ${Object.entries(cssVars)
          .map(([key, value]) => `${key}: ${value};`)
          .join('\n        ')}
      }
    `}</style>
  )
}

/**
 * Navigation Component
 */
function Navigation({ 
  navigation, 
  brand 
}: { 
  navigation: { items: Array<{ label: string; href: string }>; cta?: { label: string; href: string } }
  brand: RendererContext['brand']
}) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {brand.logo?.svg ? (
            <div dangerouslySetInnerHTML={{ __html: brand.logo.svg }} className="h-8 w-auto" />
          ) : brand.logo?.url ? (
            <img src={brand.logo.url} alt={brand.name} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-bold">{brand.name}</span>
          )}
        </div>
        
        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          {navigation.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        {/* CTA */}
        {navigation.cta && (
          <a
            href={navigation.cta.href}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {navigation.cta.label}
          </a>
        )}
      </div>
    </nav>
  )
}

/**
 * Footer Component
 */
function Footer({ brand }: { brand: RendererContext['brand'] }) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-surface">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            {brand.logo?.svg ? (
              <div dangerouslySetInnerHTML={{ __html: brand.logo.svg }} className="h-6 w-auto" />
            ) : brand.logo?.url ? (
              <img src={brand.logo.url} alt={brand.name} className="h-6 w-auto" />
            ) : (
              <span className="text-lg font-semibold">{brand.name}</span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
