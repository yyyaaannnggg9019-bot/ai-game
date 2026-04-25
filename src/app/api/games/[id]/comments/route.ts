import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const comments = await prisma.comment.findMany({
      where: { gameId: id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(comments);
  } catch (err) {
    console.error('Comments error:', err);
    return NextResponse.json({ error: '获取评论失败' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }
    const { id } = await params;
    const { content } = await req.json();
    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: '评论内容不能为空' }, { status: 400 });
    }
    const comment = await prisma.comment.create({
      data: { gameId: id, userId: session.id, content: content.trim() },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error('Comment create error:', err);
    return NextResponse.json({ error: '评论失败' }, { status: 500 });
  }
}
