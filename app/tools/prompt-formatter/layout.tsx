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
  return children
}
