import type { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

// This root layout is required and minimal
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}