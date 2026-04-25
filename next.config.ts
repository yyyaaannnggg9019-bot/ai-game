import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 针对 Cloudflare Pages 优化
  experimental: {
    // 启用服务器组件
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // 配置外部包，避免在边缘环境中打包
  serverExternalPackages: ['@prisma/client', '@libsql/client'],
};

export default nextConfig;
