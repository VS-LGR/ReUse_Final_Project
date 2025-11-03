# Troubleshooting - Problemas Comuns

## Erro: "Can't reach database server"

### Sintomas:
```
PrismaClientInitializationError: Can't reach database server at `db.xxxxx.supabase.co:5432`
```

### Soluções:

#### 1. Verificar se o Supabase está ativo

O projeto Supabase pode estar pausado (free tier pausa após inatividade).

**Como verificar:**
- Acesse https://supabase.com/dashboard
- Veja se o projeto está com status "Paused" (pausado)
- Se estiver pausado, clique em **"Restore"** ou **"Resume"**
- Aguarde 1-2 minutos para o banco voltar a funcionar

#### 2. Verificar DATABASE_URL no Vercel

**Como verificar:**
1. Vercel Dashboard → Seu Projeto → **Settings** → **Environment Variables**
2. Verifique se `DATABASE_URL` existe e está configurada
3. A string deve ser algo como:
   ```
   postgresql://postgres:SUA_SENHA@db.xxxxx.supabase.co:5432/postgres?schema=public
   ```
4. **IMPORTANTE:** Substitua `[YOUR-PASSWORD]` pela senha real (não deixe o placeholder)

**Como adicionar/corrigir:**
1. Vercel Dashboard → Settings → Environment Variables
2. Adicione ou edite `DATABASE_URL`
3. Cole a connection string completa do Supabase
4. Marque **Production**, **Preview** e **Development**
5. Clique em **Save**
6. Faça um **Redeploy** (Settings → Deployments → Redeploy)

#### 3. Obter Connection String Correta do Supabase

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Database**
4. Role até **Connection string**
5. Selecione **URI** (não "Connection pooling")
6. Copie a string
7. **Substitua `[YOUR-PASSWORD]`** pela senha que você criou
8. Adicione `?schema=public` no final se não tiver

Exemplo completo:
```
postgresql://postgres:MinhaSenha123@db.abcdefghijklmnop.supabase.co:5432/postgres?schema=public
```

#### 4. Verificar Firewall do Supabase

1. Supabase Dashboard → **Settings** → **Database**
2. Veja em **Connection pooling** se há restrições de IP
3. Para desenvolvimento, pode estar bloqueado
4. Tente usar a connection string com **Connection pooling** (porta 6543) se disponível

#### 5. Testar Conexão Localmente

```bash
cd web

# Verificar se .env tem DATABASE_URL
cat .env | grep DATABASE_URL

# Testar conexão
npm run db:push
```

Se funcionar localmente mas não no Vercel, o problema é a variável de ambiente no Vercel.

## Erro: "Environment variable not found: DATABASE_URL"

### Solução:

1. **Localmente:** Crie `web/.env` com:
   ```env
   DATABASE_URL="postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres?schema=public"
   ```

2. **No Vercel:** Adicione `DATABASE_URL` em Environment Variables

## Erro: "relation does not exist"

O banco está conectando, mas as tabelas não foram criadas.

### Solução:

```bash
cd web
npm run db:push
```

Ou se estiver no Vercel, as migrações devem rodar no build. Verifique os logs do deploy.

## Verificar Status do Banco

### Via Supabase Dashboard:

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Table Editor**
4. Você deve ver as tabelas: `users`, `offers`, `chats`, `messages`

### Via Prisma Studio (Local):

```bash
cd web
npm run db:studio
```

Abre em http://localhost:5555

## Checklist de Verificação

Antes de reportar um problema, verifique:

- [ ] Projeto Supabase está ativo (não pausado)
- [ ] `DATABASE_URL` está configurada no Vercel
- [ ] Connection string tem a senha substituída (não tem `[YOUR-PASSWORD]`)
- [ ] Connection string termina com `?schema=public`
- [ ] Variável `DATABASE_URL` está marcada para Production/Preview/Development
- [ ] Fez redeploy após adicionar a variável
- [ ] Logs do Vercel mostram se a conexão foi bem-sucedida

## Logs do Vercel

Para verificar erros:

1. Vercel Dashboard → Seu Projeto → **Deployments**
2. Clique no deployment mais recente
3. Veja os logs do build e runtime
4. Procure por erros de conexão com Prisma

## Suporte

Se nada funcionar:

1. Verifique os logs do Vercel
2. Teste a connection string localmente
3. Verifique se o Supabase está funcionando (Table Editor)
4. Tente criar um novo projeto Supabase e migrar os dados
