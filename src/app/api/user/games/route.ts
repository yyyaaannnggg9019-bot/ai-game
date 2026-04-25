import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }
    const games = await prisma.game.findMany({
      where: { authorId: session.id },
      include: { _count: { select: { likes: true, comments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(games);
  } catch {
    return NextResponse.json({ error: '获取我的游戏失败' }, { status: 500 });
  }
}
