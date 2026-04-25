import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'ai-games-secret-key-2026');

export async function POST(req: NextRequest, { params }: { params: { action: string[] } }) {
  try {
    const action = params.action?.join('/');
    const body = await req.json();

    // Register
    if (action === 'register' && body.action === 'register') {
      const { name, email, password } = body;
      if (!name || !email || !password) {
        return NextResponse.json({ error: '请填写所有字段' }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: '密码至少6位' }, { status: 400 });
      }
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: '邮箱已注册' }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      const token = await new SignJWT({ id: user.id, name: user.name, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(SECRET);
      const response = NextResponse.json({ id: user.id, name: user.name, email: user.email, token }, { status: 201 });
      response.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60, sameSite: 'lax' });
      return response;
    }

    // Login
    if (action === 'login' && body.action === 'login') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: '请填写邮箱和密码' }, { status: 400 });
      }
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: '用户不存在' }, { status: 401 });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: '密码错误' }, { status: 401 });
      }
      const token = await new SignJWT({ id: user.id, name: user.name, email: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(SECRET);
      const response = NextResponse.json({ id: user.id, name: user.name, email: user.email, token });
      response.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60, sameSite: 'lax' });
      return response;
    }

    // Logout
    if (action === 'logout') {
      const response = NextResponse.json({ message: 'logged out' });
      response.cookies.delete('token');
      return response;
    }

    return NextResponse.json({ error: '无效操作' }, { status: 400 });
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: '操作失败' }, { status: 500 });
  }
}
