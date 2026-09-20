'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Visual Dominant Hero Variant
 * 
 * Full-bleed image with overlay text.
 * Best for: Lifestyle brands, photography-heavy sites, emotional appeal
 */
export function VisualDominantHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
  }
  
  const heroImage = section.assets?.find(a => a.type === 'hero' || a.type === 'image')
  const overlayOpacity = section.layout?.overlayOpacity || 0.6
  
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      {heroImage ? (
        <>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
        </>
      ) : (
        /* Fallback gradient background */
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${context.theme.colors.primary} 0%, ${context.theme.colors.surface} 100%)`,
          }}
        />
      )}
      
      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Headline */}
          {content.headline && (
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              style={{ 
                fontFamily: context.theme.typography.fonts.display.fontFamily,
                color: '#ffffff'
              }}
            >
              {content.headline}
            </h1>
          )}
          
          {/* Subheadline */}
          {content.subheadline && (
            <p 
              className="text-2xl md:text-3xl mb-8 max-w-2xl"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              {content.subheadline}
            </p>
          )}
          
          {/* Description */}
          {content.description && (
            <p 
              className="text-lg md:text-xl mb-10 max-w-2xl"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {content.description}
            </p>
          )}
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {content.primaryCTA && (
              <a
                href={content.primaryCTA.href}
                className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                style={{
                  backgroundColor: '#ffffff',
                  color: context.theme.colors.primary,
                }}
              >
                {content.primaryCTA.label}
              </a>
            )}
            
            {content.secondaryCTA && (
              <a
                href={content.secondaryCTA.href}
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-8 py-4 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                style={{
                  color: '#ffffff',
                }}
              >
                {content.secondaryCTA.label}
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator (optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.6)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
