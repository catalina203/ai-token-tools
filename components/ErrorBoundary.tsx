'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Something went wrong
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 btn-primary"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
