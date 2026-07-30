import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Formatter - Structure AI Prompts for GPT, Claude, Gemini',
  description:
    'Format and structure your AI prompts with proper system, user, and assistant message formatting. Export to JSON or XML. Perfect for prompt engineering and AI development.',
  keywords: [
    'prompt formatter',
    'AI prompt structure',
    'GPT prompt formatter',
    'Claude prompt structure',
    'Gemini prompt formatter',
    'prompt engineering',
    'system message formatting',
    'AI developer tools',
    'prompt optimization',
  ],
  openGraph: {
    title: 'Prompt Formatter - Structure AI Prompts',
    description: 'Format and structure your AI prompts with proper system, user, and assistant message formatting. Export to JSON or XML.',
    type: 'website',
    url: 'https://aitokentools.com/tools/prompt-formatter',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Prompt Formatter - Structure AI Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Formatter - Structure AI Prompts',
    description: 'Format and structure your AI prompts with proper system, user, and assistant message formatting. Export to JSON or XML.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/prompt-formatter',
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
                name: "Prompt Formatter",
                url: "https://aitokentools.com/tools/prompt-formatter",
                description:
                  "Format and structure your AI prompts with proper system, user, and assistant message formatting. Export to JSON or XML.",
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
                    name: "What is the system message for?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The system message sets the overall behavior and context for the AI, defining its role, personality, constraints, and instructions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "When should I include assistant messages?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Include assistant messages when you want to provide examples of desired responses or when continuing an existing conversation.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Which output format should I use?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Use XML format for general readability and sharing. Use JSON format when integrating with APIs or when you need structured data.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I write effective system messages?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Effective system messages are clear, specific, and concise. Define the AI role explicitly, set constraints, and provide context about the task.",
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
