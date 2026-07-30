import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tokenizer Viewer - Visualize Tokenization for GPT, Claude, Gemini',
  description:
    'Visualize how text is split into tokens. Understand tokenization for better prompt engineering, cost optimization, and AI development.',
  keywords: [
    'tokenizer viewer',
    'tokenization',
    'AI tokenization',
    'GPT tokenizer',
    'Claude tokenizer',
    'Gemini tokenizer',
    'token visualization',
    'prompt engineering',
    'AI developer tools',
  ],
  openGraph: {
    title: 'Tokenizer Viewer - Visualize Tokenization',
    description: 'Visualize how text is split into tokens. Understand tokenization for better prompt engineering and cost optimization.',
    type: 'website',
    url: 'https://aitokentools.com/tools/tokenizer-viewer',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Tokenizer Viewer - Visualize Tokenization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokenizer Viewer - Visualize Tokenization',
    description: 'Visualize how text is split into tokens. Understand tokenization for better prompt engineering and cost optimization.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/tokenizer-viewer',
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
                name: "Tokenizer Viewer",
                url: "https://aitokentools.com/tools/tokenizer-viewer",
                description:
                  "Visualize how your text is split into tokens. Understand tokenization for better prompt engineering and cost optimization.",
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
                    name: "How does tokenization work?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Tokenization breaks text into smaller pieces called tokens. Different models use different algorithms, but they generally split text at word boundaries, punctuation, and whitespace.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why do spaces count as tokens?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Whitespace is often tokenized separately because it carries semantic meaning in text structure.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is this the same as GPT tokenization?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "This viewer provides a simplified visualization. Actual GPT models use more sophisticated subword tokenization like BPE or tiktoken.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can I reduce my token count?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Remove unnecessary whitespace, use shorter words when possible, avoid redundant information, and structure your prompts concisely.",
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
