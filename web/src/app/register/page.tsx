'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/components/GoogleAnalytics';

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState<any>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const getLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);
    try {
      if (!navigator.geolocation) {
        setLocationError('Geolocalização não suportada pelo navegador');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simular dados de endereço (em produção, usar API de geocoding)
          const mockAddress = {
            latitude,
            longitude,
            address: `Localização obtida: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            street: 'Rua Exemplo',
            city: 'São Paulo',
            region: 'SP',
            country: 'Brasil',
            postalCode: '01234-567'
          };
          
          setLocation(mockAddress);
          setShowMap(true);
        },
        (error) => {
          setLocationError('Erro ao obter localização: ' + error.message);
        }
      );
    } catch (error) {
      setLocationError('Erro ao obter localização');
      console.error(error);
    } finally {
      setLocationLoading(false);
    }
  };

  const openInMaps = () => {
    if (location) {
      const url = `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`;
      window.open(url, '_blank');
    }
  };

  const registerUser = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!acceptedTerms) {
      alert('Você precisa aceitar os termos!');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password, // In production, hash this password
          avatar: '/default-avatar.png',
          theme: 'Claro',
          language: 'pt-BR'
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Rastrear evento de registro
        trackEvent('sign_up', {
          method: 'email',
          user_id: userData.id,
        });

        if (location) {
          localStorage.setItem('@user_location', JSON.stringify(location));
        }

        localStorage.removeItem('@logged_in_user');
        alert('Conta criada com sucesso! Faça login para continuar.');
        router.replace('/login');
      } else {
        const error = await response.json();
        alert(error.error || 'Este email já está registrado.');
      }
      
    } catch (err) {
      console.error('Registration error:', err);
      alert('Erro: Não foi possível criar sua conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <button 
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Image
          src="https://i.imgur.com/GYaQl3K.png"
          alt="Logo"
          width={100}
          height={108}
        />
      </div>

      <div className="flex-1 px-6 pb-10">
        <h1 className="text-2xl font-bold text-center my-5 text-gray-900">Crie sua conta</h1>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nome</label>
            <input
              type="text"
              className="w-full bg-gray-100 p-3 rounded-lg text-sm text-gray-900 placeholder-gray-600"
              placeholder="ex: joão silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              className="w-full bg-gray-100 p-3 rounded-lg text-sm text-gray-900 placeholder-gray-600"
              placeholder="ex: joao.silva@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Senha</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="w-full bg-gray-100 p-3 rounded-lg text-sm text-gray-900 pr-12 placeholder-gray-600"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPass ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Confirmar Senha</label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                className="w-full bg-gray-100 p-3 rounded-lg text-sm text-gray-900 pr-12 placeholder-gray-600"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showConfirmPass ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Localização */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Localização</label>
            <button
              onClick={getLocation}
              disabled={locationLoading}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-semibold ${
                locationLoading 
                  ? 'bg-gray-300 text-gray-700' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {locationLoading ? (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location ? 'Atualizar Localização' : 'Obter Localização'}
                </>
              )}
            </button>

            {location && (
              <div className="mt-3 bg-white rounded-lg border border-gray-200 p-3 space-y-3">
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
            )}

            {locationError && (
              <p className="text-red-500 text-sm mt-2">{locationError}</p>
            )}
          </div>

          {/* Termos */}
          <div className="flex items-start gap-2">
            <button
              onClick={() => setAcceptedTerms(!acceptedTerms)}
              className="mt-1"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                {acceptedTerms ? (
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            <p className="text-xs text-gray-600 flex-1">
              Eu aceito os <span className="text-teal-600 font-bold">Termos de Política</span> e{' '}
              <span className="text-teal-600 font-bold">Privacidade.</span>
            </p>
          </div>

          {/* Criar Button */}
          <button
            onClick={registerUser}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-sm"
          >
            Criar
          </button>
        </div>

        {/* Social logins */}
        <p className="text-center text-sm text-gray-600 mt-6 mb-3">Crie sua conta com:</p>
        <div className="flex justify-center gap-5 mb-6">
          <Image
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            width={36}
            height={36}
          />
          <Image
            src="https://img.icons8.com/fluency/48/facebook-new.png"
            alt="Facebook"
            width={36}
            height={36}
          />
          <Image
            src="https://img.icons8.com/ios-glyphs/60/github.png"
            alt="GitHub"
            width={36}
            height={36}
          />
        </div>

        <p className="text-center text-sm text-gray-700 mb-2">
          Acesse sua conta para começar a trocar
        </p>
        <Link href="/login" className="block text-center text-teal-600 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
}
