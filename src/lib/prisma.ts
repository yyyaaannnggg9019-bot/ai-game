import { PrismaClient } from '@prisma/client';

declare global {
  // 全局作用域允许在开发期间热重载期间防止重复实例化
  var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = client;

export default client;
