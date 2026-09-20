'use client'

import React from 'react'
import { SectionRendererProps } from '../types'

/**
 * Problem-Solution Section Renderer
 * 
 * Contrasts the problem with the solution.
 */
export function ProblemSolutionSection({ section, context }: SectionRendererProps) {
  const content = section.content as {
    eyebrow?: string
    headline?: string
    problem: {
      title: string
      description: string
      points?: Array<{ label: string; description: string }>
    }
    solution: {
      title: string
      description: string
      points?: Array<{ label: string; description: string }>
    }
  }
  
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Header */}
        {(content.eyebrow || content.headline) && (
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
          </div>
        )}
        
        {/* Problem & Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Problem Side */}
          <div 
            className="p-8 rounded-lg"
            style={{
              backgroundColor: `${context.theme.colors.error}10`,
              borderRadius: context.theme.radii['lg'] || '1rem',
              border: `1px solid ${context.theme.colors.error}20`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${context.theme.colors.error}20` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={context.theme.colors.error} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ color: context.theme.colors.foreground }}
              >
                {content.problem.title}
              </h3>
            </div>
            
            <p 
              className="text-base mb-6"
              style={{ color: context.theme.colors.muted }}
            >
              {content.problem.description}
            </p>
            
            {content.problem.points && content.problem.points.length > 0 && (
              <ul className="space-y-4">
                {content.problem.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={context.theme.colors.error} 
                      strokeWidth="2"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                    <div>
                      <p 
                        className="font-semibold text-sm"
                        style={{ color: context.theme.colors.foreground }}
                      >
                        {point.label}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: context.theme.colors.muted }}
                      >
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Solution Side */}
          <div 
            className="p-8 rounded-lg"
            style={{
              backgroundColor: `${context.theme.colors.success}10`,
              borderRadius: context.theme.radii['lg'] || '1rem',
              border: `1px solid ${context.theme.colors.success}20`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${context.theme.colors.success}20` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={context.theme.colors.success} strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </div>
              <h3 
                className="text-2xl font-bold"
                style={{ color: context.theme.colors.foreground }}
              >
                {content.solution.title}
              </h3>
            </div>
            
            <p 
              className="text-base mb-6"
              style={{ color: context.theme.colors.muted }}
            >
              {content.solution.description}
            </p>
            
            {content.solution.points && content.solution.points.length > 0 && (
              <ul className="space-y-4">
                {content.solution.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={context.theme.colors.success} 
                      strokeWidth="2"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                    <div>
                      <p 
                        className="font-semibold text-sm"
                        style={{ color: context.theme.colors.foreground }}
                      >
                        {point.label}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: context.theme.colors.muted }}
                      >
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        </div>
      </div>
    </section>
  )
}
