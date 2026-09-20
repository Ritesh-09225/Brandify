'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * Product Showcase Section Renderer
 * 
 * Displays product features, benefits, or variations.
 */
export function ProductShowcaseSection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    description?: string
    products?: Array<{
      name: string
      description: string
      image?: string
      features?: string[]
      cta?: { label: string; href: string }
    }>
  }
  
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
        
        {/* Products Grid */}
        {content.products && content.products.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.products.map((product, index) => (
              <div 
                key={index}
                className="group overflow-hidden rounded-lg"
                style={{
                  backgroundColor: context.theme.colors.surface,
                  borderRadius: context.theme.radii['lg'] || '1rem',
                }}
              >
                {/* Product Image */}
                {product.image && (
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderRadius: context.theme.radii['lg'] || '1rem',
                      }}
                    />
                  </div>
                )}
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: context.theme.colors.foreground }}
                  >
                    {product.name}
                  </h3>
                  <p 
                    className="text-base mb-4"
                    style={{ color: context.theme.colors.muted }}
                  >
                    {product.description}
                  </p>
                  
                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                          style={{ color: context.theme.colors.foreground }}
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke={context.theme.colors.primary} 
                            strokeWidth="2"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* CTA */}
                  {product.cta && (
                    <a
                      href={product.cta.href}
                      className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors w-full"
                      style={{
                        backgroundColor: context.theme.colors.primary,
                        color: context.theme.colors.primaryForeground,
                      }}
                    >
                      {product.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
