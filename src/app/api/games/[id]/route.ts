import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true } },
        _count: { select: { likes: true, comments: true, favorites: true } },
      },
    });

    if (!game) {
      return NextResponse.json({ error: '游戏不存在' }, { status: 404 });
    }

    // Increment views
    await prisma.game.update({ where: { id }, data: { views: { increment: 1 } } });

    const session = await getSession();
    let isLiked = false;
    let isFavorited = false;
    if (session) {
      const [like, fav] = await Promise.all([
        prisma.like.findUnique({ where: { gameId_userId: { gameId: id, userId: session.id } } }),
        prisma.favorite.findUnique({ where: { gameId_userId: { gameId: id, userId: session.id } } }),
      ]);
      isLiked = !!like;
      isFavorited = !!fav;
    }

    return NextResponse.json({ ...game, isLiked, isFavorited });
  } catch (err) {
    console.error('Game detail error:', err);
    return NextResponse.json({ error: '获取游戏详情失败' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }
    const { id } = await params;
    const game = await prisma.game.findUnique({ where: { id } });
    if (!game || game.authorId !== session.id) {
      return NextResponse.json({ error: '无权删除' }, { status: 403 });
    }
    await prisma.game.delete({ where: { id } });
    return NextResponse.json({ message: '已删除' });
  } catch {
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
