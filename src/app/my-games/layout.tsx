import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的游戏 - AI小游戏平台',
};

export default function MyGamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
