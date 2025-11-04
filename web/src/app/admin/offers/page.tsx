'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OptimizedImage from '@/components/OptimizedImage'
import AdminLayout from '../components/AdminLayout'
import { config } from '@/lib/config'

interface Offer {
  id: string
  name: string
  description: string
  image: string
  category: string
  isActive: boolean
  status: string
  createdAt: string
  owner: {
    id: string
    name: string
    avatar: string | null
  }
}

export default function OffersPage() {
  const router = useRouter()
  const [offers, setOffers] = useState<Offer[]>([])
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push(config.admin.login)
        return
      }
    }
    loadOffers()
  }, [router])

  useEffect(() => {
    if (searchTerm) {
      const filtered = offers.filter(
        (offer) =>
          offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOffers(filtered)
    } else {
      setFilteredOffers(offers)
    }
  }, [searchTerm, offers])

  const loadOffers = async () => {
    try {
      const response = await fetch(config.api.offersProxy)
      if (response.ok) {
        const data = await response.json()
        setOffers(data)
        setFilteredOffers(data)
      }
    } catch (error) {
      console.error('Erro ao carregar ofertas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOffer = async () => {
    if (!selectedOffer) return

    try {
      const response = await fetch(config.api.offerDelete, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId: selectedOffer.id }),
      })

      if (response.ok) {
        await loadOffers()
        setShowModal(false)
        alert('Oferta removida com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao remover oferta:', error)
      alert('Erro ao remover oferta')
    }
  }

  const getOfferTitle = (offer: Offer) => {
    if (offer.name) return offer.name
    if (offer.description) {
      return offer.description.substring(0, 50) + (offer.description.length > 50 ? '...' : '')
    }
    return `Oferta ${offer.category || 'sem categoria'}`
  }

  const getStatusText = (offer: Offer) => {
    if (!offer.isActive) return 'Inativa'
    switch (offer.status) {
      case 'approved':
        return 'Aprovada'
      case 'rejected':
        return 'Rejeitada'
      default:
        return 'Pendente'
    }
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-[#2c3e50] mb-8">Gerenciar ofertas</h1>

        {/* Search */}
        <div className="bg-white p-5 rounded-lg shadow-md mb-8 flex items-center gap-4">
          <svg
            className="w-5 h-5 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            className="flex-1 border-none outline-none text-base"
            placeholder="buscar oferta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Offers List */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">Carregando ofertas...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredOffers.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Nenhuma oferta encontrada
              </div>
            ) : (
              filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
                >
                  <div className="w-20 h-20 rounded-lg bg-gray-100 mr-5 flex items-center justify-center overflow-hidden">
                    {offer.image ? (
                      <OptimizedImage
                        src={offer.image}
                        alt={getOfferTitle(offer)}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-2xl">📦</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-lg font-semibold text-[#2c3e50] mb-1">
                      {getOfferTitle(offer)}
                    </div>
                    <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {offer.description || 'Sem descrição'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getStatusText(offer)} • {offer.category} •{' '}
                      {new Date(offer.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => {
                        setSelectedOffer(offer)
                        setShowDetailModal(true)
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Ver detalhes"
                    >
                      <svg
                        className="w-6 h-6 text-[#2c3e50]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">Ver detalhes</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedOffer(offer)
                        setShowModal(true)
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Remover"
                    >
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span className="text-xs text-gray-600">Remover</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showModal && selectedOffer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4">Remover Oferta</h2>
              <p className="text-gray-600 mb-4">
                Tem certeza que deseja remover permanentemente a oferta{' '}
                <strong>{getOfferTitle(selectedOffer)}</strong>?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteOffer}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedOffer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowDetailModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4">{getOfferTitle(selectedOffer)}</h2>
              {selectedOffer.image && (
                <div className="mb-4">
                  <OptimizedImage
                    src={selectedOffer.image}
                    alt={getOfferTitle(selectedOffer)}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              )}
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">{selectedOffer.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Categoria:</strong> {selectedOffer.category}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {getStatusText(selectedOffer)}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Proprietário:</strong> {selectedOffer.owner.name}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Data:</strong>{' '}
                  {new Date(selectedOffer.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-[#27ae60] text-white rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

