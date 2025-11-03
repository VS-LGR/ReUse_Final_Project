# Acesso ao Painel Admin do Node-RED

## Status

✅ **O painel administrativo do Node-RED ainda está disponível e funcional!**

## Como Acessar

### 1. Iniciar o Node-RED

No terminal, na raiz do projeto:

```bash
cd node-red-admin
npm install  # Se ainda não instalou as dependências
npm start
# OU
node start.js
```

O Node-RED será iniciado na porta **1880** por padrão.

### 2. Acessar o Painel Admin

Após iniciar, acesse:

- **Login Admin**: http://localhost:1880/admin
- **Dashboard**: http://localhost:1880/admin/dashboard
- **Gerenciar Usuários**: http://localhost:1880/admin/users
- **Gerenciar Ofertas**: http://localhost:1880/admin/offers

### 3. Credenciais Padrão

- **Usuário**: `admin`
- **Senha**: `admin123`

(Verifique em `node-red-admin/api/admin-auth.js` se foi alterado)

## Nota Importante

⚠️ **O Node-RED NÃO funciona no Vercel** (ambiente serverless).

- ✅ **Localmente**: Funciona perfeitamente
- ❌ **Produção (Vercel)**: Não funciona

Por isso, criamos as páginas admin em Next.js (`/admin/*`) que funcionam no Vercel.

## Comparação

### Node-RED Admin (Local)
- URL: http://localhost:1880/admin/*
- Requer: Node-RED rodando localmente
- Funciona: ✅ Localmente
- Funciona: ❌ Vercel

### Next.js Admin (Produção)
- URL: https://seu-projeto.vercel.app/admin/*
- Requer: Apenas Next.js
- Funciona: ✅ Localmente
- Funciona: ✅ Vercel

## Usar Ambas as Opções

Você pode usar:
- **Node-RED Admin** para desenvolvimento/testes locais
- **Next.js Admin** para produção no Vercel

Ambas acessam o mesmo banco de dados (Supabase PostgreSQL).

## Troubleshooting

### Erro: "Cannot GET /admin"
- Verifique se o Node-RED está rodando
- Verifique se está acessando http://localhost:1880 (não 3000)

### Erro: "API não responde"
- Verifique se a API do Next.js está rodando (http://localhost:3000)
- O Node-RED faz proxy para a API do Next.js

### Porta 1880 já em uso
- Altere a porta em `node-red-admin/settings.js`
- Ou use: `npx node-red --userDir ./data --port 1881`
