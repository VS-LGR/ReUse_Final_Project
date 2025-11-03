import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Proxy para buscar ofertas (equivalente ao /api/offers-proxy do Node-RED)
 * Retorna todas as ofertas, não apenas as ativas
 */
export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(offers, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}

