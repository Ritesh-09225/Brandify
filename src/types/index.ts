// ============================================
// BRAND INTELLIGENCE TYPES
// ============================================

export interface BrandIntelligence {
  brandName: string
  tagline?: string
  description?: string
  industry?: string
  productType?: string
  targetAudience?: string
  userNeeds?: string
  painPoints?: string
  problem?: string
  solution?: string
  corePromise?: string
  valuePropositions?: string
  positioning?: string
  differentiators?: string
  personality: string[]
  tone?: string
  messagingStyle?: string
  keywords: string[]
  visualConcepts: string[]
  websiteGoal?: string
  primaryCTA?: string
  provenance?: Record<string, 'user' | 'ai_inferred' | 'ai_generated'>
}

// ============================================
// VISUAL DNA TYPES
// ============================================

export type LayoutDensity = 'sparse' | 'balanced' | 'dense'
export type ShapeLanguage = 'rounded' | 'organic' | 'geometric' | 'sharp'
export type BorderLanguage = 'subtle' | 'defined' | 'bold'

export interface VisualDNA {
  aesthetic?: string
  mood: string[]
  keywords: string[]
  colorBehavior?: string
  typographyBehavior?: string
  compositionStyle?: string
  layoutDensity?: LayoutDensity
  shapeLanguage?: ShapeLanguage
  borderLanguage?: BorderLanguage
  imageryStyle?: string
  illustrationStyle?: string
  iconStyle?: string
  motionStyle?: string
  textureStyle?: string
  backgroundStrategy?: string
  visualMetaphors: string[]
  derivedFrom?: unknown
}

// ============================================
// BRAND SYSTEM (DESIGN TOKENS) TYPES
// ============================================

export interface ColorTokens {
  background: string
  foreground: string
  surface: string
  surfaceMuted: string
  primary: string
  primaryForeground: string
  secondary: string
  accent: string
  border: string
  muted: string
  success: string
  warning: string
  error: string
}

export interface TypographyScale {
  display: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  heading: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  subheading: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  body: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  caption: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  label: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
  mono: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }
}

export interface FontFamily {
  fontFamily: string
  weights: string[]
  fallback: string
  usage: string
  source: 'google' | 'system' | 'custom'
}

export interface BrandSystem {
  colors: ColorTokens
  typography: {
    fonts: {
      display: FontFamily
      body: FontFamily
      mono?: FontFamily
    }
    scale: TypographyScale
  }
  spacing: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  borders: Record<string, string>
  buttons?: unknown
  inputs?: unknown
  cards?: unknown
  navigation?: unknown
  icons?: unknown
  imagery?: unknown
  motion?: unknown
  layoutRules?: unknown
  responsiveRules?: unknown
}

// ============================================
// ART DIRECTION TYPES
// ============================================

export type HeroStrategy =
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

export interface AssetRequirement {
  id: string
  type: 'image' | 'video' | 'icon' | 'animation' | 'logo'
  subject: string
  style: string
  mood: string
  aspectRatio?: string
  placement: string
  purpose: string
  priority: 'high' | 'medium' | 'low'
}

export interface SectionSequenceItem {
  type: string
  variant?: string
  order: number
}

export interface ArtDirection {
  concept?: string
  narrative?: string
  heroStrategy: HeroStrategy
  navigationStrategy?: string
  sectionSequence: SectionSequenceItem[]
  compositionRules?: unknown
  visualHierarchy?: string
  imageryStrategy?: string
  productVisualizationStrategy?: string
  motionStrategy?: string
  ctaStrategy?: string
  assetRequirements: AssetRequirement[]
  designDecisions?: Array<{
    decision: string
    value: string
    reason: string
  }>
}

// ============================================
// SITE CONFIG TYPES
// ============================================

export interface SiteConfigTheme {
  colors: ColorTokens
  typography: BrandSystem['typography']
  spacing: BrandSystem['spacing']
  radii: BrandSystem['radii']
  shadows: BrandSystem['shadows']
  borders: BrandSystem['borders']
}

export interface SiteConfigBrand {
  name: string
  tagline?: string
  description?: string
  logo?: {
    url?: string
    svg?: string
  }
}

export interface SiteConfigNavigation {
  items: Array<{
    label: string
    href: string
  }>
  cta?: {
    label: string
    href: string
  }
}

export interface SiteConfigSection {
  id: string
  type: string
  variant: string
  content: Record<string, unknown>
  assets?: Array<{
    id: string
    type: string
    url: string
    alt?: string
  }>
  layout?: Record<string, unknown>
  style?: Record<string, unknown>
}

export interface SiteConfigPage {
  id: string
  name: string
  slug: string
  path: string
  title?: string
  description?: string
  order: number
  sections: SiteConfigSection[]
}

