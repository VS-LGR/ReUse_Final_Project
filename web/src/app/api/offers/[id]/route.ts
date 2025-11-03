import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
            xp: true,
            level: true
          }
        }
      }
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Error fetching offer:', error)
    return NextResponse.json({ error: 'Failed to fetch offer' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const offer = await prisma.offer.update({
      where: { id },
      data: body,
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

    return NextResponse.json(offer)
  } catch (error: any) {
    console.error('Error updating offer:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Verificar se a oferta existe
    const offer = await prisma.offer.findUnique({
      where: { id },
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Deletar permanentemente (comportamento esperado pelo admin)
    await prisma.offer.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Offer deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting offer:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 })
  }
}







