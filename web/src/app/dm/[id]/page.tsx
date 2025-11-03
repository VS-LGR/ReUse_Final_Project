'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const mockMessages = {
  '1': [
    { id: 1, text: 'Olá! Vi seu anúncio sobre o livro. Ainda está disponível?', sender: 'other', time: '10:30' },
    { id: 2, text: 'Sim, ainda está! É um livro muito bom sobre programação.', sender: 'me', time: '10:32' },
    { id: 3, text: 'Perfeito! Posso trocar por um livro de design que tenho aqui?', sender: 'other', time: '10:35' },
    { id: 4, text: 'Claro! Me manda uma foto do livro de design?', sender: 'me', time: '10:36' },
  ],
  '2': [
    { id: 1, text: 'Oi! Vi que você tem uma guitarra para trocar. Posso reservar?', sender: 'other', time: '09:15' },
    { id: 2, text: 'Sim, pode reservar! Qual instrumento você tem para trocar?', sender: 'me', time: '09:18' },
  ],
  '3': [
    { id: 1, text: 'Esse item já foi vendido ou trocado?', sender: 'other', time: '14:20' },
    { id: 2, text: 'Ainda está disponível! Interessado?', sender: 'me', time: '14:22' },
  ],
  '4': [
    { id: 1, text: 'Você tem mais unidades desse produto?', sender: 'other', time: '16:45' },
    { id: 2, text: 'Tenho sim! Quantas você precisa?', sender: 'me', time: '16:47' },
  ],
  '5': [
    { id: 1, text: 'Esse produto está disponível para envio?', sender: 'other', time: '11:30' },
    { id: 2, text: 'Sim, posso enviar! Qual seu CEP?', sender: 'me', time: '11:32' },
  ],
  '6': [
    { id: 1, text: 'Obrigado pela troca! Foi ótimo negociar com você.', sender: 'other', time: '18:00' },
    { id: 2, text: 'De nada! Foi um prazer!', sender: 'me', time: '18:01' },
  ],
};

const chatUsers = {
  '1': { name: 'Lira Belmond', avatar: 'https://i.pravatar.cc/100?img=1' },
  '2': { name: 'Théo Ravencroft', avatar: 'https://i.pravatar.cc/100?img=2' },
  '3': { name: 'Isolde Durand', avatar: 'https://i.pravatar.cc/100?img=3' },
  '4': { name: 'Serenna Valmont', avatar: 'https://i.pravatar.cc/100?img=4' },
  '5': { name: 'Elara Whitford', avatar: 'https://i.pravatar.cc/100?img=5' },
  '6': { name: 'Dorian Ashford', avatar: 'https://i.pravatar.cc/100?img=6' },
};

export default function DMPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const chatId = params.id;
  const user = chatUsers[chatId as keyof typeof chatUsers];

  useEffect(() => {
    const chatMessages = mockMessages[chatId as keyof typeof mockMessages] || [];
    setMessages(chatMessages);
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Conversa não encontrada</p>
          <button 
            onClick={() => router.push('/messages')}
            className="mt-4 text-teal-600 font-semibold"
          >
            Voltar para mensagens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <button 
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Image
          src={user.avatar}
          alt={user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-green-600">Online</p>
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-teal-100' : 'text-gray-700'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-900 outline-none"
          />
          <button
            onClick={sendMessage}
            className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
