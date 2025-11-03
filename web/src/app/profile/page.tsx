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
  xp: '@user_xp',
  level: '@user_level',
  badges: '@user_badges',
  location: '@user_location',
};

export default function ProfilePage() {
  const [image, setImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Português Br');
  const [theme, setTheme] = useState('Claro');
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState<any>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const router = useRouter();
  const XP_PER_LEVEL = 100;

  useEffect(() => {
    const loadData = async () => {
      // Load user data
      const userData = localStorage.getItem('@logged_in_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Load location data for the logged-in user
        const locationData = localStorage.getItem('@user_location');
        if (locationData) {
          setLocation(JSON.parse(locationData));
        }
      } else {
        router.replace('/');
        return;
      }

      // Load other user preferences
      const storedImage = localStorage.getItem(STORAGE_KEYS.image);
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
      const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
      const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      const storedXP = localStorage.getItem(STORAGE_KEYS.xp);
      const storedLevel = localStorage.getItem(STORAGE_KEYS.level);
      const storedBadges = localStorage.getItem(STORAGE_KEYS.badges);

      if (storedImage) setImage(storedImage);
      if (storedNotifications !== null) setNotifications(JSON.parse(storedNotifications));
      if (storedLanguage) setLanguage(storedLanguage);
      if (storedTheme) setTheme(storedTheme);
      if (storedXP) setXp(parseInt(storedXP));
      if (storedLevel) setLevel(parseInt(storedLevel));
      if (storedBadges) setBadges(JSON.parse(storedBadges));
    };

    loadData();
    addXP(10); // +10 XP por visitar o perfil
  }, [router]);

  const addXP = async (amount: number) => {
    let newXP = xp + amount;
    let newLevel = level;

    while (newXP >= XP_PER_LEVEL) {
      newXP -= XP_PER_LEVEL;
      newLevel += 1;
      alert(`🎉 Subiu de nível! Você agora é nível ${newLevel}!`);
    }

    setXp(newXP);
    setLevel(newLevel);
    localStorage.setItem(STORAGE_KEYS.xp, newXP.toString());
    localStorage.setItem(STORAGE_KEYS.level, newLevel.toString());
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        localStorage.setItem(STORAGE_KEYS.image, result);
        addXP(5); // tirar foto de perfil dá XP!
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
    addXP(5); // muda idioma = +XP
  };

  const toggleTheme = () => {
    const newTheme = theme === 'Claro' ? 'Escuro' : 'Claro';
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.theme, newTheme);
    addXP(5); // muda tema = +XP
  };

  const xpProgress = (xp / XP_PER_LEVEL) * 100;

  const openInMaps = () => {
    if (location) {
      const url = `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`;
      window.open(url, '_blank');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'Claro' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      {/* Header */}
      <div className="relative text-center">
        {/* Notificação Button */}
        <button
          onClick={() => router.push('/notifications')}
          className="absolute top-4 right-5 bg-white p-2 rounded-full shadow-md z-10"
        >
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
          </svg>
        </button>

        <Image
          src="https://i.imgur.com/GYaQl3K.png"
          alt="Header background"
          width={400}
          height={150}
          className="w-full h-36 object-contain"
        />
        
        <div className="relative -mt-12">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Image
              src={image || 'https://i.imgur.com/qkdpN.jpg'}
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
          {user.name || 'Nome não disponível'}
        </h1>

        {/* Gamificação: XP e Level */}
        <p className={`text-lg font-semibold mt-1 ${theme === 'Claro' ? 'text-green-600' : 'text-green-400'}`}>
          Nível {level}
        </p>
        <div className="w-48 h-2 bg-gray-300 rounded-full mx-auto mt-2">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <p className={`text-sm mt-1 ${theme === 'Claro' ? 'text-gray-800' : 'text-gray-300'}`}>
          {xp}/{XP_PER_LEVEL} XP
        </p>

        <button className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center mx-auto mt-2">
          <span className="mr-1">Editar Perfil</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>

      {/* Icon Row */}
      <div className="flex justify-around my-8">
        <IconLabel icon="sync" label="Trocas Pendentes" />
        <IconLabel icon="people" label="Amigos" />
        <IconLabel icon="cart" label="Compras" />
        <IconLabel icon="checkmark-done" label="Concluídos" />
      </div>

      {/* Location Card */}
      {location && (
        <div className={`mx-5 mb-5 p-4 rounded-xl ${theme === 'Claro' ? 'bg-white shadow-md' : 'bg-gray-800'}`}>
          <h3 className={`text-lg font-semibold mb-3 ${theme === 'Claro' ? 'text-gray-900' : 'text-white'}`}>
            Localização
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
            <div className="flex items-center gap-2 bg-green-50 p-2 rounded">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-green-700">{location.address}</span>
            </div>

            {showMap && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">{location.city}</p>
                    <p className="text-sm text-gray-600">{location.region}, {location.country}</p>
                  </div>
                </div>
                <button
                  onClick={openInMaps}
                  className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg p-3 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Visualizar no mapa</span>
                </button>
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-600">
              {location.street && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location.street}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{[location.city, location.region].filter(Boolean).join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{location.country}</span>
              </div>
            </div>

            <button
              onClick={() => setShowMap(!showMap)}
              className="w-full flex items-center justify-center gap-2 py-2 border-t border-gray-200 text-teal-600 font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
            </button>
          </div>
        </div>
      )}

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

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
        <button onClick={() => router.push('/offers')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      {/* Floating Message Button */}
      <button
        onClick={() => router.push('/messages')}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="text-sm font-semibold">Mensagens</span>
      </button>
    </div>
  );
}

const IconLabel = ({ icon, label }: { icon: string; label: string }) => (
  <div className="text-center">
    <svg className="w-7 h-7 mx-auto mb-1 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon === 'sync' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      )}
      {icon === 'people' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      )}
      {icon === 'cart' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      )}
      {icon === 'checkmark-done' && (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      )}
    </svg>
    <p className="text-xs text-center text-gray-800">{label}</p>
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
