import { AIProvider, BrandIntelligence, VisualDNA, BrandSystem, ArtDirection, SiteConfig } from '@/types'
import { AnthropicProvider } from './providers/anthropic'
import { OpenAIProvider } from './providers/openai'

// ============================================
// AI PROVIDER REGISTRY
// ============================================

const providers: Record<string, AIProvider> = {}

export function registerProvider(provider: AIProvider): void {
  providers[provider.name] = provider
}

export function getProvider(name?: string): AIProvider | null {
  if (!name) {
    // Return first available provider
    const keys = Object.keys(providers)
    return keys.length > 0 ? providers[keys[0]] : null
  }
  return providers[name] || null
}

export function listProviders(): string[] {
  return Object.keys(providers)
}

// ============================================
// DEFAULT PROVIDER INITIALIZATION
// ============================================

export function initializeDefaultProviders(): void {
  // Try to initialize Anthropic first (preferred for creative tasks)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = new AnthropicProvider(process.env.ANTHROPIC_API_KEY)
      registerProvider(anthropic)
      console.log('[AI] Registered Anthropic provider')
    } catch (error) {
      console.error('[AI] Failed to initialize Anthropic:', error)
    }
  }

  // Fallback to OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      const openai = new OpenAIProvider(process.env.OPENAI_API_KEY)
      registerProvider(openai)
      console.log('[AI] Registered OpenAI provider')
    } catch (error) {
      console.error('[AI] Failed to initialize OpenAI:', error)
    }
  }

  if (Object.keys(providers).length === 0) {
    console.warn('[AI] No AI providers configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY')
  }
}

// ============================================
// UNIFIED AI SERVICE
// ============================================

export class AIService {
  private provider: AIProvider | null = null

  constructor(providerName?: string) {
    this.provider = getProvider(providerName)
  }

  async generateBrandIntelligence(input: {
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
  }): Promise<BrandIntelligence> {
    if (!this.provider) {
      throw new Error('No AI provider configured')
    }
    return this.provider.generateBrandIntelligence(input)
  }

  async generateVisualDNA(input: {
    brandIntelligence: BrandIntelligence
    references?: Array<{ type: string; url?: string; analysis?: unknown }>
  }): Promise<VisualDNA> {
    if (!this.provider) {
      throw new Error('No AI provider configured')
    }
    return this.provider.generateVisualDNA(input)
  }

  async generateBrandSystem(input: {
    brandIntelligence: BrandIntelligence
    visualDNA: VisualDNA
  }): Promise<BrandSystem> {
    if (!this.provider) {
      throw new Error('No AI provider configured')
    }
    return this.provider.generateBrandSystem(input)
  }

  async generateArtDirection(input: {
    brandIntelligence: BrandIntelligence
    visualDNA: VisualDNA
    brandSystem: BrandSystem
    websiteGoal?: string
    productType?: string
  }): Promise<ArtDirection> {
    if (!this.provider) {
      throw new Error('No AI provider configured')
    }
    return this.provider.generateArtDirection(input)
  }

  async generateSiteConfig(input: {
    brandIntelligence: BrandIntelligence
    visualDNA: VisualDNA
    brandSystem: BrandSystem
    artDirection: ArtDirection
    assets: Array<{ id: string; type: string; url: string; alt?: string }>
  }): Promise<SiteConfig> {
    if (!this.provider) {
      throw new Error('No AI provider configured')
    }
    
    // Convert simplified assets to full Asset type for the provider interface
    const fullAssets = input.assets.map(asset => ({
      ...asset,
      projectId: '',
      type: asset.type as 'image' | 'video' | 'icon' | 'animation' | 'logo' | 'font',
      source: 'ai_generated' as const,
      provenance: 'ai_generated' as const,
      status: 'resolved' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    
    return this.provider.generateSiteConfig({
      brandIntelligence: input.brandIntelligence,
      visualDNA: input.visualDNA,
      brandSystem: input.brandSystem,
      artDirection: input.artDirection,
      assets: fullAssets,
    })
  }
}

export function createAIService(providerName?: string): AIService {
  return new AIService(providerName)
}
