'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * Bento Grid Section Renderer
 * 
 * Displays features or content in a bento box grid layout.
 */
export function BentoSection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    description?: string
    items: Array<{
      title: string
      description?: string
      image?: string
      icon?: string
      size?: 'small' | 'medium' | 'large' | 'wide'
      accent?: boolean
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
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {content.items.map((item, index) => {
            // Determine grid span based on size
            const sizeClass = item.size === 'wide' ? 'md:col-span-2' : 
                             item.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                             item.size === 'medium' ? 'md:col-span-2' :
                             'md:col-span-1'
            
            return (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-xl p-6 ${sizeClass}`}
                style={{
                  backgroundColor: item.accent 
                    ? context.theme.colors.primary 
                    : context.theme.colors.surface,
                  borderRadius: context.theme.radii['xl'] || '2rem',
                }}
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Icon or Image */}
                  {(item.icon || item.image) && (
                    <div className="mb-4">
                      {item.icon && (
                        <div 
                          className="w-12 h-12"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                          style={{ 
                            color: item.accent 
                              ? context.theme.colors.primaryForeground 
                              : context.theme.colors.primary 
                          }}
                        />
                      )}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg"
                          style={{
                            borderRadius: context.theme.radii['lg'] || '1rem',
                          }}
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Text Content */}
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ 
                        color: item.accent 
                          ? context.theme.colors.primaryForeground 
                          : context.theme.colors.foreground 
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p 
                        className="text-sm"
                        style={{ 
                          color: item.accent 
                            ? `${context.theme.colors.primaryForeground}e6`
                            : context.theme.colors.muted 
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Decorative Background Element (optional) */}
                {!item.image && (
                  <div 
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
                    style={{
                      backgroundColor: item.accent 
                        ? context.theme.colors.primaryForeground 
                        : context.theme.colors.primary,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
