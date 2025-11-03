import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Proxy para buscar usuários (equivalente ao /api/users-proxy do Node-RED)
 * Chama diretamente a API interna sem fazer proxy externo
 */
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
        isActive: true,
        isBlocked: true,
        blockReason: true,
        blockedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(users, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

