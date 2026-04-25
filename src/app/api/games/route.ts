import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'latest';

    const where: any = { isPublished: true };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const orderBy: any = {};
    if (sort === 'popular') orderBy.views = 'desc';
    else if (sort === 'recent') orderBy.createdAt = 'desc';
    else orderBy.createdAt = 'desc';

    const skip = (page - 1) * limit;

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          _count: { select: { likes: true, comments: true } },
        },
      }),
      prisma.game.count({ where }),
    ]);

    return NextResponse.json({
      games,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Games list error:', err);
    return NextResponse.json({ error: '获取游戏列表失败' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, category, tags, indexFile } = body;

    if (!title || !description || !category) {
      return NextResponse.json({ error: '请填写必要信息' }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        category,
        tags: Array.isArray(tags) ? tags.join(',') : tags,
        indexFile: indexFile || 'index.html',
        authorId: session.id,
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (err) {
    console.error('Create game error:', err);
    return NextResponse.json({ error: '创建游戏失败' }, { status: 500 });
  }
}
