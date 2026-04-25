import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }
    const { id } = await params;
    const existing = await prisma.favorite.findUnique({
      where: { gameId_userId: { gameId: id, userId: session.id } },
    });
    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ favorited: false });
    }
    await prisma.favorite.create({ data: { gameId: id, userId: session.id } });
    return NextResponse.json({ favorited: true });
  } catch (err) {
    console.error('Favorite error:', err);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
