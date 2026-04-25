import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [trending, recent] = await Promise.all([
      prisma.game.findMany({
        where: { isPublished: true },
        orderBy: { views: 'desc' },
        take: 6,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { likes: true, comments: true } },
        },
      }),
      prisma.game.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { likes: true, comments: true } },
        },
      }),
    ]);
    return NextResponse.json({ trending, recent });
  } catch {
    return NextResponse.json({ trending: [], recent: [] });
  }
}
