import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Desbloquear usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isBlocked: false,
        blockReason: null,
        blockedAt: null
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedUser,
      message: 'User unblocked successfully'
    })
  } catch (error) {
    console.error('Error unblocking user:', error)
    return NextResponse.json({ error: 'Failed to unblock user' }, { status: 500 })
  }
}
