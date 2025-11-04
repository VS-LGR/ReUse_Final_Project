'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import BottomNavigation from '@/components/BottomNavigation';
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
  { id: 'livros', name: 'Livros', icon: '📚' },
  { id: 'esportes', name: 'Esportes', icon: '⚽' },
  { id: 'musica', name: 'Música', icon: '🎵' },
  { id: 'jogos', name: 'Jogos', icon: '🎮' },
  { id: 'automoveis', name: 'Automóveis', icon: '🚗' },
  { id: 'bicicletas', name: 'Bicicletas', icon: '🚲' },
  { id: 'ferramentas', name: 'Ferramentas', icon: '🔧' },
  { id: 'decoracao', name: 'Decoração', icon: '🖼️' },
  { id: 'outros', name: 'Outros', icon: '📦' },
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredOffers = offers.filter(offer => {
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getConditionColor = (condition: string) => {
    switch (condition.toUpperCase()) {
      case 'NOVO': return 'text-green-600';
      case 'SEMI NOVA':
      case 'SEMINOVO': return 'text-blue-600';
      case 'USADO': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex flex-col items-center gap-2 min-w-16 ${
              selectedCategory === 'all' ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              selectedCategory === 'all' ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              🏠
            </div>
            <span className="text-xs text-gray-900 font-medium text-center">Todos</span>
          </button>
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
        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">
              {searchQuery ? 'Nenhum produto encontrado para sua busca.' : 'Nenhuma oferta disponível nesta categoria.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-green-600 font-semibold hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredOffers.map(offer => (
              <Link
                key={offer.id}
                href={`/product/${offer.id}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="aspect-square relative bg-gray-100">
                  <OptimizedImage
                    src={offer.image || '/logo-placeholder.svg'}
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
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
