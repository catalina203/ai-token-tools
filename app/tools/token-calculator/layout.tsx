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
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: "Token Calculator",
                url: "https://aitokentools.com/tools/token-calculator",
                description:
                  "Calculate the estimated token count for your text. Supports multiple languages including English, Chinese, and code.",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "All",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is a token?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A token is a unit of text that AI models process. It can be as short as one character or as long as one word.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How accurate is this calculator?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Our calculator provides estimates based on standard tokenization patterns. For English text, it is typically 90-95% accurate compared to actual GPT tokenization.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why do I need to calculate tokens?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Token counting is essential for managing API costs, staying within model context limits, and optimizing your prompts for better performance.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is my data safe?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "All calculations happen locally in your browser. Your text is never sent to any server or stored anywhere.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </>
  )
}
