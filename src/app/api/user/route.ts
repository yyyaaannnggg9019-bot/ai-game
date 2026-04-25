import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(_req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, avatar: true, bio: true, createdAt: true },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }
    const { name, bio, avatar } = await req.json();
    const user = await prisma.user.update({
      where: { id: session.id },
      data: { name, bio, avatar },
    });
    return NextResponse.json({ id: user.id, name: user.name, email: user.email, avatar: user.avatar, bio: user.bio });
  } catch {
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
