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
                name: "Token Cost Calculator",
                url: "https://aitokentools.com/tools/token-cost-calculator",
                description:
                  "Calculate the cost of AI API calls based on token count and model selection. Compare prices across OpenAI, Claude, and Gemini.",
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
                    name: "How are AI API costs calculated?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "AI API costs are calculated based on the number of tokens processed. You are charged for both input tokens and output tokens.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between input and output tokens?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Input tokens are from your prompt, output tokens are from the AI response. Output is often more expensive because generating text requires more computation.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which AI model is the most cost-effective?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The most cost-effective model depends on your use case. For simple tasks, smaller models like GPT-3.5 Turbo or Claude 3 Haiku are very affordable.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are the prices shown up-to-date?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "We strive to keep pricing data current, but AI providers frequently update their pricing. Always check official documentation for the most accurate prices.",
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
