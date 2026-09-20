import { notFound } from 'next/navigation'
import { SiteRenderer } from '@/renderer'
import { prisma } from '@/lib/prisma'

interface PreviewPageProps {
  params: Promise<{ id: string }>
}

/**
 * Preview Page by ID
 * 
 * Renders a generated site from the database.
 * Access via: /preview/[id]
 */
export default async function PreviewPageById({ params }: PreviewPageProps) {
  const { id } = await params
  
  try {
    // Fetch the site with its configuration
    const site = await prisma.site.findUnique({
      where: { id },
      include: {
        pages: {
          orderBy: { order: 'asc' },
          include: {
            sections: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    })
    
    if (!site) {
      notFound()
    }
    
    // Convert database models to SiteConfig format
    const siteConfig = site.siteConfig as any
    
    return (
      <div className="min-h-screen bg-background">
        <SiteRenderer siteConfig={siteConfig} />
      </div>
    )
  } catch (error) {
    console.error('Failed to load site preview:', error)
    notFound()
  }
}
