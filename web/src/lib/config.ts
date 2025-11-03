/**
 * Configurações centralizadas da aplicação
 * Usa variáveis de ambiente com fallbacks para desenvolvimento
 */

export const config = {
  // URL base da API (será a mesma do Next.js em produção)
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  
  // Credenciais do admin (apenas para desenvolvimento)
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@reuse.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  
  // URLs relativas para as APIs
  api: {
    users: '/api/users',
    usersProxy: '/api/admin/users-proxy',
    userBlock: '/api/admin/user/block',
    userPassword: '/api/admin/user/password',
    offers: '/api/offers',
    offersProxy: '/api/admin/offers-proxy',
    offerStatus: '/api/admin/offer/status',
    offerDelete: '/api/admin/offer/delete',
  },
  
  // URLs das páginas admin
  admin: {
    login: '/admin',
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    offers: '/admin/offers',
  },
} as const

/**
 * Helper para construir URLs completas
 */
export function getApiUrl(path: string): string {
  const baseUrl = config.apiUrl
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  // Em produção, URLs relativas já são corretas
  if (process.env.NODE_ENV === 'production' || !baseUrl.includes('localhost')) {
    return cleanPath
  }
  
  return `${baseUrl}${cleanPath}`
}

