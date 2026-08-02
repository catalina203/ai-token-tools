'use client'

import { useState, useMemo, useCallback } from 'react'
import { Layers, Info, Copy, Check } from 'lucide-react'
import { estimateTokenCount } from '@/lib/tokenizer'
import { getAllEmbeddingModels, formatEmbeddingPrice } from '@/lib/embeddingModels'
import TokenInput from '@/components/TokenInput'
import { copyToClipboard } from '@/lib/utils'

export default function EmbeddingCostCalculatorPage() {
  const models = getAllEmbeddingModels()
  const [useTextInput, setUseTextInput] = useState(true)
  const [text, setText] = useState('')
  const [tokenCount, setTokenCount] = useState('1000')
  const [selectedModel, setSelectedModel] = useState(models[0].id)
  const [monthlyTokens, setMonthlyTokens] = useState('1000000')
  const [copied, setCopied] = useState(false)

  const inputTokens = useMemo(() => {
    if (useTextInput) return estimateTokenCount(text)
    return Math.max(0, parseInt(tokenCount) || 0)
  }, [useTextInput, text, tokenCount])

  const model = models.find((m) => m.id === selectedModel) || models[0]

  const cost = useMemo(() => {
    return (inputTokens / 1000000) * model.pricePerMillion
  }, [inputTokens, model])

  const monthlyCost = useMemo(() => {
    const monthly = Math.max(0, parseInt(monthlyTokens) || 0)
    return (monthly / 1000000) * model.pricePerMillion
  }, [monthlyTokens, model])

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(
      `Embedding Cost Estimate\nModel: ${model.name}\nTokens: ${inputTokens.toLocaleString()}\nCost: $${cost.toFixed(4)}`
    )
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [model, inputTokens, cost])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
            <Layers className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Embedding Cost Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Calculate the cost of AI embedding models for your RAG applications.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          {/* Input Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-700">
              <button
                onClick={() => setUseTextInput(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  useTextInput
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Text Input
              </button>
              <button
                onClick={() => setUseTextInput(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !useTextInput
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Token Count
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              {useTextInput ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Enter your text
                  </label>
                  <TokenInput
                    value={text}
                    onChange={setText}
                    placeholder="Type or paste your text to estimate embedding tokens..."
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of tokens
                  </label>
                  <input
                    type="number"
                    value={tokenCount}
                    onChange={(e) => setTokenCount(e.target.value)}
                    min="0"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Embedding Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.provider} - {m.name} (${m.pricePerMillion}/1M)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly tokens (optional)
                </label>
                <input
                  type="number"
                  value={monthlyTokens}
                  onChange={(e) => setMonthlyTokens(e.target.value)}
                  min="0"
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-700"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Estimate monthly cost for scaling your RAG application
                </p>
              </div>
            </div>

            {/* Result Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cost Estimate
                </label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
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
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-800">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Cost</p>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    ${cost.toFixed(4)}
                  </p>
                </div>

                <div className="border-t border-primary-200 dark:border-primary-800 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tokens:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {inputTokens.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Model:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{model.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {model.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price / 1M tokens:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatEmbeddingPrice(model.pricePerMillion)}
                    </span>
                  </div>
                  {monthlyTokens && parseInt(monthlyTokens) > 0 && (
                    <div className="flex justify-between text-sm border-t border-primary-200 dark:border-primary-800 pt-2">
                      <span className="text-gray-600 dark:text-gray-400">Monthly cost:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        ${monthlyCost.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Embedding Model Comparison
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cost for {inputTokens.toLocaleString()} tokens
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dimensions</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price / 1M</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cost</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {models.map((m) => (
                  <tr
                    key={m.id}
                    className={`transition-colors ${
                      m.id === selectedModel
                        ? 'bg-primary-50 dark:bg-primary-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{m.provider}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{m.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{m.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{m.dimensions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-right">{formatEmbeddingPrice(m.pricePerMillion)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400 text-right">
                      ${((inputTokens / 1000000) * m.pricePerMillion).toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Embedding models convert text into vector representations used for
              semantic search and RAG. Cost is calculated by multiplying your
              total token count by the model&apos;s price per million tokens.
              Our token estimation provides a close approximation of actual
              token counts.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                RAG Cost Factors
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex justify-between">
                <span>Text volume:</span>
                <span className="font-medium">Total document tokens</span>
              </li>
              <li className="flex justify-between">
                <span>Re-indexing:</span>
                <span className="font-medium">Costs recur per update</span>
              </li>
              <li className="flex justify-between">
                <span>Query embedding:</span>
                <span className="font-medium">Small per-query cost</span>
              </li>
              <li className="flex justify-between">
                <span>Dimension size:</span>
                <span className="font-medium">Affects storage cost</span>
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
                What is an embedding model?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                An embedding model converts text into numerical vectors that
                capture semantic meaning. These vectors are used in search,
                recommendation systems, and RAG applications to find relevant
                content based on meaning rather than exact keywords.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How is embedding cost calculated?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Embedding cost is calculated based on the number of tokens
                processed. Each provider charges a rate per 1 million tokens,
                which is multiplied by your total token count to get the final
                cost.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Which embedding model is most cost-effective?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                OpenAI text-embedding-3-small is currently the most
                cost-effective at $0.02 per 1M tokens, making it ideal for
                high-volume applications. For higher quality embeddings, the
                3-large model at $0.13 per 1M tokens offers better accuracy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Why are embeddings important for RAG?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Embeddings are the core of RAG systems. They enable semantic
                search over your documents, allowing the AI to find and use
                relevant information. Accurate embedding cost estimation is
                critical for production RAG budgets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
