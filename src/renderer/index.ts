// Renderer Index
// Exports all renderer components and utilities

export { SiteRenderer } from './SiteRenderer'
export { sectionRegistry, getAvailableSections, isSectionSupported } from './registry'

export * from './types'

// Section components
export { HeroSection } from './sections/HeroSection'
export { FeatureSpotlightSection } from './sections/FeatureSpotlightSection'
export { CTASection } from './sections/CTASection'
export { ProductShowcaseSection } from './sections/ProductShowcaseSection'
export { ProblemSolutionSection } from './sections/ProblemSolutionSection'
export { WorkflowSection } from './sections/WorkflowSection'
export { BentoSection } from './sections/BentoSection'

// Hero variants
export { CenteredHero } from './sections/hero/CenteredHero'
export { SplitHero } from './sections/hero/SplitHero'
export { ProductDominantHero } from './sections/hero/ProductDominantHero'
export { VisualDominantHero } from './sections/hero/VisualDominantHero'
export { EditorialHero } from './sections/hero/EditorialHero'
export { MinimalHero } from './sections/hero/MinimalHero'
