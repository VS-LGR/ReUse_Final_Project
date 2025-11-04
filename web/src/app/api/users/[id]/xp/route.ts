import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const XP_PER_LEVEL = 100

/**
 * Atualizar XP do usuário
 * Calcula automaticamente o nível baseado no XP
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { amount } = body

    if (typeof amount !== 'number' || amount < 0) {
      return NextResponse.json(
        { error: 'Invalid XP amount. Must be a positive number.' },
        { status: 400 }
      )
    }

    // Buscar usuário atual
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        xp: true,
        level: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calcular novo XP e nível
    let newXP = user.xp + amount
    let newLevel = user.level

    // Calcular quantos níveis subiu
    while (newXP >= XP_PER_LEVEL) {
      newXP -= XP_PER_LEVEL
      newLevel += 1
    }

    // Atualizar no banco
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        xp: newXP,
        level: newLevel,
      },
      select: {
        id: true,
        xp: true,
        level: true,
      },
    })

    return NextResponse.json({
      ...updatedUser,
      leveledUp: newLevel > user.level,
      levelsGained: newLevel - user.level,
    })
  } catch (error: any) {
    console.error('Error updating XP:', error)

    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to update XP' },
      { status: 500 }
    )
  }
}

