import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.id },
      include: {
        game: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
            _count: { select: { likes: true, comments: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(favorites.map((f: any) => f.game));
  } catch {
    return NextResponse.json({ error: '获取收藏失败' }, { status: 500 });
  }
}
