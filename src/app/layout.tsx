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



// global metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://your-deployment-url.vercel.app'), 
  title: {
    default: 'MyPokedex - Online Pokédex',
    template: '%s | MyPokedex' // Ensures pages show "Charizard | MyPokedex"
  },
  description: 'Search Pokémon stats, types, evolutions and weaknesses.',
  openGraph: {
    title: 'MyPokedex - The Ultimate Pokemon Database',
    description: 'Explore stats and abilities for every Pokemon.',
    url: 'https://your-deployment-url.vercel.app',
    siteName: 'MyPokedex',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/flaticon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${noirPro.variable} ${playfair.variable}`}>
      <body className='flex flex-col min-h-screen'>
        {children}

      <footer className='mt-auto text-center py-4 '>&copy;{new Date().getFullYear()} Developed By Danish</footer>
      </body>
    </html>
  )
}
