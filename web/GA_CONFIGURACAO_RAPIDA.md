# ⚡ Configuração Rápida do Google Analytics

## ✅ Você já tem o ID: `G-Z10Y6M3MX4`

**IMPORTANTE:** Você **NÃO precisa** copiar e colar o código JavaScript no HTML! O componente já está implementado e faz isso automaticamente.

---

## 📝 O que fazer agora:

### 1️⃣ Para Desenvolvimento Local

Crie ou edite o arquivo `web/.env.local` e adicione:

```env
NEXT_PUBLIC_GA_ID=G-Z10Y6M3MX4
```

**Exemplo completo do `.env.local`:**
```env
DATABASE_URL="sua_database_url_aqui"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_GA_ID=G-Z10Y6M3MX4
```

Após adicionar, **reinicie o servidor de desenvolvimento:**
```bash
cd web
npm run dev
```

---

### 2️⃣ Para Produção (Vercel) - **IMPORTANTE!**

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto **ReUse**
3. Vá em **"Settings"** → **"Environment Variables"**
4. Clique em **"Add New"**
5. Preencha:
   - **Name:** `NEXT_PUBLIC_GA_ID`
   - **Value:** `G-Z10Y6M3MX4`
   - **Environment:** 
     - ✅ Marque **"Production"**
     - ✅ Marque **"Preview"** (opcional, para testar em preview)
     - ✅ Marque **"Development"** (opcional)
6. Clique em **"Save"**
7. **⚠️ CRUCIAL:** Faça um **Redeploy**:
   - Vá em **"Deployments"**
   - Clique nos **três pontos** (⋯) do último deploy
   - Selecione **"Redeploy"**
   - Aguarde o deploy terminar

---

## ✅ Como verificar se está funcionando:

### Método 1: Tempo Real no Google Analytics
1. Acesse [Google Analytics](https://analytics.google.com)
2. Vá em **"Relatórios"** → **"Tempo real"**
3. Acesse seu site em outra aba
4. Você deve ver sua visita aparecer nos gráficos em alguns segundos

### Método 2: DebugView (mais preciso)
1. No Google Analytics, vá em **"Admin"** → **"Propriedade"** → **"DebugView"**
2. Acesse seu site
3. Você verá eventos aparecendo em tempo real

### Método 3: Console do Navegador
1. Abra seu site
2. Pressione **F12** para abrir DevTools
3. Vá na aba **"Console"**
4. Digite: `window.gtag`
5. Se aparecer uma função, está funcionando! ✅

---

## 🔍 O que o componente já faz automaticamente:

✅ Carrega o script do Google Analytics  
✅ Inicializa o gtag com seu ID  
✅ Rastreia automaticamente todas as mudanças de página  
✅ Não precisa adicionar código manual em nenhum lugar  

---

## ❓ Por que não preciso colar o código?

O componente `GoogleAnalytics.tsx` já está integrado no `layout.tsx` e faz exatamente o que o código que você viu fazia, mas de forma automática e otimizada para Next.js.

O código que você viu:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z10Y6M3MX4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-Z10Y6M3MX4');
</script>
```

O componente faz isso automaticamente quando detecta `NEXT_PUBLIC_GA_ID` configurado!

---

## 🎯 Resumo:

1. ✅ Você já tem o ID: `G-Z10Y6M3MX4`
2. ✅ Adicione no `.env.local` (desenvolvimento)
3. ✅ Adicione no Vercel como variável de ambiente (produção)
4. ✅ Faça redeploy no Vercel
5. ✅ Pronto! O Analytics começará a coletar dados automaticamente

---

## 🐛 Se não funcionar:

1. Verifique se a variável está no Vercel (case-sensitive: `NEXT_PUBLIC_GA_ID`)
2. Certifique-se de ter feito o redeploy após adicionar a variável
3. Aguarde alguns minutos (pode levar até 24h para aparecer dados)
4. Verifique o console do navegador para erros

---

**Pronto! Seu Google Analytics está configurado! 🎉**

