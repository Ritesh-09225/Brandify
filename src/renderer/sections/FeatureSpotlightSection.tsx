'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * Feature Spotlight Section Renderer
 * 
 * Highlights a single key feature with visual and description.
 */
export function FeatureSpotlightSection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    description?: string
    features?: Array<{
      title: string
      description: string
      icon?: string
    }>
  }
  
  const featureImage = section.assets?.find(a => a.type === 'feature' || a.type === 'image')
  const layoutVariant = section.variant || 'largeVisualLeft'
  
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        {(content.eyebrow || content.headline || content.description) && (
          <div className="max-w-3xl mb-16">
            {content.eyebrow && (
              <p 
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: context.theme.colors.primary }}
              >
                {content.eyebrow}
              </p>
            )}
            {content.headline && (
              <h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                style={{ 
                  fontFamily: context.theme.typography.fonts.display.fontFamily,
                  color: context.theme.colors.foreground 
                }}
              >
                {content.headline}
              </h2>
            )}
            {content.description && (
              <p 
                className="text-lg md:text-xl"
                style={{ 
                  color: context.theme.colors.muted,
                  fontFamily: context.theme.typography.fonts.body.fontFamily 
                }}
              >
                {content.description}
              </p>
            )}
          </div>
        )}
        
        {/* Features Grid */}
        {content.features && content.features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg"
                style={{
                  backgroundColor: context.theme.colors.surface,
                  borderRadius: context.theme.radii['lg'] || '1rem',
                }}
              >
                {feature.icon && (
                  <div 
                    className="w-12 h-12 mb-4"
                    dangerouslySetInnerHTML={{ __html: feature.icon }}
                    style={{ color: context.theme.colors.primary }}
                  />
                )}
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: context.theme.colors.foreground }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-base"
                  style={{ color: context.theme.colors.muted }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Feature Image */}
        {featureImage && (
          <div className="mt-16">
            <img
              src={featureImage.url}
              alt={featureImage.alt || 'Feature showcase'}
              className="w-full h-auto rounded-lg"
              style={{
                borderRadius: context.theme.radii['lg'] || '1rem',
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
