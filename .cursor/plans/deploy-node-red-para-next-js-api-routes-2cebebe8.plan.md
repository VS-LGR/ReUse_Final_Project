<!-- 2cebebe8-1a08-4b90-9bda-c7e2dedfab41 030689c5-3329-4077-9f23-5defa478872f -->
# Plano: Correções Críticas e Melhorias Prioritárias

## Objetivo

Tornar o projeto 100% funcional e sem erros, implementando correções de alta e média prioridade que sejam factíveis em um dia.

## Tarefas

### 1. Implementar Hash de Senhas com bcrypt (Alta Prioridade)

**Arquivos a modificar:**

- `web/src/app/api/auth/login/route.ts` - Comparar hash ao invés de texto plano
- `web/src/app/api/users/route.ts` - Hash senha no registro
- `web/src/app/api/users/[id]/password/route.ts` - Hash senha na troca
- `web/src/app/api/admin/user/password/route.ts` - Hash senha admin

**Ações:**

- Instalar `bcryptjs` e `@types/bcryptjs` em `web/package.json`
- Criar utilitário `web/src/lib/auth.ts` com funções `hashPassword()` e `comparePassword()`
- Atualizar todos os endpoints que lidam com senhas para usar hash
- Criar script de migração para hashear senhas existentes (opcional, pode ser feito depois)

**Importante:** Manter compatibilidade temporária durante migração

---

### 2. Adicionar Meta Tags SEO Completas (Alta Prioridade)

**Arquivos a modificar:**

- `web/src/app/layout.tsx` - Adicionar Open Graph, Twitter Cards, keywords

**Ações:**

- Expandir `metadata` com:
  - `keywords`: array de palavras-chave
  - `openGraph`: title, description, images, type, locale
  - `twitter`: card, title, description, images
  - `robots`: indexação
  - `authors`: informações do projeto
- Criar `web/public/og-image.png` (opcional, placeholder pode ser adicionado depois)

---

### 3. Integrar Mobile com API Next.js (Alta Prioridade)

**Arquivos a modificar:**

- `app/login.js` - Substituir AsyncStorage por chamada à API
- `app/register.js` - Substituir AsyncStorage por chamada à API
- `app/profile.js` - Buscar dados do usuário da API
- Criar `app/lib/api.js` - Cliente API centralizado

**Ações:**

- Criar `app/lib/api.js` com função `getApiUrl()` que detecta ambiente
- Atualizar `app/login.js` para chamar `POST /api/auth/login`
- Atualizar `app/register.js` para chamar `POST /api/users`
- Atualizar `app/profile.js` para buscar dados via `GET /api/users/[id]`
- Manter AsyncStorage apenas para cache/token (não dados principais)

**Configuração:**

- Criar `app/config.js` com `API_URL` que detecta automaticamente:
  - Em desenvolvimento: `http://localhost:3000` (ou via `__DEV__`)
  - Em produção: usar variável de ambiente ou detectar automaticamente
  - Permitir override via variável de ambiente `EXPO_PUBLIC_API_URL`

---

### 4. Sincronizar XP/Level entre Mobile e Backend (Média Prioridade)

**Arquivos a modificar:**

- `web/src/app/api/users/[id]/xp/route.ts` - Criar endpoint para atualizar XP
- `app/profile.js` - Buscar XP/Level da API e atualizar quando ganhar XP
- `app/product/[id].js` - Atualizar XP ao visualizar produto
- Criar hook `app/hooks/useXP.ts` - Gerenciar XP de forma centralizada

**Ações:**

- Criar endpoint `PATCH /api/users/[id]/xp` que recebe `{ amount: number }` e atualiza XP/Level
- Atualizar `app/profile.js` para:
  - Buscar XP/Level inicial da API ao carregar
  - Chamar API ao ganhar XP ao invés de apenas AsyncStorage
  - Sincronizar com backend antes de atualizar local
- Atualizar outras telas que ganham XP para usar o mesmo sistema

