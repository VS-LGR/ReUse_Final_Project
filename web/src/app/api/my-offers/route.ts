import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/my-offers
 * Retorna apenas as ofertas do usuário logado
 * Requer userId como query parameter
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const offers = await prisma.offer.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error('Error fetching user offers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user offers' },
      { status: 500 }
    )
  }
}

