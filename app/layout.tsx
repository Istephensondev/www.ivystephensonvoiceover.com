import type { Metadata } from 'next'
import { Space_Grotesk, Syne, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const syne = Syne({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display"
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script"
});

export const metadata: Metadata = {
  title: 'Ivy Stephenson | Female Voiceover Artist | Nashville & Orlando',
  description: 'Professional female voiceover artist and voice actor based in Nashville, TN and Orlando, FL. Broadcast-ready audio for commercials, corporate narration, e-learning, animation, and video games. Book Ivy for your next project.',
  generator: 'v0.app',
  metadataBase: new URL('https://www.ivystephensonvoiceover.com'),
  keywords: [
    'female voiceover artist',
    'voice actor Nashville',
    'voice actor Orlando',
    'commercial voiceover',
    'animation voice actor',
    'video game voice actor',
    'professional voiceover',
    'female voice talent',
    'broadcast voiceover',
    'corporate narration',
    'e-learning voiceover',
    'Ivy Stephenson',
    'Nashville voiceover',
    'Orlando voiceover',
    'Florida voice actor',
    'Tennessee voice actor',
  ],
  authors: [{ name: 'Ivy Stephenson' }],
  creator: 'Ivy Stephenson',
  publisher: 'Ivy Stephenson Voiceover',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ivystephensonvoiceover.com',
    siteName: 'Ivy Stephenson Voiceover',
    title: 'Ivy Stephenson | Professional Female Voiceover Artist',
    description: 'Professional female voiceover artist based in Nashville and Orlando. Broadcast-quality audio for commercials, animation, video games, and corporate narration.',
    images: [
      {
        url: '/images/ivy-stephenson-female-voiceover-artist-nashville.jpg',
        width: 1200,
        height: 630,
        alt: 'Ivy Stephenson - Professional Female Voiceover Artist Nashville Orlando',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivy Stephenson | Female Voiceover Artist | Nashville & Orlando',
    description: 'Professional female voiceover artist for commercials, animation, video games, and corporate narration. Broadcast-ready audio.',
    images: ['/images/ivy-stephenson-female-voiceover-artist-nashville.jpg'],
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
  alternates: {
    canonical: 'https://www.ivystephensonvoiceover.com',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${spaceGrotesk.variable} ${syne.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
