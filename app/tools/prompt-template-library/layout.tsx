import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Template Library - Free AI Prompt Templates',
  description:
    'Free prompt templates for AI developers. Browse code review, translation, data analysis, content writing, and education templates. Customize variables and copy ready-to-use prompts.',
  keywords: [
    'prompt templates',
    'AI prompt library',
    'prompt engineering templates',
    'ChatGPT prompt examples',
    'Claude prompt templates',
    'code review prompt',
    'writing prompts',
    'prompt generator',
  ],
  openGraph: {
    title: 'Prompt Template Library - Free AI Prompt Templates',
    description:
      'Free prompt templates for AI developers. Browse code review, translation, data analysis, content writing, and education templates. Customize variables and copy ready-to-use prompts.',
    type: 'website',
    url: 'https://aitokentools.com/tools/prompt-template-library',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Prompt Template Library - Free AI Prompt Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Template Library - Free AI Prompt Templates',
    description:
      'Free prompt templates for AI developers. Browse code review, translation, data analysis, content writing, and education templates. Customize variables and copy ready-to-use prompts.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  alternates: {
    canonical: 'https://aitokentools.com/tools/prompt-template-library',
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
                name: 'Prompt Template Library',
                url: 'https://aitokentools.com/tools/prompt-template-library',
                description:
                  'Free prompt templates for AI developers. Browse code review, translation, data analysis, content writing, and education templates. Customize variables and copy ready-to-use prompts.',
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
                    name: 'What is a prompt template?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'A prompt template is a pre-written prompt structure with variable placeholders. You fill in the variables to create a complete, ready-to-use prompt for AI models.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do I use these templates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Select a template, fill in the variables in curly braces, then copy the completed prompt. You can also send it to the Prompt Formatter tool for further structuring.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Are the templates free to use?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, all prompt templates are completely free to use. No registration required. You can use them with any AI model including ChatGPT, Claude, and Gemini.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I modify the templates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Absolutely. The templates are starting points. Customize them freely to fit your specific needs and use cases.',
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
