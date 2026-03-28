import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'DIETER PRO - Professional AI Music Production Studio',
  description: 'The ultimate AI-powered music creation platform. Generate full songs with vocals, split stems, mix audio, and distribute to global platforms instantly.',
  keywords: ['AI Music', 'Suno AI', 'Mureka', 'Vocal Cloning', 'Audio Editor', 'Music Distribution', 'AI Lyrics', 'Stem Separation', 'Dieter Pro', 'Music Studio'],
  authors: [{ name: 'DIETER PRO Team' }],
  openGraph: {
    title: 'DIETER PRO - AI Music Studio',
    description: 'Transform your lyrics into professional studio-quality music instantly.',
    url: 'https://v0-ai-music-studio-eight.vercel.app',
    siteName: 'DIETER PRO',
    images: [
      {
        url: 'https://v0-ai-music-studio-eight.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DIETER PRO AI Music Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIETER PRO - AI Music Studio',
    description: 'The future of music production is here. AI-driven vocals, beats, and distribution.',
    images: ['https://v0-ai-music-studio-eight.vercel.app/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="bg-black antialiased overflow-x-hidden selection:bg-indigo-500/30">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