---

### 5. Adicionar Google Analytics Básico (Média Prioridade)

**Arquivos a criar/modificar:**

- `web/src/components/GoogleAnalytics.tsx` - Componente de analytics
- `web/src/app/layout.tsx` - Incluir GoogleAnalytics component
- `web/next.config.ts` - Adicionar suporte para analytics (se necessário)

**Ações:**

- Criar componente que carrega Google Analytics script
- Usar variável de ambiente `NEXT_PUBLIC_GA_ID` (opcional, não quebra se não existir)
- Adicionar tracking de eventos básicos (page views)
- Incluir no layout principal

---

### 6. Correções de Erros e Validações

**Arquivos a verificar/modificar:**

- Todos os endpoints de API - Adicionar validação de dados
- Formulários - Adicionar validação client-side
- Tratamento de erros - Melhorar mensagens de erro

**Ações:**

- Adicionar validação de email em todos os endpoints
- Adicionar validação de senha (mínimo 6 caracteres)
- Melhorar mensagens de erro para serem mais descritivas
- Adicionar try/catch adequados onde faltam

---

## Ordem de Execução

1. **Hash de senhas** (crítico de segurança, 30min)
2. **SEO meta tags** (rápido, 15min)
3. **Integração mobile** (essencial, 1-2h)
4. **Sincronização XP/Level** (importante, 1h)
5. **Google Analytics** (opcional, 20min)
6. **Validações e correções** (contínuo durante implementação)

---

## Dependências Necessárias

```json
{
  "bcryptjs": "^2.4.3",
  "@types/bcryptjs": "^2.4.6"
}
```

---

## Arquivos Novos a Criar

- `web/src/lib/auth.ts` - Utilitários de autenticação (hash/compare)
- `app/lib/api.js` - Cliente API para mobile
- `app/config.js` - Configurações do mobile (API URL)
- `app/hooks/useXP.ts` - Hook para gerenciar XP
- `web/src/app/api/users/[id]/xp/route.ts` - Endpoint para atualizar XP
- `web/src/components/GoogleAnalytics.tsx` - Componente de analytics

---

## Notas Importantes

- Manter compatibilidade com dados existentes durante migração
- Testar cada funcionalidade após implementação
- Mobile precisa conseguir acessar a API (verificar CORS se necessário)
- Hash de senhas requer migração de dados existentes (pode ser feito depois se necessário)

---

## Tarefas Adicionais de Baixo Risco

### 7. Sincronizar XP/Level no Web (Baixo Risco)

**Arquivos a modificar:**

- `web/src/app/profile/page.tsx` - Atualizar para usar API ao invés de localStorage

**Ações:**

- Atualizar `addXP()` para chamar `PATCH /api/users/[id]/xp`
- Buscar XP/Level inicial da API ao carregar página
- Manter localStorage como cache apenas
- Implementar fallback se API falhar

---

### 8. Criar Sitemap.xml e robots.txt (Baixo Risco)

**Arquivos a criar:**

- `web/public/sitemap.xml` - Sitemap estático com URLs principais
- `web/public/robots.txt` - Configuração de indexação

**Ações:**

- Criar sitemap.xml com URLs principais do site
- Criar robots.txt permitindo indexação e apontando para sitemap

---

### 9. Adicionar Eventos Customizados no Google Analytics (Baixo Risco)

**Arquivos a modificar:**

- `web/src/components/GoogleAnalytics.tsx` - Adicionar função para eventos
- `web/src/app/login/page.tsx` - Rastrear evento de login
- `web/src/app/add-offer/page.tsx` - Rastrear criação de oferta
- `web/src/app/product/[id]/page.tsx` - Rastrear visualização de produto

**Ações:**

- Criar função helper `trackEvent()` no GoogleAnalytics
- Adicionar eventos nos pontos principais:
  - Login bem-sucedido
  - Criação de oferta
  - Visualização de produto
  - Registro de usuário