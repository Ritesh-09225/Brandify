'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Split Hero Variant
 * 
 * Two-column layout with text on one side and visual on the other.
 * Best for: Products with strong visuals, balanced information hierarchy
 */
export function SplitHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
    features?: Array<{ icon?: string; label: string; description: string }>
  }
  
  const heroImage = section.assets?.find(a => a.type === 'hero' || a.type === 'image')
  const imageSide = section.layout?.imageSide as 'left' | 'right' || 'right'
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: context.theme.colors.background }}
      />
      
      <div className="container relative">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${imageSide === 'left' ? 'direction-reverse' : ''}`}>
          
          {/* Text Content */}
          <div className={imageSide === 'left' ? 'md:order-2' : 'md:order-1'}>
            {/* Headline */}
            {content.headline && (
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
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
                className="text-xl md:text-2xl mb-6"
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
                className="text-lg mb-8"
                style={{ 
                  fontFamily: context.theme.typography.fonts.body.fontFamily,
                  color: context.theme.colors.foreground 
                }}
              >
                {content.description}
              </p>
            )}
            
            {/* Features (optional) */}
            {content.features && content.features.length > 0 && (
              <div className="space-y-4 mb-8">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.icon && (
                      <div 
                        className="flex-shrink-0 w-6 h-6 mt-1"
                        dangerouslySetInnerHTML={{ __html: feature.icon }}
                      />
                    )}
                    <div>
                      <p 
                        className="font-semibold"
                        style={{ color: context.theme.colors.foreground }}
                      >
                        {feature.label}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: context.theme.colors.muted }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              {content.primaryCTA && (
                <a
                  href={content.primaryCTA.href}
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                  className="inline-flex items-center justify-center rounded-md border-2 px-6 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{
                    borderColor: context.theme.colors.border,
                    color: context.theme.colors.foreground,
                  }}
                >
                  {content.secondaryCTA.label}
                </a>
              )}
            </div>
          </div>
          
          {/* Visual Content */}
          <div className={imageSide === 'left' ? 'md:order-1' : 'md:order-2'}>
            {heroImage ? (
              <div 
                className="relative"
                style={{
                  borderRadius: context.theme.radii['xl'] || '2rem',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={heroImage.url}
                  alt={heroImage.alt || 'Product showcase'}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              /* Placeholder if no image */
              <div 
                className="aspect-video rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: context.theme.colors.surface,
                  borderRadius: context.theme.radii['xl'] || '2rem',
                }}
              >
                <p 
                  className="text-muted-foreground"
                  style={{ color: context.theme.colors.muted }}
                >
                  Visual placeholder
                </p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  )
}
