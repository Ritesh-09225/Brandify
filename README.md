# Brandify

**AI Brand Intelligence + Art Direction + Website Generation Platform**

Brandify transforms rough product/brand ideas into complete, production-ready websites through an AI-powered pipeline that behaves like a brand strategist, creative director, art director, and frontend engineer combined.

## Product Vision

Brandify is NOT a template-based website builder. Instead, it uses:

```
USER'S BRAND / PRODUCT
        ↓
BRAND INTELLIGENCE
        ↓
VISUAL DNA
        ↓
BRAND SYSTEM
        ↓
AI ART DIRECTOR
        ↓
ASSET REQUIREMENTS
        ↓
REAL ASSET PROVIDERS
        ↓
SITE COMPOSITION
        ↓
STRUCTURED SITE CONFIG
        ↓
WEBSITE RENDERER
        ↓
GENERATED WEBSITE
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix primitives
- **Backend**: Next.js Server Actions / API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **AI**: Provider abstraction (Anthropic Claude, OpenAI GPT-4)
- **Storage**: Object storage abstraction for assets

## Architecture Overview

### Folder Structure

```
/workspace
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── projects/       # Project CRUD
│   │   │   ├── brand/
│   │   │   │   └── analyze/    # Brand intelligence generation
│   │   │   ├── brand-system/
│   │   │   │   └── generate/   # Design system generation
│   │   │   ├── art-direction/
│   │   │   │   └── generate/   # Art direction generation
│   │   │   └── site/
│   │   │       └── generate/   # Full site generation pipeline
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Main UI flow
│   ├── ai/
│   │   ├── provider.ts         # AI provider registry
│   │   └── providers/
│   │       ├── anthropic.ts    # Anthropic Claude implementation
│   │       └── openai.ts       # OpenAI GPT-4 implementation
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   └── forms/              # Form components
│   ├── lib/
│   │   └── prisma.ts           # Prisma client singleton
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── .env.example                # Environment variables template
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Database Schema

The Prisma schema defines these main entities:

- **User**: Authentication and ownership
- **Project**: Workspace for one brand/website
- **BrandInput**: User-provided brand information
- **Reference**: Inspiration URLs and uploaded images
- **BrandIntelligence**: AI-analyzed brand strategy
- **VisualDNA**: Visual behavior and aesthetic principles
- **BrandSystem**: Design tokens (colors, typography, spacing)
- **ArtDirection**: Creative direction and composition rules
- **Asset**: Images, icons, fonts, videos
- **Site**: Generated website configuration
- **Page**: Individual pages within a site
- **Section**: Reusable section components
- **Generation**: Pipeline execution tracking
- **GenerationEvent**: Stage-by-stage progress events

## Core Data Models

### BrandIntelligence
```typescript
{
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
```

### VisualDNA
```typescript
{
  aesthetic?: string
  mood: string[]
  keywords: string[]
  colorBehavior?: string
  typographyBehavior?: string
  compositionStyle?: string
  layoutDensity: 'sparse' | 'balanced' | 'dense'
  shapeLanguage: 'rounded' | 'organic' | 'geometric' | 'sharp'
  borderLanguage: 'subtle' | 'defined' | 'bold'
  imageryStyle?: string
  illustrationStyle?: string
  iconStyle?: string
  motionStyle?: string
  textureStyle?: string
  backgroundStrategy?: string
  visualMetaphors: string[]
}
```

### BrandSystem
```typescript
{
  colors: { /* Semantic color tokens */ }
  typography: { /* Font families and scale */ }
  spacing: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  borders: Record<string, string>
}
```

### ArtDirection
```typescript
{
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
  designDecisions?: Array<{ decision, value, reason }>
}
```

### SiteConfig (Central Contract)
```typescript
{
  theme: { colors, typography, spacing, radii, shadows, borders }
  brand: { name, tagline, description, logo }
  artDirection: { concept, heroStrategy, sectionSequence }
  navigation: { items, cta }
  pages: Page[]
}
```

## API Routes

### POST /api/projects
Create a new project workspace.

### POST /api/brand/analyze
Generate Brand Intelligence from user input.

**Input:**
```json
{
  "projectId": "string",
  "productName": "string",
  "productDescription": "string",
  "industry": "string",
  "personality": ["professional", "technical"],
  "websiteGoal": "launch"
}
```

**Output:**
```json
{
  "success": true,
  "brandIntelligence": { /* BrandIntelligence object */ },
  "brandInput": { /* BrandInput object */ }
}
```

### POST /api/site/generate
Full generation pipeline: VisualDNA → BrandSystem → ArtDirection → SiteConfig → Site

**Input:**
```json
{
  "projectId": "string"
}
```

**Output:**
```json
{
  "success": true,
  "site": { /* Site with pages and sections */ },
  "visualDNA": { /* VisualDNA object */ },
  "brandSystem": { /* BrandSystem object */ },
  "artDirection": { /* ArtDirection object */ },
  "siteConfig": { /* SiteConfig object */ }
}
```

