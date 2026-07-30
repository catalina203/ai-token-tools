import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Context Length Checker - AI Model Context Window Checker',
  description:
    'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints for GPT, Claude, Gemini and more.',
  keywords: [
    'context length checker',
    'AI model context window',
    'GPT context length',
    'Claude context window',
    'Gemini context length',
    'LLM context limit',
    'prompt truncation',
    'AI developer tools',
    'context window checker',
  ],
  openGraph: {
    title: 'Context Length Checker - AI Model Context Window Checker',
    description: 'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints.',
    type: 'website',
    url: 'https://aitokentools.com/tools/context-length-checker',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Context Length Checker - AI Model Context Window Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Context Length Checker - AI Model Context Window Checker',
    description: 'Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/context-length-checker',
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
                name: "Context Length Checker",
                url: "https://aitokentools.com/tools/context-length-checker",
                description:
                  "Check if your prompt fits within the context limits of various AI models. Avoid truncation issues and ensure your content fits within model constraints.",
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
                    name: "What happens if my prompt is too long?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Different providers handle it differently. Some truncate your input, some return an error, and others refuse to process the request.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does context length include the AI response?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, the context limit applies to your input plus the AI output. Leave at least 10-20% of the context window for the response.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which model has the largest context window?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Google Gemini 1.5 Pro leads with 2 million tokens, followed by Gemini 1.5 Flash with 1 million tokens. Claude 3 models offer 200K and most OpenAI models provide 128K tokens.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How accurate is the token estimation?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Generally within 10-15% accuracy. For critical applications, leave a safety margin of 5-10% below the context limit.",
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
