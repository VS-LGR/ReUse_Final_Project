import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

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

    // In production, compare hashed passwords
    if (user.password !== password) {
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








