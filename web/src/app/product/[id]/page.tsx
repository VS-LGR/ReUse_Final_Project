'use client';

import { useState, useEffect, use } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/components/GoogleAnalytics';

interface Product {
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
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/offers/${resolvedParams.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          
          // Rastrear visualização de produto
          trackEvent('view_product', {
            product_id: data.id,
            product_name: data.name,
            category: data.category,
          });
        } else {
          // Produto não encontrado, redirecionar
          router.push('/offers');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Produto não encontrado, redirecionar
        router.push('/offers');
      }
    };

    fetchProduct();
  }, [resolvedParams.id, router]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleRequestExchange = () => {
    // Simular solicitação de troca
    alert('Solicitação de troca enviada! O proprietário será notificado.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-4">
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

      {/* Product Image */}
      <div className="bg-white">
        <OptimizedImage
          src={product.image || '/logo-placeholder.svg'}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="bg-white p-4 space-y-4 pb-20">
        {/* Title and Actions */}
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsLiked(!isLiked)}>
              <svg className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button onClick={() => setIsBookmarked(!isBookmarked)}>
              <svg className={`w-6 h-6 ${isBookmarked ? 'text-blue-500 fill-current' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Condition */}
        <p className="text-sm text-gray-500">{product.condition}</p>

        {/* Price */}
        <p className="text-2xl font-bold text-green-600">{product.price}</p>

        {/* Condition and Rating */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Detalhes</h2>
          <p className="text-sm text-gray-600 mb-1">Condição: {product.condition}</p>
          <p className="text-sm text-gray-600 mb-1">Avaliação: {product.rating}/10</p>
        </div>

        {/* Description Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h2>
          <div className="space-y-2 text-sm text-gray-900">
            <p>{product.description}</p>
            <p className="font-medium">Dono: {product.owner.name}</p>
            <p className="text-gray-500">Publicado em: {new Date(product.createdAt).toLocaleDateString('pt-BR')}</p>
            <p className="font-medium">Deseja trocar por: {product.desiredItem}</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-4">
            Interessado? Converse com o dono agora
          </p>
          <button
            onClick={handleRequestExchange}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-sm"
          >
            Solicitar Troca
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
