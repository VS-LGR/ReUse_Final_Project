'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const notifications = [
  {
    id: 1,
    type: 'trade_request',
    title: 'Nova solicitação de troca',
    message: 'Lira Belmond quer trocar seu livro por um item dela',
    time: '2 min atrás',
    read: false,
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: 2,
    type: 'message',
    title: 'Nova mensagem',
    message: 'Théo Ravencroft enviou uma mensagem sobre o produto',
    time: '15 min atrás',
    read: false,
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    id: 3,
    type: 'trade_accepted',
    title: 'Troca aceita!',
    message: 'Sua troca com Isolde Durand foi confirmada',
    time: '1 hora atrás',
    read: true,
    avatar: 'https://i.pravatar.cc/100?img=3'
  },
  {
    id: 4,
    type: 'level_up',
    title: 'Parabéns!',
    message: 'Você subiu para o nível 3! Continue trocando para ganhar mais XP',
    time: '2 horas atrás',
    read: true,
    avatar: null
  },
  {
    id: 5,
    type: 'product_viewed',
    title: 'Seu produto foi visualizado',
    message: '5 pessoas visualizaram seu anúncio de guitarra',
    time: '3 horas atrás',
    read: true,
    avatar: null
  },
  {
    id: 6,
    type: 'trade_completed',
    title: 'Troca finalizada',
    message: 'A troca com Dorian Ashford foi concluída com sucesso!',
    time: '1 dia atrás',
    read: true,
    avatar: 'https://i.pravatar.cc/100?img=6'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'trade_request':
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'message':
      return (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'trade_accepted':
    case 'trade_completed':
      return (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'level_up':
      return (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    case 'product_viewed':
      return (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
        </svg>
      );
  }
};

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const router = useRouter();

  const unreadCount = notificationList.filter(n => !n.read).length;

  const filteredNotifications = filter === 'unread' 
    ? notificationList.filter(n => !n.read)
    : notificationList;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Notificações</h1>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-teal-600 text-sm font-semibold"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'all' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Todas ({notificationList.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'unread' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Não lidas ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
            </svg>
            <p className="text-gray-700 text-lg font-medium">Nenhuma notificação</p>
            <p className="text-gray-600 text-sm">Você está em dia! 🎉</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`bg-white rounded-lg p-4 border-l-4 ${
                notification.read 
                  ? 'border-gray-200' 
                  : 'border-teal-500 bg-teal-50'
              } cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                {notification.avatar ? (
                  <Image
                    src={notification.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm ${
                      notification.read ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    notification.read ? 'text-gray-600' : 'text-gray-800'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">{notification.time}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {getNotificationIcon(notification.type)}
                  {!notification.read && (
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
        <button onClick={() => router.push('/offers')}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <button 
          onClick={() => router.push('/add-offer')}
          className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button onClick={() => router.push('/notifications')} className="relative">
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 102.828 2.828L10.828 12H4.828V7z" />
          </svg>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{unreadCount}</span>
            </div>
          )}
        </button>
        <button onClick={() => router.push('/profile')}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
