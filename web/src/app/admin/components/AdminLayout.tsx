'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { config } from '@/lib/config'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken')
      router.push(config.admin.login)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-[#f8f8f8] px-10 py-5 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center">
            <Image
              src="https://i.imgur.com/OD3laQP.png"
              alt="ReUse Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          <span className="text-[#27ae60] text-2xl font-bold">ReUse!</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Bem-vindo, Admin</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#e74c3c] text-white rounded-lg text-sm font-medium hover:bg-[#c0392b] transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#2c3e50] flex">
        <Link
          href={config.admin.dashboard}
          className={`px-8 py-4 text-white no-underline transition-colors ${
            isActive(config.admin.dashboard)
              ? 'bg-[#34495e]'
              : 'hover:bg-[#34495e]'
          }`}
        >
          📊 Dashboard
        </Link>
        <Link
          href={config.admin.users}
          className={`px-8 py-4 text-white no-underline transition-colors ${
            isActive(config.admin.users) ? 'bg-[#34495e]' : 'hover:bg-[#34495e]'
          }`}
        >
          👥 Usuários
        </Link>
        <Link
          href={config.admin.offers}
          className={`px-8 py-4 text-white no-underline transition-colors ${
            isActive(config.admin.offers) ? 'bg-[#34495e]' : 'hover:bg-[#34495e]'
          }`}
        >
          📦 Ofertas
        </Link>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

