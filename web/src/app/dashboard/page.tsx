'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STORAGE_KEYS = {
  image: '@profile_image',
  notifications: '@notifications_enabled',
  language: '@language',
  theme: '@theme',
};

export default function Dashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Português Br');
  const [theme, setTheme] = useState('Claro');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  // Load data from localStorage
  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('@logged_in_user');
    if (!userDataFromStorage) {
      router.replace('/');
      return;
    }
    
    try {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.replace('/');
      return;
    }
    
    setIsLoggedIn(true);

    const storedImage = localStorage.getItem(STORAGE_KEYS.image);
    const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
    const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    if (storedImage) setImage(storedImage);
    if (storedNotifications !== null) setNotifications(JSON.parse(storedNotifications));
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedTheme) setTheme(storedTheme);
  }, [router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        localStorage.setItem(STORAGE_KEYS.image, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(newValue));
  };

  const toggleLanguage = () => {
    const newLang = language === 'Português Br' ? 'English' : 'Português Br';
    setLanguage(newLang);
    localStorage.setItem(STORAGE_KEYS.language, newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'Claro' ? 'Escuro' : 'Claro';
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.theme, newTheme);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'Claro' ? 'bg-gray-50' : 'bg-gray-900'} pt-10`}>
      {/* Header */}
      <div className="relative text-center">
        <Image
          src="https://i.imgur.com/qkdpN.jpg"
          alt="Header background"
          width={400}
          height={100}
          className="w-full h-24 object-cover"
        />
        <div className="relative -mt-12">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Image
              src={image || '/default-avatar.png'}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full border-4 border-white mx-auto"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <h1 className={`text-xl font-bold mt-2 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
          {userData?.name || 'Usuário'}
        </h1>
        <button className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center mx-auto mt-2">
          <span className="mr-1">Editar Perfil</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>

      {/* Icon Row */}
      <div className="flex justify-around my-8">
        <IconLabel icon="sync" label="Trocas\nPendentes" theme={theme} />
        <IconLabel icon="people" label="Amigos" theme={theme} />
        <IconLabel icon="shopping-bag" label="Compras" theme={theme} />
        <IconLabel icon="checkmark-done" label="Trocas e compras\nRealizadas" theme={theme} />
      </div>

      {/* Settings Card */}
      <div className={`mx-5 p-4 rounded-xl ${theme === 'Claro' ? 'bg-white shadow-md' : 'bg-gray-800'}`}>
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

      {/* Quick Actions */}
      <div className="mx-5 mb-20 space-y-3">
        <Link href="/offers" className="block bg-green-500 text-white text-center py-3 rounded-lg font-semibold">
          Ver Ofertas
        </Link>
        <Link href="/add-offer" className="block bg-blue-500 text-white text-center py-3 rounded-lg font-semibold">
          Criar Oferta
        </Link>
        <Link href="/messages" className="block bg-purple-500 text-white text-center py-3 rounded-lg font-semibold">
          Mensagens
        </Link>
        <Link href="/notifications" className="block bg-orange-500 text-white text-center py-3 rounded-lg font-semibold">
          Notificações
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem('@logged_in_user');
            router.push('/');
          }}
          className="w-full bg-red-500 text-white text-center py-3 rounded-lg font-semibold"
        >
          Sair
        </button>
      </div>

      {/* Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 h-16 ${theme === 'Claro' ? 'bg-gray-200' : 'bg-gray-800'} flex items-center justify-around`}>
        <button onClick={() => router.push('/offers')}>
          <svg className={`w-6 h-6 ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <svg className={`w-6 h-6 ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <button 
          onClick={() => router.push('/add-offer')}
          className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <svg className={`w-6 h-6 ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg className={`w-6 h-6 ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  );
}

const IconLabel = ({ icon, label, theme }: { icon: string; label: string; theme: string }) => (
  <div className="text-center">
    <svg className={`w-7 h-7 mx-auto mb-1 ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon === 'sync' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      )}
      {icon === 'people' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      )}
      {icon === 'shopping-bag' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      )}
      {icon === 'checkmark-done' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )}
    </svg>
    <p className={`text-xs text-center whitespace-pre-line ${theme === 'Claro' ? 'text-gray-700' : 'text-gray-300'}`}>{label}</p>
  </div>
);

const SettingRow = ({ 
  label, 
  value, 
  toggle, 
  theme 
}: { 
  label: string; 
  value: string; 
  toggle: () => void; 
  theme: string;
}) => (
  <div className="flex justify-between items-center py-2">
    <span className={`text-base ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
      {label}
    </span>
    <button 
      onClick={toggle}
      className="text-base text-blue-600 hover:text-blue-800"
    >
      {value}
    </button>
  </div>
);