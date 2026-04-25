import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI小游戏平台 - 分享你的AI创意游戏',
  description: '一个让用户自由分享和游玩AI小游戏的平台',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
