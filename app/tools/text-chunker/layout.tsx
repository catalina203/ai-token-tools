import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Chunker - Split Long Text for AI Context Windows',
  description:
    'Split long text into chunks that fit AI model context windows. Configure chunk size and overlap, split intelligently at sentence boundaries, and export chunks for RAG or prompt engineering.',
  keywords: [
    'text chunker',
    'text splitter',
    'chunk text for AI',
    'RAG chunking',
    'context window splitter',
    'token chunking',
    'document splitting',
    'AI prompt chunking',
  ],
  openGraph: {
    title: 'Text Chunker - Split Long Text for AI Context Windows',
    description:
      'Split long text into chunks that fit AI model context windows. Configure chunk size and overlap, split intelligently at sentence boundaries, and export chunks for RAG or prompt engineering.',
    type: 'website',
    url: 'https://aitokentools.com/tools/text-chunker',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Text Chunker - Split Long Text for AI Context Windows',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Chunker - Split Long Text for AI Context Windows',
    description:
      'Split long text into chunks that fit AI model context windows. Configure chunk size and overlap, split intelligently at sentence boundaries, and export chunks for RAG or prompt engineering.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/text-chunker',
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
                name: 'Text Chunker',
                url: 'https://aitokentools.com/tools/text-chunker',
                description:
                  'Split long text into chunks that fit AI model context windows. Configure chunk size and overlap, split intelligently at sentence boundaries, and export chunks for RAG or prompt engineering.',
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
                    name: 'Why do I need to chunk text for AI?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'AI models have limited context windows. Chunking splits long documents into smaller pieces that fit within these limits, enabling RAG applications, summarization, and analysis of large texts.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is chunk overlap?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Overlap is the number of tokens that are repeated between adjacent chunks. Overlap helps preserve context at chunk boundaries and prevents information loss during splitting.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is a good chunk size for RAG?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Common chunk sizes range from 500 to 1500 tokens with 50-200 tokens of overlap. The optimal size depends on your content type and retrieval strategy.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How does the smart splitting work?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The chunker attempts to split at sentence boundaries (periods, question marks, exclamation points) to produce natural chunks. When sentences are too long, it falls back to word boundaries.',
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
