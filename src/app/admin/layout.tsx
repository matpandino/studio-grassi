import { ClerkProvider, SignOutButton } from '@clerk/nextjs'
import '@uploadthing/react/styles.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Estúdio Grassi',
  description: 'Estúdio de Bodypiercing e tatoo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-white`}>
          <Header rightElement={<SignOutButton />} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
