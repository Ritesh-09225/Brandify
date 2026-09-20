'use client'

import React from 'react'
import { SectionRendererProps } from '../types'
import { CenteredHero } from './hero/CenteredHero'
import { SplitHero } from './hero/SplitHero'
import { ProductDominantHero } from './hero/ProductDominantHero'
import { VisualDominantHero } from './hero/VisualDominantHero'
import { EditorialHero } from './hero/EditorialHero'
import { MinimalHero } from './hero/MinimalHero'

/**
 * Hero Section Renderer
 * 
 * Supports multiple variants:
 * - centered: Classic centered hero with CTA
 * - split: Two-column layout with text and visual
 * - productDominant: Product-focused with large screenshot/mockup
 * - visualDominant: Image-led with overlay text
 * - editorial: Magazine-style typography-led design
 * - minimal: Clean, sparse design with focused message
 */
export function HeroSection({ section, context, assets }: SectionRendererProps) {
  const variant = section.variant || 'centered'
  
  const variantComponents: Record<string, React.ComponentType<SectionRendererProps>> = {
    centered: CenteredHero,
    split: SplitHero,
    productDominant: ProductDominantHero,
    visualDominant: VisualDominantHero,
    editorial: EditorialHero,
    minimal: MinimalHero,
  }
  
  const VariantComponent = variantComponents[variant] || CenteredHero
  
  return <VariantComponent section={section} context={context} assets={assets} />
}
