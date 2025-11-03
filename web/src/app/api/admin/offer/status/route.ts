import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Alterar status de oferta (ativar/desativar/aprov/rejeitar)
 * Equivalente ao /api/offer/status do Node-RED
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { offerId, action } = body

    if (!offerId || !action) {
      return NextResponse.json(
        { success: false, error: 'ID da oferta e ação são obrigatórios' },
        { status: 400 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case 'activate':
        updateData = {
          isActive: true,
          status: 'approved',
          approvedAt: new Date(),
          rejectedAt: null,
        }
        break
      case 'deactivate':
        updateData = {
          isActive: false,
        }
        break
      case 'approve':
        updateData = {
          status: 'approved',
          isActive: true,
          approvedAt: new Date(),
          rejectedAt: null,
          rejectionReason: null,
        }
        break
      case 'reject':
        updateData = {
          status: 'rejected',
          isActive: false,
          rejectedAt: new Date(),
        }
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Ação inválida' },
          { status: 400 }
        )
    }

    const offer = await prisma.offer.update({
      where: { id: offerId },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Oferta atualizada com sucesso',
        data: offer,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error: any) {
    console.error('Error updating offer status:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Oferta não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao atualizar oferta: ' + (error.message || 'Erro desconhecido'),
      },
      { status: 500 }
    )
  }
}

