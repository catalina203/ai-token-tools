import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Cost Calculator - AI API Cost Estimator for OpenAI, Claude, Gemini',
  description:
    'Calculate the cost of AI API calls based on token count and model selection. Compare prices across OpenAI, Claude, Gemini, and other AI models. Free and privacy-focused.',
  keywords: [
    'token cost calculator',
    'AI API cost estimator',
    'OpenAI pricing',
    'Claude cost calculator',
    'Gemini pricing',
    'AI token cost',
    'API cost calculation',
    'AI developer tools',
    'cost optimization',
  ],
  openGraph: {
    title: 'Token Cost Calculator - AI API Cost Estimator',
    description: 'Calculate the cost of AI API calls based on token count and model selection. Compare prices across OpenAI, Claude, and Gemini.',
    type: 'website',
    url: 'https://aitokentools.com/tools/token-cost-calculator',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Token Cost Calculator - AI API Cost Estimator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Cost Calculator - AI API Cost Estimator',
    description: 'Calculate the cost of AI API calls based on token count and model selection. Compare prices across OpenAI, Claude, and Gemini.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/token-cost-calculator',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
