'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Login Button */}
        <Link 
          href="/login"
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Welcome Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Bem-vindo ao ReUse!
        </h1>

        {/* Illustration */}
        <div className="mb-8 relative">
          {/* Left Person */}
          <div className="absolute left-0 top-0 w-20 h-32">
            <div className="w-16 h-20 bg-yellow-400 rounded-t-full relative">
              {/* Head */}
              <div className="w-12 h-12 bg-yellow-300 rounded-full absolute -top-2 left-2"></div>
              {/* Hair */}
              <div className="w-14 h-8 bg-amber-800 rounded-full absolute -top-1 left-1"></div>
              {/* Body */}
              <div className="w-16 h-12 bg-yellow-400 absolute top-8"></div>
            </div>
            {/* Bag */}
            <div className="w-8 h-10 bg-white border-2 border-green-500 rounded-lg absolute top-16 -right-2">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mt-2"></div>
            </div>
            {/* Speech bubble */}
            <div className="absolute -top-8 left-4 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Center Item */}
          <div className="w-24 h-32 mx-auto relative">
            {/* Shirt on hanger */}
            <div className="w-20 h-16 bg-white border-2 border-gray-300 rounded-lg mx-auto relative">
              {/* Collar */}
              <div className="w-16 h-4 bg-white border border-gray-300 rounded-t-lg mx-auto mt-2"></div>
              {/* Buttons */}
              <div className="absolute right-2 top-6 space-y-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            {/* Hanger */}
            <div className="w-16 h-2 bg-gray-400 mx-auto mt-2"></div>
            {/* Plants around */}
            <div className="absolute -left-2 top-8 w-4 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute -right-2 top-12 w-3 h-4 bg-green-400 rounded-full"></div>
            <div className="absolute left-2 -bottom-2 w-3 h-3 bg-orange-400 rounded-full"></div>
            <div className="absolute right-2 -bottom-1 w-2 h-2 bg-orange-300 rounded-full"></div>
            {/* Speech bubble */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Right Person */}
          <div className="absolute right-0 top-0 w-20 h-32">
            <div className="w-16 h-20 bg-green-400 rounded-t-full relative">
              {/* Head */}
              <div className="w-12 h-12 bg-yellow-300 rounded-full absolute -top-2 left-2"></div>
              {/* Hair */}
              <div className="w-14 h-8 bg-gray-800 rounded-full absolute -top-1 left-1"></div>
              {/* Body */}
              <div className="w-16 h-12 bg-green-400 absolute top-8"></div>
            </div>
            {/* Bag */}
            <div className="w-8 h-10 bg-white border-2 border-green-500 rounded-lg absolute top-16 -left-2">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

          {/* Background plants */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-4 top-16 w-6 h-8 bg-green-300 rounded-full"></div>
            <div className="absolute right-4 top-20 w-4 h-6 bg-green-400 rounded-full"></div>
            <div className="absolute left-8 bottom-4 w-5 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute right-8 bottom-2 w-4 h-5 bg-green-300 rounded-full"></div>
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-xl font-bold text-gray-900 mb-12">
          Dê uma nova vida aos seus objetos
        </h2>

        {/* Register Button */}
        <Link 
          href="/register"
          className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg w-full max-w-xs"
        >
          Cadastre-se aqui
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6">
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <Link href="/login" className="hover:text-green-600">Já tem conta? Faça login</Link>
        </div>
      </div>
    </div>
  );
}