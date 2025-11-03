# Configuração do Banco de Dados PostgreSQL com Supabase

Este guia mostra como configurar o Supabase como banco de dados PostgreSQL para o ReUse.

## 1. Criar Projeto no Supabase

### Passo a Passo:

1. **Acesse o Supabase:**
   - Vá para https://supabase.com
   - Faça login ou crie uma conta gratuita

2. **Criar Novo Projeto:**
   - Clique em "New Project"
   - Escolha sua organização (ou crie uma)
   - Preencha:
     - **Name**: `ReUse` (ou o nome que preferir)
     - **Database Password**: Crie uma senha forte e **ANOTE** (você precisará dela)
     - **Region**: Escolha a mais próxima (ex: `South America (São Paulo)`)
   - Clique em "Create new project"
   - Aguarde 2-3 minutos para o projeto ser criado

3. **Obter Connection String:**
   - No dashboard do projeto, vá em **Settings** → **Database**
   - Role até encontrar **Connection string**
   - Selecione **URI** (não "Connection pooling")
   - Copie a string (formato: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)
   - **Substitua `[YOUR-PASSWORD]`** pela senha que você criou
   - A string final deve ser algo como:
     ```
     postgresql://postgres:SUA_SENHA_AQUI@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
     ```

## 2. Configurar Variáveis de Ambiente

### Local (Desenvolvimento):

Crie um arquivo `.env.local` na pasta `web/`:

```env
# Database - Supabase
DATABASE_URL="postgresql://postgres:SUA_SENHA@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?schema=public"

# Next.js (opcional para desenvolvimento)
NEXT_PUBLIC_API_URL="http://localhost:3000"
ADMIN_EMAIL="admin@reuse.com"
ADMIN_PASSWORD="admin123"
```

**Importante:** Substitua `SUA_SENHA` e `xxxxxxxxxxxxx` pelos valores do seu projeto Supabase.

### Produção (Vercel):

1. No Vercel Dashboard, vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Name**: `DATABASE_URL`
   - **Value**: A mesma connection string do Supabase (com sua senha)
   - **Environments**: Marque **Production**, **Preview** e **Development**
3. Salve

## 3. Executar Migrações

### Local (Desenvolvimento):

```bash
# Navegar para a pasta web
cd web

# Instalar dependências (se ainda não instalou)
npm install

# Gerar cliente Prisma
npm run db:generate

# Criar tabelas no banco (primeira vez)
npm run db:push

# OU criar migração (recomendado para produção)
npm run db:migrate

# Popular banco com dados iniciais (opcional)
npm run db:seed
```

### Produção (Vercel):

As migrações são executadas automaticamente durante o build através do script `vercel-build` no `package.json`:

```json
"vercel-build": "prisma generate && prisma migrate deploy && next build"
```

**Nota:** Certifique-se de que a variável `DATABASE_URL` está configurada no Vercel antes do deploy.

## 4. Verificar Configuração

### Via Prisma Studio (Local):

```bash
npm run db:studio
```

Isso abrirá uma interface visual em `http://localhost:5555` onde você pode ver e editar os dados.

### Via Supabase Dashboard:

1. No dashboard do Supabase, vá em **Table Editor**
2. Você verá todas as tabelas criadas:
   - `users`
   - `offers`
   - `chats`
   - `messages`

## 5. Estrutura do Banco

### Tabelas Criadas:

- **users**: Usuários do sistema
  - Campos: id, email, name, password, avatar, xp, level, isActive, isBlocked, etc.

- **offers**: Ofertas de produtos
  - Campos: id, name, description, image, category, status, isActive, etc.
  - Relacionamento: `ownerId` → `users.id`

- **chats**: Conversas entre usuários
  - Relacionamento: Many-to-Many com `users` (participants)

- **messages**: Mensagens dos chats
  - Relacionamento: `chatId` → `chats.id`, `senderId` → `users.id`

## 6. Comandos Úteis

```bash
# Gerar cliente Prisma após mudanças no schema
npm run db:generate

# Criar nova migração após alterar schema.prisma
npm run db:migrate

# Aplicar migrações pendentes (produção)
npm run db:migrate:deploy

# Resetar banco (CUIDADO: apaga todos os dados!)
npx prisma db push --force-reset

# Ver status do banco
npx prisma db pull

# Abrir Prisma Studio (interface visual)
npm run db:studio
```

## 7. Segurança e Boas Práticas

### ✅ O que fazer:

- Use senhas fortes para o banco de dados
- Mantenha `DATABASE_URL` em variáveis de ambiente (nunca no código)
- Use `.env.local` para desenvolvimento (está no `.gitignore`)
- Configure firewall no Supabase (Settings → Database → Connection pooling) se necessário

### ❌ O que NÃO fazer:

- Nunca commite arquivos `.env` ou `.env.local` no Git
- Não compartilhe a connection string publicamente
- Não use a senha do banco em múltiplos lugares

## 8. Troubleshooting

### Erro: "Can't reach database server"

- Verifique se a `DATABASE_URL` está correta
- Confirme que substituiu `[YOUR-PASSWORD]` pela senha real
- Verifique se o projeto Supabase está ativo (pode ter pausado após inatividade)

### Erro: "relation does not exist"

- Execute as migrações: `npm run db:push` ou `npm run db:migrate`

### Erro: "Connection timeout"

- Verifique se o firewall do Supabase permite conexões
- Tente usar a connection string com "Connection pooling" (porta 6543)

### Resetar Projeto (se necessário):

1. No Supabase Dashboard → Settings → Database
2. Role até "Reset Database" (cuidado: apaga tudo!)
3. Ou use: `npx prisma db push --force-reset`

## 9. Próximos Passos

Após configurar o banco:

1. ✅ Configure as variáveis de ambiente no Vercel
2. ✅ Faça o deploy
3. ✅ Teste a aplicação em produção
4. ✅ Configure backups automáticos no Supabase (Settings → Database → Backups)

## Links Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Guia de Deploy](./DEPLOY.md)