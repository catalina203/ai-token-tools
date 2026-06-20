import { Metadata } from 'next'
import { BookOpen, ChevronRight, Code, Terminal, Zap, FileText, BarChart3, Ruler } from 'lucide-react'

export const metadata: Metadata = {
  title: 'User Guide - AI Token Tools',
  description: 'Comprehensive guides for using AI Token Tools. Learn how to use token calculators, prompt formatters, and other AI developer tools.',
  keywords: [
    'AI token tools guide',
    'how to use token calculator',
    'prompt engineering guide',
    'AI developer tools tutorial',
    'tokenization guide',
    'AI model cost estimation',
  ],
  openGraph: {
    title: 'User Guide - AI Token Tools',
    description: 'Comprehensive guides for using AI Token Tools. Learn how to use token calculators, prompt formatters, and other AI developer tools.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aitokentools.com/guide',
  },
}

export default function GuidePage() {
  const guides = [
    {
      id: 'token-calculator',
      title: 'Token Calculator',
      description: 'Learn how to calculate token counts for different AI models',
      icon: <Code className="h-6 w-6 text-primary-600" />,
      steps: [
        'Enter your text in the input area',
        'Select the appropriate model from the dropdown',
        'View the estimated token count',
        'Copy the result or adjust your text as needed',
      ],
    },
    {
      id: 'token-cost-calculator',
      title: 'Token Cost Calculator',
      description: 'Calculate API costs for different AI models',
      icon: <Terminal className="h-6 w-6 text-primary-600" />,
      steps: [
        'Choose between text input or direct token count',
        'Enter your input and output text or token counts',
        'Select the model you want to use',
        'View the detailed cost breakdown',
      ],
    },
    {
      id: 'tokenizer-viewer',
      title: 'Tokenizer Viewer',
      description: 'Visualize how your text is tokenized by AI models',
      icon: <FileText className="h-6 w-6 text-primary-600" />,
      steps: [
        'Enter your text in the input area',
        'View the tokenization breakdown in real-time',
        'Analyze how different words are split into tokens',
        'Optimize your text for better token efficiency',
      ],
    },
    {
      id: 'prompt-formatter',
      title: 'Prompt Formatter',
      description: 'Create well-structured prompts for AI models',
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      steps: [
        'Enter your system message',
        'Add user messages and assistant responses',
        'Use the formatting tools to structure your prompt',
        'Copy the formatted prompt for use in your applications',
      ],
    },
    {
      id: 'prompt-diff',
      title: 'Prompt Diff Tool',
      description: 'Compare and analyze changes between different prompts',
      icon: <FileText className="h-6 w-6 text-primary-600" />,
      steps: [
        'Enter your original prompt in the left panel',
        'Enter your modified prompt in the right panel',
        'View the highlighted differences between the two prompts',
        'Use the insights to optimize your prompt changes',
      ],
    },
    {
      id: 'model-price-comparison',
      title: 'Model Price Comparison',
      description: 'Compare prices across different AI providers',
      icon: <BarChart3 className="h-6 w-6 text-primary-600" />,
      steps: [
        'View the comprehensive price table',
        'Compare input and output prices for different models',
        'Identify the most cost-effective option for your use case',
        'Use the information to make informed decisions',
      ],
    },
    {
      id: 'context-length-checker',
      title: 'Context Length Checker',
      description: 'Ensure your prompt fits within model context limits',
      icon: <Ruler className="h-6 w-6 text-primary-600" />,
      steps: [
        'Enter your prompt in the text area',
        'View the estimated token count',
        'Check which models can handle your prompt',
        'Adjust your prompt if it exceeds context limits',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-xl mb-4">
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            User Guide
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive guides for using AI Token Tools effectively
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {guide.icon}
                  <h2 className="ml-3 text-xl font-semibold text-gray-900">
                    {guide.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {guide.description}
                </p>
                <div className="space-y-2 mb-4">
                  {guide.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-medium text-primary-600">
                          {index + 1}
                        </span>
                      </div>
                      <p className="ml-3 text-sm text-gray-600">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={`/tools/${guide.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Try this tool
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            General Tips
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Token Efficiency:</strong> Keep your prompts concise to reduce token usage and costs.
            </p>
            <p>
              <strong>Context Window:</strong> Always check if your prompt fits within the model's context limit.
            </p>
            <p>
              <strong>Cost Optimization:</strong> Compare prices across different models to find the best value.
            </p>
            <p>
              <strong>Prompt Engineering:</strong> Use the Prompt Formatter tool to create well-structured prompts.
            </p>
            <p>
              <strong>Version Control:</strong> Use the Prompt Diff tool to track changes between prompt versions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
