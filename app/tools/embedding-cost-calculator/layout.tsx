import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Embedding Cost Calculator - AI Embedding Model Pricing',
  description:
    'Calculate the cost of AI embedding models for RAG applications. Compare OpenAI, Cohere, and Mistral embedding prices based on token count.',
  keywords: [
    'embedding cost calculator',
    'embedding pricing',
    'OpenAI embedding cost',
    'RAG cost calculator',
    'text-embedding price',
    'vector database cost',
    'embedding model prices',
  ],
  openGraph: {
    title: 'Embedding Cost Calculator - AI Embedding Model Pricing',
    description:
      'Calculate the cost of AI embedding models for RAG applications. Compare OpenAI, Cohere, and Mistral embedding prices based on token count.',
    type: 'website',
    url: 'https://aitokentools.com/tools/embedding-cost-calculator',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Embedding Cost Calculator - AI Embedding Model Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Embedding Cost Calculator - AI Embedding Model Pricing',
    description:
      'Calculate the cost of AI embedding models for RAG applications. Compare OpenAI, Cohere, and Mistral embedding prices based on token count.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/embedding-cost-calculator',
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
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'Embedding Cost Calculator',
                url: 'https://aitokentools.com/tools/embedding-cost-calculator',
                description:
                  'Calculate the cost of AI embedding models for RAG applications. Compare OpenAI, Cohere, and Mistral embedding prices based on token count.',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'All',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is an embedding model?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'An embedding model converts text into numerical vectors that capture semantic meaning. These vectors power search, recommendation, and RAG applications.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How is embedding cost calculated?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Embedding cost is calculated based on the number of tokens processed. Each provider charges a rate per 1 million tokens, which is multiplied by your total token count.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Which embedding model is most cost-effective?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'OpenAI text-embedding-3-small is currently the most cost-effective at $0.02 per 1M tokens, making it ideal for high-volume applications.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why are embeddings important for RAG?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Embeddings are the core of RAG (Retrieval-Augmented Generation) systems. They enable semantic search over your documents, making accurate embedding cost estimation critical for production budgets.',
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
