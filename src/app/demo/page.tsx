'use client'

import { SiteRenderer } from '@/renderer'
import { SiteConfig } from '@/types'

/**
 * Demo Page
 * 
 * Shows a demo site configuration for testing the renderer.
 */
export default function DemoPage() {
  // Demo site config for a cybersecurity platform
  const demoConfig: SiteConfig = {
    theme: {
      colors: {
        background: '#0a0a0f',
        foreground: '#ffffff',
        surface: '#12121a',
        surfaceMuted: '#1a1a25',
        primary: '#6366f1',
        primaryForeground: '#ffffff',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        border: '#27273a',
        muted: '#a1a1aa',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      typography: {
        fonts: {
          display: {
            fontFamily: 'Inter',
            weights: ['700', '800'],
            fallback: 'system-ui',
            usage: 'display',
            source: 'google',
          },
          body: {
            fontFamily: 'Inter',
            weights: ['400', '500', '600'],
            fallback: 'system-ui',
            usage: 'body',
            source: 'google',
          },
          mono: {
            fontFamily: 'JetBrains Mono',
            weights: ['400', '500'],
            fallback: 'monospace',
            usage: 'code',
            source: 'google',
          },
        },
        scale: {
          display: { fontFamily: 'Inter', fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' },
          heading: { fontFamily: 'Inter', fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' },
          subheading: { fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.3' },
          body: { fontFamily: 'Inter', fontSize: '1rem', fontWeight: '400', lineHeight: '1.6' },
          caption: { fontFamily: 'Inter', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' },
          label: { fontFamily: 'Inter', fontSize: '0.75rem', fontWeight: '500', lineHeight: '1.4' },
          mono: { fontFamily: 'JetBrains Mono', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.6' },
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
      },
      radii: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '2rem',
        full: '9999px',
      },
      shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borders: {
        sm: '1px solid',
        md: '2px solid',
        lg: '4px solid',
      },
    },
    brand: {
      name: 'SecureGuard',
      tagline: 'Real-time threat detection for modern enterprises',
      description: 'AI-powered cybersecurity platform that detects and neutralizes threats in real-time.',
    },
    artDirection: {
      concept: 'Technical precision meets visual clarity',
      heroStrategy: 'productDominant',
      sectionSequence: [
        { type: 'hero', variant: 'productDominant', order: 1 },
        { type: 'problemSolution', variant: 'default', order: 2 },
        { type: 'workflow', variant: 'horizontal', order: 3 },
        { type: 'featureSpotlight', variant: 'default', order: 4 },
        { type: 'cta', variant: 'default', order: 5 },
      ],
    },
    navigation: {
      items: [
        { label: 'Product', href: '#product' },
        { label: 'Features', href: '#features' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Company', href: '#company' },
      ],
      cta: {
        label: 'Get Started',
        href: '#signup',
      },
    },
    pages: [
      {
        id: 'home',
        name: 'Home',
        slug: 'home',
        path: '/',
        order: 1,
        sections: [
          {
            id: 'hero-1',
            type: 'hero',
            variant: 'productDominant',
            content: {
              headline: 'Detect Threats Before They Strike',
              subheadline: 'AI-powered security monitoring that works 24/7 to protect your infrastructure.',
              primaryCTA: {
                label: 'Start Free Trial',
                href: '#signup',
              },
            },
            layout: {},
            style: {},
          },
          {
            id: 'problem-solution-1',
            type: 'problemSolution',
            variant: 'default',
            content: {
              eyebrow: 'The Challenge',
              headline: 'Modern Threats Require Modern Solutions',
              problem: {
                title: 'The Problem',
                description: 'Traditional security tools can\'t keep up with evolving threats.',
                points: [
                  { label: 'Slow Detection', description: 'Average breach detection takes 207 days' },
                  { label: 'Alert Fatigue', description: 'Security teams overwhelmed by false positives' },
                  { label: 'Skill Shortage', description: '3.5M unfilled cybersecurity jobs globally' },
                ],
              },
              solution: {
                title: 'Our Solution',
                description: 'AI-driven detection that works at machine speed.',
                points: [
                  { label: 'Real-time Analysis', description: 'Threats detected in milliseconds, not months' },
                  { label: 'Smart Filtering', description: '99.9% reduction in false positives' },
                  { label: 'Automated Response', description: 'Contain threats before human intervention needed' },
                ],
              },
            },
            layout: {},
            style: {},
          },
          {
            id: 'workflow-1',
            type: 'workflow',
            variant: 'horizontal',
            content: {
              eyebrow: 'How It Works',
              headline: 'Three Steps to Complete Protection',
              steps: [
                {
                  number: '01',
                  title: 'Connect Your Infrastructure',
                  description: 'Integrate with your existing tools in minutes using our APIs and connectors.',
                },
                {
                  number: '02',
                  title: 'AI Monitors Everything',
                  description: 'Our models analyze billions of events daily to identify anomalies.',
                },
                {
                  number: '03',
                  title: 'Automatic Threat Neutralization',
                  description: 'Threats are contained and eliminated before they cause damage.',
                },
              ],
            },
            layout: { style: 'horizontal' },
            style: {},
          },
          {
            id: 'bento-1',
            type: 'bento',
            variant: 'default',
            content: {
              eyebrow: 'Capabilities',
              headline: 'Everything You Need for Enterprise Security',
              items: [
                {
                  title: 'Network Monitoring',
                  description: 'Real-time traffic analysis',
                  size: 'medium',
                  accent: true,
                },
                {
                  title: 'Endpoint Protection',
                  description: 'Device-level security',
                  size: 'small',
                },
                {
                  title: 'Cloud Security',
                  description: 'AWS, Azure, GCP coverage',
                  size: 'small',
                },
                {
                  title: 'Threat Intelligence',
                  description: 'Global threat database',
                  size: 'wide',
                },
              ],
            },
            layout: {},
            style: {},
          },
          {
            id: 'cta-1',
            type: 'cta',
            variant: 'default',
            content: {
              eyebrow: 'Get Started',
              headline: 'Ready to Secure Your Infrastructure?',
              description: 'Start your free 14-day trial. No credit card required.',
              primaryCTA: {
                label: 'Start Free Trial',
                href: '#signup',
              },
              secondaryCTA: {
                label: 'Talk to Sales',
                href: '#contact',
              },
            },
            layout: { showPattern: true },
            style: {},
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteRenderer siteConfig={demoConfig} />
    </div>
  )
}
