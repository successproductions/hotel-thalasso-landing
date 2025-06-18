import './globals.css'
import type { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {

}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">        
      <head />           
      <body>
        {children}
      </body>
    </html>
  )
}
