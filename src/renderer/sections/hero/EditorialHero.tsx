'use client'

import React from 'react'
import { SectionRendererProps } from '../../types'

/**
 * Editorial Hero Variant
 * 
 * Magazine-style typography-led design with dramatic text treatment.
 * Best for: Architecture studios, design agencies, editorial content, luxury brands
 */
export function EditorialHero({ section, context }: SectionRendererProps) {
  const content = section.content as {
    headline?: string
    subheadline?: string
    description?: string
    primaryCTA?: { label: string; href: string }
    eyebrow?: string
  }
  
  const heroImage = section.assets?.find(a => a.type === 'hero' || a.type === 'image')
  const layoutStyle = section.layout?.style as 'left' | 'right' | 'center' || 'left'
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: context.theme.colors.background }}
      />
      
      <div className="container relative">
        <div className={`grid ${layoutStyle === 'center' ? 'md:grid-cols-1 text-center' : 'md:grid-cols-12'} gap-12 items-start`}>
          
          {/* Image Column */}
          {heroImage && layoutStyle !== 'center' && (
            <div className={`md:col-span-5 ${layoutStyle === 'right' ? 'md:order-1' : 'md:order-2'}`}>
              <div 
                className="relative overflow-hidden"
                style={{
                  borderRadius: context.theme.radii['none'] || '0',
                }}
              >
                <img
                  src={heroImage.url}
                  alt={heroImage.alt || 'Editorial image'}
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: '4/5',
                  }}
                />
                
                {/* Optional caption */}
                {heroImage.alt && (
                  <p 
                    className="mt-3 text-sm italic"
                    style={{ color: context.theme.colors.muted }}
                  >
                    {heroImage.alt}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Text Column */}
          <div className={`${layoutStyle === 'center' ? 'md:col-span-12 max-w-4xl mx-auto' : 'md:col-span-7'} ${layoutStyle === 'right' ? 'md:order-2' : 'md:order-1'}`}>
            {/* Eyebrow */}
            {content.eyebrow && (
              <p 
                className="text-sm font-medium tracking-widest uppercase mb-6"
                style={{ 
                  color: context.theme.colors.primary,
                  letterSpacing: '0.2em',
                }}
              >
                {content.eyebrow}
              </p>
            )}
            
            {/* Headline - Large, dramatic */}
            {content.headline && (
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none mb-8"
                style={{ 
                  fontFamily: context.theme.typography.fonts.display.fontFamily,
                  color: context.theme.colors.foreground,
                  lineHeight: '0.95',
                }}
              >
                {content.headline}
              </h1>
            )}
            
            {/* Subheadline - Smaller, refined */}
            {content.subheadline && (
              <p 
                className="text-lg md:text-xl mb-8 max-w-xl"
                style={{ 
                  fontFamily: context.theme.typography.fonts.body.fontFamily,
                  color: context.theme.colors.muted,
                  lineHeight: '1.6',
                }}
              >
                {content.subheadline}
              </p>
            )}
            
            {/* Description - Editorial style */}
            {content.description && (
              <div 
                className="prose prose-lg mb-10"
                style={{ 
                  fontFamily: context.theme.typography.fonts.body.fontFamily,
                  color: context.theme.colors.foreground,
                }}
              >
                {content.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            
            {/* CTA - Minimal button */}
            {content.primaryCTA && (
              <a
                href={content.primaryCTA.href}
                className="inline-flex items-center gap-2 text-base font-medium border-b-2 pb-1 hover:opacity-70 transition-opacity"
                style={{
                  borderColor: context.theme.colors.foreground,
                  color: context.theme.colors.foreground,
                }}
              >
                {content.primaryCTA.label}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Decorative line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: context.theme.colors.border }}
      />
    </section>
  )
}
