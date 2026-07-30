import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Diff Tool - Compare AI Prompts for GPT, Claude, Gemini',
  description:
    'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations, changes, and version control in prompt engineering.',
  keywords: [
    'prompt diff tool',
    'AI prompt comparison',
    'prompt version control',
    'prompt engineering',
    'GPT prompt diff',
    'Claude prompt comparison',
    'Gemini prompt diff',
    'AI developer tools',
    'prompt changes',
  ],
  openGraph: {
    title: 'Prompt Diff Tool - Compare AI Prompts',
    description: 'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations and changes.',
    type: 'website',
    url: 'https://aitokentools.com/tools/prompt-diff',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Prompt Diff Tool - Compare AI Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Diff Tool - Compare AI Prompts',
    description: 'Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations and changes.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/prompt-diff',
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
                name: "Prompt Diff Tool",
                url: "https://aitokentools.com/tools/prompt-diff",
                description:
                  "Compare two prompts side by side and highlight the differences. Perfect for tracking prompt iterations and version control.",
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
                    name: "What is prompt diffing?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Prompt diffing compares two versions of a prompt to identify changes, showing additions, deletions, and unchanged content.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can this help with prompt engineering?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "It helps document changes, compare performance between versions, and collaborate by clearly showing modifications in each iteration.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I compare more than two prompts?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "This tool compares two prompts at a time. For multiple versions, compare sequentially or use the copy feature for documentation.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is my prompt data secure?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "All comparison happens locally in your browser. Your prompts are never sent to any server, ensuring complete privacy.",
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
