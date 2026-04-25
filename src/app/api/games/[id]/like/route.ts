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
    const existing = await prisma.like.findUnique({
      where: { gameId_userId: { gameId: id, userId: session.id } },
    });
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      return NextResponse.json({ liked: false });
    }
    await prisma.like.create({ data: { gameId: id, userId: session.id } });
    return NextResponse.json({ liked: true });
  } catch (err) {
    console.error('Like error:', err);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
