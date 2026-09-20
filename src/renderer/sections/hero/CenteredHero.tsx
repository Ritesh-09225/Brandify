'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Centered Hero Variant
 * 
 * Classic centered layout with headline, subheadline, and CTA.
 * Best for: Clear value propositions, simple products, focused messaging
 */
export function CenteredHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
  }
  
  const heroImage = section.assets?.find(a => a.type === 'hero' || a.type === 'image')
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-surface to-background"
        style={{ backgroundColor: context.theme.colors.surface }}
      />
      
      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo/Brand Mark (optional) */}
          {context.brand.logo && !heroImage && (
            <div className="mb-8">
              {context.brand.logo.svg ? (
                <div dangerouslySetInnerHTML={{ __html: context.brand.logo.svg }} className="h-12 w-auto mx-auto" />
              ) : context.brand.logo.url ? (
                <img src={context.brand.logo.url} alt={context.brand.name} className="h-12 w-auto mx-auto" />
              ) : null}
            </div>
          )}
          
          {/* Headline */}
          {content.headline && (
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ 
                fontFamily: context.theme.typography.fonts.display.fontFamily,
                color: context.theme.colors.foreground 
              }}
            >
              {content.headline}
            </h1>
          )}
          
          {/* Subheadline */}
          {content.subheadline && (
            <p 
              className="text-xl md:text-2xl mb-8 max-w-2xl"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: context.theme.colors.muted 
              }}
            >
              {content.subheadline}
            </p>
          )}
          
          {/* Description */}
          {content.description && (
            <p 
              className="text-lg mb-10 max-w-2xl"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: context.theme.colors.foreground 
              }}
            >
              {content.description}
            </p>
          )}
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            {content.primaryCTA && (
              <a
                href={content.primaryCTA.href}
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  backgroundColor: context.theme.colors.primary,
                  color: context.theme.colors.primaryForeground,
                }}
              >
                {content.primaryCTA.label}
              </a>
            )}
            
            {content.secondaryCTA && (
              <a
                href={content.secondaryCTA.href}
                className="inline-flex items-center justify-center rounded-md border-2 px-8 py-4 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                style={{
                  borderColor: context.theme.colors.border,
                  color: context.theme.colors.foreground,
                }}
              >
                {content.secondaryCTA.label}
              </a>
            )}
          </div>
          
          {/* Hero Image (optional) */}
          {heroImage && (
            <div className="mt-16 w-full">
              <img
                src={heroImage.url}
                alt={heroImage.alt || 'Hero image'}
                className="w-full h-auto rounded-lg shadow-2xl"
                style={{
                  borderRadius: context.theme.radii['lg'] || '1rem',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
