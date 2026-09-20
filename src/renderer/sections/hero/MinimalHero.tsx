'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Minimal Hero Variant
 * 
 * Clean, sparse design with focused message and plenty of whitespace.
 * Best for: Premium brands, simple products, confident messaging
 */
export function MinimalHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    primaryCTA?: { label: string; href: string }
  }
  
  const layout = section.layout as { showGrid?: boolean } | undefined
  
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background - Solid color or subtle gradient */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: context.theme.colors.background }}
      />
      
      {/* Subtle grid pattern (optional) */}
      {layout?.showGrid && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(${context.theme.colors.foreground} 1px, transparent 1px),
              linear-gradient(90deg, ${context.theme.colors.foreground} 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
          }}
        />
      )}
      
      <div className="container relative">
        <div className="max-w-2xl">
          {/* Headline - Ultra large, confident */}
          {content.headline && (
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
              style={{ 
                fontFamily: context.theme.typography.fonts.display.fontFamily,
                color: context.theme.colors.foreground,
                letterSpacing: '-0.03em',
              }}
            >
              {content.headline}
            </h1>
          )}
          
          {/* Subheadline - Small, refined */}
          {content.subheadline && (
            <p 
              className="text-base md:text-lg mb-12 max-w-md"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: context.theme.colors.muted,
                lineHeight: '1.5',
              }}
            >
              {content.subheadline}
            </p>
          )}
          
          {/* CTA - Simple text link or minimal button */}
          {content.primaryCTA && (
            <a
              href={content.primaryCTA.href}
              className="inline-flex items-center gap-3 text-sm font-medium group"
              style={{
                color: context.theme.colors.foreground,
              }}
            >
              {content.primaryCTA.label}
              <span 
                className="w-8 h-px transition-all group-hover:w-12"
                style={{ backgroundColor: context.theme.colors.foreground }}
              />
            </a>
          )}
        </div>
      </div>
      
      {/* Minimal navigation hint */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <p 
          className="text-xs uppercase tracking-widest"
          style={{ 
            color: context.theme.colors.muted,
            letterSpacing: '0.2em',
          }}
        >
          Scroll
        </p>
      </div>
    </section>
  )
}
