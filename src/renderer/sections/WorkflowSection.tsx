'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * Workflow Section Renderer
 * 
 * Shows steps, process, or how something works.
 */
export function WorkflowSection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    description?: string
    steps: Array<{
      number?: string
      title: string
      description: string
      icon?: string
    }>
  }
  
  const layoutStyle = section.layout?.style || 'horizontal'
  
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        {(content.eyebrow || content.headline || content.description) && (
          <div className="max-w-3xl mb-16 text-center">
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
        
        {/* Steps */}
        {layoutStyle === 'vertical' ? (
          /* Vertical Layout */
          <div className="max-w-3xl mx-auto space-y-8">
            {content.steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                {/* Step Number */}
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    backgroundColor: context.theme.colors.primary,
                    color: context.theme.colors.primaryForeground,
                  }}
                >
                  {step.number || index + 1}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: context.theme.colors.foreground }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-base"
                    style={{ color: context.theme.colors.muted }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Horizontal Layout */
          <div className="grid md:grid-cols-3 gap-8">
            {content.steps.map((step, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-lg text-center"
                style={{
                  backgroundColor: context.theme.colors.surface,
                  borderRadius: context.theme.radii['lg'] || '1rem',
                }}
              >
                {/* Connector Line (between items) */}
                {index < content.steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-1/2 left-full w-8 h-px -translate-y-1/2 z-10"
                    style={{ backgroundColor: context.theme.colors.border }}
                  />
                )}
                
                {/* Step Number */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  style={{
                    backgroundColor: `${context.theme.colors.primary}20`,
                    color: context.theme.colors.primary,
                  }}
                >
                  {step.number || index + 1}
                </div>
                
                {/* Icon (if provided) */}
                {step.icon && (
                  <div 
                    className="w-12 h-12 mx-auto mb-4"
                    dangerouslySetInnerHTML={{ __html: step.icon }}
                    style={{ color: context.theme.colors.primary }}
                  />
                )}
                
                {/* Step Title */}
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: context.theme.colors.foreground }}
                >
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p 
                  className="text-base"
                  style={{ color: context.theme.colors.muted }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
