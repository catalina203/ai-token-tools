'use client'

import { useState, useMemo, useCallback } from 'react'
import { FileText, Copy, Check, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import Link from 'next/link'
import templatesData from '@/data/prompt-templates.json'

interface PromptTemplate {
  id: string
  name: string
  category: string
  description: string
  content: string
}

const templates = templatesData as PromptTemplate[]

const categories = [
  { id: 'all', name: 'All' },
  { id: 'coding', name: 'Coding' },
  { id: 'writing', name: 'Writing' },
  { id: 'analysis', name: 'Analysis' },
  { id: 'business', name: 'Business' },
  { id: 'education', name: 'Education' },
  { id: 'creative', name: 'Creative' },
]

const categoryLabels: Record<string, string> = {
  coding: 'Coding',
  writing: 'Writing',
  analysis: 'Analysis',
  business: 'Business',
  education: 'Education',
  creative: 'Creative',
}

export default function PromptTemplateLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [selectedCategory, search])

  const getVariables = useCallback((content: string): string[] => {
    const matches = content.match(/\{([^}]+)\}/g) || []
    return Array.from(new Set(matches.map((m) => m.replace(/[{}]/g, ''))))
  }, [])

  const handleExpand = useCallback((template: PromptTemplate) => {
    if (expandedId === template.id) {
      setExpandedId(null)
      return
    }
    setExpandedId(template.id)
    const vars = getVariables(template.content)
    const initial: Record<string, string> = {}
    vars.forEach((v) => {
      initial[v] = ''
    })
    setVariables(initial)
  }, [expandedId, getVariables])

  const fillTemplate = useCallback((content: string, vars: Record<string, string>) => {
    let result = content
    Object.entries(vars).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value.trim())
    })
    return result
  }, [])

  const handleCopy = useCallback(async (template: PromptTemplate) => {
    const filled = fillTemplate(template.content, variables)
    const success = await copyToClipboard(filled)
    if (success) {
      setCopiedId(template.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }, [variables, fillTemplate])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
            <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Prompt Template Library
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Ready-to-use templates for coding, writing, analysis, and more.
            Customize variables and copy.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="pl-9 block w-full sm:w-64 rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <p className="text-center py-16 text-gray-500 dark:text-gray-400">
            No templates found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const isExpanded = expandedId === template.id
              const vars = getVariables(template.content)
              const filled = fillTemplate(template.content, variables)
              return (
                <div
                  key={template.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors ${
                    isExpanded ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                  }`}
                >
                  <button
                    onClick={() => handleExpand(template)}
                    className="w-full text-left p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {template.name}
                        </h3>
                        <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                          {categoryLabels[template.category] || template.category}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {template.description}
                    </p>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700 pt-4">
                      {vars.length > 0 && (
                        <div className="space-y-3 mb-4">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Fill in the variables:
                          </p>
                          {vars.map((v) => (
                            <div key={v}>
                              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1 capitalize">
                                {v.replace(/_/g, ' ')}
                              </label>
                              <input
                                type="text"
                                value={variables[v] || ''}
                                onChange={(e) =>
                                  setVariables((prev) => ({ ...prev, [v]: e.target.value }))
                                }
                                placeholder={`Enter ${v.replace(/_/g, ' ')}...`}
                                className="block w-full rounded-lg border-0 py-1.5 px-3 text-sm text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 bg-white dark:bg-gray-700"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                        <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">
                          {filled}
                        </pre>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(template)}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-500 transition-colors"
                        >
                          {copiedId === template.id ? (
                            <>
                              <Check className="h-4 w-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" /> Copy Prompt
                            </>
                          )}
                        </button>
                        <Link
                          href="/tools/prompt-formatter/"
                          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          Format it <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                How to Use Templates
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Each template contains variables marked with curly braces like
              {'{code}'}. Fill in the variables to create a complete, ready-to-use
              prompt. You can copy the result directly or send it to the Prompt
              Formatter for structured multi-message formatting.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Tips for Better Prompts
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Be specific about the task and desired output format</li>
              <li>• Provide relevant context and constraints</li>
              <li>• Use clear instructions the AI can follow</li>
              <li>• Iterate: refine prompts based on results</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What is a prompt template?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A prompt template is a pre-written prompt structure with
                variable placeholders. You fill in the variables to create a
                complete, ready-to-use prompt for AI models.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I use these templates?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select a template, fill in the variables in curly braces, then
                copy the completed prompt. You can also send it to the Prompt
                Formatter tool for further structuring.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Are the templates free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, all prompt templates are completely free to use. No
                registration required. You can use them with any AI model
                including ChatGPT, Claude, and Gemini.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Can I modify the templates?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely. The templates are starting points. Customize them
                freely to fit your specific needs and use cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
