import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Remover oferta permanentemente
 * Equivalente ao /api/offer/delete do Node-RED
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { offerId } = body

    if (!offerId) {
      return NextResponse.json(
        { success: false, error: 'ID da oferta é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se a oferta existe antes de deletar
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    })

    if (!offer) {
      return NextResponse.json(
        { success: false, error: 'Oferta não encontrada' },
        { status: 404 }
      )
    }

    // Deletar permanentemente
    await prisma.offer.delete({
      where: { id: offerId },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Oferta removida com sucesso',
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error: any) {
    console.error('Error deleting offer:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Oferta não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao remover oferta: ' + (error.message || 'Erro desconhecido'),
      },
      { status: 500 }
    )
  }
}

