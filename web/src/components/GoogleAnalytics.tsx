'use client'

import { useEffect, Suspense } from 'react'
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
 * Componente interno que usa useSearchParams
 * Precisa estar dentro de Suspense boundary
 */
function GoogleAnalyticsInner() {
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

/**
 * Função helper para rastrear eventos customizados
 * @param eventName - Nome do evento (ex: 'login', 'create_offer')
 * @param eventParams - Parâmetros adicionais do evento
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) {
    return
  }

  window.gtag('event', eventName, {
    event_category: 'user_interaction',
    ...eventParams,
  })
}

/**
 * Componente Google Analytics
 * Carrega o script do GA4 e rastreia page views
 * Envolvido em Suspense para suportar useSearchParams
 */
export default function GoogleAnalytics() {
  // Se não tiver GA_ID, não renderizar nada
  if (!GA_ID) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  )
}

