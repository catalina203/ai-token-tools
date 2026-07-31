'use client'

import { useMemo } from 'react'
import { getAllProviders } from '@/lib/costCalculator'

export default function PriceChart() {
  const models = useMemo(() => {
    const all = getAllProviders().flatMap((p) =>
      p.models.map((m) => ({ ...m, provider: p.name }))
    )
    return all
      .sort((a, b) => b.inputPrice - a.inputPrice)
      .slice(0, 8)
  }, [])

  const maxPrice = Math.max(...models.map((m) => m.inputPrice))
  const barHeight = 180

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Input Price Comparison (per 1M tokens)
      </h3>
      <div className="flex items-end gap-3 h-[220px]">
        {models.map((m) => {
          const h = (m.inputPrice / maxPrice) * barHeight
          return (
            <div key={m.id} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
                ${m.inputPrice}
              </span>
              <div
                className="w-full rounded-t bg-primary-500 dark:bg-primary-400 transition-all hover:opacity-80"
                style={{ height: `${Math.max(h, 4)}px` }}
                title={`${m.name}: $${m.inputPrice}/1M input tokens`}
              />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-center leading-tight max-w-[80px] truncate">
                {m.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
