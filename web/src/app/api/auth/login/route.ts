import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, isBcryptHash } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        theme: true,
        language: true,
        xp: true,
        level: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verificar senha - suporta hash bcrypt e texto plano (para migração)
    let passwordValid = false
    if (isBcryptHash(user.password)) {
      // Senha está hasheada, comparar com bcrypt
      passwordValid = await comparePassword(password, user.password)
    } else {
      // Senha antiga em texto plano (compatibilidade durante migração)
      passwordValid = user.password === password
    }

    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}








