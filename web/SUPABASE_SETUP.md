# Guia Rápido: Configurar Supabase para ReUse

## 1. Criar Projeto no Supabase (5 minutos)

1. Acesse https://supabase.com e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `ReUse`
   - **Database Password**: Crie uma senha forte ⚠️ **ANOTE ESSA SENHA**
   - **Region**: Escolha a mais próxima
4. Clique em **"Create new project"**
5. Aguarde 2-3 minutos

## 2. Obter Connection String (2 minutos)

1. No dashboard do projeto, vá em **Settings** → **Database**
2. Role até **Connection string**
3. Selecione **URI** (não "Connection pooling")
4. Copie a string
5. **Substitua `[YOUR-PASSWORD]`** pela senha que você criou

Exemplo:
```
postgresql://postgres:SUA_SENHA_AQUI@db.abcdefghijklmnop.supabase.co:5432/postgres
```

## 3. Configurar no Vercel (3 minutos)

1. Vercel Dashboard → Seu Projeto → **Settings** → **Environment Variables**
2. Adicione:
   - **Name**: `DATABASE_URL`
   - **Value**: A connection string completa (com senha substituída)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
3. Clique em **Save**

## 4. Configurar Localmente (Opcional)

Crie `web/.env.local`:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?schema=public"
```

## 5. Executar Migrações

### No Vercel:
As migrações rodam automaticamente no build! ✅

### Localmente:
```bash
cd web
npm run db:generate
npm run db:push
```

## 6. Verificar

1. No Supabase Dashboard → **Table Editor**
2. Você deve ver as tabelas: `users`, `offers`, `chats`, `messages`

## ✅ Pronto!

Agora você pode fazer deploy no Vercel e o banco estará configurado.

**Dica:** Se precisar resetar o banco, use `npx prisma db push --force-reset` (cuidado: apaga tudo!)
