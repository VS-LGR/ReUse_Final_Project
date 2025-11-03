'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { config } from '@/lib/config'
import AdminLayout from '../components/AdminLayout'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface Offer {
  id: string
  name: string
  description: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalOffers, setTotalOffers] = useState<number>(0)
  const [usersData, setUsersData] = useState<User[]>([])
  const [offersData, setOffersData] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Verificar autenticação
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push(config.admin.login)
        return
      }
    }

    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const [usersResponse, offersResponse] = await Promise.all([
        fetch(config.api.usersProxy),
        fetch(config.api.offersProxy)
      ])

      if (usersResponse.ok && offersResponse.ok) {
        const users = await usersResponse.json()
        const offers = await offersResponse.json()

        setUsersData(users)
        setOffersData(offers)
        setTotalUsers(users.length)
        setTotalOffers(offers.length)
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken')
      router.push(config.admin.login)
    }
  }

  // Calcular estatísticas
  const activeUsers = usersData.filter(u => !u.isBlocked).length
  const activeOffers = offersData.filter(o => o.isActive).length
  const recentUsers = usersData.slice(-10).reverse()
  const recentOffers = offersData.slice(-10).reverse()

  return (
    <AdminLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-[#2c3e50] mb-8 text-center">Dashboard</h1>

        {loading ? (
          <div className="text-center py-20 text-gray-600">Carregando dados...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform">
                <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-[#3498db] to-[#2980b9] flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">{totalUsers}</h3>
                  <p className="text-gray-600 text-sm">Total de Usuários</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform">
                <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-[#e74c3c] to-[#c0392b] flex items-center justify-center text-2xl">
                  📦
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">{totalOffers}</h3>
                  <p className="text-gray-600 text-sm">Total de Ofertas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform">
                <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-[#f39c12] to-[#e67e22] flex items-center justify-center text-2xl">
                  🤝
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">0</h3>
                  <p className="text-gray-600 text-sm">Trocas Realizadas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-5 hover:-translate-y-1 transition-transform">
                <div className="w-15 h-15 rounded-xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1">0</h3>
                  <p className="text-gray-600 text-sm">Denúncias</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-[#2c3e50] mb-5 flex items-center gap-2">
                📈 Atividade Recente
              </h2>
              <div className="h-96 flex items-center justify-center text-gray-500">
                Gráfico será implementado com Chart.js
                <br />
                (Instalar: npm install chart.js react-chartjs-2)
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-[#2c3e50] mb-5 flex items-center gap-2">
                🔔 Atividades Recentes
              </h2>
              <div className="space-y-4">
                {recentUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-base">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#2c3e50]">
                        Novo usuário registrado
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.name} se cadastrou no sistema
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(user.createdAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
                {recentOffers.slice(0, 5).map((offer) => (
                  <div key={offer.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-base">
                      📦
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#2c3e50]">
                        Nova oferta criada
                      </div>
                      <div className="text-sm text-gray-600">
                        {offer.name || offer.description?.substring(0, 50)} foi adicionada
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(offer.createdAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                ))}
                {recentUsers.length === 0 && recentOffers.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    Nenhuma atividade recente
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

