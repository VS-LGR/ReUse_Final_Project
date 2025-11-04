# Reset e Repopulação do Banco de Dados

## ✅ Seed Executado com Sucesso!

O banco de dados foi repopulado com produtos novos e bem estruturados.

### O que foi criado:

- **5 usuários** com avatares reais
- **12 ofertas** com imagens reais do Unsplash

### Produtos Criados:

1. AirPods Pro 2ª Geração (Eletrônicos)
2. Cadeira Gamer Ergonômica (Casa e Construção)
3. Blusa Adidas Originals (Roupas)
4. Blusa de Frio Zara (Roupas)
5. Patinhos de Borracha Infantis (Brinquedos)
6. Mesa de Madeira Maciça (Casa e Construção)
7. Peças de Brinquedo Educativo (Brinquedos)
8. Tênis Nike Air Max (Sapatos)
9. Notebook Dell Inspiron (Eletrônicos)
10. Livro: O Poder do Hábito (Papelaria)
11. Skateboard Completo (Brinquedos)
12. Câmera Canon EOS (Eletrônicos)

## Como Verificar

### 1. Via Prisma Studio (Recomendado)

```bash
cd web
npm run db:studio
```

Acesse http://localhost:5555 e veja:
- Tabela `users` - 5 usuários criados
- Tabela `offers` - 12 ofertas criadas

### 2. Via Aplicação

1. Inicie o servidor:
   ```bash
   cd web
   npm run dev
   ```

2. Acesse:
   - http://localhost:3000/offers - Ver todas as ofertas
   - http://localhost:3000/product/[id] - Ver produto específico
   - http://localhost:3000/admin/offers - Ver no painel admin

### 3. Via Supabase Dashboard

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Table Editor**
4. Verifique as tabelas `users` e `offers`

## Resetar Novamente

Se precisar resetar e repopular:

```bash
cd web

# Opção 1: Reset completo (apaga tudo)
npx prisma db push --force-reset
npm run db:seed

# Opção 2: Apenas repopular (mantém estrutura)
npm run db:seed
```

## Notas

- ✅ Todas as imagens são URLs reais do Unsplash
- ✅ Todos os produtos têm status `approved` e `isActive: true`
- ✅ Dados bem estruturados e prontos para apresentação
- ✅ Imagens aparecem corretamente em todas as páginas

## Problemas?

Se as imagens não aparecerem:

1. Verifique se `next.config.ts` tem `images.unsplash.com` configurado
2. Verifique se está usando a API (`/api/offers`) e não dados mockados
3. Verifique o console do navegador para erros de CORS ou imagens
