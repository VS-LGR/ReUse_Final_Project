import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes (opcional - comente se não quiser limpar)
  console.log('🧹 Limpando dados antigos...')
  await prisma.offer.deleteMany()
  await prisma.message.deleteMany()
  await prisma.chat.deleteMany()
  await prisma.user.deleteMany()

  // Criar usuários de exemplo
  console.log('👥 Criando usuários...')
  const users = [
    {
      email: 'joao@reuse.com',
      name: 'João Silva',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=12',
      xp: 250,
      level: 3,
    },
    {
      email: 'maria@reuse.com',
      name: 'Maria Santos',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=47',
      xp: 180,
      level: 2,
    },
    {
      email: 'pedro@reuse.com',
      name: 'Pedro Costa',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=33',
      xp: 120,
      level: 2,
    },
    {
      email: 'ana@reuse.com',
      name: 'Ana Lima',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=20',
      xp: 320,
      level: 4,
    },
    {
      email: 'carlos@reuse.com',
      name: 'Carlos Oliveira',
      password: '123456',
      avatar: 'https://i.pravatar.cc/150?img=15',
      xp: 95,
      level: 1,
    },
  ]

  const createdUsers = []
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    })
    createdUsers.push(user)
    console.log(`✅ Usuário criado: ${user.name}`)
  }

  // Criar ofertas de exemplo com imagens reais
  console.log('📦 Criando ofertas com imagens...')
  const offers = [
    {
      name: 'AirPods Pro 2ª Geração',
      description:
        'Fones de ouvido sem fio Apple AirPods Pro com cancelamento de ruído ativo. Funcionando perfeitamente, apenas alguns arranhões na caixa. Inclui carregador e cabo original. Pouco uso, conservado.',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      desiredItem: 'Smartwatch, Fones sem fio, Carregador wireless',
      condition: 'Seminovo',
      price: 'R$ 1.200,00',
      category: 'eletronicos',
      rating: 9,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[0].id,
    },
    {
      name: 'Cadeira Gamer Ergonômica',
      description:
        'Cadeira de escritório gamer com apoio lombar ajustável. Estofamento em couro sintético preto, base giratória e rodinhas. Ideal para home office ou gaming. Apenas 6 meses de uso.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
      desiredItem: 'Mesa de escritório, Monitor, Mousepad',
      condition: 'Seminovo',
      price: 'R$ 450,00',
      category: 'casa-construcao',
      rating: 8,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[1].id,
    },
    {
      name: 'Blusa Adidas Originals',
      description:
        'Blusa esportiva Adidas Originals em ótimo estado. Tecido respirável, tamanho M. Usada poucas vezes, sem manchas ou desgaste. Cor preta com listras brancas.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      desiredItem: 'Tênis esportivo, Shorts, Boné',
      condition: 'Seminovo',
      price: 'R$ 120,00',
      category: 'roupas',
      rating: 9,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[2].id,
    },
    {
      name: 'Blusa de Frio Zara',
      description:
        'Blusa de frio confortável da Zara. Cor bege, tamanho P. Tecido macio e quente, perfeita para o inverno. Usada apenas uma temporada, sem sinais de uso.',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
      desiredItem: 'Jaqueta, Cachecol, Luvas',
      condition: 'Seminovo',
      price: 'R$ 80,00',
      category: 'roupas',
      rating: 8,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[0].id,
    },
    {
      name: 'Patinhos de Borracha Infantis',
      description:
        'Conjunto de 6 patinhos de borracha coloridos para banho. Brinquedos educativos que estimulam a coordenação motora das crianças. Novos, sem uso.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      desiredItem: 'Livros infantis, Quebra-cabeça, Brinquedos educativos',
      condition: 'Novo',
      price: 'R$ 25,00',
      category: 'brinquedos',
      rating: 10,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[3].id,
    },
    {
      name: 'Mesa de Madeira Maciça',
      description:
        'Mesa de madeira maciça de demolição. Superfície lisa, pernas robustas. Ideal para escritório ou sala de jantar. Dimensões: 120x80cm. Restaurada recentemente.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      desiredItem: 'Cadeiras, Decoração, Luminária',
      condition: 'Usado',
      price: 'R$ 350,00',
      category: 'casa-construcao',
      rating: 7,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[2].id,
    },
    {
      name: 'Peças de Brinquedo Educativo',
      description:
        'Conjunto completo de blocos numerados educativos. Madeira natural, números de 1 a 10. Perfeito para desenvolvimento cognitivo infantil. Embalagem original.',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
      desiredItem: 'Livros infantis, Material escolar, Quebra-cabeça',
      condition: 'Novo',
      price: 'R$ 45,00',
      category: 'brinquedos',
      rating: 10,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[1].id,
    },
    {
      name: 'Tênis Nike Air Max',
      description:
        'Tênis esportivo Nike Air Max para corrida. Tamanho 42, cor preta e branca. Solado em bom estado, ideal para atividades físicas. Pouco desgaste.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      desiredItem: 'Calçados esportivos, Roupas esportivas, Mochila',
      condition: 'Usado',
      price: 'R$ 180,00',
      category: 'sapatos',
      rating: 8,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[4].id,
    },
    {
      name: 'Notebook Dell Inspiron',
      description:
        'Notebook Dell Inspiron 15, Intel Core i5, 8GB RAM, 256GB SSD. Tela Full HD, teclado retroiluminado. Excelente para estudos e trabalho. 1 ano de uso.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      desiredItem: 'Tablet, Monitor, Mouse sem fio',
      condition: 'Usado',
      price: 'R$ 1.800,00',
      category: 'eletronicos',
      rating: 8,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[3].id,
    },
    {
      name: 'Livro: O Poder do Hábito',
      description:
        'Livro "O Poder do Hábito" de Charles Duhigg. Edição em português, capa comum. Excelente estado, sem marcações ou dobras. Leitura recomendada!',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
      desiredItem: 'Outros livros, Revistas, Material de estudo',
      condition: 'Seminovo',
      price: 'R$ 35,00',
      category: 'papelaria',
      rating: 9,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[0].id,
    },
    {
      name: 'Skateboard Completo',
      description:
        'Skateboard completo com rodas, trucks e lixa. Ideal para iniciantes. Praticamente novo, usado apenas algumas vezes. Marca brasileira de qualidade.',
      image: 'https://images.unsplash.com/photo-1571494146906-86de15d3817b?w=800&q=80',
      desiredItem: 'Patins, Bicicleta, Equipamentos esportivos',
      condition: 'Seminovo',
      price: 'R$ 150,00',
      category: 'brinquedos',
      rating: 9,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[4].id,
    },
    {
      name: 'Câmera Canon EOS',
      description:
        'Câmera fotográfica Canon EOS, modelo intermediário. Ideal para fotografia amadora. Inclui lente 18-55mm, bateria e carregador. Boa conservação.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80',
      desiredItem: 'Lentes, Tripé, Mochila para câmera',
      condition: 'Usado',
      price: 'R$ 950,00',
      category: 'eletronicos',
      rating: 7,
      status: 'approved',
      isActive: true,
      ownerId: createdUsers[1].id,
    },
  ]

  for (const offer of offers) {
    await prisma.offer.create({
      data: offer,
    })
    console.log(`✅ Oferta criada: ${offer.name}`)
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log(`📊 Criados:`)
  console.log(`   - ${createdUsers.length} usuários`)
  console.log(`   - ${offers.length} ofertas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })