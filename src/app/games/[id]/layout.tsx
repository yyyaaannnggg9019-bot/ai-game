import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '游戏详情 - AI小游戏平台',
};

export default function GameDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
