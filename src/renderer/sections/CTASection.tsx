'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * CTA Section Renderer
 * 
 * Call-to-action section to drive conversions.
 */
export function CTASection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
  }
  
  const layout = section.layout as { showPattern?: boolean } | undefined
  const ctaImage = section.assets?.find(a => a.type === 'cta' || a.type === 'image')
  
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div 
          className="relative overflow-hidden rounded-2xl p-8 md:p-16"
          style={{
            backgroundColor: context.theme.colors.primary,
            borderRadius: context.theme.radii['xl'] || '2rem',
          }}
        >
          {/* Background pattern (optional) */}
          {layout?.showPattern && (
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${context.theme.colors.primaryForeground} 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          )}
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            {content.eyebrow && (
              <p 
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ 
                  color: `${context.theme.colors.primaryForeground}cc`,
                  letterSpacing: '0.2em',
                }}
              >
                {content.eyebrow}
              </p>
            )}
            
            {/* Headline */}
            {content.headline && (
              <h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                style={{ 
                  fontFamily: context.theme.typography.fonts.display.fontFamily,
                  color: context.theme.colors.primaryForeground 
                }}
              >
                {content.headline}
              </h2>
            )}
            
            {/* Description */}
            {content.description && (
              <p 
                className="text-lg md:text-xl mb-10"
                style={{ 
                  color: `${context.theme.colors.primaryForeground}e6`,
                  fontFamily: context.theme.typography.fonts.body.fontFamily 
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
                  className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-medium transition-colors"
                  style={{
                    backgroundColor: context.theme.colors.primaryForeground,
                    color: context.theme.colors.primary,
                  }}
                >
                  {content.primaryCTA.label}
                </a>
              )}
              
              {content.secondaryCTA && (
                <a
                  href={content.secondaryCTA.href}
                  className="inline-flex items-center justify-center rounded-md border-2 px-8 py-4 text-lg font-medium transition-colors"
                  style={{
                    borderColor: `${context.theme.colors.primaryForeground}40`,
                    color: context.theme.colors.primaryForeground,
                  }}
                >
                  {content.secondaryCTA.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
