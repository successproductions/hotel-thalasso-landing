
import './globals.css'
import type { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">   
      <body>
        {children}
      </body>
    </html>
  )
}
