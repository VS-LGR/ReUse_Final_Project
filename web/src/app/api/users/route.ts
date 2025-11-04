import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        xp: true,
        level: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, avatar, theme, language } = body

    // Validações
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validar senha
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar,
        theme: theme || 'Claro',
        language: language || 'pt-BR'
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        theme: true,
        language: true,
        xp: true,
        level: true,
        createdAt: true
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    
    // Erro de duplicação de email
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}









