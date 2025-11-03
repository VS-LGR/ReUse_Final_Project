import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Verificar se DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não está configurada!')
  console.error('Configure no Vercel: Settings → Environment Variables')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

// Testar conexão em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  
  // Verificar conexão no primeiro uso
  prisma.$connect().catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message)
    console.error('💡 Verifique:')
    console.error('   1. Se o projeto Supabase está ativo (não pausado)')
    console.error('   2. Se DATABASE_URL está correta no .env')
    console.error('   3. Se o firewall do Supabase permite conexões')
  })
}








