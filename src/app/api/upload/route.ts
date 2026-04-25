import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const indexFile = formData.get('indexFile') as string || 'index.html';

    if (!title || !description || !category) {
      return NextResponse.json({ error: '请填写必要信息' }, { status: 400 });
    }

    // Handle file upload
    const gameDir = path.join(process.cwd(), 'public', 'games', `${Date.now()}-${session.id}`);
    fs.mkdirSync(gameDir, { recursive: true });

    const files = formData.getAll('files') as File[];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(gameDir, file.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
    }

    // Handle thumbnail
    const thumbnail = formData.get('thumbnail') as File | null;
    let thumbnailPath = '/placeholder-game.png';
    if (thumbnail && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = thumbnail.name.split('.').pop() || 'png';
      thumbnailPath = `/games/${path.basename(gameDir)}/thumbnail.${ext}`;
      fs.writeFileSync(path.join(process.cwd(), 'public', thumbnailPath), buffer);
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        category,
        tags,
        indexFile,
        thumbnail: thumbnailPath,
        authorId: session.id,
      },
    });

    return NextResponse.json(game, { status: 201 });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}
