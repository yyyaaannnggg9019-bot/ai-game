import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的收藏 - AI小游戏平台',
};

export default function MyFavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
