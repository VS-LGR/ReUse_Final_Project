'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Offer {
  id: string;
  name: string;
  description: string;
  image: string;
  desiredItem: string;
  condition: string;
  price: string;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  category: string;
  rating: number;
}

const categories = [
  { id: 'eletronicos', name: 'Eletrônicos', icon: '📱' },
  { id: 'roupas', name: 'Roupas', icon: '👕' },
  { id: 'casa-construcao', name: 'Casa e Construção', icon: '🏠' },
  { id: 'brinquedos', name: 'Brinquedos', icon: '🧸' },
  { id: 'papelaria', name: 'Papelaria', icon: '📝' },
  { id: 'sapatos', name: 'Sapatos', icon: '👟' },
];

const mockOffers: Offer[] = [
  {
    id: '1',
    name: 'AirPods Pro 2ª Geração',
    description: 'Fones de ouvido sem fio com cancelamento de ruído ativo. Funcionando perfeitamente, apenas alguns arranhões na caixa. Inclui carregador e cabo original.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Eletrônicos, Smartwatch, Fones',
    condition: 'USADO',
    price: 'R$ 60,00',
    owner: { id: '1', name: 'João Silva', avatar: '/default-avatar.png' },
    createdAt: '2024-01-15',
    category: 'eletronicos',
    rating: 6
  },
  {
    id: '2',
    name: 'Cadeira Gamer Ergonômica',
    description: 'Cadeira de escritório com apoio lombar ajustável. Estofamento em couro sintético, base giratória e rodinhas. Ideal para home office.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Móveis, Mesa, Monitor',
    condition: 'USADO',
    price: 'R$ 90,00',
    owner: { id: '2', name: 'Maria Santos', avatar: '/default-avatar.png' },
    createdAt: '2024-01-14',
    category: 'casa-construcao',
    rating: 4
  },
  {
    id: '3',
    name: 'Blusa Adidas Originals',
    description: 'Blusa esportiva Adidas em ótimo estado. Tecido respirável, tamanho M. Usada poucas vezes, sem manchas ou desgaste.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Roupas, Tênis, Acessórios',
    condition: 'SEMI NOVA',
    price: 'R$ 120,00',
    owner: { id: '3', name: 'Pedro Costa', avatar: '/default-avatar.png' },
    createdAt: '2024-01-13',
    category: 'roupas',
    rating: 9
  },
  {
    id: '4',
    name: 'Blusa de Frio Zara',
    description: 'Blusa de frio confortável da Zara. Cor bege, tamanho P. Tecido macio e quente, perfeita para o inverno.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Roupas, Jaqueta, Cachecol',
    condition: 'USADO',
    price: 'R$ 40,00',
    owner: { id: '4', name: 'Ana Lima', avatar: '/default-avatar.png' },
    createdAt: '2024-01-12',
    category: 'roupas',
    rating: 7
  },
  {
    id: '5',
    name: 'Patinhos de Borracha Infantis',
    description: 'Conjunto de 6 patinhos de borracha coloridos para banho. Brinquedos educativos que estimulam a coordenação motora das crianças.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Brinquedos, Livros Infantis',
    condition: 'NOVO',
    price: 'R$ 20,00',
    owner: { id: '5', name: 'Carlos Oliveira', avatar: '/default-avatar.png' },
    createdAt: '2024-01-11',
    category: 'brinquedos',
    rating: 10
  },
  {
    id: '6',
    name: 'Mesa de Madeira Maciça',
    description: 'Mesa de madeira maciça de demolição. Superfície lisa, pernas robustas. Ideal para escritório ou sala de jantar. Dimensões: 120x80cm.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Móveis, Cadeiras, Decoração',
    condition: 'SEMI NOVA',
    price: 'R$ 150,00',
    owner: { id: '6', name: 'Lucia Ferreira', avatar: '/default-avatar.png' },
    createdAt: '2024-01-10',
    category: 'casa-construcao',
    rating: 8
  },
  {
    id: '7',
    name: 'Peças de Brinquedo Educativo',
    description: 'Conjunto completo de blocos numerados educativos. Madeira natural, números de 1 a 10. Perfeito para desenvolvimento cognitivo infantil.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Brinquedos, Livros, Material Escolar',
    condition: 'NOVO',
    price: 'R$ 40,00',
    owner: { id: '7', name: 'Lucas Gabriel', avatar: '/default-avatar.png' },
    createdAt: '2024-01-09',
    category: 'brinquedos',
    rating: 10
  },
  {
    id: '8',
    name: 'Tênis Nike Air Max',
    description: 'Tênis esportivo Nike Air Max para corrida. Tamanho 42, cor preta e branca. Solado em bom estado, ideal para atividades físicas.',
    image: '/logo-placeholder.svg',
    desiredItem: 'Calçados, Roupas Esportivas',
    condition: 'USADO',
    price: 'R$ 85,00',
    owner: { id: '8', name: 'Roberto Alves', avatar: '/default-avatar.png' },
    createdAt: '2024-01-08',
    category: 'sapatos',
    rating: 8
  }
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [location, setLocation] = useState('São Paulo - Brasil');
  const router = useRouter();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        } else {
          // Fallback para mockOffers se a API falhar
          setOffers(mockOffers);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
        // Fallback para mockOffers se houver erro
        setOffers(mockOffers);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'NOVO': return 'text-green-600';
      case 'SEMI NOVA': return 'text-blue-600';
      case 'USADO': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900"
          >
            <option value="all">Categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Location Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-900 font-medium">{location}</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-800 font-medium">
          Filtre por categoria e encontre o que precisa.
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Categorias 15+</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center gap-2 min-w-16 ${
                selectedCategory === category.id ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                selectedCategory === category.id ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {category.icon}
              </div>
              <span className="text-xs text-gray-900 font-medium text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Offers Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredOffers.map(offer => (
            <Link
              key={offer.id}
              href={`/product/${offer.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={offer.image}
                  alt={offer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                  {offer.name}
                </h3>
                <p className="text-lg font-bold text-green-600 mb-1">{offer.price}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${getConditionColor(offer.condition)}`}>
                    {offer.condition}
                  </span>
                  <span className="text-xs text-gray-700 font-medium">
                    {offer.rating}/10
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
        <button className="text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button onClick={() => router.push('/messages')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button onClick={() => router.push('/add-offer')} className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button onClick={() => router.push('/notifications')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button onClick={() => router.push('/profile')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
