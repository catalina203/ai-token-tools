'use client'

import { useState, useCallback } from 'react'

interface TokenInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  showCharacterCount?: boolean
  maxLength?: number
}

export default function TokenInput({
  value,
  onChange,
  placeholder = 'Enter your text here...',
  label,
  showCharacterCount = true,
  maxLength,
}: TokenInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    onChange('')
  }, [onChange])

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch (err) {
      console.error('Failed to paste:', err)
    }
  }, [onChange])

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 min-h-[150px] resize-y bg-white dark:bg-gray-700"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          {value && (
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600"
              type="button"
            >
              Clear
            </button>
          )}
          <button
            onClick={handlePaste}
            className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-600"
            type="button"
          >
            Paste
          </button>
        </div>
      </div>
      {showCharacterCount && (
        <div className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
          {value.length.toLocaleString()} characters
        </div>
      )}
    </div>
  )
}
