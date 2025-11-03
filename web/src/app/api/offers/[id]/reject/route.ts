import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { reason } = await request.json()
    const offerId = params.id

    // Verificar se a oferta existe
    const offer = await prisma.offer.findUnique({
      where: { id: offerId }
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Rejeitar oferta
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        isActive: false,
        status: 'rejected',
        rejectionReason: reason || 'Rejeitado por administrador',
        rejectedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: updatedOffer,
      message: 'Offer rejected successfully'
    })
  } catch (error) {
    console.error('Error rejecting offer:', error)
    return NextResponse.json({ error: 'Failed to reject offer' }, { status: 500 })
  }
}
