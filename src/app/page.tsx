'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'landing' | 'input' | 'generating' | 'result'>('landing')
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    industry: '',
    targetAudience: '',
    problemSolved: '',
    mainSolution: '',
    desiredCTA: '',
    personality: [] as string[],
    websiteGoal: '',
  })
  const [projectId, setProjectId] = useState<string | null>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationMessage, setGenerationMessage] = useState('')

  const handleCreateProject = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.productName,
          description: formData.productDescription,
        }),
      })

      if (!response.ok) throw new Error('Failed to create project')
      const project = await response.json()
      setProjectId(project.id)
      setStep('generating')
      
      // Start brand analysis
      await analyzeBrand(project.id)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const analyzeBrand = async (projectId: string) => {
    try {
      setGenerationProgress(10)
      setGenerationMessage('Analyzing your brand...')

      const response = await fetch('/api/brand/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error('Failed to analyze brand')
      setGenerationProgress(50)
      setGenerationMessage('Generating Visual DNA and design system...')

      // Generate full site
      const siteResponse = await fetch('/api/site/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      })

      if (!siteResponse.ok) throw new Error('Failed to generate site')
      const result = await siteResponse.json()
      
      setGenerationProgress(100)
      setGenerationMessage('Website ready!')
      
      setTimeout(() => {
        setStep('result')
      }, 1000)
    } catch (error) {
      console.error('Error in generation:', error)
      setGenerationMessage('Error during generation')
    }
  }

  if (step === 'landing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Brandify
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            AI-powered brand intelligence and website generation.
            <br />
            Transform your product idea into a complete website.
          </p>
          <button
            onClick={() => setStep('input')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium transition-colors"
          >
            Start Building
          </button>
        </div>
      </div>
    )
  }

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Tell us about your product</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product/Brand Name *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g., CyberShield"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Description *</label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                rows={4}
                placeholder="What does your product do? What problem does it solve?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  placeholder="e.g., Cybersecurity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website Goal</label>
                <select
                  value={formData.websiteGoal}
                  onChange={(e) => setFormData({ ...formData, websiteGoal: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="">Select a goal</option>
                  <option value="launch">Launch a product</option>
                  <option value="explain">Explain a product</option>
                  <option value="leads">Generate leads</option>
                  <option value="showcase">Showcase work</option>
                  <option value="sell">Sell a product</option>
                  <option value="credibility">Establish credibility</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Audience</label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                rows={2}
                placeholder="Who are you building for?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Brand Personality</label>
              <div className="flex flex-wrap gap-2">
                {['professional', 'playful', 'bold', 'minimal', 'premium', 'technical', 'friendly', 'futuristic', 'trustworthy'].map((trait) => (
                  <button
                    key={trait}
                    onClick={() => {
                      const exists = formData.personality.includes(trait)
                      setFormData({
                        ...formData,
                        personality: exists
                          ? formData.personality.filter((p) => p !== trait)
                          : [...formData.personality, trait],
                      })
                    }}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.personality.includes(trait)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCreateProject}
              disabled={!formData.productName || !formData.productDescription}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              Generate Website
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold mb-4">Creating Your Website</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{generationMessage}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'result') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Website is Ready!</h1>
          <p className="mb-8">The generation pipeline has completed successfully.</p>
          <p className="text-sm text-gray-500">
            Note: This is the MVP demonstrating the core architecture. The actual rendered website preview,
            asset providers, and editor will be added in subsequent phases.
          </p>
        </div>
      </div>
    )
  }

  return null
}
