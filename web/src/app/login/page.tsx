'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/components/GoogleAnalytics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const data = localStorage.getItem('@logged_in_user');
      if (data) {
        router.replace('/profile');
      }
    };
    checkLoggedIn();
  }, [router]);

  const login = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        
        localStorage.setItem('@logged_in_user', JSON.stringify(userData));
        localStorage.setItem('@theme', userData.theme || 'Claro');
        localStorage.setItem('@language', userData.language || 'pt-BR');
        localStorage.setItem('@profile_image', userData.avatar || '/default-avatar.png');
        
        // Rastrear evento de login
        trackEvent('login', {
          method: 'email',
          user_id: userData.id,
        });
        
        alert('Login realizado com sucesso!');
        router.push('/profile');
      } else {
        const error = await response.json();
        alert(error.error || 'Email ou senha inválidos!');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer login.');
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
        <h1 className="text-2xl font-bold text-center my-5 text-gray-900">Login</h1>

        {/* Email */}
        <div className="mb-4">
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
        <div className="mb-4">
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

        <button className="text-right text-sm text-gray-700 mb-5">
          Esqueceu a senha?
        </button>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-sm mb-6"
        >
          Login
        </button>

        {/* Social login */}
        <p className="text-center text-sm text-gray-600 mb-3">Ou faça Login com:</p>
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

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mb-2">
          Novo por aqui? Crie sua conta gratuitamente.
        </p>
        <Link href="/register" className="block text-center text-teal-600 font-semibold">
          CADASTRE-SE
        </Link>
      </div>
    </div>
  );
}
