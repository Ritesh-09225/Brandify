import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createAIService } from '@/ai/provider'
import { z } from 'zod'

// ============================================
// REQUEST VALIDATION
// ============================================

const analyzeBrandSchema = z.object({
  projectId: z.string(),
  productName: z.string().min(1),
  productDescription: z.string().min(1),
  industry: z.string().optional(),
  targetAudience: z.string().optional(),
  problemSolved: z.string().optional(),
  mainSolution: z.string().optional(),
  desiredCTA: z.string().optional(),
  personality: z.array(z.string()).default([]),
  tone: z.string().optional(),
  websiteGoal: z.string().optional(),
  websiteIntent: z.string().optional(),
  additionalNotes: z.string().optional(),
})

// ============================================
// POST /api/brand/analyze - Generate Brand Intelligence
// ============================================

export async function POST(request: NextRequest) {
  let generationId: string | undefined

  try {
    const body = await request.json()
    const validation = analyzeBrandSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Create or update brand input
    const brandInput = await prisma.brandInput.upsert({
      where: { projectId: data.projectId },
      create: {
        projectId: data.projectId,
        productName: data.productName,
        productDescription: data.productDescription,
        industry: data.industry,
        targetAudience: data.targetAudience,
        problemSolved: data.problemSolved,
        mainSolution: data.mainSolution,
        desiredCTA: data.desiredCTA,
        personality: data.personality,
        tone: data.tone,
        websiteGoal: data.websiteGoal,
        websiteIntent: data.websiteIntent,
        additionalNotes: data.additionalNotes,
      },
      update: {
        productName: data.productName,
        productDescription: data.productDescription,
        industry: data.industry,
        targetAudience: data.targetAudience,
        problemSolved: data.problemSolved,
        mainSolution: data.mainSolution,
        desiredCTA: data.desiredCTA,
        personality: data.personality,
        tone: data.tone,
        websiteGoal: data.websiteGoal,
        websiteIntent: data.websiteIntent,
        additionalNotes: data.additionalNotes,
      },
    })

    // Create generation record
    const generation = await prisma.generation.create({
      data: {
        projectId: data.projectId,
        type: 'brand_intelligence',
        status: 'running',
        stage: 'analyzing',
        progress: 10,
        message: 'Analyzing brand input...',
        inputData: data,
      },
    })

    generationId = generation.id

    // Update project status
    await prisma.project.update({
      where: { id: data.projectId },
      data: { status: 'analyzing' },
    })

    // Create AI service and generate brand intelligence
    const aiService = createAIService()

    const brandIntelligence = await aiService.generateBrandIntelligence({
      productName: data.productName,
      productDescription: data.productDescription,
      industry: data.industry,
      targetAudience: data.targetAudience,
      problemSolved: data.problemSolved,
      mainSolution: data.mainSolution,
      desiredCTA: data.desiredCTA,
      personality: data.personality,
      tone: data.tone,
      websiteGoal: data.websiteGoal,
      websiteIntent: data.websiteIntent,
      additionalNotes: data.additionalNotes,
    })

    // Save brand intelligence to database
    const savedBrandIntelligence = await prisma.brandIntelligence.create({
      data: {
        projectId: data.projectId,
        brandName: brandIntelligence.brandName,
        tagline: brandIntelligence.tagline,
        description: brandIntelligence.description,
        industry: brandIntelligence.industry,
        productType: brandIntelligence.productType,
        targetAudience: brandIntelligence.targetAudience,
        userNeeds: brandIntelligence.userNeeds,
        painPoints: brandIntelligence.painPoints,
        problem: brandIntelligence.problem,
        solution: brandIntelligence.solution,
        corePromise: brandIntelligence.corePromise,
        valuePropositions: brandIntelligence.valuePropositions,
        positioning: brandIntelligence.positioning,
        differentiators: brandIntelligence.differentiators,
        personality: brandIntelligence.personality,
        tone: brandIntelligence.tone,
        messagingStyle: brandIntelligence.messagingStyle,
        keywords: brandIntelligence.keywords,
        visualConcepts: brandIntelligence.visualConcepts,
        websiteGoal: brandIntelligence.websiteGoal,
        primaryCTA: brandIntelligence.primaryCTA,
        provenance: brandIntelligence.provenance,
      },
    })

    // Update generation record
    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        status: 'completed',
        progress: 100,
        message: 'Brand intelligence generated',
        outputData: brandIntelligence as any,
        completedAt: new Date(),
      },
    })

    // Update project status
    await prisma.project.update({
      where: { id: data.projectId },
      data: { status: 'brand_ready' },
    })

    return NextResponse.json({
      success: true,
      brandIntelligence: savedBrandIntelligence,
      brandInput,
    })
  } catch (error) {
    console.error('[API] Error analyzing brand:', error)

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
      { error: 'Failed to analyze brand', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
