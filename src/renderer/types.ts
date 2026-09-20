// ============================================
// RENDERER TYPES
// ============================================

import { SiteConfig, SiteConfigSection, BrandSystem } from '@/types'

export interface RendererContext {
  theme: SiteConfig['theme']
  brand: SiteConfig['brand']
  artDirection: SiteConfig['artDirection']
}

export interface SectionRendererProps {
  section: SiteConfigSection
  context: RendererContext
  assets?: Map<string, any>
}

export interface SectionRegistry {
  [key: string]: React.ComponentType<SectionRendererProps>
}

export interface ComponentVariant {
  id: string
  name: string
  description: string
  component: React.ComponentType<SectionRendererProps>
}

export interface SectionDefinition {
  id: string
  name: string
  description: string
  variants: ComponentVariant[]
}

// Available hero strategies for rendering
export type RenderHeroStrategy = 
  | 'centered'
  | 'split'
  | 'imageLeft'
  | 'imageRight'
  | 'productDominant'
  | 'visualDominant'
  | 'editorial'
  | 'immersive'
  | 'asymmetric'
  | 'typographyLed'
  | 'interactive'
  | 'minimal'

// Available section types
export type SectionType =
  | 'hero'
  | 'productShowcase'
  | 'featureSpotlight'
  | 'bento'
  | 'workflow'
  | 'problemSolution'
  | 'useCases'
  | 'productDemo'
  | 'comparison'
  | 'integrationGrid'
  | 'metrics'
  | 'timeline'
  | 'gallery'
  | 'caseStudy'
  | 'testimonial'
  | 'socialProof'
  | 'pricing'
  | 'faq'
  | 'editorialStatement'
  | 'cta'
