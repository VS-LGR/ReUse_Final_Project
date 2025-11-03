'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddOfferPage() {
  const [offerName, setOfferName] = useState('');
  const [description, setDescription] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [desiredItem, setDesiredItem] = useState('');
  const [condition, setCondition] = useState('Novo');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProductImage(result);
      };
      reader.readAsDataURL(file);
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
            {productImage ? (
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
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
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
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
        <button onClick={() => router.push('/offers')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button onClick={() => router.push('/messages')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button onClick={() => router.push('/notifications')}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
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
