import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from '../components/Header'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Estúdio Grassi',
  description: 'Estúdio de Bodypiercing e tatoo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <Header rightElement="Contato" />
        {children}
      </body>
    </html>
  )
}
