# ReUse - Versão Web (Next.js)

Esta é a versão web do aplicativo ReUse, construída com Next.js 15 e Tailwind CSS.

## 🚀 Funcionalidades

- **Perfil do Usuário**: Upload de foto de perfil, edição de informações
- **Configurações**: Notificações, idioma e tema (claro/escuro)
- **Interface Responsiva**: Design adaptado para desktop e mobile
- **Armazenamento Local**: Persistência de configurações no localStorage
- **Tema Dinâmico**: Alternância entre tema claro e escuro

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React para produção
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **React Hooks**: useState, useEffect para gerenciamento de estado

## 📦 Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 📁 Estrutura do Projeto

```
web/
├── src/
│   └── app/
│       ├── globals.css      # Estilos globais
│       ├── layout.tsx       # Layout principal
│       └── page.tsx         # Página inicial
├── public/
│   └── default-avatar.png   # Avatar padrão
└── package.json
```

## 🎨 Componentes

### Home
- **Header**: Foto de perfil, nome do usuário, botão de edição
- **IconRow**: Ícones de navegação (Trocas, Amigos, Compras, etc.)
- **SettingsCard**: Configurações de notificações, idioma e tema
- **BottomBar**: Barra de navegação inferior

### Funcionalidades
- **Upload de Imagem**: Clique na foto para trocar o avatar
- **Configurações Interativas**: Clique nos valores para alternar
- **Tema Dinâmico**: Alternância entre claro e escuro
- **Persistência**: Configurações salvas no localStorage

## 🔧 Configuração

O projeto está configurado para:
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **ESLint**: Linting de código
- **App Router**: Roteamento do Next.js 13+

## 📱 Responsividade

A interface é totalmente responsiva e funciona bem em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🚀 Deploy

Para fazer deploy em produção:

1. **Build do projeto:**
   ```bash
   npm run build
   ```

2. **Deploy na Vercel (recomendado):**
   ```bash
   npx vercel
   ```

3. **Deploy em outros provedores:**
   - Netlify
   - AWS Amplify
   - Railway
   - Heroku

## 🔗 Integração com Mobile

Esta versão web funciona em conjunto com a versão mobile (Expo/React Native) do ReUse, compartilhando:
- Mesma identidade visual
- Funcionalidades similares
- Experiência de usuário consistente