## AI Pipeline

The generation pipeline flows through these stages:

1. **Brand Intelligence** - Analyze product input into structured brand strategy
2. **Visual DNA** - Translate brand into visual behavior principles
3. **Brand System** - Generate design tokens (colors, typography, spacing)
4. **Art Direction** - Decide composition, hero strategy, section sequence
5. **Asset Requirements** - Identify needed images, icons, fonts
6. **Site Configuration** - Compose complete site structure
7. **Validation** - Check for placeholders, claims, accessibility
8. **Rendering** - Convert SiteConfig to actual website

Each stage is independently retryable with progress tracking.

## AI Providers

Brandify supports multiple LLM providers through an abstraction layer:

### Anthropic (Preferred)
- Model: `claude-sonnet-4-20250514`
- Best for: Creative tasks, art direction

### OpenAI (Fallback)
- Model: `gpt-4o`
- Best for: General purpose generation

To add a new provider:
1. Implement the `AIProvider` interface in `src/ai/providers/`
2. Register in `src/ai/provider.ts`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
DATABASE_URL="postgresql://..."

# At least one AI provider
ANTHROPIC_API_KEY="..."
# OR
OPENAI_API_KEY="..."

# Optional - Asset providers (for future phases)
PEXELS_API_KEY="..."
UNSPLASH_ACCESS_KEY="..."
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Set Up Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Generation Flow Example

```
User Input:
"CyberShield - Real-time threat detection platform for enterprises"
    ↓
Brand Intelligence:
- Industry: Cybersecurity
- Personality: ["professional", "technical", "trustworthy"]
- Problem: "Delayed threat response"
- Solution: "Real-time AI-powered detection"
    ↓
Visual DNA:
- Aesthetic: "Technical, high-contrast"
- Layout Density: "dense"
- Shape Language: "geometric"
- Visual Metaphors: ["shield", "network", "protection"]
    ↓
Brand System:
- Colors: Dark background, electric blue accent
- Typography: Technical sans-serif (e.g., JetBrains Mono)
    ↓
Art Direction:
- Hero Strategy: "productDominant"
- Section Sequence: [Hero, ThreatViz, Workflow, Capabilities, CTA]
    ↓
SiteConfig → Rendered Website
```

## Test Brands

After setup, test with these brands to verify variation:

1. **Cybersecurity Platform** - Technical, dense, interface-driven
2. **AI Research Assistant** - Clean, academic, trustworthy
3. **Luxury Architecture Studio** - Editorial, image-led, spacious
4. **Consumer Fitness Product** - Energetic, lifestyle-focused
5. **Developer Infrastructure** - Technical, code-focused, minimal
6. **Climate Technology** - Hopeful, clean, data-informed

Each should produce fundamentally different:
- Hero compositions
- Typography hierarchies
- Section sequences
- Visual densities
- Imagery strategies

## Current Implementation Status

### ✅ Completed (MVP Phase 1)
- [x] Database schema with all entities
- [x] Project creation and management
- [x] Brand input UI flow
- [x] Brand Intelligence engine (AI-powered)
- [x] VisualDNA engine (AI-powered)
- [x] BrandSystem generator (AI-powered)
- [x] ArtDirector (AI-powered)
- [x] SiteConfig generation (AI-powered)
- [x] Full generation pipeline API
- [x] Generation event tracking
- [x] Basic landing/input/generation UI

### 🚧 Next Phases
- [ ] Site renderer (React components for sections)
- [ ] Section variants library
- [ ] Asset orchestrator
- [ ] Image/icon/font providers
- [ ] Product visualization primitives
- [ ] Website quality validator
- [ ] Preview mode (desktop/tablet/mobile)
- [ ] Regeneration capabilities
- [ ] Visual editor
- [ ] Export functionality

## Known Limitations

1. **No Asset Providers Yet** - Currently generates SiteConfig without real images/icons
2. **No Renderer Yet** - SiteConfig is generated but not visually rendered
3. **No Authentication** - Projects use anonymous user ID
4. **No Reference Analysis** - URL/image reference analysis not implemented
5. **Single Page Only** - Multi-page sites supported in schema but not UI

## Next Development Priorities

1. **Renderer** - Build React section components that render SiteConfig
2. **Section Variants** - Implement multiple variants for each section type
3. **Asset Providers** - Integrate Pexels/Unsplash for images, Iconify for icons
4. **Preview Mode** - Live preview with device breakpoints
5. **Regeneration** - Allow regenerating individual sections
6. **Editor** - Simple visual editing of text, colors, assets

## Content Safety

The system is designed to NEVER fabricate:
- Customer names or testimonials
- User counts or revenue figures
- Awards or certifications
- Security claims or partnerships

If social proof is not provided by the user, it is omitted from the generated content.

All AI-inferred information is tracked via the `provenance` field.

## License

MIT
