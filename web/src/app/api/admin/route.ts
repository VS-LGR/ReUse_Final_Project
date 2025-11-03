import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Endpoint para obter métricas administrativas
export async function GET() {
  try {
    // Obter estatísticas gerais
    const [
      totalUsers,
      activeUsers,
      blockedUsers,
      totalOffers,
      activeOffers,
      pendingOffers,
      totalMessages,
      totalChats
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: { not: false } } }),
      prisma.user.count({ where: { isBlocked: true } }),
      prisma.offer.count(),
      prisma.offer.count({ where: { isActive: true } }),
      prisma.offer.count({ where: { status: 'pending' } }),
      prisma.message.count(),
      prisma.chat.count()
    ])

    const metrics = {
      users: {
        total: totalUsers,
        active: activeUsers,
        blocked: blockedUsers
      },
      offers: {
        total: totalOffers,
        active: activeOffers,
        pending: pendingOffers
      },
      communication: {
        totalMessages,
        totalChats
      },
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({ success: true, data: metrics })
  } catch (error) {
    console.error('Error fetching admin metrics:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}
