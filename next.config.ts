import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: true,
    // 针对Turbopack的配置
    turbopack: {},
  },
};

export default nextConfig;
