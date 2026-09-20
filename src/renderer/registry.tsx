import { SectionRegistry } from './types'

// Import all section renderers
import { HeroSection } from './sections/HeroSection'
import { FeatureSpotlightSection } from './sections/FeatureSpotlightSection'
import { CTASection } from './sections/CTASection'
import { ProductShowcaseSection } from './sections/ProductShowcaseSection'
import { ProblemSolutionSection } from './sections/ProblemSolutionSection'
import { WorkflowSection } from './sections/WorkflowSection'
import { BentoSection } from './sections/BentoSection'

/**
 * Section Registry
 * 
 * Maps section types to their renderer components.
 * This is the central lookup table for the SiteRenderer.
 */
export const sectionRegistry: SectionRegistry = {
  // Core sections
  hero: HeroSection,
  featureSpotlight: FeatureSpotlightSection,
  cta: CTASection,
  productShowcase: ProductShowcaseSection,
  problemSolution: ProblemSolutionSection,
  workflow: WorkflowSection,
  bento: BentoSection,
  
  // Additional sections can be added here as they're implemented
  // productDemo: ProductDemoSection,
  // comparison: ComparisonSection,
  // integrationGrid: IntegrationGridSection,
  // metrics: MetricsSection,
  // timeline: TimelineSection,
  // gallery: GallerySection,
  // caseStudy: CaseStudySection,
  // testimonial: TestimonialSection,
  // socialProof: SocialProofSection,
  // pricing: PricingSection,
  // faq: FAQSection,
  // editorialStatement: EditorialStatementSection,
}

/**
 * Get available section types
 */
export function getAvailableSections(): string[] {
  return Object.keys(sectionRegistry)
}

/**
 * Check if a section type is supported
 */
export function isSectionSupported(type: string): boolean {
  return type in sectionRegistry
}
