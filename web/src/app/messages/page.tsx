'use client';

import { useState } from 'react';
import Image from 'next/image';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const chats = [
  {
    id: '1',
    name: 'Lira Belmond',
    avatar: 'https://i.pravatar.cc/100?img=1',
    lastMessage: 'Este item ainda está disponível?',
  },
  {
    id: '2',
    name: 'Théo Ravencroft',
    avatar: 'https://i.pravatar.cc/100?img=2',
    lastMessage: 'Posso reservar esse produto?',
  },
  {
    id: '3',
    name: 'Isolde Durand',
    avatar: 'https://i.pravatar.cc/100?img=3',
    lastMessage: 'Esse item já foi vendido ou trocado?',
  },
  {
    id: '4',
    name: 'Serenna Valmont',
    avatar: 'https://i.pravatar.cc/100?img=4',
    lastMessage: 'Você tem mais unidades?',
  },
  {
    id: '5',
    name: 'Elara Whitford',
    avatar: 'https://i.pravatar.cc/100?img=5',
    lastMessage: 'Esse produto está disponível para envio?',
  },
  {
    id: '6',
    name: 'Dorian Ashford',
    avatar: 'https://i.pravatar.cc/100?img=6',
    lastMessage: 'Obrigado pela troca!',
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image 
            src="https://i.imgur.com/PBnxUoB.png" 
            alt="Logo" 
            width={100} 
            height={108}
            className="w-12 h-12"
          />
          <h1 className="text-lg font-bold text-gray-900">Mensagens</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {chats.length}
          </div>
          <button className="border border-gray-300 px-2 py-1 rounded-lg text-sm font-bold">
            aA
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mx-4 my-3 bg-gray-100 rounded-lg px-3 py-2">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-gray-900 outline-none"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1">
        {filteredChats.map((chat) => (
          <Link
            key={chat.id}
            href={`/dm/${chat.id}`}
            className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <Image
              src={chat.avatar}
              alt={chat.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h3>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
            </div>
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Tip */}
      <div className="p-4 text-center">
        <p className="text-xs text-gray-700">
          Use mensagens objetivas para facilitar a comunicação.
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
