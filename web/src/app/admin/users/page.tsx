'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AdminLayout from '../components/AdminLayout'
import { config } from '@/lib/config'

interface User {
  id: string
  name: string
  email: string
  avatar: string | null
  isActive: boolean
  isBlocked: boolean
  blockReason: string | null
  blockedAt: string | null
  createdAt: string
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'block' | 'password' | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push(config.admin.login)
        return
      }
    }
    loadUsers()
  }, [router])

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  const loadUsers = async () => {
    try {
      const response = await fetch(config.api.usersProxy)
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (user: User) => {
    try {
      const response = await fetch(config.api.userBlock, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          action: user.isBlocked ? 'unblock' : 'block',
        }),
      })

      if (response.ok) {
        await loadUsers()
        setShowModal(false)
        alert(`Usuário ${user.isBlocked ? 'desbloqueado' : 'bloqueado'} com sucesso!`)
      }
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error)
      alert('Erro ao bloquear usuário')
    }
  }

  const handleChangePassword = async () => {
    if (!selectedUser || !newPassword) return

    try {
      const response = await fetch(config.api.userPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.id,
          newPassword,
        }),
      })

      if (response.ok) {
        setShowModal(false)
        setNewPassword('')
        alert('Senha alterada com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      alert('Erro ao alterar senha')
    }
  }

  const getStatusText = (user: User) => {
    if (user.isBlocked) {
      return 'Inativo - pelo administrador'
    }
    if (!user.isActive) {
      return 'Inativo - pelo usuário'
    }
    return `Ativo desde ${new Date(user.createdAt).toLocaleDateString('pt-BR')}`
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-8 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-[#2c3e50] mb-8">Gerenciar usuários</h1>

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
            placeholder="buscar usuário"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Users List */}
        {loading ? (
          <div className="text-center py-20 text-gray-600">Carregando usuários...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                Nenhum usuário encontrado
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
                >
                  <div className="w-20 h-20 rounded-lg bg-gray-100 mr-5 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-2xl">👤</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-lg font-semibold text-[#2c3e50] mb-1">
                      {user.name}
                    </div>
                    <div
                      className={`text-sm ${
                        user.isBlocked || !user.isActive
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {getStatusText(user)}
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setModalType('password')
                        setShowModal(true)
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Trocar senha"
                    >
                      <svg
                        className="w-6 h-6 text-[#2c3e50]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span className="text-xs text-gray-600">Trocar senha</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setModalType('block')
                        setShowModal(true)
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title={user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          user.isBlocked ? 'text-green-600' : 'text-red-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        {user.isBlocked ? (
                          <path d="M9 12l2 2 4-4"></path>
                        ) : (
                          <>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </>
                        )}
                      </svg>
                      <span className="text-xs text-gray-600">
                        {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === 'password' ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Trocar Senha</h2>
                  <p className="text-gray-600 mb-4">
                    Deseja trocar a senha do usuário <strong>{selectedUser.name}</strong>?
                  </p>
                  <input
                    type="password"
                    placeholder="Nova senha"
                    className="w-full px-4 py-2 border rounded-lg mb-4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-[#27ae60] text-white rounded-lg"
                    >
                      Trocar Senha
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedUser.isBlocked ? 'Desbloquear' : 'Bloquear'} Usuário
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Deseja {selectedUser.isBlocked ? 'desbloquear' : 'bloquear'} o usuário{' '}
                    <strong>{selectedUser.name}</strong>?
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleBlockUser(selectedUser)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        selectedUser.isBlocked ? 'bg-[#27ae60]' : 'bg-[#e74c3c]'
                      }`}
                    >
                      {selectedUser.isBlocked ? 'Desbloquear' : 'Bloquear'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

