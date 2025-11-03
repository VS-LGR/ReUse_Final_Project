# Configuração de Upload de Imagens

O ReUse suporta duas formas de armazenar imagens:

1. **Upload Local** (funciona imediatamente) - Salva em `public/uploads/`
2. **Supabase Storage** (recomendado para produção) - Armazena no Supabase

## Opção 1: Upload Local (Padrão)

Funciona automaticamente sem configuração adicional. As imagens são salvas em `public/uploads/` no servidor.

**Limitações:**
- Não funciona bem no Vercel (serverless)
- Imagens são perdidas ao fazer redeploy
- Não é recomendado para produção

**Para desenvolvimento local:**
- Já está funcionando! ✅
- Apenas crie a pasta `public/uploads/` se necessário

## Opção 2: Supabase Storage (Recomendado)

### Passo 1: Criar Bucket no Supabase

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Storage** (menu lateral)
4. Clique em **Create a new bucket**
5. Configure:
   - **Name**: `reuse-images`
   - **Public bucket**: ✅ Marque como público (para imagens serem acessíveis)
   - **File size limit**: 5MB (ou o valor que preferir)
   - **Allowed MIME types**: `image/*` (ou deixe vazio para permitir todos)
6. Clique em **Create bucket**

### Passo 2: Configurar Políticas de Acesso

1. No bucket criado, vá em **Policies**
2. Clique em **New Policy**

**Opção A: Política Pública (Mais Simples - Recomendada para começar)**

Para permitir leitura e upload públicos:

1. **Política de Leitura (SELECT):**
   - Clique em **New Policy**
   - Selecione **Get started with a template**
   - Escolha **Public Access**
   - Ou use **For full customization** com:
     - **Policy name**: `Public read access`
     - **Allowed operation**: `SELECT`
     - **Target roles**: `anon`, `authenticated`
     - **Policy definition**: `true`

2. **Política de Upload (INSERT):**
   - Clique em **New Policy**
   - Selecione **Get started with a template**
   - Escolha **Public Access** (para permitir uploads públicos)
   - Ou use **For full customization** com:
     - **Policy name**: `Public upload access`
     - **Allowed operation**: `INSERT`
     - **Target roles**: `anon`, `authenticated`
     - **Policy definition**: `true`

**Opção B: Apenas Usuários Autenticados (Mais Seguro)**

Se você quiser restringir uploads apenas para usuários autenticados:

1. **Política de Leitura (SELECT):**
   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `anon`, `authenticated`
   - **Policy definition**: `true`

2. **Política de Upload (INSERT):**
   - **Policy name**: `Authenticated upload only`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated` (apenas)
   - **Policy definition**: `true`

**Nota:** Para uploads via API route (server-side), você pode usar o **Service Role Key** que ignora políticas, então políticas públicas funcionam bem.

### Passo 3: Obter Credenciais do Supabase

1. Supabase Dashboard → **Settings** → **API**
2. Copie:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Service Role Key** (secret - não exponha no frontend)
   - **Anon Key** (pode ser usada no frontend)

### Passo 4: Configurar Variáveis de Ambiente

**Local (`.env` ou `.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**No Vercel:**
1. Vercel Dashboard → Settings → Environment Variables
2. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` - URL do projeto Supabase
   - `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key (para uploads no servidor)
3. Marque para **Production**, **Preview** e **Development**
4. Salve e faça redeploy

### Passo 5: Instalar Cliente Supabase (Opcional)

Se quiser usar o cliente oficial do Supabase:

```bash
cd web
npm install @supabase/supabase-js
```

**Nota:** O código já está preparado para usar o Supabase, mas funciona sem essa dependência se você usar apenas upload local.

## Como Funciona

O sistema tenta automaticamente:

1. **Primeiro**: Tenta fazer upload no Supabase Storage (`/api/upload/supabase`)
2. **Se falhar**: Usa upload local como fallback (`/api/upload`)

Isso garante que funcione mesmo sem Supabase configurado.

## Estrutura de Arquivos

```
public/
  uploads/          # Uploads locais (desenvolvimento)
    [timestamp]-[random].jpg

Supabase Storage/
  reuse-images/     # Bucket no Supabase
    offers/
      [timestamp]-[random].jpg
```

## URLs das Imagens

Após upload bem-sucedido, a API retorna:
```json
{
  "success": true,
  "url": "/uploads/1234567890-abc123.jpg",  // Upload local
  // OU
  "url": "https://xxxxx.supabase.co/storage/v1/object/public/reuse-images/offers/1234567890-abc123.jpg"  // Supabase
}
```

Essa URL é salva no banco de dados no campo `image` da tabela `offers`.

## Troubleshooting

### Erro: "Storage não configurado"

**Solução:** Configure as variáveis de ambiente do Supabase ou use apenas upload local.

### Erro: "Bucket não encontrado"

**Solução:** Crie o bucket `reuse-images` no Supabase Storage.

### Erro: "Access denied" ao fazer upload

**Solução:** Configure as políticas de acesso do bucket no Supabase.

### Imagens não aparecem no Vercel

**Solução:** Use Supabase Storage em vez de upload local. O Vercel não persiste arquivos entre deployments.

### Imagens muito grandes

**Solução:** A validação permite até 5MB. Você pode ajustar:
- No código: `web/src/app/api/upload/route.ts` e `web/src/app/api/upload/supabase/route.ts`
- No Supabase: configurações do bucket

## Próximos Passos

- [ ] Configurar Supabase Storage (se ainda não fez)
- [ ] Adicionar variáveis de ambiente no Vercel
- [ ] Testar upload de imagens
- [ ] Verificar se imagens aparecem nas ofertas criadas
