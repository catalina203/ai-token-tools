'use client'

import { useState, useMemo, useCallback } from 'react'
import { Scissors, Copy, Check, Info } from 'lucide-react'
import { estimateTokenCount } from '@/lib/tokenizer'
import { copyToClipboard } from '@/lib/utils'

interface Chunk {
  index: number
  text: string
  tokens: number
  chars: number
}

export default function TextChunkerPage() {
  const [text, setText] = useState('')
  const [chunkSize, setChunkSize] = useState('800')
  const [overlap, setOverlap] = useState('100')
  const [copiedChunk, setCopiedChunk] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const chunks = useMemo<Chunk[]>(() => {
    if (!text.trim()) return []
    const targetSize = Math.max(50, parseInt(chunkSize) || 800)
    const overlapTokens = Math.min(targetSize - 50, Math.max(0, parseInt(overlap) || 100))

    // Estimate average chars per token from the text
    const totalTokens = estimateTokenCount(text)
    const avgCharsPerToken = Math.max(1, text.length / Math.max(1, totalTokens))
    const targetChars = Math.floor(targetSize * avgCharsPerToken)
    const overlapChars = Math.floor(overlapTokens * avgCharsPerToken)

    const sentences = text.split(/(?<=[.!?。！？])\s+/)
    const result: Chunk[] = []
    let current = ''

    const pushChunk = () => {
      if (!current.trim()) return
      result.push({
        index: result.length,
        text: current.trim(),
        tokens: estimateTokenCount(current),
        chars: current.length,
      })
    }

    for (const sentence of sentences) {
      if (!sentence.trim()) continue
      if (current.length + sentence.length <= targetChars) {
        current += sentence + ' '
      } else {
        pushChunk()
        // Start new chunk with overlap from previous
        const prevText = current
        const overlapText = prevText.slice(-overlapChars)
        current = overlapText + sentence + ' '
        // If the sentence itself is longer than target, split by words
        if (current.length > targetChars * 1.5) {
          const words = current.split(' ')
          current = ''
          for (const word of words) {
            if (current.length + word.length > targetChars && current.trim()) {
              pushChunk()
              current = overlapText ? overlapText.slice(-overlapChars) : ''
            }
            current += word + ' '
          }
        }
      }
    }
    if (current.trim()) pushChunk()

    return result
  }, [text, chunkSize, overlap])

  const totalTokens = useMemo(
    () => chunks.reduce((sum, c) => sum + c.tokens, 0),
    [chunks]
  )

  const handleCopyChunk = useCallback(async (chunk: Chunk) => {
    const success = await copyToClipboard(chunk.text)
    if (success) {
      setCopiedChunk(chunk.index)
      setTimeout(() => setCopiedChunk(null), 1500)
    }
  }, [])

  const handleCopyAll = useCallback(async () => {
    const all = chunks.map((c) => `--- Chunk ${c.index + 1} ---\n${c.text}`).join('\n\n')
    const success = await copyToClipboard(all)
    if (success) {
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    }
  }, [chunks])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-4">
            <Scissors className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Text Chunker
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Split long text into chunks that fit AI model context windows.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chunk size (tokens)
              </label>
              <input
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(e.target.value)}
                min="50"
                className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overlap (tokens)
              </label>
              <input
                type="number"
                value={overlap}
                onChange={(e) => setOverlap(e.target.value)}
                min="0"
                className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-700"
              />
            </div>
            <div className="flex items-end">
              <div className="w-full rounded-lg bg-gray-50 dark:bg-gray-700 p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{chunks.length}</span> chunks
                  {' · '}
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{totalTokens.toLocaleString()}</span> tokens
                </p>
              </div>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Enter your text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your long document, article, or prompt here..."
            className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[180px] resize-y bg-white dark:bg-gray-700"
          />
        </div>

        {/* Chunks Output */}
        {chunks.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Chunks
              </h2>
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                {copiedAll ? (
                  <>
                    <Check className="h-4 w-4" /> Copied All
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy All
                  </>
                )}
              </button>
            </div>
            <div className="space-y-4">
              {chunks.map((chunk) => (
                <div
                  key={chunk.index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Chunk {chunk.index + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {chunk.tokens.toLocaleString()} tokens · {chunk.chars.toLocaleString()} chars
                      </span>
                      <button
                        onClick={() => handleCopyChunk(chunk)}
                        className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        {copiedChunk === chunk.index ? (
                          <>
                            <Check className="h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">
                    {chunk.text}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

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
              The chunker splits your text at sentence boundaries to create
              natural, readable chunks. It estimates token counts using
              language-aware tokenization and applies configurable overlap to
              preserve context at chunk boundaries. This is ideal for
              preparing documents for RAG, summarization, and long-context
              analysis.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Chunking Best Practices
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex justify-between">
                <span>Small chunks:</span>
                <span className="font-medium">300-500 tokens</span>
              </li>
              <li className="flex justify-between">
                <span>Standard chunks:</span>
                <span className="font-medium">800-1000 tokens</span>
              </li>
              <li className="flex justify-between">
                <span>Overlap:</span>
                <span className="font-medium">10-20% of chunk size</span>
              </li>
              <li className="flex justify-between">
                <span>Leave room:</span>
                <span className="font-medium">Keep ~20% for answers</span>
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
                Why do I need to chunk text for AI?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI models have limited context windows. Chunking splits long
                documents into smaller pieces that fit within these limits,
                enabling RAG applications, summarization, and analysis of large
                texts.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What is chunk overlap?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Overlap is the number of tokens repeated between adjacent
                chunks. Overlap helps preserve context at chunk boundaries and
                prevents information loss during splitting, improving retrieval
                quality.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What is a good chunk size for RAG?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Common chunk sizes range from 500 to 1500 tokens with 50-200
                tokens of overlap. The optimal size depends on your content
                type and retrieval strategy. Start with 800 tokens and adjust
                based on results.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How does the smart splitting work?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                The chunker attempts to split at sentence boundaries (periods,
                question marks, exclamation points) to produce natural chunks.
                When sentences are too long, it falls back to word boundaries
                to keep chunks within the target size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
