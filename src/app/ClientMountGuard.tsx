'use client'

import { useState, useEffect, PropsWithChildren } from 'react'

import Loading from './loading'

export default function ClientMountGuard({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200)  // 2 seconds
    return () => clearTimeout(timer)
  }, [])


  if (!ready) return <Loading />

  return <>{children}</>
}
