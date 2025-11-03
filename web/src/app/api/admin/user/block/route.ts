import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Bloquear ou desbloquear usuário
 * Equivalente ao /api/user/block do Node-RED
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action } = body

    if (!userId || !action) {
      return NextResponse.json(
        { success: false, error: 'ID do usuário e ação são obrigatórios' },
        { status: 400 }
      )
    }

    if (action !== 'block' && action !== 'unblock') {
      return NextResponse.json(
        { success: false, error: 'Ação deve ser "block" ou "unblock"' },
        { status: 400 }
      )
    }

    const isBlocked = action === 'block'

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        isBlocked,
        blockReason: isBlocked ? 'Bloqueado por administrador' : null,
        blockedAt: isBlocked ? new Date() : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isBlocked: true,
        blockReason: true,
        blockedAt: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: `Usuário ${isBlocked ? 'bloqueado' : 'desbloqueado'} com sucesso`,
        data: user,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error: any) {
    console.error('Error blocking/unblocking user:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao atualizar usuário: ' + (error.message || 'Erro desconhecido'),
      },
      { status: 500 }
    )
  }
}

