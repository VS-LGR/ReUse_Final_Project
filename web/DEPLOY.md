# Guia de Deploy - ReUse Admin Panel

## Pré-requisitos

1. Conta no Vercel
2. Banco de dados PostgreSQL (Vercel Postgres, Supabase, Neon, etc.)
3. Node.js 18+ instalado localmente

## Configuração Local (Desenvolvimento)

1. **Clone o repositório e instale dependências:**
```bash
cd web
npm install
```

2. **Configure variáveis de ambiente:**
Crie um arquivo `.env.local` baseado no `.env.example`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/reuse_db?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3000"
ADMIN_EMAIL="admin@reuse.com"
ADMIN_PASSWORD="admin123"
```

3. **Configure o banco de dados:**
```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações (primeira vez)
npm run db:migrate

# Popular banco com dados iniciais (opcional)
npm run db:seed
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

## Deploy no Vercel

### 1. Conectar Repositório

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em "Add New Project"
3. Conecte seu repositório GitHub/GitLab
4. Selecione o diretório `web` como root directory

### 2. Configurar Variáveis de Ambiente

No dashboard do Vercel, adicione as seguintes variáveis:

**Obrigatórias:**
- `DATABASE_URL` - URL de conexão do PostgreSQL (ex: `postgresql://user:pass@host:5432/db?schema=public`)
- `NEXT_PUBLIC_API_URL` - URL da aplicação em produção (será preenchida automaticamente pelo Vercel, ou defina manualmente)

**Opcionais:**
- `ADMIN_EMAIL` - Email do administrador (padrão: `admin@reuse.com`)
- `ADMIN_PASSWORD` - Senha do administrador (padrão: `admin123`)
- `JWT_SECRET` - Se implementar autenticação JWT (não implementado ainda)

### 3. Configurar Banco de Dados PostgreSQL

**Opção A: Supabase (Recomendado) ⭐**
1. Crie um projeto no Supabase (gratuito): https://supabase.com
2. Siga o guia rápido: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. Ou veja o guia completo: [DATABASE_SETUP.md](./DATABASE_SETUP.md)
4. Copie a `DATABASE_URL` do Supabase e adicione nas variáveis de ambiente do Vercel

**Opção B: Vercel Postgres**
1. No projeto Vercel, vá em "Storage" > "Create Database"
2. Selecione "Postgres"
3. Copie a `DATABASE_URL` gerada e adicione nas variáveis de ambiente

**Opção C: Neon ou Outros**
1. Crie um banco PostgreSQL no seu provedor
2. Copie a connection string
3. Adicione como `DATABASE_URL` nas variáveis de ambiente do Vercel

### 4. Configurar Build Settings

O Vercel detecta automaticamente o Next.js, mas verifique:

- **Framework Preset:** Next.js
- **Root Directory:** `web`
- **Build Command:** `npm run build` (ou `cd web && npm run build` se root é a raiz)
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 5. Executar Migrações

Após o primeiro deploy, execute as migrações do Prisma:

**Opção A: Via Vercel CLI**
```bash
npm i -g vercel
vercel env pull .env.local
npx prisma migrate deploy
```

**Opção B: Via Script de Build**
Adicione ao `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### 6. Deploy

1. Push para o branch principal (geralmente `main`)
2. O Vercel fará deploy automaticamente
3. Aguarde a conclusão do build
4. Acesse a URL fornecida pelo Vercel

## Acessar o Admin Panel

Após o deploy bem-sucedido:

1. Acesse: `https://seu-projeto.vercel.app/admin`
2. Faça login com:
   - **Email:** `admin@reuse.com` (ou o valor de `ADMIN_EMAIL`)
   - **Senha:** `admin123` (ou o valor de `ADMIN_PASSWORD`)

## Estrutura de Rotas

- `/admin` - Login do admin
- `/admin/dashboard` - Dashboard com métricas
- `/admin/users` - Gerenciamento de usuários
- `/admin/offers` - Gerenciamento de ofertas

## API Routes

Todas as rotas estão sob `/api/admin/`:

- `GET /api/admin/users-proxy` - Lista de usuários
- `GET /api/admin/offers-proxy` - Lista de ofertas
- `POST /api/admin/user/block` - Bloquear/desbloquear usuário
- `POST /api/admin/user/password` - Trocar senha de usuário
- `POST /api/admin/offer/status` - Alterar status de oferta
- `POST /api/admin/offer/delete` - Remover oferta

## Troubleshooting

### Erro: "Prisma Client not generated"
```bash
npm run db:generate
```

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está correta
- Verifique se o banco está acessível (firewall/whitelist)

### Erro: "Module not found"
- Execute `npm install` novamente
- Verifique se todas as dependências estão no `package.json`

### Build falha no Vercel
- Verifique os logs de build no dashboard do Vercel
- Certifique-se de que o `DATABASE_URL` está configurado
- Verifique se o PostgreSQL está acessível de fora

## Próximos Passos

- [ ] Implementar autenticação JWT real
- [ ] Adicionar hash de senhas (bcrypt)
- [ ] Implementar gráficos com Chart.js no dashboard
- [ ] Adicionar paginação nas listas
- [ ] Implementar filtros avançados
- [ ] Adicionar logs de auditoria
- [ ] Melhorar tratamento de erros

## Notas Importantes

⚠️ **Segurança:**
- Altere as credenciais padrão em produção
- Use variáveis de ambiente para secrets
- Implemente hash de senhas antes de ir para produção
- Considere adicionar rate limiting

⚠️ **Performance:**
- O Prisma Client é gerado no build
- Migrações devem ser executadas após o deploy
- Considere usar connection pooling em produção

