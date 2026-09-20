import OpenAI from 'openai'
import {
  AIProvider,
  BrandIntelligence,
  VisualDNA,
  BrandSystem,
  ArtDirection,
  SiteConfig,
  BrandIntelligenceInput,
  VisualDNAInput,
  BrandSystemInput,
  ArtDirectionInput,
  SiteConfigInput,
} from '@/types'

export class OpenAIProvider implements AIProvider {
  name = 'openai'
  private client: OpenAI

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required')
    }
    this.client = new OpenAI({ apiKey })
  }

  async generateBrandIntelligence(input: BrandIntelligenceInput): Promise<BrandIntelligence> {
    const prompt = this.buildBrandIntelligencePrompt(input)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Invalid response from OpenAI')
    }

    return this.parseBrandIntelligence(content, input)
  }

  async generateVisualDNA(input: VisualDNAInput): Promise<VisualDNA> {
    const prompt = this.buildVisualDNAPrompt(input)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Invalid response from OpenAI')
    }

    return this.parseVisualDNA(content)
  }

  async generateBrandSystem(input: BrandSystemInput): Promise<BrandSystem> {
    const prompt = this.buildBrandSystemPrompt(input)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Invalid response from OpenAI')
    }

    return this.parseBrandSystem(content)
  }

  async generateArtDirection(input: ArtDirectionInput): Promise<ArtDirection> {
    const prompt = this.buildArtDirectionPrompt(input)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Invalid response from OpenAI')
    }

    return this.parseArtDirection(content)
  }

  async generateSiteConfig(input: SiteConfigInput): Promise<SiteConfig> {
    const prompt = this.buildSiteConfigPrompt(input)

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Invalid response from OpenAI')
    }

    return this.parseSiteConfig(content)
  }

  // ============================================
  // PROMPT BUILDERS (same as Anthropic)
  // ============================================

  private buildBrandIntelligencePrompt(input: BrandIntelligenceInput): string {
    return `You are a brand strategist analyzing a product/brand to create structured brand intelligence.

PRODUCT INPUT:
- Name: ${input.productName}
- Description: ${input.productDescription}
- Industry: ${input.industry || 'Not specified'}
- Target Audience: ${input.targetAudience || 'Not specified'}
- Problem Solved: ${input.problemSolved || 'Not specified'}
- Main Solution: ${input.mainSolution || 'Not specified'}
- Desired CTA: ${input.desiredCTA || 'Not specified'}
- Personality: ${input.personality.join(', ')}
- Tone: ${input.tone || 'Not specified'}
- Website Goal: ${input.websiteGoal || 'Not specified'}
- Website Intent: ${input.websiteIntent || 'Not specified'}
- Additional Notes: ${input.additionalNotes || 'None'}

Analyze this product and create structured brand intelligence. Be careful to:
1. NOT invent factual claims about customers, revenue, or specific metrics
2. Mark inferred information separately from user-provided information
3. Focus on the core value proposition and positioning
4. Extract keywords and visual concepts that could guide design

Respond with ONLY a valid JSON object in this exact format:
{
  "brandName": "string",
  "tagline": "string (optional)",
  "description": "string",
  "industry": "string",
  "productType": "string",
  "targetAudience": "string",
  "userNeeds": "string",
  "painPoints": "string",
  "problem": "string",
  "solution": "string",
  "corePromise": "string",
  "valuePropositions": "string",
  "positioning": "string",
  "differentiators": "string",
  "personality": ["string"],
  "tone": "string",
  "messagingStyle": "string",
  "keywords": ["string"],
  "visualConcepts": ["string"],
  "websiteGoal": "string",
  "primaryCTA": "string",
  "provenance": {"field_name": "user|ai_inferred|ai_generated"}
}`
  }

  private buildVisualDNAPrompt(input: VisualDNAInput): string {
    const bi = input.brandIntelligence

    return `You are an art director translating brand intelligence into visual DNA.

BRAND INTELLIGENCE:
- Brand: ${bi.brandName}
- Tagline: ${bi.tagline || 'N/A'}
- Description: ${bi.description}
- Industry: ${bi.industry || 'N/A'}
- Personality: ${bi.personality.join(', ')}
- Tone: ${bi.tone || 'N/A'}
- Keywords: ${bi.keywords.join(', ')}
- Visual Concepts: ${bi.visualConcepts.join(', ')}

Create a VisualDNA that describes HOW this brand should look and feel visually.
This is NOT about colors and fonts yet - it's about the underlying visual behavior and aesthetic principles.

Think deeply about:
- What aesthetic direction fits this brand?
- What mood should the visuals convey?
- How should color be used (bold, restrained, monochromatic, vibrant)?
- What typography behavior is appropriate (elegant, technical, friendly, bold)?
- What composition style fits (structured, organic, asymmetric, grid-based)?
- What layout density (sparse, balanced, dense)?
- What shape language (rounded, geometric, sharp, organic)?
- What imagery style (photographic, illustrated, abstract, minimal)?
- What kind of motion (subtle, energetic, none)?
- What visual metaphors might apply?

Respond with ONLY a valid JSON object in this exact format:
{
  "aesthetic": "string describing the overall aesthetic",
  "mood": ["mood1", "mood2"],
  "keywords": ["visual keyword1", "visual keyword2"],
  "colorBehavior": "description of how color should be used",
  "typographyBehavior": "description of typography approach",
  "compositionStyle": "string",
  "layoutDensity": "sparse|balanced|dense",
  "shapeLanguage": "rounded|organic|geometric|sharp",
  "borderLanguage": "subtle|defined|bold",
  "imageryStyle": "string",
  "illustrationStyle": "string",
  "iconStyle": "string",
  "motionStyle": "string",
  "textureStyle": "string",
  "backgroundStrategy": "string",
  "visualMetaphors": ["metaphor1", "metaphor2"]
}`
  }

  private buildBrandSystemPrompt(input: BrandSystemInput): string {
    const bi = input.brandIntelligence
    const vd = input.visualDNA

    return `You are a design systems expert creating a complete brand system from brand intelligence and visual DNA.

BRAND INTELLIGENCE:
- Brand: ${bi.brandName}
- Personality: ${bi.personality.join(', ')}
- Industry: ${bi.industry || 'N/A'}

VISUAL DNA:
- Aesthetic: ${vd.aesthetic}
- Mood: ${vd.mood.join(', ')}
- Color Behavior: ${vd.colorBehavior}
- Typography Behavior: ${vd.typographyBehavior}
- Layout Density: ${vd.layoutDensity}
- Shape Language: ${vd.shapeLanguage}

Create a complete design system with semantic color tokens and typography.

COLOR REQUIREMENTS:
- Choose colors that reflect the brand personality and visual DNA
- DO NOT default to purple/gradient for tech brands
- Consider industry conventions but allow for differentiation
- Include all semantic tokens: background, foreground, surface, surfaceMuted, primary, primaryForeground, secondary, accent, border, muted, success, warning, error

TYPOGRAPHY REQUIREMENTS:
- Select actual Google Fonts that fit the brand
- DO NOT default everything to Inter
- Consider: display font for headlines, body font for text, optional mono for code/technical
- Specify weights available for each font

Respond with ONLY a valid JSON object in this exact format:
{
  "colors": {
    "background": "#hex",
    "foreground": "#hex",
    "surface": "#hex",
    "surfaceMuted": "#hex",
    "primary": "#hex",
    "primaryForeground": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "border": "#hex",
    "muted": "#hex",
    "success": "#hex",
    "warning": "#hex",
    "error": "#hex"
  },
  "typography": {
    "fonts": {
      "display": {"fontFamily": "Google Font Name", "weights": ["400", "500", "600", "700"], "fallback": "sans-serif", "usage": "headlines", "source": "google"},
      "body": {"fontFamily": "Google Font Name", "weights": ["400", "500", "600"], "fallback": "sans-serif", "usage": "body text", "source": "google"},
      "mono": {"fontFamily": "Google Font Name", "weights": ["400", "500"], "fallback": "monospace", "usage": "code", "source": "google"}
    },
    "scale": {
      "display": {"fontFamily": "same as display font", "fontSize": "4rem", "fontWeight": "700", "lineHeight": "1.1"},
      "heading": {"fontFamily": "same as display font", "fontSize": "2.5rem", "fontWeight": "600", "lineHeight": "1.2"},
      "subheading": {"fontFamily": "same as display font", "fontSize": "1.5rem", "fontWeight": "500", "lineHeight": "1.3"},
      "body": {"fontFamily": "same as body font", "fontSize": "1rem", "fontWeight": "400", "lineHeight": "1.6"},
      "caption": {"fontFamily": "same as body font", "fontSize": "0.875rem", "fontWeight": "400", "lineHeight": "1.5"},
      "label": {"fontFamily": "same as body font", "fontSize": "0.75rem", "fontWeight": "500", "lineHeight": "1.4"},
      "mono": {"fontFamily": "same as mono font", "fontSize": "0.875rem", "fontWeight": "400", "lineHeight": "1.6"}
    }
  },
  "spacing": {"0": "0", "1": "0.25rem", "2": "0.5rem", "3": "0.75rem", "4": "1rem", "5": "1.25rem", "6": "1.5rem", "8": "2rem", "10": "2.5rem", "12": "3rem", "16": "4rem"},
  "radii": {"none": "0", "sm": "0.25rem", "md": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px"},
  "shadows": {"none": "none", "sm": "0 1px 2px rgba(0,0,0,0.05)", "md": "0 4px 6px rgba(0,0,0,0.1)", "lg": "0 10px 15px rgba(0,0,0,0.1)"},
  "borders": {"none": "0", "thin": "1px", "medium": "2px", "thick": "4px"}
}`
  }

  private buildArtDirectionPrompt(input: ArtDirectionInput): string {
    const bi = input.brandIntelligence
    const vd = input.visualDNA
    const bs = input.brandSystem

    return `You are an AI Art Director creating the creative direction for a website.

BRAND INTELLIGENCE:
- Brand: ${bi.brandName}
- Description: ${bi.description}
- Product Type: ${bi.productType || 'N/A'}
- Website Goal: ${bi.websiteGoal || 'N/A'}
- Primary CTA: ${bi.primaryCTA || 'N/A'}

VISUAL DNA:
- Aesthetic: ${vd.aesthetic}
- Layout Density: ${vd.layoutDensity}
- Shape Language: ${vd.shapeLanguage}
- Imagery Style: ${vd.imageryStyle}
- Visual Metaphors: ${vd.visualMetaphors.join(', ')}

BRAND SYSTEM:
- Colors: Primary ${bs.colors.primary}, Background ${bs.colors.background}
- Typography: Display ${bs.typography.fonts.display.fontFamily}, Body ${bs.typography.fonts.body.fontFamily}

Your job is to decide WHAT the website should look like and HOW it should be composed.

HERO STRATEGY OPTIONS:
centered, split, imageLeft, imageRight, productDominant, visualDominant, editorial, immersive, asymmetric, typographyLed, interactive, minimal

SECTION TYPES AVAILABLE:
Hero, ProductShowcase, FeatureSpotlight, Bento, Workflow, ProblemSolution, UseCases, ProductDemo, Comparison, IntegrationGrid, Metrics, Timeline, Gallery, CaseStudy, Testimonial, SocialProof, Pricing, FAQ, EditorialStatement, CTA

IMPORTANT:
- The section sequence must emerge from the PRODUCT TYPE, not a universal template
- A cybersecurity product needs different sections than an architecture studio
- Choose a hero strategy that fits the product, not randomly
- Create asset requirements for images/icons needed

Respond with ONLY a valid JSON object in this exact format:
{
  "concept": "string describing the creative concept",
  "narrative": "string describing the story flow",
  "heroStrategy": "one of the hero strategies listed above",
  "navigationStrategy": "string",
  "sectionSequence": [{"type": "Hero", "variant": "productDominant", "order": 0}, {"type": "FeatureSpotlight", "variant": "largeVisualLeft", "order": 1}],
  "compositionRules": "description of layout principles",
  "visualHierarchy": "description",
  "imageryStrategy": "description",
  "productVisualizationStrategy": "description",
  "motionStrategy": "description",
  "ctaStrategy": "description",
  "assetRequirements": [{"id": "asset-1", "type": "image", "subject": "hero background", "style": "matching visual DNA", "mood": "brand mood", "placement": "hero section", "purpose": "hero background", "priority": "high"}],
  "designDecisions": [{"decision": "heroStrategy", "value": "productDominant", "reason": "explanation why"}]
}`
  }

  private buildSiteConfigPrompt(input: SiteConfigInput): string {
    const bi = input.brandIntelligence
    const ad = input.artDirection
    const bs = input.brandSystem

    return `You are generating a complete SiteConfig from art direction and brand system.

BRAND:
- Name: ${bi.brandName}
- Tagline: ${bi.tagline || 'N/A'}
- Description: ${bi.description}
- Primary CTA: ${bi.primaryCTA || 'Get Started'}

ART DIRECTION:
- Hero Strategy: ${ad.heroStrategy}
- Section Sequence: ${JSON.stringify(ad.sectionSequence)}
- Concept: ${ad.concept}

BRAND SYSTEM:
- Colors: ${JSON.stringify(bs.colors)}
- Typography: ${JSON.stringify(bs.typography)}
- Spacing: ${JSON.stringify(bs.spacing)}
- Radii: ${JSON.stringify(bs.radii)}

ASSETS AVAILABLE:
${input.assets.map(a => `- ${a.id}: ${a.type} (${a.url})`).join('\n')}

Create a complete SiteConfig with pages and sections. Each section must have:
- id: unique identifier
- type: matching one of the section types
- variant: specific visual variant
- content: section-specific content object

For content, use the brand intelligence but DO NOT fabricate:
- Customer names
- Testimonials
- User counts
- Revenue figures
- Awards or certifications

If social proof is not provided, omit it.

Respond with ONLY a valid JSON object in this exact format:
{
  "theme": {
    "colors": {/* same as brand system colors */},
    "typography": {/* same as brand system typography */},
    "spacing": {/* same as brand system spacing */},
    "radii": {/* same as brand system radii */},
    "shadows": {/* same as brand system shadows */},
    "borders": {/* same as brand system borders */}
  },
  "brand": {
    "name": "${bi.brandName}",
    "tagline": "${bi.tagline || ''}",
    "description": "${bi.description || ''}"
  },
  "artDirection": {
    "concept": "${ad.concept || ''}",
    "heroStrategy": "${ad.heroStrategy}",
    "sectionSequence": ${JSON.stringify(ad.sectionSequence)}
  },
  "navigation": {
    "items": [{"label": "Product", "href": "#product"}, {"label": "Features", "href": "#features"}],
    "cta": {"label": "${bi.primaryCTA || 'Get Started'}", "href": "#cta"}
  },
  "pages": [{
    "id": "home",
    "name": "Home",
    "slug": "/",
    "path": "/",
    "title": "${bi.brandName}${bi.tagline ? ' - ' + bi.tagline : ''}",
    "description": "${bi.description?.substring(0, 160) || ''}",
    "order": 0,
    "sections": [
      {"id": "hero-1", "type": "hero", "variant": "${ad.heroStrategy}", "content": {"headline": "...", "subheadline": "...", "ctaLabel": "...", "ctaHref": "#"}, "assets": [], "layout": {}, "style": {}}
    ]
  }]
}`
  }

  // ============================================
  // PARSERS (same as Anthropic)
  // ============================================

  private parseBrandIntelligence(text: string, input: BrandIntelligenceInput): BrandIntelligence {
    const json = this.extractJSON(text)
    const data = JSON.parse(json)

    return {
      brandName: data.brandName || input.productName,
      tagline: data.tagline,
      description: data.description,
      industry: data.industry || input.industry,
      productType: data.productType,
      targetAudience: data.targetAudience || input.targetAudience,
      userNeeds: data.userNeeds,
      painPoints: data.painPoints,
      problem: data.problem || input.problemSolved,
      solution: data.solution || input.mainSolution,
      corePromise: data.corePromise,
      valuePropositions: data.valuePropositions,
      positioning: data.positioning,
      differentiators: data.differentiators,
      personality: data.personality || input.personality,
      tone: data.tone || input.tone,
      messagingStyle: data.messagingStyle,
      keywords: data.keywords || [],
      visualConcepts: data.visualConcepts || [],
      websiteGoal: data.websiteGoal || input.websiteGoal,
      primaryCTA: data.primaryCTA || input.desiredCTA,
      provenance: data.provenance,
    }
  }

  private parseVisualDNA(text: string): VisualDNA {
    const json = this.extractJSON(text)
    const data = JSON.parse(json)

    return {
      aesthetic: data.aesthetic,
      mood: data.mood || [],
      keywords: data.keywords || [],
      colorBehavior: data.colorBehavior,
      typographyBehavior: data.typographyBehavior,
      compositionStyle: data.compositionStyle,
      layoutDensity: data.layoutDensity || 'balanced',
      shapeLanguage: data.shapeLanguage || 'geometric',
      borderLanguage: data.borderLanguage || 'defined',
      imageryStyle: data.imageryStyle,
      illustrationStyle: data.illustrationStyle,
      iconStyle: data.iconStyle,
      motionStyle: data.motionStyle,
      textureStyle: data.textureStyle,
      backgroundStrategy: data.backgroundStrategy,
      visualMetaphors: data.visualMetaphors || [],
    }
  }

  private parseBrandSystem(text: string): BrandSystem {
    const json = this.extractJSON(text)
    return JSON.parse(json)
  }

  private parseArtDirection(text: string): ArtDirection {
    const json = this.extractJSON(text)
    const data = JSON.parse(json)

    return {
      concept: data.concept,
      narrative: data.narrative,
      heroStrategy: data.heroStrategy || 'centered',
      navigationStrategy: data.navigationStrategy,
      sectionSequence: data.sectionSequence || [],
      compositionRules: data.compositionRules,
      visualHierarchy: data.visualHierarchy,
      imageryStrategy: data.imageryStrategy,
      productVisualizationStrategy: data.productVisualizationStrategy,
      motionStrategy: data.motionStrategy,
      ctaStrategy: data.ctaStrategy,
      assetRequirements: data.assetRequirements || [],
      designDecisions: data.designDecisions,
    }
  }

  private parseSiteConfig(text: string): SiteConfig {
    const json = this.extractJSON(text)
    return JSON.parse(json)
  }

  private extractJSON(text: string): string {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return jsonMatch[0]
    }
    return text
  }
}
