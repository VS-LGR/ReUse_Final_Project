import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * PATCH /api/users/[id]/update
 * Atualiza dados do usuário (nome, email, telefone, endereço, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, email, phone, address, city, state, zipCode, avatar } = body

    // Verificar se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verificar se o email já está em uso por outro usuário
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        )
      }
    }

    // Atualizar apenas os campos fornecidos
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (address !== undefined) updateData.address = address
    if (city !== undefined) updateData.city = city
    if (state !== undefined) updateData.state = state
    if (zipCode !== undefined) updateData.zipCode = zipCode
    if (avatar !== undefined) updateData.avatar = avatar

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        theme: true,
        language: true,
        xp: true,
        level: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Error updating user:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

