'use client'

import { useState, useEffect } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import BottomNavigation from '@/components/BottomNavigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Offer {
  id: string
  name: string
  description: string
  image: string
  price: string
  condition: string
  rating: number
  category: string
  desiredItem: string
}

export default function MyOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadMyOffers()
  }, [])

  const loadMyOffers = async () => {
    try {
      // TODO: Implementar filtro para buscar apenas ofertas do usuário logado
      // Por enquanto, carrega todas as ofertas
      const response = await fetch('/api/offers')
      if (response.ok) {
        const data = await response.json()
        setOffers(data)
      }
    } catch (error) {
      console.error('Erro ao carregar ofertas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Carregando suas ofertas...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Suas Ofertas</h1>
        <div className="w-10"></div>
      </div>

      {/* Offers List */}
      <div className="p-4">
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Você ainda não criou nenhuma oferta</p>
            <button
              onClick={() => router.push('/add-offer')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Criar Primeira Oferta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {offers.map((offer) => (
              <Link
                key={offer.id}
                href={`/product/${offer.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="aspect-square relative bg-gray-100">
                  <OptimizedImage
                    src={offer.image || '/logo-placeholder.svg'}
                    alt={offer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                    {offer.name}
                  </h3>
                  <p className="text-lg font-bold text-green-600 mb-1">{offer.price}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      offer.condition === 'Novo' ? 'text-green-600' :
                      offer.condition === 'Seminovo' ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {offer.condition}
                    </span>
                    <span className="text-xs text-gray-700 font-medium">
                      {offer.rating}/10
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

