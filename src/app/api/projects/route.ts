import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// ============================================
// REQUEST VALIDATION
// ============================================

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  userId: z.string().optional(), // In real app, get from auth session
})

const brandInputSchema = z.object({
  productName: z.string().min(1).max(200),
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
// POST /api/projects - Create a new project
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = createProjectSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { name, description, userId } = validation.data

    // In production, userId should come from authenticated session
    const actualUserId = userId || 'anonymous-user'

    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        userId: actualUserId,
        status: 'draft',
      },
      include: {
        brandInput: true,
        references: true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('[API] Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// ============================================
// GET /api/projects - List user's projects
// ============================================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || 'anonymous-user'

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        brandInput: true,
        sites: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('[API] Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
