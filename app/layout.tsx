import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Pinyon_Script } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://m-mohameddd.vercel.app'),
  title: 'Ł & M — Save the Date',
  description: 'Moon Love, Maadi · Tuesday, 4 August 2026 · You are invited to celebrate the beginning of our forever.',
  openGraph: {
    title: 'Ł & M — Save the Date',
    description:
      'Moon Love, Maadi · Tuesday, 4 August 2026 · You are invited to celebrate the beginning of our forever.',
    images: ['/images/envelope.jpeg'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Ł & M — Save the Date',
    description:
      'Moon Love, Maadi · Tuesday, 4 August 2026 · You are invited to celebrate the beginning of our forever.',
    images: ['/images/envelope.jpeg'],
  },
  icons: {
    icon: '/images/envelope.jpeg',
    apple: '/images/envelope.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${cormorant.variable} ${pinyon.variable}`}>
      <body className="antialiased font-serif">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
