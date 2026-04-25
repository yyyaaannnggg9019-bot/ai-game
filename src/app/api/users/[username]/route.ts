import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const user = await prisma.user.findUnique({
      where: { name: username },
      select: {
        id: true, name: true, avatar: true, bio: true, createdAt: true,
        _count: { select: { games: true, likes: true } },
      },
    });
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }
    const games = await prisma.game.findMany({
      where: { authorId: user.id, isPublished: true },
      include: { _count: { select: { likes: true, comments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ user, games });
  } catch {
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 });
  }
}
