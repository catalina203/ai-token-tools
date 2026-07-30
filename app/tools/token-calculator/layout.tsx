import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Calculator - Calculate AI Token Count for GPT, Claude, Gemini',
  description:
    'Calculate the estimated token count for your text. Supports multiple languages including English, Chinese, and code. Free, privacy-focused, and perfect for prompt engineering.',
  keywords: [
    'token calculator',
    'AI token count',
    'GPT token calculator',
    'Claude token count',
    'Gemini token calculator',
    'how to calculate tokens',
    'token estimation',
    'prompt engineering',
    'AI developer tools',
  ],
  openGraph: {
    title: 'Token Calculator - Calculate AI Token Count',
    description: 'Calculate the estimated token count for your text. Supports multiple languages including English, Chinese, and code.',
    type: 'website',
    url: 'https://aitokentools.com/tools/token-calculator',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Token Calculator - Calculate AI Token Count',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Calculator - Calculate AI Token Count',
    description: 'Calculate the estimated token count for your text. Supports multiple languages including English, Chinese, and code.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/token-calculator',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
