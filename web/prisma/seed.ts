import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar usuários de exemplo
  const user1 = await prisma.user.upsert({
    where: { email: 'joao@example.com' },
    update: {},
    create: {
      email: 'joao@example.com',
      name: 'João Silva',
      password: '123456',
      avatar: '/default-avatar.png',
      theme: 'Claro',
      language: 'pt-BR',
      xp: 150,
      level: 2
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'maria@example.com' },
    update: {},
    create: {
      email: 'maria@example.com',
      name: 'Maria Santos',
      password: '123456',
      avatar: '/default-avatar.png',
      theme: 'Claro',
      language: 'pt-BR',
      xp: 200,
      level: 3
    }
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'pedro@example.com' },
    update: {},
    create: {
      email: 'pedro@example.com',
      name: 'Pedro Costa',
      password: '123456',
      avatar: '/default-avatar.png',
      theme: 'Claro',
      language: 'pt-BR',
      xp: 100,
      level: 1
    }
  })

  // Criar ofertas de exemplo
  const offers = [
    {
      name: 'AirPods Pro 2ª Geração',
      description: 'Fones de ouvido sem fio com cancelamento de ruído ativo. Funcionando perfeitamente, apenas alguns arranhões na caixa. Inclui carregador e cabo original.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Eletrônicos, Smartwatch, Fones',
      condition: 'USADO',
      price: 'R$ 60,00',
      category: 'eletronicos',
      rating: 6,
      ownerId: user1.id
    },
    {
      name: 'Cadeira Gamer Ergonômica',
      description: 'Cadeira de escritório com apoio lombar ajustável. Estofamento em couro sintético, base giratória e rodinhas. Ideal para home office.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Móveis, Mesa, Monitor',
      condition: 'USADO',
      price: 'R$ 90,00',
      category: 'casa-construcao',
      rating: 4,
      ownerId: user2.id
    },
    {
      name: 'Blusa Adidas Originals',
      description: 'Blusa esportiva Adidas em ótimo estado. Tecido respirável, tamanho M. Usada poucas vezes, sem manchas ou desgaste.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Roupas, Tênis, Acessórios',
      condition: 'SEMI NOVA',
      price: 'R$ 120,00',
      category: 'roupas',
      rating: 9,
      ownerId: user3.id
    },
    {
      name: 'Blusa de Frio Zara',
      description: 'Blusa de frio confortável da Zara. Cor bege, tamanho P. Tecido macio e quente, perfeita para o inverno.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Roupas, Jaqueta, Cachecol',
      condition: 'USADO',
      price: 'R$ 40,00',
      category: 'roupas',
      rating: 7,
      ownerId: user1.id
    },
    {
      name: 'Patinhos de Borracha Infantis',
      description: 'Conjunto de 6 patinhos de borracha coloridos para banho. Brinquedos educativos que estimulam a coordenação motora das crianças.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Brinquedos, Livros Infantis',
      condition: 'NOVO',
      price: 'R$ 20,00',
      category: 'brinquedos',
      rating: 10,
      ownerId: user2.id
    },
    {
      name: 'Mesa de Madeira Maciça',
      description: 'Mesa de madeira maciça de demolição. Superfície lisa, pernas robustas. Ideal para escritório ou sala de jantar. Dimensões: 120x80cm.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Móveis, Cadeiras, Decoração',
      condition: 'SEMI NOVA',
      price: 'R$ 150,00',
      category: 'casa-construcao',
      rating: 8,
      ownerId: user3.id
    },
    {
      name: 'Peças de Brinquedo Educativo',
      description: 'Conjunto completo de blocos numerados educativos. Madeira natural, números de 1 a 10. Perfeito para desenvolvimento cognitivo infantil.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Brinquedos, Livros, Material Escolar',
      condition: 'NOVO',
      price: 'R$ 40,00',
      category: 'brinquedos',
      rating: 10,
      ownerId: user1.id
    },
    {
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo Nike Air Max para corrida. Tamanho 42, cor preta e branca. Solado em bom estado, ideal para atividades físicas.',
      image: '/logo-placeholder.svg',
      desiredItem: 'Calçados, Roupas Esportivas',
      condition: 'USADO',
      price: 'R$ 85,00',
      category: 'sapatos',
      rating: 8,
      ownerId: user2.id
    }
  ]

  for (const offer of offers) {
    await prisma.offer.create({
      data: offer
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

