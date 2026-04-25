import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '游戏广场 - AI小游戏平台',
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
