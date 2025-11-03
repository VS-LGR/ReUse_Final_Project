import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const offerId = params.id

    // Verificar se a oferta existe
    const offer = await prisma.offer.findUnique({
      where: { id: offerId }
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Aprovar oferta
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        isActive: true,
        status: 'approved',
        approvedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedOffer,
      message: 'Offer approved successfully'
    })
  } catch (error) {
    console.error('Error approving offer:', error)
    return NextResponse.json({ error: 'Failed to approve offer' }, { status: 500 })
  }
}
