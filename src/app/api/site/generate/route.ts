import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createAIService } from '@/ai/provider'
import { z } from 'zod'

// ============================================
// REQUEST VALIDATION
// ============================================

const generatePipelineSchema = z.object({
  projectId: z.string(),
})

// ============================================
// POST /api/site/generate - Full generation pipeline
// ============================================

export async function POST(request: NextRequest) {
  let generationId: string | undefined

  try {
    const body = await request.json()
    const validation = generatePipelineSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { projectId } = validation.data

    // Verify project exists and has brand intelligence
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        brandInput: true,
        brandIntelligence: true,
        visualDNA: true,
        brandSystem: true,
        artDirection: true,
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    if (!project.brandIntelligence) {
      return NextResponse.json(
        { error: 'Brand intelligence not generated yet. Run /api/brand/analyze first.' },
        { status: 400 }
      )
    }

    // Create full pipeline generation record
    const generation = await prisma.generation.create({
      data: {
        projectId,
        type: 'full_pipeline',
        status: 'running',
        stage: 'visual_dna',
        progress: 5,
        message: 'Generating Visual DNA...',
      },
    })

    generationId = generation.id

    // Update project status
    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'designing' },
    })

    const aiService = createAIService()

    // ============================================
    // STEP 1: Generate Visual DNA (if not exists)
    // ============================================

    let visualDNA = project.visualDNA

    if (!visualDNA) {
      await prisma.generation.update({
        where: { id: generation.id },
        data: { stage: 'visual_dna', progress: 10, message: 'Generating Visual DNA...' },
      })

      const vd = await aiService.generateVisualDNA({
        brandIntelligence: project.brandIntelligence as any,
      })

      visualDNA = await prisma.visualDNA.create({
        data: {
          projectId,
          aesthetic: vd.aesthetic,
          mood: vd.mood,
          keywords: vd.keywords,
          colorBehavior: vd.colorBehavior,
          typographyBehavior: vd.typographyBehavior,
          compositionStyle: vd.compositionStyle,
          layoutDensity: vd.layoutDensity,
          shapeLanguage: vd.shapeLanguage,
          borderLanguage: vd.borderLanguage,
          imageryStyle: vd.imageryStyle,
          illustrationStyle: vd.illustrationStyle,
          iconStyle: vd.iconStyle,
          motionStyle: vd.motionStyle,
          textureStyle: vd.textureStyle,
          backgroundStrategy: vd.backgroundStrategy,
          visualMetaphors: vd.visualMetaphors,
        },
      })
    }

    // ============================================
    // STEP 2: Generate Brand System (if not exists)
    // ============================================

    let brandSystem = project.brandSystem

    if (!brandSystem) {
      await prisma.generation.update({
        where: { id: generation.id },
        data: { stage: 'brand_system', progress: 30, message: 'Creating design system...' },
      })

      const bs = await aiService.generateBrandSystem({
        brandIntelligence: project.brandIntelligence as any,
        visualDNA: visualDNA as any,
      })

      brandSystem = await prisma.brandSystem.create({
        data: {
          projectId,
          colors: bs.colors as any,
          typography: bs.typography as any,
          spacing: bs.spacing as any,
          radii: bs.radii as any,
          shadows: bs.shadows as any,
          borders: bs.borders as any,
          buttons: bs.buttons as any,
          inputs: bs.inputs as any,
          cards: bs.cards as any,
          navigation: bs.navigation as any,
          icons: bs.icons as any,
          imagery: bs.imagery as any,
          motion: bs.motion as any,
          layoutRules: bs.layoutRules as any,
          responsiveRules: bs.responsiveRules as any,
        },
      })
    }

    // ============================================
    // STEP 3: Generate Art Direction (if not exists)
    // ============================================

    let artDirection = project.artDirection

    if (!artDirection) {
      await prisma.generation.update({
        where: { id: generation.id },
        data: { stage: 'art_direction', progress: 50, message: 'Creating art direction...' },
      })

      const ad = await aiService.generateArtDirection({
        brandIntelligence: project.brandIntelligence as any,
        visualDNA: visualDNA as any,
        brandSystem: brandSystem as any,
        websiteGoal: project.brandInput?.websiteGoal ?? undefined,
        productType: project.brandIntelligence.productType ?? undefined,
      })

      artDirection = await prisma.artDirection.create({
        data: {
          projectId,
          concept: ad.concept,
          narrative: ad.narrative,
          heroStrategy: ad.heroStrategy,
          navigationStrategy: ad.navigationStrategy,
          sectionSequence: ad.sectionSequence as any,
          compositionRules: ad.compositionRules as any,
          visualHierarchy: ad.visualHierarchy as any,
          imageryStrategy: ad.imageryStrategy as any,
          productVisualizationStrategy: ad.productVisualizationStrategy as any,
          motionStrategy: ad.motionStrategy as any,
          ctaStrategy: ad.ctaStrategy as any,
          assetRequirements: ad.assetRequirements as any,
          designDecisions: ad.designDecisions as any,
        },
      })
    }

    // ============================================
    // STEP 4: Generate SiteConfig
    // ============================================

    await prisma.generation.update({
      where: { id: generation.id },
      data: { stage: 'site_generation', progress: 70, message: 'Composing website...' },
    })

    // For MVP, we don't have assets yet, so pass empty array
    const siteConfig = await aiService.generateSiteConfig({
      brandIntelligence: project.brandIntelligence as any,
      visualDNA: visualDNA as any,
      brandSystem: brandSystem as any,
      artDirection: artDirection as any,
      assets: [],
    })

    // ============================================
    // STEP 5: Save Site and Pages
    // ============================================

    await prisma.generation.update({
      where: { id: generation.id },
      data: { stage: 'finalizing', progress: 90, message: 'Finalizing website...' },
    })

    const site = await prisma.site.create({
      data: {
        projectId,
        siteConfig: siteConfig as any,
        name: project.name,
        description: project.description,
        generationId: generation.id,
        status: 'generated',
        pages: {
          create: siteConfig.pages.map((page, index) => ({
            name: page.name,
            slug: page.slug,
            path: page.path,
            title: page.title,
            description: page.description,
            order: index,
            sections: {
              create: page.sections.map((section, sIndex) => ({
                type: section.type,
                variant: section.variant,
                content: section.content as any,
                assets: section.assets as any,
                layout: section.layout as any,
                style: section.style as any,
                order: sIndex,
              })),
            },
          })),
        },
      },
      include: {
        pages: {
          include: {
            sections: true,
          },
        },
      },
    })

    // ============================================
    // COMPLETE
    // ============================================

    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: 'completed',
        progress: 100,
        message: 'Website generated successfully',
        outputData: { siteId: site.id },
        completedAt: new Date(),
      },
    })

    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'ready' },
    })

    return NextResponse.json({
      success: true,
      site,
      visualDNA,
      brandSystem,
      artDirection,
      siteConfig,
    })
  } catch (error) {
    console.error('[API] Error in generation pipeline:', error)

    if (generationId) {
      await prisma.generation.update({
        where: { id: generationId },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }

    return NextResponse.json(
      { error: 'Failed to generate website', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
