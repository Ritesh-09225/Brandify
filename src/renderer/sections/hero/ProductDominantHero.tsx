'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Product Dominant Hero Variant
 * 
 * Large product screenshot/mockup with minimal text overlay.
 * Best for: Interface-driven products, SaaS, apps with strong UI
 */
export function ProductDominantHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    trustIndicators?: Array<{ label: string; value?: string }>
  }
  
  const layout = section.layout as { showGradient?: boolean } | undefined
  const productImage = section.assets?.find(a => a.type === 'product' || a.type === 'image')
  
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: context.theme.colors.background }}
      />
      
      <div className="container relative">
        {/* Content - Minimal text at top */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
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
          
          {content.subheadline && (
            <p 
              className="text-xl md:text-2xl mb-8"
              style={{ 
                fontFamily: context.theme.typography.fonts.body.fontFamily,
                color: context.theme.colors.muted 
              }}
            >
              {content.subheadline}
            </p>
          )}
          
          {content.primaryCTA && (
            <a
              href={content.primaryCTA.href}
              className="inline-flex items-center justify-center rounded-md px-8 py-4 text-lg font-medium transition-colors"
              style={{
                backgroundColor: context.theme.colors.primary,
                color: context.theme.colors.primaryForeground,
              }}
            >
              {content.primaryCTA.label}
            </a>
          )}
        </div>
        
        {/* Product Visual - Dominant */}
        <div className="relative">
          {productImage ? (
            <div 
              className="relative group"
              style={{
                borderRadius: context.theme.radii['lg'] || '1rem',
                overflow: 'hidden',
                boxShadow: context.theme.shadows['2xl'] || '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <img
                src={productImage.url}
                alt={productImage.alt || 'Product interface'}
                className="w-full h-auto"
              />
              
              {/* Subtle gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${context.theme.colors.primary}20, transparent)`,
                }}
              />
            </div>
          ) : (
            /* Placeholder for product screenshot */
            <div 
              className="aspect-[16/10] rounded-lg flex items-center justify-center border-2 border-dashed"
              style={{
                backgroundColor: context.theme.colors.surface,
                borderColor: context.theme.colors.border,
                borderRadius: context.theme.radii['lg'] || '1rem',
              }}
            >
              <div className="text-center p-8">
                <p 
                  className="text-lg font-medium mb-2"
                  style={{ color: context.theme.colors.foreground }}
                >
                  Product Interface
                </p>
                <p 
                  className="text-sm"
                  style={{ color: context.theme.colors.muted }}
                >
                  Upload a product screenshot or mockup
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Optional trust indicators below product */}
        {content.trustIndicators && Array.isArray(content.trustIndicators) && (
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {(content.trustIndicators as Array<{ label: string; value?: string }>).map((indicator, index) => (
              <div key={index} className="text-center">
                {indicator.value && (
                  <p 
                    className="text-2xl font-bold"
                    style={{ color: context.theme.colors.primary }}
                  >
                    {indicator.value}
                  </p>
                )}
                <p 
                  className="text-sm"
                  style={{ color: context.theme.colors.muted }}
                >
                  {indicator.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
