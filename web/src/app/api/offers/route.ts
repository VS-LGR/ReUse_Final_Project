import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      where: { isActive: true },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, image, desiredItem, condition, price, category, ownerId } = body

    const offer = await prisma.offer.create({
      data: {
        name,
        description,
        image,
        desiredItem,
        condition,
        price,
        category,
        ownerId
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error('Error creating offer:', error)
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}









