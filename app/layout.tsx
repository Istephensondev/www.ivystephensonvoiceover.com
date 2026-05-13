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
  description: 'Professional female voiceover artist and voice actor based in Nashville, TN and Orlando, FL. Broadcast-ready audio for commercials, corporate narration, e-learning, and animation.',
  generator: 'v0.app',
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
