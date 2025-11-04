'use client'

import { usePathname, useRouter } from 'next/navigation'

/**
 * Componente de navegação inferior padronizado
 * Segue o padrão: INICIAL | SUAS OFERTAS | + | CONFIGURAÇÕES | PERFIL
 */
export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // Determinar qual item está ativo
  const isActive = (path: string) => {
    if (path === '/offers' || path === '/') {
      return pathname === '/offers' || pathname === '/'
    }
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50 shadow-lg">
      {/* INICIAL - Home */}
      <button
        onClick={() => router.push('/offers')}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
          isActive('/offers') || isActive('/') 
            ? 'text-green-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="Inicial"
      >
        <svg 
          className="w-6 h-6" 
          fill={isActive('/offers') || isActive('/') ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        <span className="text-xs mt-0.5 font-medium">Inicial</span>
      </button>

      {/* SUAS OFERTAS - Document */}
      <button
        onClick={() => router.push('/my-offers')}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
          isActive('/my-offers') 
            ? 'text-green-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="Suas Ofertas"
      >
        <svg 
          className="w-6 h-6" 
          fill={isActive('/my-offers') ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <span className="text-xs mt-0.5 font-medium">Suas Ofertas</span>
      </button>

      {/* Add Button - Central */}
      <button
        onClick={() => router.push('/add-offer')}
        className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors -mt-6"
        title="Adicionar Oferta"
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
          />
        </svg>
      </button>

      {/* CONFIGURAÇÕES - Settings */}
      <button
        onClick={() => router.push('/profile')}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
          pathname.includes('settings') || pathname === '/profile'
            ? 'text-green-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="Configurações"
      >
        <svg 
          className="w-6 h-6" 
          fill={pathname.includes('settings') ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
        <span className="text-xs mt-0.5 font-medium">Configurações</span>
      </button>

      {/* PERFIL - Profile */}
      <button
        onClick={() => router.push('/profile')}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
          isActive('/profile')
            ? 'text-green-600' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
        title="Perfil"
      >
        <svg 
          className="w-6 h-6" 
          fill={isActive('/profile') ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
        <span className="text-xs mt-0.5 font-medium">Perfil</span>
      </button>
    </div>
  )
}

