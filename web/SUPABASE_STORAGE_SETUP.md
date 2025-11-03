# Guia Rápido: Configurar Supabase Storage para Imagens

## Passo 1: Criar Bucket

1. Supabase Dashboard → **Storage** → **New bucket**
2. **Nome**: `reuse-images`
3. **Public bucket**: ✅ Marque (importante!)
4. **File size limit**: 5MB (ou o que preferir)
5. Clique em **Create bucket**

## Passo 2: Configurar Políticas (Método Simples)

### Para Permitir Leitura Pública:

1. No bucket `reuse-images`, clique em **Policies**
2. Clique em **New Policy**
3. Selecione **Get started with a template**
4. Escolha **Public Access**
5. Configure:
   - **Policy name**: `Public read`
   - **Allowed operation**: `SELECT`
   - Clique em **Review** e depois **Save policy**

### Para Permitir Upload Público:

1. Clique em **New Policy** novamente
2. Selecione **Get started with a template**
3. Escolha **Public Access**
4. Configure:
   - **Policy name**: `Public upload`
   - **Allowed operation**: `INSERT`
   - Clique em **Review** e depois **Save policy**

## Passo 3: Configurar no Vercel

Adicione as variáveis de ambiente:

1. Vercel Dashboard → Settings → Environment Variables
2. Adicione:
   - **NEXT_PUBLIC_SUPABASE_URL**: `https://xxxxx.supabase.co` (URL do seu projeto)
   - **SUPABASE_SERVICE_ROLE_KEY**: `eyJhbGci...` (Service Role Key)
3. Marque para **Production**, **Preview** e **Development**
4. Salve e faça redeploy

### Onde encontrar as credenciais:

1. Supabase Dashboard → **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Service Role Key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## Verificar se Funcionou

1. Crie uma oferta com imagem no app
2. Verifique no Supabase Dashboard → Storage → `reuse-images`
3. A imagem deve aparecer lá
4. A imagem deve aparecer na oferta criada

## Troubleshooting

### Erro: "Bucket not found"
- Verifique se o bucket foi criado com o nome exato `reuse-images`
- Verifique se está no projeto correto do Supabase

### Erro: "Access denied"
- Verifique se as políticas foram criadas (SELECT e INSERT)
- Verifique se o bucket está marcado como público
- Verifique se o Service Role Key está correto

### Imagens não aparecem
- Verifique se a URL da imagem está correta
- Verifique se o bucket está público (para leitura)
- Verifique se a imagem foi realmente enviada (Storage → reuse-images)

## Pronto! ✅

Agora as imagens serão armazenadas no Supabase Storage e aparecerão corretamente nas ofertas!
