import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: true,
  },
  // 针对Cloudflare Pages的优化
  output: 'export', // 这将生成静态导出，适用于CDN部署
};

export default nextConfig;
