# Guia Completo: Configuração do Google Analytics

## 📋 Pré-requisitos

1. Conta no Google Analytics criada
2. Aplicativo já deployado no Vercel (ou URL de produção disponível)

---

## 🎯 Passo 1: Descobrir a URL do seu Site

### Opção A: Se já está no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto
3. Na seção "Domains", você verá a URL do seu site
   - Exemplo: `reuse-app.vercel.app` ou `seu-projeto.vercel.app`
4. **Copie essa URL** (sem `https://`)

### Opção B: Se ainda não fez deploy

1. Faça o deploy primeiro no Vercel
2. Depois siga a Opção A

### Opção C: Se tem domínio customizado

1. Use o domínio completo (ex: `www.reuse.com.br`)
2. Ou use o domínio do Vercel (ex: `seu-projeto.vercel.app`)

---

## 🔧 Passo 2: Configurar Fluxo de Dados no Google Analytics

### 2.1. Acessar a Página de Configuração

1. Acesse [Google Analytics](https://analytics.google.com)
2. Clique em **"Admin"** (engrenagem no canto inferior esquerdo)
3. Na coluna **"Propriedade"**, clique em **"Criar propriedade"** (se ainda não criou)
   - Ou selecione a propriedade existente
4. Em **"Fluxos de dados"**, clique em **"Adicionar fluxo"** → **"Web"**

### 2.2. Preencher Dados do Fluxo

Na tela que você está vendo na imagem:

#### Campo 1: **URL do site (Website URL)**

- **Importante:** O dropdown já mostra `https://` selecionado
- No campo de texto, digite **APENAS o domínio** (sem `https://`)
- **Exemplos válidos:**
  - ✅ `reuse-app.vercel.app`
  - ✅ `www.reuse.com.br`
  - ✅ `meu-app.vercel.app`
- **Exemplos inválidos:**
  - ❌ `https://reuse-app.vercel.app` (não precisa do `https://`)
  - ❌ `reuse-app.vercel.app/` (não precisa da barra no final)
  - ❌ `www.mywebsite.com` (placeholder, não funciona)

#### Campo 2: **Nome do fluxo (Stream name)**

- Este nome é apenas para sua referência no painel do Google Analytics
- **Exemplos:**
  - `ReUse Web App`
  - `ReUse Produção`
  - `ReUse - Site Principal`
  - `Meu Site ReUse`

### 2.3. Configurar Métricas Otimizadas

Na seção **"Métrica otimizada"**:

- ✅ **Recomendado:** Deixe ativado (padrão)
- Isso permite que o Google Analytics rastreie automaticamente:
  - Visualizações de página
  - Rolagens
  - Cliques de saída
  - E mais 4 métricas adicionais

### 2.4. Finalizar Criação

1. Clique no botão **"Criar e continuar"** (canto superior direito)
2. Aguarde alguns segundos
3. Você será redirecionado para a próxima tela

---

## 🔑 Passo 3: Obter o ID de Medição (Measurement ID)

Após criar o fluxo, você verá uma tela com informações importantes:

### O que procurar:

1. **ID de Medição (Measurement ID)**
   - Formato: `G-XXXXXXXXXX`
   - Exemplo: `G-ABC123XYZ`
   - **Este é o ID que você precisa!**

2. **Código de acompanhamento**
   - Você verá um código JavaScript
   - **Não precisa copiar manualmente** - o componente já está configurado

### Como copiar o ID:

1. **Opção 1:** Copie diretamente do campo "ID de Medição"
2. **Opção 2:** Se não aparecer na tela, vá em:
   - Admin → Propriedade → Fluxos de dados
   - Clique no fluxo que você criou
   - O ID estará no topo da página

---

## 💻 Passo 4: Integrar o ID no Projeto

### 4.1. Para Desenvolvimento Local

1. Abra o arquivo `.env.local` na pasta `web/`
   - Se não existir, crie um novo arquivo
2. Adicione a seguinte linha:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Substitua `G-XXXXXXXXXX` pelo seu ID real!**

Exemplo:
```env
NEXT_PUBLIC_GA_ID=G-ABC123XYZ
```

3. Salve o arquivo
4. Reinicie o servidor de desenvolvimento:
   ```bash
   cd web
   npm run dev
   ```

### 4.2. Para Produção (Vercel)

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto
3. Vá em **"Settings"** → **"Environment Variables"**
4. Clique em **"Add New"**
5. Preencha:
   - **Name:** `NEXT_PUBLIC_GA_ID`
   - **Value:** `G-XXXXXXXXXX` (seu ID real)
   - **Environment:** Selecione "Production" (e "Preview" se quiser)
6. Clique em **"Save"**
7. **Importante:** Faça um novo deploy para aplicar a mudança:
   - Vá em **"Deployments"**
   - Clique nos três pontos do último deploy
   - Selecione **"Redeploy"**

---

## ✅ Passo 5: Verificar se Está Funcionando

### Método 1: Google Analytics DebugView

1. No Google Analytics, vá em **"Admin"** → **"Propriedade"** → **"DebugView"**
2. Acesse seu site
3. Você deve ver eventos aparecendo em tempo real

### Método 2: Google Analytics Realtime

1. No Google Analytics, vá em **"Relatórios"** → **"Tempo real"**
2. Acesse seu site em outra aba
3. Você deve ver sua visita aparecer nos gráficos

### Método 3: Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba **"Console"**
3. Procure por mensagens do Google Analytics
4. Se aparecer algo como `gtag config`, está funcionando!

---

## 🐛 Troubleshooting

### Problema: "Não está coletando dados"

**Soluções:**

1. **Verifique se o ID está correto:**
   - O ID deve começar com `G-`
   - Não deve ter espaços ou caracteres extras

2. **Verifique se a variável de ambiente está configurada:**
   - No Vercel, confira se `NEXT_PUBLIC_GA_ID` existe
   - No local, verifique o `.env.local`

3. **Verifique se fez redeploy:**
   - No Vercel, após adicionar variável, precisa fazer redeploy

4. **Verifique o console do navegador:**
   - Pode haver erros de CORS ou bloqueio de scripts

### Problema: "Erro ao carregar script do Google Analytics"

**Soluções:**

1. Verifique sua conexão com a internet
2. Verifique se há bloqueadores de anúncios ativos
3. Verifique se o firewall não está bloqueando

### Problema: "URL inválida no Google Analytics"

**Soluções:**

1. Certifique-se de que digitou apenas o domínio (sem `https://`)
2. Certifique-se de que o site está acessível publicamente
3. Tente usar o domínio do Vercel diretamente

---

## 📊 O que o Google Analytics vai rastrear automaticamente?

Com a configuração atual, o Google Analytics rastreia:

- ✅ **Visualizações de página** - Cada vez que alguém visita uma página
- ✅ **Rolagens** - Quando o usuário rola a página
- ✅ **Cliques de saída** - Quando clica em links externos
- ✅ **Tempo na página** - Quanto tempo o usuário fica
- ✅ **Taxa de rejeição** - Visitantes que saem imediatamente
- ✅ **Origem do tráfego** - De onde os visitantes vieram

---

## 🎯 Próximos Passos (Opcional)

Depois que o básico estiver funcionando, você pode:

1. **Configurar Eventos Customizados:**
   - Rastrear quando usuário cria uma oferta
   - Rastrear quando usuário faz login
   - Rastrear conversões específicas

2. **Configurar Metas:**
   - Definir o que é uma "conversão" para seu negócio
   - Ex: Criação de conta, criação de oferta, etc.

3. **Configurar Relatórios Personalizados:**
   - Criar dashboards específicos para suas necessidades

---

## 📝 Resumo Rápido

1. ✅ Obter URL do Vercel (ex: `reuse-app.vercel.app`)
2. ✅ Criar fluxo no Google Analytics com essa URL
3. ✅ Copiar o ID de Medição (`G-XXXXXXXXXX`)
4. ✅ Adicionar `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` no Vercel
5. ✅ Fazer redeploy
6. ✅ Verificar se está funcionando

---

## 💡 Dica Final

Se você ainda não fez o deploy no Vercel, pode:

1. Fazer o deploy primeiro
2. Depois configurar o Google Analytics com a URL real
3. Ou configurar agora com uma URL temporária e atualizar depois

O componente `GoogleAnalytics.tsx` já está pronto e só precisa do ID para funcionar!

