'use client'

import { useState, useCallback, useMemo } from 'react'
import { Calculator, Info, Copy, Check } from 'lucide-react'
import { getTokenStats, MODEL_TOKENIZERS, ModelId } from '@/lib/tokenizer'
import TokenInput from '@/components/TokenInput'
import TokenResult from '@/components/TokenResult'

export default function TokenCalculatorPage() {
  const [text, setText] = useState('')
  const [selectedModel, setSelectedModel] = useState<ModelId>('gpt-4o')
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => getTokenStats(text, selectedModel), [text, selectedModel])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(stats.totalTokens.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [stats.totalTokens])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
            <Calculator className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Token Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Calculate the estimated token count for your text. Supports
            English, Chinese, and code.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          {/* Model Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as ModelId)}
              className="block w-full max-w-xs rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
            >
              {Object.entries(MODEL_TOKENIZERS).map(([id, m]) => (
                <option key={id} value={id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Enter your text
              </label>
              <TokenInput
                value={text}
                onChange={setText}
                placeholder="Type or paste your text here to calculate tokens..."
                showCharacterCount={true}
              />
            </div>

            {/* Result Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Result
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy
                    </>
                  )}
                </button>
              </div>
              <TokenResult
                tokenCount={stats.totalTokens}
                characterCount={stats.estimatedChars}
                showBreakdown={true}
                breakdown={stats.breakdown}
              />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  How It Works
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Our token calculator uses standard tokenization algorithms to
              estimate the number of tokens in your text. The calculation
              considers character count, whitespace, and language-specific
              patterns. While very accurate, actual token counts may vary
              slightly depending on the specific AI model.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Token Estimates
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex justify-between">
                <span>English text:</span>
                <span className="font-medium">~4 characters per token</span>
              </li>
              <li className="flex justify-between">
                <span>Chinese text:</span>
                <span className="font-medium">~2.5 characters per token</span>
              </li>
              <li className="flex justify-between">
                <span>Code:</span>
                <span className="font-medium">~3 characters per token</span>
              </li>
              <li className="flex justify-between">
                <span>Mixed content:</span>
                <span className="font-medium">~3.5 characters per token</span>
              </li>
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
                What is a token?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A token is a unit of text that AI models process. It can be as
                short as one character or as long as one word. For example,
                &quot;ChatGPT&quot; is one token, while &quot;Chat GPT&quot; is
                two tokens. Understanding tokens is important for managing API
                costs and context limits.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How accurate is this calculator?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our calculator provides estimates based on standard
                tokenization patterns. For English text, it&apos;s typically
                90-95% accurate compared to actual GPT tokenization. For other
                languages and code, accuracy may vary slightly. For precise
                counts, always refer to the specific model&apos;s tokenizer.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Why do I need to calculate tokens?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Token counting is essential for several reasons: managing API
                costs (you pay per token), staying within model context limits,
                and optimizing your prompts for better performance. Knowing
                your token count helps you make informed decisions about which
                AI model to use.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Is my data safe?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, absolutely. All calculations happen locally in your
                browser. Your text is never sent to any server or stored
                anywhere. You can safely use this tool with sensitive
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
