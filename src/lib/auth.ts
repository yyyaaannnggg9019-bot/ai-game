import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'ai-games-secret-key-2026');

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token.value, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
