import type { Metadata } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Token Tools - Free AI Developer Tools',
  description:
    'Free AI developer tools for token calculation, cost estimation, prompt optimization, and model price comparison. Calculate tokens, compare prices, format prompts, and more for OpenAI, Claude, Gemini and other AI models.',
  keywords: [
    'AI tokens',
    'token calculator',
    'OpenAI',
    'Claude',
    'GPT-4',
    'AI cost calculator',
    'prompt formatter',
    'AI developer tools',
    'model price comparison',
    'tokenization',
    'prompt engineering',
    'LLM context window',
    'AI API costs',
    'token cost calculator',
    'AI model prices',
  ],
  authors: [{ name: 'AI Token Tools' }],
  openGraph: {
    title: 'AI Token Tools - Free AI Developer Tools',
    description:
      'Free AI developer tools for token calculation, cost estimation, prompt optimization, and model price comparison.',
    type: 'website',
    url: 'https://aitokentools.com',
    siteName: 'AI Token Tools',
    images: [
      {
        url: 'https://aitokentools.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AI Token Tools - Free AI Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Token Tools - Free AI Developer Tools',
    description: 'Free AI developer tools for token calculation, cost estimation, and prompt optimization.',
    images: ['https://aitokentools.com/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://aitokentools.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4895183919797557" crossOrigin="anonymous"></script>
      </Head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AI Token Tools",
              url: "https://aitokentools.com",
              description:
                "Free AI developer tools for token calculation, cost estimation, prompt optimization, and model price comparison.",
            }),
          }}
        />
      </body>
    </html>
  )
}
