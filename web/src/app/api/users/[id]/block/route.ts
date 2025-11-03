import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { reason } = await request.json()
    const userId = params.id

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Bloquear usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isBlocked: true,
        blockReason: reason || 'Bloqueado por administrador',
        blockedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedUser,
      message: 'User blocked successfully'
    })
  } catch (error) {
    console.error('Error blocking user:', error)
    return NextResponse.json({ error: 'Failed to block user' }, { status: 500 })
  }
}
