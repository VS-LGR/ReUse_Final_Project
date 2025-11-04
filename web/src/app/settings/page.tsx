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
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState<string | null>(null)
  
  // Campos editáveis
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  
  const router = useRouter()

  useEffect(() => {
    loadUserData()
    loadSettings()
  }, [])

  const loadUserData = async () => {
    try {
      const userDataStr = localStorage.getItem('@logged_in_user')
      if (!userDataStr) {
        router.push('/login')
        return
      }

      const userData = JSON.parse(userDataStr)
      setUser(userData)
      setName(userData.name || '')
      setEmail(userData.email || '')
      setPhone(userData.phone || '')
      setAddress(userData.address || '')
      setCity(userData.city || '')
      setState(userData.state || '')
      setZipCode(userData.zipCode || '')
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadSettings = () => {
    const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications)
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.language)
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme)

    if (storedNotifications !== null) setNotifications(JSON.parse(storedNotifications))
    if (storedLanguage) setLanguage(storedLanguage)
    if (storedTheme) setTheme(storedTheme)
  }

  const saveUserData = async () => {
    if (!user) return

    setSaving(true)
    try {
      const response = await fetch(`/api/users/${user.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          state,
          zipCode,
        }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        localStorage.setItem('@logged_in_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setEditMode(null)
        alert('Dados atualizados com sucesso!')
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao atualizar dados')
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      alert('Erro ao salvar dados. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
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

      {/* Personal Information */}
      <div className={`p-4 mt-4 ${theme === 'Claro' ? 'bg-white' : 'bg-gray-800'} rounded-lg mx-4 mb-4`}>
        <h2 className={`text-lg font-bold mb-4 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
          Informações Pessoais
        </h2>
        
        <EditableField
          label="Nome"
          value={name}
          onChange={setName}
          editMode={editMode === 'name'}
          onEdit={() => setEditMode('name')}
          onCancel={() => {
            setName(user?.name || '')
            setEditMode(null)
          }}
          onSave={() => {
            saveUserData()
          }}
          theme={theme}
          saving={saving}
        />
        
        <EditableField
          label="Email"
          value={email}
          onChange={setEmail}
          editMode={editMode === 'email'}
          onEdit={() => setEditMode('email')}
          onCancel={() => {
            setEmail(user?.email || '')
            setEditMode(null)
          }}
          onSave={() => {
            saveUserData()
          }}
          theme={theme}
          saving={saving}
          type="email"
        />
        
        <EditableField
          label="Telefone"
          value={phone}
          onChange={setPhone}
          editMode={editMode === 'phone'}
          onEdit={() => setEditMode('phone')}
          onCancel={() => {
            setPhone(user?.phone || '')
            setEditMode(null)
          }}
          onSave={() => {
            saveUserData()
          }}
          theme={theme}
          saving={saving}
          placeholder="(00) 00000-0000"
        />
      </div>

      {/* Address Information */}
      <div className={`p-4 ${theme === 'Claro' ? 'bg-white' : 'bg-gray-800'} rounded-lg mx-4 mb-4`}>
        <h2 className={`text-lg font-bold mb-4 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
          Endereço
        </h2>
        
        <EditableField
          label="Endereço"
          value={address}
          onChange={setAddress}
          editMode={editMode === 'address'}
          onEdit={() => setEditMode('address')}
          onCancel={() => {
            setAddress(user?.address || '')
            setEditMode(null)
          }}
          onSave={() => {
            saveUserData()
          }}
          theme={theme}
          saving={saving}
          placeholder="Rua, número, complemento"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <EditableField
            label="Cidade"
            value={city}
            onChange={setCity}
            editMode={editMode === 'city'}
            onEdit={() => setEditMode('city')}
            onCancel={() => {
              setCity(user?.city || '')
              setEditMode(null)
            }}
            onSave={() => {
              saveUserData()
            }}
            theme={theme}
            saving={saving}
          />
          
          <EditableField
            label="Estado"
            value={state}
            onChange={setState}
            editMode={editMode === 'state'}
            onEdit={() => setEditMode('state')}
            onCancel={() => {
              setState(user?.state || '')
              setEditMode(null)
            }}
            onSave={() => {
              saveUserData()
            }}
            theme={theme}
            saving={saving}
            placeholder="UF"
          />
        </div>
        
        <EditableField
          label="CEP"
          value={zipCode}
          onChange={setZipCode}
          editMode={editMode === 'zipCode'}
          onEdit={() => setEditMode('zipCode')}
          onCancel={() => {
            setZipCode(user?.zipCode || '')
            setEditMode(null)
          }}
          onSave={() => {
            saveUserData()
          }}
          theme={theme}
          saving={saving}
          placeholder="00000-000"
        />
      </div>

      {/* App Settings */}
      <div className={`p-4 ${theme === 'Claro' ? 'bg-white' : 'bg-gray-800'} rounded-lg mx-4 mb-4`}>
        <h2 className={`text-lg font-bold mb-4 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
          Configurações do App
        </h2>
        
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

const EditableField = ({
  label,
  value,
  onChange,
  editMode,
  onEdit,
  onCancel,
  onSave,
  theme,
  saving,
  type = 'text',
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  editMode: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
  theme: string
  saving: boolean
  type?: string
  placeholder?: string
}) => (
  <div className={`py-3 border-b ${theme === 'Claro' ? 'border-gray-200' : 'border-gray-700'} last:border-0`}>
    <label className={`block text-sm font-semibold mb-2 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
      {label}
    </label>
    {editMode ? (
      <div className="space-y-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 rounded-lg border ${
            theme === 'Claro' 
              ? 'bg-white border-gray-300 text-gray-900' 
              : 'bg-gray-700 border-gray-600 text-white'
          } focus:outline-none focus:ring-2 focus:ring-green-500`}
          disabled={saving}
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
              saving
                ? 'bg-gray-400 cursor-not-allowed'
                : theme === 'Claro'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-green-600 text-white hover:bg-green-700'
            } transition-colors`}
          >
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            onClick={onCancel}
            disabled={saving}
            className={`px-4 py-2 rounded-lg font-semibold ${
              theme === 'Claro'
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            } transition-colors`}
          >
            Cancelar
          </button>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-between">
        <p className={`text-sm ${theme === 'Claro' ? 'text-gray-600' : 'text-gray-400'}`}>
          {value || <span className="italic">Não informado</span>}
        </p>
        <button
          onClick={onEdit}
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            theme === 'Claro'
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-green-600 text-white hover:bg-green-700'
          } transition-colors`}
        >
          Editar
        </button>
      </div>
    )}
  </div>
)

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