export interface SiteConfig {
  theme: SiteConfigTheme
  brand: SiteConfigBrand
  artDirection: {
    concept?: string
    heroStrategy: HeroStrategy
    sectionSequence: SectionSequenceItem[]
  }
  navigation: SiteConfigNavigation
  pages: SiteConfigPage[]
}

// ============================================
// ASSET TYPES
// ============================================

export type AssetType = 'image' | 'video' | 'icon' | 'animation' | 'logo' | 'font'
export type AssetSource = 'user_uploaded' | 'ai_generated' | 'stock_provider' | 'font_provider' | 'icon_provider'
export type AssetProvenance = 'user_provided' | 'verified' | 'ai_generated' | 'synthetic_demo'
export type AssetStatus = 'requested' | 'searching' | 'resolved' | 'failed' | 'approved' | 'rejected'

export interface Asset {
  id: string
  projectId: string
  type: AssetType
  source: AssetSource
  provider?: string
  providerAssetId?: string
  url: string
  thumbnailUrl?: string
  width?: number
  height?: number
  metadata?: Record<string, unknown>
  license?: string
  usage?: string
  placement?: string
  provenance: AssetProvenance
  status: AssetStatus
  style?: string
  mood?: string
  subject?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectStatus = 'draft' | 'analyzing' | 'brand_ready' | 'designing' | 'generating' | 'ready' | 'error'

export interface Project {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  userId: string
  createdAt: Date
  updatedAt: Date
}

// ============================================
// GENERATION TYPES
// ============================================

export type GenerationType =
  | 'brand_intelligence'
  | 'visual_dna'
  | 'brand_system'
  | 'art_direction'
  | 'asset_resolution'
  | 'site_generation'
  | 'site_validation'
  | 'full_pipeline'

export type GenerationStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface GenerationEvent {
  stage: string
  status: string
  message?: string
  progress?: number
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface Generation {
  id: string
  projectId: string
  type: GenerationType
  status: GenerationStatus
  stage?: string
  progress: number
  message?: string
  inputData?: Record<string, unknown>
  outputData?: Record<string, unknown>
  error?: string
  retryCount: number
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// ============================================
// AI PROVIDER TYPES
// ============================================

export interface AIProvider {
  name: string
  generateBrandIntelligence(input: BrandIntelligenceInput): Promise<BrandIntelligence>
  generateVisualDNA(input: VisualDNAInput): Promise<VisualDNA>
  generateBrandSystem(input: BrandSystemInput): Promise<BrandSystem>
  generateArtDirection(input: ArtDirectionInput): Promise<ArtDirection>
  generateSiteConfig(input: SiteConfigInput): Promise<SiteConfig>
}

export interface BrandIntelligenceInput {
  productName: string
  productDescription: string
  industry?: string
  targetAudience?: string
  problemSolved?: string
  mainSolution?: string
  desiredCTA?: string
  personality: string[]
  tone?: string
  websiteGoal?: string
  websiteIntent?: string
  additionalNotes?: string
  references?: Array<{ type: string; url?: string; analysis?: unknown }>
}

export interface VisualDNAInput {
  brandIntelligence: BrandIntelligence
  references?: Array<{ type: string; url?: string; analysis?: unknown }>
}

export interface BrandSystemInput {
  brandIntelligence: BrandIntelligence
  visualDNA: VisualDNA
}

export interface ArtDirectionInput {
  brandIntelligence: BrandIntelligence
  visualDNA: VisualDNA
  brandSystem: BrandSystem
  websiteGoal?: string
  productType?: string
}

export interface SiteConfigInput {
  brandIntelligence: BrandIntelligence
  visualDNA: VisualDNA
  brandSystem: BrandSystem
  artDirection: ArtDirection
  assets: Asset[]
}

// ============================================
// IMAGE PROVIDER TYPES
// ============================================

export interface ImageProvider {
  name: string
  search(requirement: AssetRequirement): Promise<Asset[]>
}

export interface ImageSearchResult {
  provider: string
  providerAssetId: string
  url: string
  thumbnailUrl: string
  width: number
  height: number
  license?: string
  metadata?: Record<string, unknown>
}

// ============================================
// ICON PROVIDER TYPES
// ============================================

export interface IconProvider {
  name: string
  search(meaning: string, style?: string, weight?: string): Promise<IconResult[]>
}

export interface IconResult {
  id: string
  name: string
  url: string
  svg?: string
  category?: string
  tags?: string[]
}

// ============================================
// FONT PROVIDER TYPES
// ============================================

export interface FontProvider {
  name: string
  search(options: FontSearchOptions): Promise<FontResult[]>
  getFontCSS(family: string, weights: string[]): Promise<string>
}

export interface FontSearchOptions {
  personality?: string
  industry?: string
  usage: 'display' | 'body' | 'mono'
}

export interface FontResult {
  family: string
  weights: string[]
  fallback: string
  source: 'google' | 'system' | 'custom'
  cssUrl?: string
}
