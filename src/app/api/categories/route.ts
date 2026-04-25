import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const categories = ['文字冒险', '解谜', '对战', '策略', '休闲', '角色扮演', '其他'];
  return NextResponse.json(categories);
}
