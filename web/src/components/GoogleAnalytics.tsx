'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Componente Google Analytics
 * Carrega o script do GA4 e rastreia page views
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Só carregar se o GA_ID estiver configurado
    if (!GA_ID) {
      return
    }

    // Carregar script do Google Analytics
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script1)

    // Inicializar dataLayer e gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag as any

    gtag('js', new Date())
    gtag('config', GA_ID, {
      page_path: window.location.pathname,
    })
  }, [])

  useEffect(() => {
    // Rastrear mudanças de página
    if (!GA_ID || !window.gtag) {
      return
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    window.gtag('config', GA_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  // Não renderizar nada
  return null
}

