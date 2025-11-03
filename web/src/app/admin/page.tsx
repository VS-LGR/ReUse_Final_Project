'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { config } from '@/lib/config'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Verificar se já está logado
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken')
      if (token) {
        router.push(config.admin.dashboard)
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      // Simular verificação de credenciais (em produção, fazer chamada à API)
      // Por enquanto, usar credenciais do config
      if (username === config.admin.email && password === config.admin.password) {
        setSuccess(true)
        
        // Salvar token de autenticação
        localStorage.setItem('adminToken', `admin-token-${Date.now()}`)
        
        // Redirecionar para dashboard após 1 segundo
        setTimeout(() => {
          router.push(config.admin.dashboard)
        }, 1000)
      } else {
        setError('Usuário ou senha incorretos')
        setLoading(false)
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#27ae60] to-[#2ecc71]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-lg mx-auto mb-5 flex items-center justify-center">
            <Image
              src="https://i.imgur.com/OD3laQP.png"
              alt="ReUse Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#2c3e50] mb-2">ReUse Admin</h1>
          <p className="text-gray-600 text-base">Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-left">
            <label htmlFor="username" className="block mb-2 text-[#2c3e50] font-medium">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-[#27ae60]"
              placeholder="Digite seu usuário"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-[#2c3e50] font-medium">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-[#27ae60]"
              placeholder="Digite sua senha"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white font-semibold rounded-lg text-base transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            Entrar
          </button>

          {loading && (
            <div className="mt-4 text-gray-600">Verificando credenciais...</div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
              Login realizado com sucesso!
            </div>
          )}
        </form>

        <div className="mt-8 text-gray-600 text-sm">
          <p>© 2025 ReUse - Sistema de Reutilização</p>
        </div>
      </div>
    </div>
  )
}

