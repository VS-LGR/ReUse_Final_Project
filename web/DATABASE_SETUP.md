# Configuração do Banco de Dados PostgreSQL com Prisma

## 1. Instalar PostgreSQL

### Windows:
- Baixe o PostgreSQL do site oficial: https://www.postgresql.org/download/windows/
- Instale seguindo o assistente de instalação
- Anote a senha do usuário `postgres` que você definiu durante a instalação
a
### macOS:
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. Configurar Banco de Dados

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE reuse_db;

# Criar usuário (opcional)
CREATE USER reuse_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE reuse_db TO reuse_user;

# Sair do psql
\q
```

## 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `web/` com:

```env
# Database
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/reuse_db?schema=public"

# Next.js
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

**Substitua:**
- `sua_senha` pela senha do PostgreSQL
- `sua-chave-secreta-aqui` por uma string aleatória

## 4. Executar Migrações e Seed

```bash
# Navegar para a pasta web
cd web

# Gerar cliente Prisma
npm run db:generate

# Criar tabelas no banco
npm run db:push

# Popular banco com dados iniciais
npm run db:seed
```

## 5. Verificar Configuração

```bash
# Abrir Prisma Studio (interface visual do banco)
npm run db:studio
```

## 6. Iniciar Aplicação

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## Estrutura do Banco

### Tabelas:
- **users**: Usuários do sistema
- **offers**: Ofertas de produtos
- **chats**: Conversas entre usuários
- **messages**: Mensagens dos chats

### Relacionamentos:
- Um usuário pode ter várias ofertas
- Um usuário pode participar de vários chats
- Um chat pode ter várias mensagens
- Uma mensagem pertence a um chat e um usuário

## Comandos Úteis

```bash
# Resetar banco (cuidado!)
npx prisma db push --force-reset

# Ver status do banco
npx prisma db pull

# Gerar novo cliente após mudanças no schema
npm run db:generate
```








