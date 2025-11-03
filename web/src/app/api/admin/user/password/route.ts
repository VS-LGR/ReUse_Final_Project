import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Trocar senha de usuário
 * Equivalente ao /api/user/password do Node-RED
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, newPassword } = body

    if (!userId || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'ID do usuário e nova senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // TODO: Em produção, hash a senha antes de salvar
    // const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: newPassword, // Substituir por hashedPassword em produção
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Senha alterada com sucesso',
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error: any) {
    console.error('Error changing password:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao alterar senha: ' + (error.message || 'Erro desconhecido'),
      },
      { status: 500 }
    )
  }
}

