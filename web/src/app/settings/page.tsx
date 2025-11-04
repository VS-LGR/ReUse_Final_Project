'use client'

import { useState, useEffect } from 'react'
import BottomNavigation from '@/components/BottomNavigation'
import { useRouter } from 'next/navigation'

const STORAGE_KEYS = {
  notifications: '@notifications_enabled',
  language: '@language',
  theme: '@theme',
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('Português Br')
  const [theme, setTheme] = useState('Claro')
  const router = useRouter()

  useEffect(() => {
    const loadSettings = () => {
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications)
      const storedLanguage = localStorage.getItem(STORAGE_KEYS.language)
      const storedTheme = localStorage.getItem(STORAGE_KEYS.theme)

      if (storedNotifications !== null) setNotifications(JSON.parse(storedNotifications))
      if (storedLanguage) setLanguage(storedLanguage)
      if (storedTheme) setTheme(storedTheme)
    }

    loadSettings()
  }, [])

  const toggleNotifications = () => {
    const newValue = !notifications
    setNotifications(newValue)
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(newValue))
  }

  const toggleLanguage = () => {
    const newValue = language === 'Português Br' ? 'English' : 'Português Br'
    setLanguage(newValue)
    localStorage.setItem(STORAGE_KEYS.language, newValue)
  }

  const toggleTheme = () => {
    const newValue = theme === 'Claro' ? 'Escuro' : 'Claro'
    setTheme(newValue)
    localStorage.setItem(STORAGE_KEYS.theme, newValue)
  }

  return (
    <div className={`min-h-screen ${theme === 'Claro' ? 'bg-gray-50' : 'bg-gray-900'} pb-20`}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Configurações</h1>
        <div className="w-10"></div>
      </div>

      {/* Settings Card */}
      <div className={`p-4 mt-4 ${theme === 'Claro' ? 'bg-white' : 'bg-gray-800'} rounded-lg mx-4`}>
        <SettingRow 
          label="Notificações" 
          value={notifications ? 'Ativo' : 'Inativo'} 
          toggle={toggleNotifications}
          theme={theme}
        />
        <SettingRow 
          label="Idioma" 
          value={language} 
          toggle={toggleLanguage}
          theme={theme}
        />
        <SettingRow 
          label="Tema" 
          value={theme} 
          toggle={toggleTheme}
          theme={theme}
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

const SettingRow = ({ 
  label, 
  value, 
  toggle, 
  theme 
}: { 
  label: string
  value: string
  toggle: () => void
  theme: string
}) => (
  <div className={`flex items-center justify-between py-4 border-b ${theme === 'Claro' ? 'border-gray-200' : 'border-gray-700'} last:border-0`}>
    <div>
      <p className={`font-semibold ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>{label}</p>
      <p className={`text-sm ${theme === 'Claro' ? 'text-gray-600' : 'text-gray-400'}`}>{value}</p>
    </div>
    <button
      onClick={toggle}
      className={`px-4 py-2 rounded-lg font-semibold ${
        theme === 'Claro' 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-green-600 text-white hover:bg-green-700'
      } transition-colors`}
    >
      Alterar
    </button>
  </div>
)

