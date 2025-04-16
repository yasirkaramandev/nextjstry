// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Yasir Karaman | Web Developer',
  description: 'Personal website of Yasir Karaman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
