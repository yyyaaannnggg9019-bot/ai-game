// 数据库连接配置，适配 Cloudflare Pages 环境
import { PrismaClient } from '@prisma/client';

// 使用全局变量避免在开发环境中重复初始化
declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prismaClient;
}

export default prismaClient;
