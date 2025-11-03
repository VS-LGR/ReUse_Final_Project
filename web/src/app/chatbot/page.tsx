'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
  typing?: boolean
}

// Conversas hardcoded do chatbot
const botResponses: Record<string, string[]> = {
  greetings: [
    'Olá! 👋 Bem-vindo ao ReUse! Sou o assistente virtual e estou aqui para ajudar você.',
    'Oi! 😊 Como posso ajudar você hoje no ReUse?',
    'Olá! Seja bem-vindo! Estou aqui para tirar suas dúvidas sobre a plataforma.',
  ],
  help: [
    'Claro! Posso ajudar você com:\n\n• Como criar uma oferta\n• Como fazer uma troca\n• Como encontrar produtos\n• Como entrar em contato com outros usuários\n• Como usar a plataforma\n\nO que você gostaria de saber?',
  ],
  offer: [
    'Para criar uma oferta, você precisa:\n\n1. Fazer login na plataforma\n2. Clicar no botão "+" no menu inferior\n3. Adicionar foto do produto\n4. Preencher nome, descrição e detalhes\n5. Clicar em "Criar Oferta"\n\nÉ bem simples! Precisa de mais alguma ajuda?',
  ],
  trade: [
    'Para fazer uma troca:\n\n1. Navegue pelas ofertas disponíveis\n2. Clique no produto que te interessou\n3. Envie uma mensagem para o vendedor\n4. Negocie os detalhes da troca\n5. Combine encontro ou envio\n\nQuer saber mais sobre alguma etapa específica?',
  ],
  search: [
    'Para encontrar produtos:\n\n• Use a barra de pesquisa na página inicial\n• Navegue pelas categorias (Eletrônicos, Roupas, Livros, etc.)\n• Filtre por condição, preço ou localização\n• Salve favoritos para ver depois\n\nConseguiu encontrar o que procura?',
  ],
  contact: [
    'Para entrar em contato com outros usuários:\n\n1. Acesse o perfil do vendedor\n2. Clique em "Enviar Mensagem"\n3. Ou use o chat direto na página do produto\n4. Suas conversas ficam salvas em "Mensagens"\n\nTem alguma dúvida sobre como usar o chat?',
  ],
  platform: [
    'O ReUse é uma plataforma de trocas sustentáveis onde você pode:\n\n✅ Trocar produtos que não usa mais\n✅ Encontrar itens novos sem gastar dinheiro\n✅ Contribuir para o meio ambiente\n✅ Conectar-se com pessoas da sua região\n\nQuer saber mais sobre alguma funcionalidade específica?',
  ],
  default: [
    'Entendo! Posso ajudar você com:\n\n• Como criar ofertas\n• Como fazer trocas\n• Como usar a plataforma\n• Como encontrar produtos\n• Como entrar em contato\n\nO que você gostaria de saber?',
    'Não entendi completamente, mas posso ajudar com:\n\n📦 Criar ofertas\n🔄 Fazer trocas\n🔍 Encontrar produtos\n💬 Usar o chat\n\nMe diga qual dessas opções te interessa!',
  ],
}

export default function ChatbotPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! 👋 Bem-vindo ao ReUse! Sou o assistente virtual e estou aqui para ajudar você com dúvidas sobre a plataforma. Como posso ajudar?',
      sender: 'bot',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Detectar intenção
    if (message.includes('oi') || message.includes('olá') || message.includes('ola') || message.includes('hello')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)]
    }

    if (
      message.includes('ajuda') ||
      message.includes('help') ||
      message.includes('preciso') ||
      message.includes('dúvida') ||
      message.includes('duvida')
    ) {
      return botResponses.help[0]
    }

    if (
      message.includes('oferta') ||
      message.includes('anúncio') ||
      message.includes('anuncio') ||
      message.includes('publicar') ||
      message.includes('criar')
    ) {
      return botResponses.offer[0]
    }

    if (
      message.includes('troca') ||
      message.includes('trocar') ||
      message.includes('negociar') ||
      message.includes('troco')
    ) {
      return botResponses.trade[0]
    }

    if (
      message.includes('procurar') ||
      message.includes('encontrar') ||
      message.includes('buscar') ||
      message.includes('pesquisar') ||
      message.includes('produto')
    ) {
      return botResponses.search[0]
    }

    if (
      message.includes('contato') ||
      message.includes('mensagem') ||
      message.includes('chat') ||
      message.includes('falar') ||
      message.includes('conversar')
    ) {
      return botResponses.contact[0]
    }

    if (
      message.includes('plataforma') ||
      message.includes('reuse') ||
      message.includes('como funciona') ||
      message.includes('o que é')
    ) {
      return botResponses.platform[0]
    }

    // Resposta padrão
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular delay do bot pensando
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 segundos
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    { text: 'Como criar uma oferta?', action: 'criar oferta' },
    { text: 'Como fazer uma troca?', action: 'fazer troca' },
    { text: 'Como encontrar produtos?', action: 'encontrar produtos' },
    { text: 'Como usar a plataforma?', action: 'como usar a plataforma' },
  ]

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
    setTimeout(() => {
      sendMessage()
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Assistente ReUse</h1>
            <p className="text-xs text-gray-500">Online agora</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <p className="text-xs text-gray-600 mb-2">Perguntas rápidas:</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium hover:bg-green-100 transition-colors"
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                  {message.time}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-green-500 transition-all">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              rows={1}
              className="w-full bg-transparent text-gray-900 placeholder-gray-500 resize-none outline-none text-sm max-h-32 overflow-y-auto"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
