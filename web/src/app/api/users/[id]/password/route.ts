import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

/**
 * Endpoint para trocar senha de usuário
 * Usado pelo admin panel
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password)

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error: any) {
    console.error('Error updating password:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }
}

