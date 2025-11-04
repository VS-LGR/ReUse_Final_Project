'use client';

import { useState } from 'react';
import Image from 'next/image';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/components/GoogleAnalytics';

export default function AddOfferPage() {
  const [offerName, setOfferName] = useState('');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [desiredItem, setDesiredItem] = useState('');
  const [condition, setCondition] = useState('Novo');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem é muito grande. Máximo: 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Criar FormData para upload
      const formData = new FormData();
      formData.append('file', file);

      // Tentar upload para Supabase primeiro, depois fallback para local
      let uploadUrl = '/api/upload/supabase';
      let response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      // Se Supabase falhar, usar upload local
      if (!response.ok) {
        console.log('Supabase não disponível, usando upload local');
        uploadUrl = '/api/upload';
        response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error('Erro ao fazer upload');
      }

      const data = await response.json();
      setProductImage(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!offerName || !description || !desiredItem) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      // Buscar usuário logado
      const userData = localStorage.getItem('@logged_in_user');
      if (!userData) {
        alert('Você precisa estar logado para criar uma oferta');
        router.push('/login');
        return;
      }

      const user = JSON.parse(userData);

      // Criar oferta via API
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: offerName,
          description,
          image: productImage || '/logo-placeholder.svg',
          desiredItem,
          condition,
          price: price || 'A negociar',
          category: 'outros',
          ownerId: user.id
        }),
      });

      if (response.ok) {
        const newOffer = await response.json();
        
        // Rastrear evento de criação de oferta
        trackEvent('create_offer', {
          offer_id: newOffer.id,
          category: newOffer.category,
          user_id: user.id,
        });
        
        alert('Oferta criada com sucesso!');
        router.push(`/product/${newOffer.id}`);
      } else {
        throw new Error('Failed to create offer');
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Erro ao criar oferta. Tente novamente.');
    }
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
        <h1 className="text-lg font-semibold text-gray-900">Criar Oferta</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto do Produto *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
            {uploadingImage ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-2"></div>
                <p className="text-gray-500 text-sm">Enviando imagem...</p>
              </div>
            ) : productImage ? (
              <div className="relative">
                <Image
                  src={productImage}
                  alt="Product"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg object-cover"
                />
                <button
                  onClick={() => setProductImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-sm">Clique para adicionar foto</p>
                <p className="text-gray-400 text-xs mt-1">Máximo: 5MB</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>

        {/* Offer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Oferta *
          </label>
          <input
            type="text"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
            placeholder="ex: Peças de Brinquedo Infantil Numeros Educativo"
            className="w-full bg-white p-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o produto, condição, quando foi comprado, etc."
            rows={4}
            className="w-full bg-white p-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Desired Item */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Item Desejado em Troca *
          </label>
          <input
            type="text"
            value={desiredItem}
            onChange={(e) => setDesiredItem(e.target.value)}
            placeholder="ex: Livros, Roupas, Eletrônicos, etc."
            className="w-full bg-white p-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Condição
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-white p-3 rounded-lg border border-gray-300 text-sm text-gray-900"
          >
            <option value="Novo">Novo</option>
            <option value="Seminovo">Seminovo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (opcional)
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ex: R$ 40,00"
            className="w-full bg-white p-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-sm"
        >
          Criar Oferta
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
