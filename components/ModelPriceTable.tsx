'use client'

import { useState, useMemo } from 'react'
import { getAllProviders, formatPricePerMillion } from '@/lib/costCalculator'
import { ArrowUpDown } from 'lucide-react'

type SortKey = 'name' | 'inputPrice' | 'outputPrice' | 'contextLength'

export default function ModelPriceTable() {
  const providers = getAllProviders()
  const [search, setSearch] = useState('')
  const [providerFilter, setProviderFilter] = useState('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const allModels = useMemo(() => {
    const models = providers.flatMap((p) =>
      p.models.map((m) => ({ ...m, provider: p.name }))
    )
    return models.filter((m) => {
      if (providerFilter !== 'all' && m.provider !== providerFilter) return false
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    }).sort((a, b) => {
      const factor = sortAsc ? 1 : -1
      if (sortKey === 'name') return a.name.localeCompare(b.name) * factor
      if (sortKey === 'inputPrice') return (a.inputPrice - b.inputPrice) * factor
      if (sortKey === 'outputPrice') return (a.outputPrice - b.outputPrice) * factor
      return (a.contextLength - b.contextLength) * factor
    })
  }, [providers, search, providerFilter, sortKey, sortAsc])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const formatContext = (len: number) => {
    if (len >= 1000000) return `${(len / 1000000).toFixed(1)}M`
    if (len >= 1000) return `${(len / 1000).toFixed(0)}K`
    return len
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search models..."
          className="block rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-700"
        />
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="block rounded-lg border-0 py-2 px-3 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-700"
        >
          <option value="all">All Providers</option>
          {providers.map((p) => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => toggleSort('name')} className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-100">
                  Model <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => toggleSort('contextLength')} className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-100">
                  Context <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => toggleSort('inputPrice')} className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-100">
                  Input Price <ArrowUpDown className="h-3 w-3" />
                </button>
                <span className="block text-gray-400 dark:text-gray-500 normal-case font-normal">per 1M tokens</span>
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button onClick={() => toggleSort('outputPrice')} className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-100">
                  Output Price <ArrowUpDown className="h-3 w-3" />
                </button>
                <span className="block text-gray-400 dark:text-gray-500 normal-case font-normal">per 1M tokens</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {allModels.map((model, idx) => (
              <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {model.provider}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{model.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{model.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {formatContext(model.contextLength)} tokens
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                  {formatPricePerMillion(model.inputPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right">
                  {formatPricePerMillion(model.outputPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {allModels.length === 0 && (
        <p className="text-center py-8 text-gray-500 dark:text-gray-400">No models found</p>
      )}
    </div>
  )
}
