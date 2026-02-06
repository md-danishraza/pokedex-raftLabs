// src/app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const noirPro = localFont({
  src: [
    {
      path: '../../public/fonts/NoirPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NoirPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MyPokedex - Online Pokédex',
  description: 'Search Pokémon stats, types, evolutions and weaknesses.',
  icons: {
    icon: {url:"/flaticon.png",type: 'image/png', sizes: '64x64' },
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${noirPro.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
